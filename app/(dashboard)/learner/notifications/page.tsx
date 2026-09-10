'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

interface NotificationItem {
  id: string;
  category: 'Scheme' | 'Batch' | 'Assessment' | 'Opportunity' | 'System';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    category: 'Assessment',
    title: 'Assessment Hall Ticket Available',
    message: 'Your practical assessment for PMKVY Web Development is scheduled on 18 Sep 2026. Review rules and instructions.',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/learner/assessments',
  },
  {
    id: 'n-2',
    category: 'Opportunity',
    title: 'New NAPS Apprenticeship Match',
    message: 'Infosys BPM published 15 Apprentice Web Associate openings matching your NSQF Level 5 profile.',
    timestamp: 'Yesterday',
    isRead: false,
    actionUrl: '/learner/opportunities',
  },
  {
    id: 'n-3',
    category: 'Batch',
    title: 'Biometric Attendance Synchronized',
    message: 'Daily classroom punch log for 09 Sep 2026 recorded at NSTI Ramanthapur. Attendance: Present (4.5 hrs).',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/learner/progress',
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
  const [selectedFilter, setSelectedFilter] = useState('All');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const filtered = selectedFilter === 'All'
    ? notifications
    : notifications.filter((n) => n.category === selectedFilter);

  return (
    <div>
      <PageHeader
        title="Notifications & Alerts"
        subtitle="Official platform announcements, assessment schedules, batch reminders, and DBT updates"
        breadcrumbs={[
          { label: 'Portal', href: '/learner/dashboard' },
          { label: 'Notifications' },
        ]}
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllAsRead}
              className="px-3.5 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Mark all as read ({unreadCount})
            </button>
          ) : undefined
        }
      />

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['All', 'Assessment', 'Opportunity', 'Batch', 'Scheme'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              selectedFilter === cat
                ? 'bg-[#0B3B60] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No Notifications in this category"
          description="You're all caught up! Updates regarding your batches, assessments, and schemes will show up here."
        />
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 shadow-sm">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                !item.isRead ? 'bg-blue-50/30' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex gap-3.5 items-start">
                <span className="text-xl shrink-0 mt-0.5">
                  {item.category === 'Assessment' && '📝'}
                  {item.category === 'Opportunity' && '💼'}
                  {item.category === 'Batch' && '🏫'}
                  {item.category === 'Scheme' && '🏛️'}
                  {item.category === 'System' && '⚙️'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-slate-400 text-[11px]">{item.timestamp}</span>
                    {item.actionUrl && (
                      <a
                        href={item.actionUrl}
                        className="text-[#0B3B60] font-semibold hover:underline"
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleRead(item.id)}
                className="text-[11px] text-slate-500 hover:text-slate-800 shrink-0 px-2 py-1 rounded border border-slate-200"
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
