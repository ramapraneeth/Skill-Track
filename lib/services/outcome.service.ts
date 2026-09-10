import { prisma } from '@/lib/db/prisma';
import { CreateEmploymentInput, CreateSelfEmploymentInput, CreateApprenticeshipInput } from '@/lib/validations/outcome.schema';
import { EmploymentOutcome, SelfEmploymentOutcome, ApprenticeshipOutcome, OutcomeSummary } from '@/types/outcome';
import { NotFoundError } from '@/lib/api/errors';
import crypto from 'crypto';

export class OutcomeService {
  static async getOutcomeSummary(): Promise<OutcomeSummary> {
    const [empCount, selfCount, appCount] = await Promise.all([
      prisma.employment_outcomes.count(),
      prisma.self_employment_outcomes.count(),
      prisma.apprenticeship_outcomes.count(),
    ]);

    const totalOutcomes = empCount + selfCount + appCount;

    const salaryAggregate = await prisma.employment_outcomes.aggregate({
      _avg: {
        monthly_salary: true,
      },
      _count: {
        verified: true,
      },
      where: {
        verified: true,
      },
    });

    const averageStartingSalary = Math.round(salaryAggregate._avg.monthly_salary || 0);
    const verificationRate = empCount > 0 ? Math.round(((salaryAggregate._count.verified || 0) / empCount) * 100) : 0;

    return {
      totalOutcomes,
      wageEmploymentCount: empCount,
      selfEmploymentCount: selfCount,
      apprenticeshipCount: appCount,
      averageStartingSalary,
      verificationRate,
    };
  }

  static async listEmploymentOutcomes(filters?: { learnerId?: string; sector?: string; state?: string }): Promise<EmploymentOutcome[]> {
    const records = await prisma.employment_outcomes.findMany({
      where: {
        ...(filters?.learnerId && { learner_id: filters.learnerId }),
        ...(filters?.sector && { sector: filters.sector }),
        ...(filters?.state && { state: filters.state }),
      },
      include: {
        learners: {
          select: { full_name: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return records.map((r: any) => ({
      id: r.id,
      learnerId: r.learner_id,
      jobId: r.job_id,
      employerName: r.employer_name,
      designation: r.designation,
      sector: r.sector,
      district: r.district,
      state: r.state,
      monthlySalary: r.monthly_salary,
      startDate: r.start_date,
      status: (r.status as any) || 'active',
      verified: r.verified ?? true,
      createdAt: r.created_at?.toISOString(),
      learnerName: r.learners?.full_name,
    }));
  }

  static async createEmploymentOutcome(input: CreateEmploymentInput): Promise<EmploymentOutcome> {
    const id = crypto.randomUUID();
    const created = await prisma.employment_outcomes.create({
      data: {
        id,
        learner_id: input.learnerId,
        job_id: input.jobId,
        employer_name: input.employerName,
        designation: input.designation,
        sector: input.sector,
        district: input.district,
        state: input.state,
        monthly_salary: input.monthlySalary,
        start_date: input.startDate,
        status: input.status,
        verified: input.verified,
        created_at: new Date(),
      },
    });

    // Update learner status to placed
    await prisma.learners.update({
      where: { id: input.learnerId },
      data: {
        current_status: 'placed',
        current_salary: input.monthlySalary,
        risk_level: 'Low',
      },
    });

    return {
      id: created.id,
      learnerId: created.learner_id,
      jobId: created.job_id,
      employerName: created.employer_name,
      designation: created.designation,
      sector: created.sector,
      district: created.district,
      state: created.state,
      monthlySalary: created.monthly_salary,
      startDate: created.start_date,
      status: (created.status as any) || 'active',
      verified: created.verified ?? true,
      createdAt: created.created_at?.toISOString(),
    };
  }

  static async listSelfEmploymentOutcomes(learnerId?: string): Promise<SelfEmploymentOutcome[]> {
    const records = await prisma.self_employment_outcomes.findMany({
      where: learnerId ? { learner_id: learnerId } : undefined,
      include: {
        learners: { select: { full_name: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    return records.map((r: any) => ({
      id: r.id,
      learnerId: r.learner_id,
      enterpriseName: r.enterprise_name,
      sector: r.sector,
      district: r.district,
      state: r.state,
      monthlyRevenue: r.monthly_revenue,
      startDate: r.start_date,
      microfinanceSupport: r.microfinance_support ?? false,
      createdAt: r.created_at?.toISOString(),
      learnerName: r.learners?.full_name,
    }));
  }

  static async listApprenticeshipOutcomes(learnerId?: string): Promise<ApprenticeshipOutcome[]> {
    const records = await prisma.apprenticeship_outcomes.findMany({
      where: learnerId ? { learner_id: learnerId } : undefined,
      include: {
        learners: { select: { full_name: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    return records.map((r: any) => ({
      id: r.id,
      learnerId: r.learner_id,
      establishmentName: r.establishment_name,
      sector: r.sector,
      stipendAmount: r.stipend_amount,
      startDate: r.start_date,
      durationMonths: r.duration_months || 12,
      contractNumber: r.contract_number,
      createdAt: r.created_at?.toISOString(),
      learnerName: r.learners?.full_name,
    }));
  }
}
