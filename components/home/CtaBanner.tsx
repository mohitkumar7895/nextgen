'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function CtaBanner() {
  const { settings, whatsappUrl } = useSite();

  const heading = settings.cta_heading || 'Need Reliable Manpower for Your Business?';
  const desc =
    settings.cta_description ||
    'Let NexGen Workforce Services help you find the right workforce for your business requirements. Fast deployment, verified talent, and complete statutory peace of mind.';
  const phonePrimary = settings.contact_phone_primary || '9727930894';

  return (
    <section className="py-8 sm:py-12 bg-brand-light relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-nexgen-hero p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-white/20">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-bright text-[11px] font-bold uppercase tracking-wider border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
              Empowering Indian Enterprises
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white leading-tight">
              {heading}
            </h2>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal">
              {desc}
            </p>

            {/* Three Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/get-a-quote"
                prefetch={true}
                className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-gradient-to-r from-brand-orange to-brand-yellow px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-orange-glow hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <a
                href={`tel:+91${phonePrimary.replace(/[^0-9]/g, '')}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-sm transition-all duration-300 backdrop-blur-md"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Now (+91 {phonePrimary})</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-emerald-600/30"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
