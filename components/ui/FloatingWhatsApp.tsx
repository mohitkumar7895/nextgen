'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, X, ArrowRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function FloatingWhatsApp() {
  const { settings, whatsappUrl } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const phonePrimary = settings.contact_phone_primary || '9727930894';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  NX
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white ring-1 ring-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-navy">NexGen Helpdesk</h4>
                <p className="text-[11px] text-emerald-600 font-medium">Online • Instant Response</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 leading-relaxed mb-3 border border-slate-100">
            👋 Welcome to <strong className="text-brand-navy">NexGen Workforce Services</strong>!
            How many skilled or general staff members does your enterprise require today?
          </div>

          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chat on WhatsApp
            </a>

            <a
              href={`tel:+91${phonePrimary.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue font-semibold text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now (+91 {phonePrimary})
            </a>
          </div>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="flex items-center gap-2.5">
        {/* Tooltip on First Visit */}
        {showTooltip && !isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-brand-navy text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-slate-200 animate-in fade-in slide-in-from-right-3">
            <span>Need manpower? Chat with us!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* WhatsApp Icon Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative group p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Open WhatsApp Chat"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-orange border-2 border-white flex items-center justify-center text-[9px] font-bold text-white animate-pulse">
            1
          </span>
          <MessageCircle className="w-7 h-7 fill-white" />
        </button>
      </div>
    </div>
  );
}
