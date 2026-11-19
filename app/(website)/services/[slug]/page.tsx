import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Package,
  Wrench,
  Truck,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { ServiceModel } from '@/models/Service';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const iconMap: Record<string, any> = {
  Sparkles,
  Package,
  Wrench,
  Truck,
  Briefcase,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await ServiceModel.findBySlug(params.slug);
  if (!service) {
    return { title: 'Service Not Found | NEXGEN WORKFORCE SERVICES' };
  }

  return {
    title: `${service.meta_title || service.title} | NEXGEN WORKFORCE SERVICES`,
    description:
      service.meta_description ||
      service.short_description ||
      'Professional manpower and staffing solutions in Gujarat by NexGen Workforce Services.',
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await ServiceModel.findBySlug(params.slug);

  if (!service) {
    notFound();
  }

  // Get related services (excluding current)
  const allServices = await ServiceModel.getAllActive();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  const Icon = iconMap[service.icon_name] || Briefcase;
  const responsibilities = Array.isArray(service.key_responsibilities)
    ? service.key_responsibilities
    : [];
  const benefits = Array.isArray(service.benefits) ? service.benefits : [];
  const industries = Array.isArray(service.industry_applications)
    ? service.industry_applications
    : [];

  return (
    <div className="bg-white">
      {/* Dynamic Service Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider border border-white/20">
              <Icon className="w-3.5 h-3.5 text-brand-orange" />
              <span>Specialized Workforce Category</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              {service.title}
            </h1>

            {service.subtitle && (
              <p className="text-lg sm:text-xl text-brand-bright font-medium">
                {service.subtitle}
              </p>
            )}

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal pt-2">
              {service.short_description}
            </p>

            <div className="pt-4 flex items-center gap-3 text-xs sm:text-sm font-semibold">
              <Link href="/" className="text-slate-300 hover:text-white">
                Home
              </Link>
              <span className="text-brand-orange">/</span>
              <Link href="/services" className="text-slate-300 hover:text-white">
                Services
              </Link>
              <span className="text-brand-orange">/</span>
              <span className="text-brand-bright">{service.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Content & Sidebar */}
      <section className="py-16 sm:py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Detailed Service Info (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Full Description & Banner Photo */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={
                      service.banner_url ||
                      service.image_url ||
                      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-brand-bright font-bold">
                        Vetted & Certified Personnel
                      </p>
                      <h4 className="text-lg font-bold">NexGen Deployment Standard</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                      Active Pool Ready
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black font-display text-brand-navy">
                    Service Overview & Scope
                  </h3>
                  <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {service.full_description || service.short_description}
                  </div>
                </div>
              </div>

              {/* Key Responsibilities */}
              {responsibilities.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand-navy">
                      Key Operational Responsibilities
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {responsibilities.map((r: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-brand-light border border-slate-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits for Enterprises */}
              {benefits.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand-navy">
                      Enterprise Benefits & SLA Guarantees
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {benefits.map((b: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industry Applications */}
              {industries.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand-navy">
                      Industry Applications
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {industries.map((ind: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-light text-brand-navy text-xs sm:text-sm font-semibold border border-slate-200"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-brand-navy">
                    Explore Other Workforce Verticals
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/services/${rel.slug}`}
                        className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-brand-blue flex flex-col justify-between group"
                      >
                        <div>
                          <p className="text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                            {rel.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {rel.short_description}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-brand-orange mt-3 flex items-center gap-1">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Inquiry & Fast Contact Box (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Inquiry Form Pre-filled with this Service */}
              <InquiryForm initialCategory={service.title} />

              {/* Fast Helpline Box */}
              <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-7 border border-brand-blue/30 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold">Need Urgent Deployment?</h4>
                    <p className="text-xs text-slate-300">Speak with Nakul Chavada directly</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Mobile:</span>
                    <a href="tel:+919727930894" className="font-bold text-white hover:text-brand-bright">
                      +91 9727930894
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Additional Mobile:</span>
                    <a href="tel:+919727930895" className="font-bold text-white hover:text-brand-bright">
                      +91 9727930895
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">WhatsApp Desk:</span>
                    <a
                      href="https://wa.me/919727930894"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
