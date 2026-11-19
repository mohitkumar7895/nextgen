'use client';

import React from 'react';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  UserCheck,
  Zap,
  Sliders,
  Smile,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const whyChooseItems = [
  {
    title: 'Skilled Manpower',
    desc: 'Candidates with verified technical credentials, proven field track records, and operational discipline.',
    icon: Users,
    color: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'Trained Staff',
    desc: 'Ongoing industry-specific training covering machine handling, chemical safety, and corporate etiquette.',
    icon: GraduationCap,
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Reliable Service',
    desc: 'Consistent day and night shift attendance with robust backup pools to ensure zero workflow downtime.',
    icon: ShieldCheck,
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Professional Workforce',
    desc: 'Uniformed, groomed, and background-checked employees aligned with your corporate brand reputation.',
    icon: Briefcase,
    color: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Quality Recruitment',
    desc: 'Rigorous multi-stage screening, skill assessment, and document authentication before onboarding.',
    icon: UserCheck,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Timely Deployment',
    desc: 'Rapid 24-to-48-hour staff mobilization across Ahmedabad, Bavla, Sanand, and all Gujarat industrial parks.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Workforce Management',
    desc: 'End-to-end management of biometric attendance, payroll, ESIC, PF, and statutory labor compliance.',
    icon: Sliders,
    color: 'from-purple-600 to-blue-600',
  },
  {
    title: 'Customer Satisfaction',
    desc: 'Dedicated site supervisors and account managers providing continuous feedback loops and proactive SLAs.',
    icon: Smile,
    color: 'from-rose-500 to-orange-500',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Why Choose NexGen?"
          title="The Industry Benchmark for"
          highlight="Workforce Excellence"
          description="We do not just provide labor; we build reliable workforce infrastructure that drives sustained industrial and corporate growth."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyChooseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-4 sm:p-5 rounded-2xl bg-brand-light hover:bg-white border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${item.color} p-[2px] mb-3.5 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-brand-navy group-hover:bg-transparent group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-brand-navy font-display group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-slate-400 group-hover:text-brand-orange transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider">NexGen Standard</span>
                  <span className="text-xs font-mono font-bold">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
