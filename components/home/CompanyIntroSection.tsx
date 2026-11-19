'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Building,
  Award,
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function CompanyIntroSection() {
  const { settings } = useSite();

  const heading = settings.company_intro_heading || 'Your Trusted Workforce Partner';
  const text =
    settings.company_intro_text ||
    'NexGen Workforce Services provides reliable, skilled and trained manpower solutions to businesses across multiple industries. We focus on delivering professional workforce support, dependable staffing services and quality manpower management.';
  const highlight =
    settings.company_intro_highlight ||
    'Headquartered in Bavla, Ahmedabad, we bridge industrial enterprises with vetted, disciplined and performance-driven manpower tailored to exact operational workflows.';

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Image Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame - clearly visible */}
              <div className="relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                  alt="NexGen Workforce Operations in Gujarat"
                  fill
                  className="object-cover object-center brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">
                    Gujarat Industrial Corridor
                  </p>
                  <p className="text-base font-bold">Bavla • Ahmedabad • Sanand • Changodar</p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-brand-navy leading-none">100%</h4>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Reliable & Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>About NexGen Workforce Services</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-brand-navy tracking-tight leading-[1.18]">
              {heading}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {text}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-l-4 border-brand-orange pl-3.5 italic bg-brand-light/60 py-2 rounded-r-xl">
              &quot;{highlight}&quot;
            </p>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-brand-light border border-slate-200/80">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <h4 className="font-bold text-xs sm:text-sm text-brand-navy">Vetted & Trained</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every employee undergoes multi-tier identity checks, police clearance, and trade assessment.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-light border border-slate-200/80">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-brand-orange" />
                  <h4 className="font-bold text-xs sm:text-sm text-brand-navy">Statutory Peace of Mind</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full adherence to Gujarat Labor Laws, PF, ESIC, minimum wage acts, and safety compliances.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs transition-all shadow-md shadow-brand-blue/20"
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy font-bold text-xs transition-colors"
              >
                <span>Request Staffing Proposal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
