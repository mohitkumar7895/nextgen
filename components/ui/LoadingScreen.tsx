'use client';

import React from 'react';
import Image from 'next/image';

export function LoadingScreen({ message = 'Loading NexGen Workforce...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-navy/95 backdrop-blur-xl text-white">
      <div className="relative flex flex-col items-center">
        {/* Glowing ring */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-orange via-brand-bright to-brand-blue p-[2px] animate-spin">
          <div className="w-full h-full bg-brand-navy rounded-3xl flex items-center justify-center">
            {/* Inner spacer */}
          </div>
        </div>

        {/* Center Logo Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center">
          <Image
            src="/logo/logologo.jpeg"
            alt="NexGen Workforce Services"
            width={52}
            height={52}
            className="animate-pulse object-contain rounded-md"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold tracking-wider font-display text-white">
          NEX<span className="text-brand-orange">GEN</span>
        </h3>
        <p className="text-xs font-semibold text-brand-bright tracking-widest uppercase mt-1">
          WORKFORCE SERVICES
        </p>
        <p className="text-xs text-slate-300 mt-3 font-medium flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
          {message}
        </p>
      </div>
    </div>
  );
}
