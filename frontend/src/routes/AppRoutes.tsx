import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/public/HomePage'

// Learner Pages
import { LearnerDashboard } from '../pages/learner/LearnerDashboard'
import { LearnerProfile } from '../pages/learner/LearnerProfile'
import { LearnerSkills } from '../pages/learner/LearnerSkills'
import { LearnerOutcomes } from '../pages/learner/LearnerOutcomes'
import { LearnerTimeline } from '../pages/learner/LearnerTimeline'
import { LearnerRecommendations } from '../pages/learner/LearnerRecommendations'
import { LearnerPredictions } from '../pages/learner/LearnerPredictions'

// Provider Pages
import { ProviderDashboard } from '../pages/provider/ProviderDashboard'
import { ProviderLearners } from '../pages/provider/ProviderLearners'
import { ProviderProgrammes } from '../pages/provider/ProviderProgrammes'
import { ProviderOutcomes } from '../pages/provider/ProviderOutcomes'
import { ProviderAnalytics } from '../pages/provider/ProviderAnalytics'

// Government Pages
import { GovernmentDashboard } from '../pages/government/GovernmentDashboard'
import { GovernmentProgrammes } from '../pages/government/GovernmentProgrammes'
import { GovernmentProviders } from '../pages/government/GovernmentProviders'
import { GovernmentSkills } from '../pages/government/GovernmentSkills'
import { GovernmentPredictions } from '../pages/government/GovernmentPredictions'
import { GovernmentInterventions } from '../pages/government/GovernmentInterventions'
import { GovernmentImpact } from '../pages/government/GovernmentImpact'
import { GovernmentReports } from '../pages/government/GovernmentReports'

// Shared Ecosystem Tools
import { JobsPage } from '../pages/common/JobsPage'
import { JobDemandPage } from '../pages/common/JobDemandPage'
import { SkillGapPage } from '../pages/common/SkillGapPage'
import { InterventionsPage } from '../pages/common/InterventionsPage'
import { ImpactPage } from '../pages/common/ImpactPage'
import { SettingsPage } from '../pages/common/SettingsPage'

export const AppRoutes: React.FC = () => {
  const { role } = useAuth()

  const defaultAuthenticatedHome =
    role === 'learner'
      ? '/learner/dashboard'
      : role === 'provider'
      ? '/provider/dashboard'
      : role === 'government'
      ? '/government/dashboard'
      : '/'

  return (
    <Routes>
      {/* 1. Public Home Landing Page - Single Entry Point */}
      <Route path="/" element={<HomePage />} />

      {/* 2. Deprecate separate login route - redirects to public entry point */}
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* 3. Authenticated Institutional Workspaces */}
      <Route element={<Layout />}>
        {/* Learner Portal Routes */}
        <Route path="learner/dashboard" element={<LearnerDashboard />} />
        <Route path="learner/profile" element={<LearnerProfile />} />
        <Route path="learner/skills" element={<LearnerSkills />} />
        <Route path="learner/outcomes" element={<LearnerOutcomes />} />
        <Route path="learner/timeline" element={<LearnerTimeline />} />
        <Route path="learner/recommendations" element={<LearnerRecommendations />} />
        <Route path="learner/predictions" element={<LearnerPredictions />} />
        <Route path="learner/skill-gap" element={<SkillGapPage />} />

        {/* Training Provider Portal Routes */}
        <Route path="provider/dashboard" element={<ProviderDashboard />} />
        <Route path="provider/learners" element={<ProviderLearners />} />
        <Route path="provider/programmes" element={<ProviderProgrammes />} />
        <Route path="provider/outcomes" element={<ProviderOutcomes />} />
        <Route path="provider/analytics" element={<ProviderAnalytics />} />
        <Route path="provider/reports" element={<GovernmentReports />} />

        {/* Government / Policy Maker Cockpit Routes */}
        <Route path="government/dashboard" element={<GovernmentDashboard />} />
        <Route path="government/programmes" element={<GovernmentProgrammes />} />
        <Route path="government/providers" element={<GovernmentProviders />} />
        <Route path="government/skills" element={<GovernmentSkills />} />
        <Route path="government/predictions" element={<GovernmentPredictions />} />
        <Route path="government/interventions" element={<GovernmentInterventions />} />
        <Route path="government/impact" element={<GovernmentImpact />} />
        <Route path="government/reports" element={<GovernmentReports />} />

        {/* Cross-Cutting Ecosystem Tools */}
        <Route path="jobs" element={<JobsPage />} />
        <Route path="job-demand" element={<JobDemandPage />} />
        <Route path="skill-gap" element={<SkillGapPage />} />
        <Route path="interventions" element={<InterventionsPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={defaultAuthenticatedHome} replace />} />
    </Routes>
  )
}
