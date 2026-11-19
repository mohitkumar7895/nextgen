import React from 'react';
import Link from 'next/link';
import { QuickContactSection } from '@/components/home/QuickContactSection';

export const metadata = {
  title: 'Contact Us | NEXGEN WORKFORCE SERVICES - Bavla, Ahmedabad',
  description:
    'Contact NexGen Workforce Services: Ratna Sagar, Bavla, Ahmedabad, Gujarat – 382220. Primary Mobile: 9727930894, Additional: 9727930895.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Contact Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>Connect With Our Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Contact <span className="gradient-text-orange">NexGen Workforce</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Our workforce consultants and leadership are based at our registered Bavla office. Reach out for prompt quotes, site audits, and customized staffing agreements.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <QuickContactSection />
    </div>
  );
}
