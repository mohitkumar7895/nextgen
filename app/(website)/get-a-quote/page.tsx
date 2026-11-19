import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Phone,
  MessageCircle,
  FileCheck2,
} from 'lucide-react';
import { InquiryForm } from '@/components/forms/InquiryForm';

export const metadata = {
  title: 'Get a Workforce Quote | NEXGEN WORKFORCE SERVICES - Gujarat',
  description:
    'Request a custom staffing proposal for skilled technicians, warehouse staff, housekeeping, or commercial drivers for your business.',
};

export default function GetAQuotePage({
  searchParams,
}: {
  searchParams?: { category?: string; industry?: string };
}) {
  const initialCategory = searchParams?.category || 'Housekeeping Services';

  return (
    <div className="bg-brand-light">
      {/* Quote Banner */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>Fast Turnaround Staffing Proposals</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Request a <span className="gradient-text-orange">Workforce Quote</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Tell us about your headcount requirements, facility location, and shifts. Receive transparent rate cards with 100% statutory compliance within 2 hours.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright">Get a Quote</span>
          </div>
        </div>
      </section>

      {/* Main Quote Content & Form Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7">
              <InquiryForm initialCategory={initialCategory} />
            </div>

            {/* Right Column: Why Partner With NexGen Benefits & Guarantees (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <h3 className="text-xl font-bold font-display text-brand-navy">
                  What Happens After You Submit?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Operational Needs Review</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Our staffing team analyzes shift hours, machinery/tools needed, and skill levels.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Customized Rate Card</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        You receive a transparent pricing proposal including wages, PF, ESIC, and supervision.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Swift Deployment (24-48h)</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Vetted personnel arrive in full uniform with safety gear and dedicated supervisor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero Recruitment Fees for Clients</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Replacement Guarantee on Scheduled Leaves</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>GST Registered: 24CEOPC1058Q1Z6</span>
                  </div>
                </div>
              </div>

              {/* Direct Call Box */}
              <div className="bg-nexgen-gradient rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-3">
                <h4 className="text-base font-bold">Prefer Direct Consultation?</h4>
                <p className="text-xs text-slate-200">
                  Call Nakul Chavada or our senior staffing coordinator right now:
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="tel:+919727930894"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-bold text-sm"
                  >
                    <span>+91 9727930894 (Primary)</span>
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </a>
                  <a
                    href="tel:+919727930895"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-bold text-sm"
                  >
                    <span>+91 9727930895 (Support)</span>
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
