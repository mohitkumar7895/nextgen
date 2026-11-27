'use client';

import React from 'react';
import { Users, Factory, Briefcase, Smile } from 'lucide-react';

interface StatItem {
  id: number;
  value: string;
  label: string;
  sublabel: string;
  icon: any;
}

const stats: StatItem[] = [
  {
    id: 1,
    value: '5,000+',
    label: 'Workforce Deployed',
    sublabel: 'Verified Standard',
    icon: Users,
  },
  {
    id: 2,
    value: '8+',
    label: 'Industries Served',
    sublabel: 'Verified Standard',
    icon: Factory,
  },
  {
    id: 3,
    value: '1,200+',
    label: 'Skilled Professionals',
    sublabel: 'Verified Standard',
    icon: Briefcase,
  },
  {
    id: 4,
    value: '150+',
    label: 'Happy Corporate Clients',
    sublabel: 'Verified Standard',
    icon: Smile,
  },
];

export function StatsSection() {
  return (
    <section className="py-8 sm:py-12 bg-nexgen-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
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
                  {item.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
