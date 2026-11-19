'use client';

import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const fallbackServices = [
  {
    id: 1,
    slug: 'housekeeping',
    title: 'Housekeeping Services',
    subtitle: 'Professional Cleaning & Sanitation Personnel',
    short_description:
      'Professional housekeeping staff, cleaning and maintenance personnel, and facility support staff trained to maintain clean, hygienic and safe environments.',
    icon_name: 'Sparkles',
    image_url:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    key_responsibilities: [
      'Daily cleaning & sanitization',
      'Waste segregation & disposal',
      'Restroom & pantry hygiene',
      'Floor scrubbing & machine care',
    ],
  },
  {
    id: 2,
    slug: 'store-warehouse',
    title: 'Store & Warehouse Staff',
    subtitle: 'Storekeepers & Inventory Logistics Personnel',
    short_description:
      'Storekeepers, warehouse assistants, inventory management staff, and packing and loading personnel for efficient logistics workflows.',
    icon_name: 'Package',
    image_url:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    key_responsibilities: [
      'Storekeepers & assistants',
      'Warehouse inventory staff',
      'Packing & pallet loading personnel',
      'ERP/WMS stock inwarding',
    ],
  },
  {
    id: 3,
    slug: 'technical-manpower',
    title: 'Technical Manpower',
    subtitle: 'Certified Plant & Industrial Technicians',
    short_description:
      'Electricians, mechanical technicians, maintenance technicians, and industrial technical staff dedicated to sustaining maximum uptime.',
    icon_name: 'Wrench',
    image_url:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    key_responsibilities: [
      'Certified industrial electricians',
      'Mechanical technicians & fitters',
      'Routine & preventive maintenance',
      'LOTO safety protocol experts',
    ],
  },
  {
    id: 4,
    slug: 'driver-services',
    title: 'Driver Services',
    subtitle: 'Commercial Vehicle & Chauffeur Drivers',
    short_description:
      'Professional drivers, commercial vehicle drivers, and transportation support staff with valid commercial licenses and route familiarity.',
    icon_name: 'Truck',
    image_url:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    key_responsibilities: [
      'Commercial heavy vehicle drivers',
      'Executive corporate chauffeurs',
      'Staff shuttle & transit drivers',
      'Pre-trip safety & log tracking',
    ],
  },
];

const iconMap: Record<string, any> = {
  Sparkles,
  Package,
  Wrench,
  Truck,
  Briefcase,
};

export function ServicesSection() {
  const [services, setServices] = useState<any[]>(fallbackServices);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => console.log('Using fallback services:', err));
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Core Workforce Services"
          title="Engineered Workforce Solutions for"
          highlight="Maximum Productivity"
          description="Tailored staffing categories designed to meet stringent industry standards, increase throughput, and eliminate operational bottlenecks."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((svc) => {
            const IconComponent = iconMap[svc.icon_name] || Briefcase;
            const highlights = Array.isArray(svc.key_responsibilities)
              ? svc.key_responsibilities.slice(0, 4)
              : [
                  'Experienced & verified personnel',
                  'Strict safety compliance',
                  'Dedicated on-site supervision',
                  'Ready replacement guarantee',
                ];

            return (
              <div
                key={svc.slug || svc.id}
                className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image Container - clearly visible with vivid contrast */}
                <Link
                  href={`/services/${svc.slug}`}
                  prefetch={true}
                  className="relative h-44 sm:h-48 w-full overflow-hidden bg-brand-navy block"
                >
                  <Image
                    src={
                      svc.image_url ||
                      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300 brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Floating Icon Badge */}
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-brand-blue shadow-md group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Service Subtitle pill */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5">
                    <p className="text-white text-xs font-bold truncate">
                      {svc.subtitle || 'Specialized Workforce'}
                    </p>
                  </div>
                </Link>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Link href={`/services/${svc.slug}`} prefetch={true} className="block">
                      <h3 className="text-base sm:text-lg font-bold text-brand-navy font-display group-hover:text-brand-blue transition-colors">
                        {svc.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {svc.short_description}
                    </p>

                    {/* Key Bullets */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      {highlights.map((bullet: string, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          <span className="truncate">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore Button */}
                  <div className="pt-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      prefetch={true}
                      className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-brand-light group-hover:bg-brand-blue text-brand-blue group-hover:text-white font-bold text-xs transition-all duration-300"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link to Full Catalog */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-brand-navy font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105"
          >
            <span>View All Detailed Workforce Services & Rates</span>
            <ArrowRight className="w-4 h-4 text-brand-orange" />
          </Link>
        </div>
      </div>
    </section>
  );
}
