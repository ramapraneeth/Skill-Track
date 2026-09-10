import { prisma } from '@/lib/db/prisma';
import { DataSufficiencyService } from './data-sufficiency.service';
import { SkillDemandResponse, SkillDemandItem } from '@/lib/validations/ai-ml.schema';

export class SkillDemandService {
  /**
   * Deterministically aggregates labor market demand for skills across verified active vacancies in Neon PostgreSQL.
   * Calculates occurrence frequency, vacancy volume, average offered wage, and regional concentration.
   */
  static async getSkillDemandAnalytics(params: {
    sector?: string;
    state?: string;
    limit?: number;
  } = {}): Promise<SkillDemandResponse> {
    const limit = params.limit || 15;

    const whereJob: any = { is_active: true };
    if (params.sector) whereJob.sector = params.sector;
    if (params.state) whereJob.state = params.state;

    const jobs = await prisma.jobs.findMany({
      where: whereJob,
    });

    const totalActiveJobs = jobs.length;
    let totalVacancies = 0;

    const skillMap = new Map<
      string,
      {
        skillName: string;
        jobCount: number;
        totalVacancies: number;
        salaries: number[];
        sectors: Set<string>;
      }
    >();

    for (const job of jobs) {
      const jobVacancies = job.vacancies || 1;
      totalVacancies += jobVacancies;

      const avgJobSalary =
        job.min_salary && job.max_salary
          ? (job.min_salary + job.max_salary) / 2
          : job.max_salary || job.min_salary || null;

      let reqSkills: string[] = [];
      if (Array.isArray(job.required_skills)) {
        reqSkills = (job.required_skills as any[]).map((s) => {
          if (typeof s === 'string') return s;
          if (s && typeof s === 'object' && s.skillName) return s.skillName;
          if (s && typeof s === 'object' && s.skillId) return s.skillId;
          return String(s);
        });
      }

      for (const rawSkill of reqSkills) {
        const skillName = rawSkill.trim();
        if (!skillName) continue;

        const key = skillName.toLowerCase();
        if (!skillMap.has(key)) {
          skillMap.set(key, {
            skillName,
            jobCount: 0,
            totalVacancies: 0,
            salaries: [],
            sectors: new Set(),
          });
        }

        const entry = skillMap.get(key)!;
        entry.jobCount += 1;
        entry.totalVacancies += jobVacancies;
        if (avgJobSalary !== null) {
          entry.salaries.push(avgJobSalary);
        }
        if (job.sector) {
          entry.sectors.add(job.sector);
        }
      }
    }

    const skills: SkillDemandItem[] = Array.from(skillMap.values())
      .map((entry) => {
        const demandSharePct =
          totalActiveJobs > 0
            ? Number(((entry.jobCount / totalActiveJobs) * 100).toFixed(1))
            : 0;

        const averageSalaryOffer =
          entry.salaries.length > 0
            ? Math.round(entry.salaries.reduce((a, b) => a + b, 0) / entry.salaries.length)
            : null;

        let trendingStatus: 'HIGH DEMAND' | 'MODERATE DEMAND' | 'EMERGING' = 'EMERGING';
        if (demandSharePct >= 40) {
          trendingStatus = 'HIGH DEMAND';
        } else if (demandSharePct >= 20) {
          trendingStatus = 'MODERATE DEMAND';
        }

        return {
          skillName: entry.skillName,
          jobCount: entry.jobCount,
          totalVacancies: entry.totalVacancies,
          demandSharePct,
          averageSalaryOffer,
          topSectors: Array.from(entry.sectors).slice(0, 3),
          trendingStatus,
        };
      })
      .sort((a, b) => b.totalVacancies - a.totalVacancies || b.jobCount - a.jobCount)
      .slice(0, limit);

    const sufficiency = DataSufficiencyService.checkSufficiency(
      totalActiveJobs,
      'regional_labor_demand'
    );

    return {
      totalActiveJobsAnalyzed: totalActiveJobs,
      totalVacanciesAnalyzed: totalVacancies,
      skills,
      provenance: {
        dataSource: 'OBSERVED',
        algorithm: 'ActiveVacanciesAggregation-v1',
        calculatedAt: new Date().toISOString(),
        isSufficientData: sufficiency.isSufficient,
        sampleSize: totalActiveJobs,
      },
      sufficiencyWarning: sufficiency.isSufficient ? undefined : sufficiency.message,
    };
  }
}
