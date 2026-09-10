'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  FileCheck2,
  Briefcase,
  Calendar,
  Landmark,
  CheckCheck,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'Assessment' | 'Opportunity' | 'Attendance' | 'Scheme';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    category: 'Assessment',
    title: 'Proctored Skill Benchmark Ready',
    message: 'Your practical assessment for Web & Application Development (NSQF Level 5) is open for proctoring.',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/learner/assessments/asm-101',
    actionLabel: 'Take Assessment',
  },
  {
    id: 'n-2',
    category: 'Opportunity',
    title: 'New NAPS Apprenticeship Match',
    message: 'Infosys BPM published 15 Apprentice Web Associate openings matching your verified NSQF Level 5 profile.',
    timestamp: 'Yesterday',
    isRead: false,
    actionUrl: '/learner/skills',
    actionLabel: 'View Matching Roles',
  },
  {
    id: 'n-3',
    category: 'Attendance',
    title: 'Biometric Attendance Synchronized',
    message: 'Daily classroom biometric punch log recorded at NSTI Ramanthapur. Session attendance: 4.5 hours.',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/learner/dashboard',
    actionLabel: 'View Dashboard',
  },
  {
    id: 'n-4',
    category: 'Scheme',
    title: 'PMKVY 4.0 Direct Benefit Transfer (DBT)',
    message: 'Training support stipend tranche of ₹1,500 has been verified and queued for Aadhaar-linked bank transfer.',
    timestamp: '4 days ago',
    isRead: true,
  },
];

export default function LearnerNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const filtered = selectedCategory === 'All'
    ? notifications
    : notifications.filter((n) => n.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Assessment':
        return <FileCheck2 className="w-4 h-4 text-blue-700" />;
      case 'Opportunity':
        return <Briefcase className="w-4 h-4 text-purple-700" />;
      case 'Attendance':
        return <Calendar className="w-4 h-4 text-emerald-700" />;
      case 'Scheme':
        return <Landmark className="w-4 h-4 text-amber-700" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Notifications & Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Platform announcements, assessment schedules, and Direct Benefit Transfer (DBT) records.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-center"
          >
            <CheckCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Mark all as read ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex border-b border-slate-200 gap-4 overflow-x-auto pb-px">
        {['All', 'Assessment', 'Opportunity', 'Attendance', 'Scheme'].map((cat) => {
          const count = cat === 'All'
            ? notifications.length
            : notifications.filter((n) => n.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. CLEAN SIMPLE LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-800">No notifications in this category</p>
          <p className="text-xs text-slate-500">You are completely up to date.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors ${
                !item.isRead ? 'bg-blue-50/20' : 'hover:bg-slate-50/50'
              }`}
            >
              <div className="flex gap-3.5 items-start">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    {!item.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-700 inline-block" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {item.message}
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>

                    {item.actionUrl && (
                      <Link
                        href={item.actionUrl}
                        className="text-blue-700 font-semibold hover:underline flex items-center gap-0.5 text-[11px]"
                      >
                        <span>{item.actionLabel || 'View Details'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleRead(item.id)}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 shrink-0 px-2 py-1 rounded border border-slate-200 self-end sm:self-start"
              >
                {item.isRead ? 'Mark unread' : 'Mark read'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
