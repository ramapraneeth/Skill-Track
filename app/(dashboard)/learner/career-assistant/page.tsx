'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { sidhStore } from '@/lib/sidh-store';
import {
  resolveLearnerCareerContext,
  calculateMultiFactorMatch,
  CareerProfileDef,
} from '@/lib/career-registry';
import { Sparkles, Bot, User, Send, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export default function StudentCareerAssistantPage() {
  const [learner, setLearner] = useState(() => sidhStore.getLearner());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');

  const { stream, career } = resolveLearnerCareerContext(learner);
  const matchResult = calculateMultiFactorMatch(learner, career);

  useEffect(() => {
    const profile = sidhStore.getLearner();
    setLearner(profile);
    const ctx = resolveLearnerCareerContext(profile);

    const initialAiMsg: ChatMessage = {
      id: 'm-1',
      sender: 'ai',
      text: `Hello ${profile.name}! I am your Skill Bridge AI Career Copilot. I have analyzed your academic discipline in ${ctx.stream.name} (${ctx.stream.code}) and your target career as a ${ctx.career.title}. Your live readiness match score is currently at ${matchResult.totalScore}%. How would you like to prepare today?`,
      timestamp: 'Just now',
      suggestions: [
        `What are the most frequent interview questions for ${ctx.career.title}?`,
        `How do I bridge my ${ctx.career.requiredSkills[0]?.skill || 'core'} gap?`,
        `What capstone project should I build for ${ctx.career.title}?`,
        `View required NSQF Level certifications`,
      ],
    };
    setMessages([initialAiMsg]);
  }, []);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    let aiReplyText = '';
    let suggestions: string[] = [];

    const lower = text.toLowerCase();

    if (lower.includes('interview') || lower.includes('question') || lower.includes('mock')) {
      const q = career.interviewQuestions;
      if (q && q.length > 0) {
        aiReplyText = `For ${career.title}, top technical interview questions include:\n\n1) ${q[0]?.question || 'Core Domain Principles'}: ${q[0]?.modelAnswerSummary || 'Demonstrate fundamental principles and standards.'}\n\n2) ${q[1]?.question || 'Applied Practical Skills'}: ${q[1]?.modelAnswerSummary || 'Detail step-by-step methodologies and tools.'}\n\nWould you like a mock practice drill on these questions?`;
      } else {
        aiReplyText = `For ${career.title}, technical evaluations focus heavily on ${career.requiredSkills.slice(0, 3).map((s) => s.skill).join(', ')}. Be prepared to discuss practical applications and industry standards.`;
      }
      suggestions = [
        `Explain how to answer Question 1 in detail`,
        `Show required certifications for ${career.title}`,
        `Test my profile readiness for interviews`,
      ];
    } else if (lower.includes('project') || lower.includes('capstone')) {
      const p = career.projects[0];
      if (p) {
        aiReplyText = `I recommend building: "${p.title}".\n\nProject Scope: ${p.description}\nTools & Standards: ${p.technologiesUsed.join(', ')}\nExpected Outcome: ${p.outcome}`;
      } else {
        aiReplyText = `I recommend building a domain-specific portfolio capstone demonstrating ${career.requiredSkills.slice(0, 2).map((s) => s.skill).join(' and ')}.`;
      }
      suggestions = [
        'Add project evidence to my profile',
        'Show matching course modules',
        'What certifications will validate this project?',
      ];
    } else if (lower.includes('cert') || lower.includes('nsqf')) {
      const c = career.certifications;
      aiReplyText = `For ${career.title}, the top recognized certifications are:\n\n${c.map((item, i) => `${i + 1}. ${item.title} (${item.issuingOrg}) - ${item.level}`).join('\n')}\n\nThese credentials link directly to your DigiLocker and verify your technical competency to hiring partners.`;
      suggestions = [
        'How do I link DigiLocker certificates?',
        'Take technical mock assessment',
        'Explore matching job roles',
      ];
    } else if (lower.includes('gap') || lower.includes('bridge') || lower.includes('skill')) {
      const topGap = matchResult.skillBreakdown.find((s) => s.status !== 'Mastered') || matchResult.skillBreakdown[0];
      aiReplyText = `Your highest priority focus area is ${topGap?.skill || 'core skills'} (Currently ${topGap?.currentPercentage || 50}%, Required: ${topGap?.requiredPercentage || 80}%).\n\nWhy required: ${topGap?.whyRequired || 'Core industry standard'}.\nRecommended Action: ${topGap?.recommendedCourse || 'Complete advanced training module'}.`;
      suggestions = [
        `View full Skill Gap Diagnostic matrix`,
        `Explore career opportunities for ${career.title}`,
        `Change my target role`,
      ];
    } else {
      aiReplyText = `Your profile currently matches ${matchResult.totalScore}% of requirements for ${career.title} in ${stream.name} (${matchResult.status}). Your verified credentials and practical project milestones position you well for placement drives.`;
      suggestions = [
        `What are the most frequent interview questions for ${career.title}?`,
        `Show recommended jobs in ${stream.code}`,
        `View my skill gap diagnostics`,
      ];
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: aiReplyText,
      timestamp: 'Just now',
      suggestions,
    };

    setMessages([...messages, userMsg, aiMsg]);
    setInputText('');
  };

  const handleReset = () => {
    const initialAiMsg: ChatMessage = {
      id: `m-reset-${Date.now()}`,
      sender: 'ai',
      text: `Hello ${learner.name}! How can I help you advance your career in ${stream.name} as a ${career.title} today?`,
      timestamp: 'Just now',
      suggestions: [
        `What are the most frequent interview questions for ${career.title}?`,
        `How do I bridge my skill gaps?`,
        `Suggest a capstone project`,
      ],
    };
    setMessages([initialAiMsg]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="AI Career Assistant & Interview Copilot"
        subtitle={`Conversational career navigation, mock technical interview preparation, and placement diagnostic advice for ${stream.name}`}
        breadcrumbs={[
          { label: 'Student Portal', href: '/learner/dashboard' },
          { label: 'AI Career Assistant' },
        ]}
      />

      {/* Chat Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden flex flex-col h-[640px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Bot className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>SkillBridge AI Copilot</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                  {stream.code} • {career.title}
                </span>
              </h3>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Knowledge Graph: NCVET Multi-Stream 2026
              </span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-xl p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-[#1D4ED8] text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {m.text}
              </div>

              {m.suggestions && (
                <div className="flex flex-wrap gap-1.5 pt-1 max-w-xl">
                  {m.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="px-2.5 py-1 text-[11px] rounded-full bg-blue-50 dark:bg-slate-800 text-[#1D4ED8] dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 transition-colors text-left cursor-pointer"
                    >
                      {s} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask about ${career.title} interview questions, skill gaps, or projects...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
