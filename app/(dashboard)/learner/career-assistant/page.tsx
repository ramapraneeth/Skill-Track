'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'ai',
    text: 'Hello Arjun! I am your SkillBridge AI Career Copilot. I have analyzed your profile, verified competencies in React and TypeScript, and identified your goal to become a Full Stack Web Developer. How would you like to prepare today?',
    timestamp: 'Just now',
    suggestions: [
      'What are the most frequent interview questions for TCS Web Developer?',
      'How do I bridge my SQL normalization gap in 2 weeks?',
      'Check my resume readiness score for campus drives',
    ],
  },
];

export default function StudentCareerAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

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

    if (text.toLowerCase().includes('interview')) {
      aiReplyText =
        'For TCS Associate Web Developer, top interview questions focus on: 1) React component re-rendering & Virtual DOM diffing. 2) SQL 3NF Normalization vs Denormalization tradeoffs. 3) REST status codes (200 vs 201 vs 204). Would you like to attempt a 3-question quick mock drill?';
      suggestions = ['Start 3-question mock drill', 'Show model answers for React Hooks', 'Explain ACID properties in SQL'];
    } else if (text.toLowerCase().includes('sql') || text.toLowerCase().includes('gap')) {
      aiReplyText =
        'Your current SQL proficiency is at 62%, while Tier-1 hiring benchmarks demand 85%. I recommend: 1) Complete Module 4 in your enrolled Full Stack course. 2) Solve the 5 practice JOIN queries in your Resource Library. 3) Retake the benchmark assessment on 15 Sep.';
      suggestions = ['Open Module 4 syllabus', 'Take SQL diagnostic quiz', 'Show schema normalization cheatsheet'];
    } else {
      aiReplyText =
        'Your profile has an 84% overall placement readiness score! You have 2 verified NSQF credentials in DigiLocker and 92.4% AEBAS physical attendance. Completing one backend capstone project will elevate your profile to 95% readiness.';
      suggestions = ['Suggest a backend capstone project', 'Show matching NAPS internships', 'View salary benchmark report'];
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

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="AI Career Assistant & Interview Copilot"
        subtitle="Conversational career navigation, mock technical interview preparation, and placement diagnostic advice"
        breadcrumbs={[
          { label: 'Student Portal', href: '/learner/dashboard' },
          { label: 'AI Career Assistant' },
        ]}
      />

      {/* Chat Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              🤖
            </span>
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                SkillBridge AI Placement Copilot
              </h3>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Knowledge Graph: NCVET & Industry 2026
              </span>
            </div>
          </div>
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Reset Conversation
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
                className={`max-w-xl p-3.5 rounded-xl text-xs leading-relaxed ${
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
                      className="px-2.5 py-1 text-[11px] rounded-full bg-blue-50 dark:bg-slate-800 text-[#1D4ED8] dark:text-blue-300 hover:bg-blue-100 border border-blue-200 dark:border-slate-700 transition-colors text-left"
                    >
                      {s} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="Ask anything about your skill gap, mock interview questions, or job applications..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white font-semibold text-xs transition-colors shrink-0 shadow-2xs"
          >
            Send Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
