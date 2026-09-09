import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { X, ArrowLeft, ArrowRight, User, Building2, ShieldCheck, CheckCircle2, Lock, Mail, AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'

export interface UnifiedLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

type AccountType = 'learner' | 'training_provider' | 'government'

export const UnifiedLoginModal: React.FC<UnifiedLoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // State Management
  const [modalStep, setModalStep] = useState<1 | 2>(1)
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType | null>(null)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!isOpen) return null

  const accountOptions = [
    {
      id: 'learner' as AccountType,
      roleName: 'learner',
      title: 'Learner',
      description: 'For students, trainees, and skilled candidates tracking career outcomes',
      icon: User,
      badge: 'Candidate Portal',
      demoCreds: {
        email: 'rahul.sharma@skilltrack.in',
        password: 'demopassword',
      },
    },
    {
      id: 'training_provider' as AccountType,
      roleName: 'provider',
      title: 'Training Provider',
      description: 'For vocational institutes, NSDC training partners, and skilling centers',
      icon: Building2,
      badge: 'Institution Portal',
      demoCreds: {
        email: 'director@apexskills.org',
        password: 'demopassword',
      },
    },
    {
      id: 'government' as AccountType,
      roleName: 'government',
      title: 'Government / Administrator',
      description: 'For national ministry, state skill missions, and policy evaluators',
      icon: ShieldCheck,
      badge: 'National Cockpit',
      demoCreds: {
        email: 'director@msde.gov.in',
        password: 'demopassword',
      },
    },
  ]

  const handleSelectAccountType = (type: AccountType) => {
    setSelectedAccountType(type)
    setErrorMessage(null)
    const option = accountOptions.find((o) => o.id === type)
    if (option) {
      setIdentifier(option.demoCreds.email)
      setPassword(option.demoCreds.password)
    }
  }

  const handleContinueToCredentials = () => {
    if (selectedAccountType) {
      setModalStep(2)
      setErrorMessage(null)
    }
  }

  const handleBackToSelection = () => {
    setModalStep(1)
    setErrorMessage(null)
  }

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAccountType) return

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const option = accountOptions.find((o) => o.id === selectedAccountType)
      const mappedRole = option?.roleName as 'learner' | 'provider' | 'government'

      await login(identifier, password, mappedRole)
      onClose()

      // Redirect strictly based on selected account type
      if (selectedAccountType === 'learner') {
        navigate('/learner/dashboard')
      } else if (selectedAccountType === 'training_provider') {
        navigate('/provider/dashboard')
      } else if (selectedAccountType === 'government') {
        navigate('/government/dashboard')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please verify credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const selectedOption = accountOptions.find((o) => o.id === selectedAccountType)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002541]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white border border-[#D1D9E2] rounded-md shadow-xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F4F6F9]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0B3B60]"></div>
            <span className="text-xs font-bold text-[#0B3B60] uppercase tracking-wider">
              SkillTrack Sovereign Portal
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#718096] hover:text-[#1C2733] p-1 rounded hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {modalStep === 1 ? (
            /* STEP 1: Account Type Selection */
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-[#1C2733]">Login to SkillTrack</h2>
                <p className="text-xs text-[#718096] mt-0.5">
                  Choose your account type to access the appropriate outcome intelligence workspace
                </p>
              </div>

              {/* Account Options List */}
              <div className="space-y-3">
                {accountOptions.map((opt) => {
                  const isSelected = selectedAccountType === opt.id
                  const Icon = opt.icon

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectAccountType(opt.id)}
                      className={`relative flex items-start gap-3.5 p-3.5 rounded border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'border-[#0B3B60] bg-[#E8F0F7]/60 ring-1 ring-[#0B3B60]'
                          : 'border-[#D1D9E2] bg-white hover:border-[#718096] hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${
                          isSelected
                            ? 'bg-[#0B3B60] text-white'
                            : 'bg-[#F4F6F9] text-[#4A5568] border border-[#D1D9E2]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#1C2733]">{opt.title}</h4>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-[#4A5568] border border-slate-200 font-medium">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#718096] mt-0.5 leading-snug">
                          {opt.description}
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#0B3B60] bg-[#0B3B60] text-white'
                              : 'border-[#CBD5E1] bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-2">
                <Button
                  onClick={handleContinueToCredentials}
                  disabled={!selectedAccountType}
                  className="w-full"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            /* STEP 2: Credential Entry */
            <form onSubmit={handleSubmitLogin} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <div>
                  <h2 className="text-base font-bold text-[#1C2733]">Enter Credentials</h2>
                  <p className="text-xs text-[#718096]">
                    Logging in as <span className="font-semibold text-[#0B3B60]">{selectedOption?.title}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBackToSelection}
                  className="inline-flex items-center gap-1 text-xs text-[#0B3B60] hover:underline font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change
                </button>
              </div>

              {errorMessage && (
                <div className="flex items-start gap-2 p-2.5 rounded bg-[#FCE8E6] border border-[#F5A9A4] text-xs text-[#C5221F]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Input
                label="Email / Mobile Number"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@organization.gov.in"
              />

              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-1.5 text-[#4A5568] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0B3B60]" />
                  <span>Remember on this device</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For prototype demonstration, demo credentials are auto-filled.')}
                  className="text-[#0B3B60] hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Demo Fill Pill */}
              <div className="p-2.5 rounded bg-[#F4F6F9] border border-[#D1D9E2] text-[11px] text-[#4A5568]">
                <span className="font-bold text-[#0B3B60]">Demo Pre-fill Active: </span>
                <span>{identifier} (Role: {selectedOption?.roleName})</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToSelection}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-2/3"
                >
                  Login to SkillTrack
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 border-t border-[#E2E8F0] bg-slate-50 text-center">
          <p className="text-[10px] text-[#718096]">
            Authoritative National Skill Outcome Registry • Ministry of Skill Development and Entrepreneurship
          </p>
        </div>
      </div>
    </div>
  )
}
