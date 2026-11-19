import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Package,
  Wrench,
  Truck,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/home/CtaBanner';
import { ServiceModel } from '@/models/Service';

export const metadata = {
  title: 'Workforce Services | NEXGEN WORKFORCE SERVICES - Gujarat, India',
  description:
    'Comprehensive manpower supply: Housekeeping Services, Store & Warehouse Staff, Technical Manpower, and Driver Services across Gujarat.',
};

export const dynamic = 'force-dynamic';

const iconMap: Record<string, any> = {
  Sparkles,
  Package,
  Wrench,
  Truck,
  Briefcase,
};

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    services = await ServiceModel.getAllActive();
  } catch (err) {
    console.error('Services fetch error:', err);
  }

  return (
    <div className="bg-brand-light">
      {/* Services Header */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>Industrial & Corporate Staffing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Specialized <span className="gradient-text-orange">Workforce Solutions</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Reliable, trained, and verified manpower deployed across manufacturing plants, warehousing depots, corporate parks, and infrastructure ventures across Gujarat.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright">Services</span>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Full Service Catalog"
            title="Comprehensive Staffing Across"
            highlight="Key Enterprise Roles"
            description="All workforce categories are supported with comprehensive statutory coverage, on-site supervision, uniform issuance, and replacement guarantees."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((svc, index) => {
              const Icon = iconMap[svc.icon_name] || Briefcase;
              const responsibilities = Array.isArray(svc.key_responsibilities)
                ? svc.key_responsibilities.slice(0, 4)
                : [];
              const benefits = Array.isArray(svc.benefits) ? svc.benefits.slice(0, 3) : [];

              return (
                <div
                  key={svc.slug || svc.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-60 w-full overflow-hidden bg-brand-navy">
                    <Image
                      src={
                        svc.image_url ||
                        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
                      }
                      alt={svc.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md text-brand-blue shadow-lg group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                        Service Category 0{index + 1}
                      </span>
                      <h3 className="text-2xl font-black font-display text-white mt-0.5">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-slate-300">{svc.subtitle}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {svc.short_description}
                      </p>

                      {/* Key Duties */}
                      {responsibilities.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2.5">
                            Key Operational Responsibilities:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {responsibilities.map((r: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                                <span>{r}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-light group-hover:bg-brand-blue text-brand-blue group-hover:text-white font-bold text-xs transition-colors"
                      >
                        <span>View Detailed Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/get-a-quote?category=${encodeURIComponent(svc.title)}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        <span>Request Staff</span>
                        <ArrowRight className="w-3 h-3" />
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
