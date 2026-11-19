'use client';

import React from 'react';
import {
  FileText,
  CalendarCheck,
  UserCheck2,
  ShieldCheck,
  Send,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Understand Client Requirements',
    desc: 'We conduct an in-depth operational audit of your facility, shift schedules, skill expectations, and volume requirements.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Workforce Planning',
    desc: 'Designing shift rosters, buffer team provisions, statutory compliance roadmaps, and deployment timelines.',
    icon: CalendarCheck,
  },
  {
    step: '03',
    title: 'Candidate Selection',
    desc: 'Rigorous trade testing, practical machine trials, and aptitude screening from our active pool of 10,000+ candidates.',
    icon: UserCheck2,
  },
  {
    step: '04',
    title: 'Verification & Screening',
    desc: 'Government ID validation, police background authentication, medical fitness check, and statutory documentation.',
    icon: ShieldCheck,
  },
  {
    step: '05',
    title: 'Staff Deployment',
    desc: 'Onboarding in clean NexGen uniforms, site induction, safety gear issuance, and on-time arrival on the factory floor.',
    icon: Send,
  },
  {
    step: '06',
    title: 'Ongoing Workforce Support',
    desc: 'Dedicated on-site supervisors, daily biometric tracking, replacement guarantees, and transparent monthly compliance reports.',
    icon: Headphones,
  },
];

export function ProcessSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Our Workforce Process"
          title="From Requirement to Deployment in"
          highlight="6 Structured Steps"
          description="A disciplined, transparent recruitment and management methodology that guarantees reliable staffing and zero operational downtime."
        />

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-brand-light hover:bg-white border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-brand-orange text-brand-blue group-hover:text-white border border-slate-200 shadow-sm group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Step Number Badge */}
                    <span className="text-2xl sm:text-3xl font-black font-display text-slate-300 group-hover:text-brand-orange transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-brand-navy font-display group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Assured Milestone</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
