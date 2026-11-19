'use client';

import React, { useEffect, useState } from 'react';
import { Users, Factory, Briefcase, Smile } from 'lucide-react';
import { StatisticItem } from '@/models/Settings';

const fallbackStats: StatisticItem[] = [
  {
    id: 1,
    stat_key: 'workforce_deployed',
    label: 'Workforce Deployed',
    value: '5,000+',
    numeric_value: 5000,
    suffix: '+',
    icon_name: 'Users',
    display_order: 1,
  },
  {
    id: 2,
    stat_key: 'industries_served',
    label: 'Industries Served',
    value: '12+',
    numeric_value: 12,
    suffix: '+',
    icon_name: 'Factory',
    display_order: 2,
  },
  {
    id: 3,
    stat_key: 'skilled_professionals',
    label: 'Skilled Professionals',
    value: '3,500+',
    numeric_value: 3500,
    suffix: '+',
    icon_name: 'Briefcase',
    display_order: 3,
  },
  {
    id: 4,
    stat_key: 'happy_clients',
    label: 'Happy Corporate Clients',
    value: '150+',
    numeric_value: 150,
    suffix: '+',
    icon_name: 'Smile',
    display_order: 4,
  },
];

const iconMap: Record<string, any> = {
  Users,
  Factory,
  Briefcase,
  Smile,
};

export function StatsSection() {
  const [stats, setStats] = useState<StatisticItem[]>(fallbackStats);

  useEffect(() => {
    fetch('/api/statistics')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStats(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-nexgen-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => {
            const Icon = iconMap[item.icon_name] || Users;
            return (
              <div
                key={item.id || item.stat_key}
                className="glass-card-dark p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/15 text-center group hover:scale-[1.03] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-2.5 text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white mb-1">
                  {item.value}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-200">
                  {item.label}
                </p>

                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Verified Standard
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
