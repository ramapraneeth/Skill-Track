'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock,
  Flag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_ASSESSMENTS, getLearner, saveLearner } from '@/lib/sidh-store';

export default function AssessmentInterfacePage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = (params?.id as string) || 'asm-101';

  const assessment = INITIAL_ASSESSMENTS.find((a) => a.id === assessmentId) || INITIAL_ASSESSMENTS[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [key: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(assessment.durationMinutes * 60);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentQuestion = assessment.questions[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIndex,
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview({
      ...markedForReview,
      [currentIndex]: !markedForReview[currentIndex],
    });
  };

  const handleSubmitAssessment = () => {
    // Calculate score
    let correctCount = 0;
    assessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / assessment.questions.length) * 100);

    // Save result into learner record
    const learner = getLearner();
    const updatedSkills = learner.skills.map((sk) => {
      if (sk.name.toLowerCase().includes('java') || sk.name.toLowerCase().includes('oop')) {
        return { ...sk, proficiency: Math.max(sk.proficiency || 0, scorePct), verified: scorePct >= assessment.passingScore };
      }
      return sk;
    });

    saveLearner({
      ...learner,
      skills: updatedSkills,
      careerReadinessScore: Math.min(95, learner.careerReadinessScore + 6),
    });

    router.push(`/learner/assessments/${assessment.id}/result?score=${scorePct}&correct=${correctCount}&total=${assessment.questions.length}`);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Proctor Bar: Title, Progress, Timer */}
      <div className="bg-white border border-[#CBD5E1] rounded-lg p-4 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Assessment In Progress</span>
          <h2 className="text-sm font-bold text-[#0F172A]">{assessment.title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-rose-800 font-mono font-bold text-xs">
            <Clock className="w-4 h-4 text-rose-600" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmitAssessment}
            className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Submit Assessment
          </button>
        </div>
      </div>

      {/* Main Container: Question on Left, Palette on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 cols: Question Area */}
        <div className="lg:col-span-3 bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-xs space-y-6 flex flex-col justify-between min-h-[420px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#0B3B60]">
                Question {currentIndex + 1} of {assessment.questions.length}
              </span>
              <button
                type="button"
                onClick={handleToggleReview}
                className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                  markedForReview[currentIndex]
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{markedForReview[currentIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-[#0F172A] leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-3.5 rounded-lg border text-left text-xs transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#0B3B60] bg-[#0B3B60]/5 ring-1 ring-[#0B3B60] font-semibold text-[#0F172A]'
                        : 'border-[#CBD5E1] hover:border-[#94A3B8] bg-white text-[#334155]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        isSelected ? 'bg-[#0B3B60] text-white' : 'border border-[#CBD5E1] text-[#64748B]'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="h-9 px-4 rounded border border-[#CBD5E1] text-[#334155] text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 hover:bg-[#F1F5F9]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentIndex < assessment.questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="h-9 px-5 rounded bg-[#0B3B60] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#002541]"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitAssessment}
                className="h-9 px-5 rounded bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-800"
              >
                <span>Finish & Submit</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right 1 col: Question Palette */}
        <div className="bg-white border border-[#CBD5E1] rounded-lg p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Question Palette</h4>

          <div className="grid grid-cols-4 gap-2">
            {assessment.questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isMarked = markedForReview[idx];
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded text-xs font-bold transition-all border ${
                    isCurrent
                      ? 'ring-2 ring-[#0B3B60] border-[#0B3B60]'
                      : ''
                  } ${
                    isAnswered
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isMarked
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-[#F8FAFC] text-[#64748B] border-[#CBD5E1] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] space-y-1.5 text-[11px] text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] inline-block" />
              <span>Not Visited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
