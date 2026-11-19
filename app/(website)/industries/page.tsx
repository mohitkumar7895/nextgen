import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Factory,
  HardHat,
  Boxes,
  Building2,
  Store,
  Cpu,
  Waypoints,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/home/CtaBanner';
import { SettingsModel } from '@/models/Settings';

export const metadata = {
  title: 'Industries We Serve | NEXGEN WORKFORCE SERVICES - Gujarat, India',
  description:
    'Dedicated manpower supply for manufacturing, construction, warehousing & logistics, corporate offices, industrial plants, and infrastructure projects across Gujarat.',
};

export const dynamic = 'force-dynamic';

const iconMap: Record<string, any> = {
  Factory,
  HardHat,
  Boxes,
  Building2,
  Store,
  Cpu,
  Waypoints,
  ShieldCheck,
};

export default async function IndustriesPage() {
  let industries: any[] = [];
  try {
    industries = await SettingsModel.getIndustries(true);
  } catch (err) {
    console.error('Industries fetch error:', err);
  }

  return (
    <div className="bg-brand-light">
      {/* Industries Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>Industrial & Commercial Sectors</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Industries <span className="gradient-text-orange">We Empower</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Delivering precision manpower tailored to the operational demands, safety protocols, and statutory regulations of each distinct industry sector.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright">Industries</span>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tailored Workforce Verticals"
            title="Supplying Skilled Personnel Across"
            highlight="Gujarat's Industrial Corridors"
            description="Our specialized manpower recruitment and deployment programs are calibrated for each industry's workflow requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, index) => {
              const Icon = iconMap[ind.icon_name] || Factory;
              const roles = Array.isArray(ind.workforce_types)
                ? ind.workforce_types
                : ['Skilled Labor', 'Line Helpers', 'Supervisors'];

              return (
                <div
                  key={ind.id || ind.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-brand-navy">
                    <Image
                      src={
                        ind.image_url ||
                        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={ind.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md text-brand-blue shadow-lg group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                        Sector 0{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold font-display text-white mt-0.5">
                        {ind.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {ind.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                          Specialized Roles Supplied:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {roles.map((r: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-xl bg-brand-light text-brand-navy text-xs font-semibold border border-slate-200"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/get-a-quote?industry=${encodeURIComponent(ind.name)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        <span>Request Staff for this Sector</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBanner />
    </div>
  );
}
