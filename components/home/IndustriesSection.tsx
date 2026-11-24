'use client';

import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const fallbackIndustries = [
  {
    id: 1,
    slug: 'manufacturing',
    name: 'Automobile & Industrial Manufacturing',
    description: 'Assembly line operators, robotic welding technicians, component fabricators, and quality inspectors for automotive & heavy plants.',
    icon_name: 'Factory',
    image_url: '/images/industries/automobile.jpg',
    workforce_types: ['Assembly Line Staff', 'Robotic Welders', 'Quality Inspectors'],
  },
  {
    id: 2,
    slug: 'construction',
    name: 'Construction & Real Estate',
    description: 'Masons, helpers, carpenters, and civil infrastructure personnel for project sites.',
    icon_name: 'HardHat',
    image_url: '/images/industries/construction.jpg',
    workforce_types: ['Site Helpers', 'Masons', 'Bar Benders'],
  },
  {
    id: 3,
    slug: 'warehousing-logistics',
    name: 'Warehousing & Logistics',
    description: 'Storekeepers, pickers, packers, and loading staff for high-speed 3PL depots.',
    icon_name: 'Boxes',
    image_url: '/images/industries/warehousing.jpg',
    workforce_types: ['Storekeepers', 'Pickers & Packers', 'Loading Crews'],
  },
  {
    id: 4,
    slug: 'corporate-offices',
    name: 'Corporate Offices & IT Hubs',
    description: 'Polished housekeeping, pantry executives, office assistants, and facility support.',
    icon_name: 'Building2',
    image_url: '/images/industries/corporate-offices.jpg',
    workforce_types: ['Corporate Cleaners', 'Pantry Staff', 'Office Helpers'],
  },
  {
    id: 5,
    slug: 'commercial-facilities',
    name: 'Commercial Facilities & Malls',
    description: 'Sanitization crews, security helpers, and floor attendants for public venues.',
    icon_name: 'Store',
    image_url: '/images/industries/commercial-facilities.jpg',
    workforce_types: ['Floor Attendants', 'Sanitization Crew', 'Valet Drivers'],
  },
  {
    id: 6,
    slug: 'industrial-plants',
    name: 'Industrial Plants & Refineries',
    description: 'Maintenance fitters, industrial electricians, boiler helpers, and EHS staff.',
    icon_name: 'Cpu',
    image_url: '/images/industries/industrial-plants.jpg',
    workforce_types: ['Electricians', 'Mechanical Fitters', 'Safety Monitors'],
  },
  {
    id: 7,
    slug: 'infrastructure',
    name: 'Infrastructure & Highways',
    description: 'Heavy equipment drivers, road construction crews, and transportation operators.',
    icon_name: 'Waypoints',
    image_url: '/images/industries/infrastructure.jpg',
    workforce_types: ['Heavy Drivers', 'Plant Helpers', 'Survey Helpers'],
  },
  {
    id: 8,
    slug: 'facility-management',
    name: 'Facility Management Services',
    description: 'Multi-skilled technical and sanitization teams for townships and institutions.',
    icon_name: 'ShieldCheck',
    image_url: '/images/industries/facility-management.jpg',
    workforce_types: ['Facility Crew', 'Maintenance Techs', 'Ground Staff'],
  },
];

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

export function IndustriesSection() {
  const [industries, setIndustries] = useState<any[]>(fallbackIndustries);

  useEffect(() => {
    fetch('/api/industries')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIndustries(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sectors & Verticals"
          title="Industries We Empower with"
          highlight="Proven Staffing"
          description="From heavy manufacturing corridors to state-of-the-art logistics depots, we deploy industry-tailored manpower ready to deliver from Day 1."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {industries.map((ind) => {
            const Icon = iconMap[ind.icon_name] || Factory;
            const roles = Array.isArray(ind.workforce_types)
              ? ind.workforce_types.slice(0, 3)
              : ['Skilled Labor', 'Helpers', 'Supervisors'];

            return (
              <div
                key={ind.id || ind.slug}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 bg-white border border-slate-200/80 flex flex-col justify-between"
              >
                {/* Background Image Header - clearly visible */}
                <Link
                  href="/industries"
                  prefetch={true}
                  className="relative h-40 sm:h-44 w-full overflow-hidden bg-brand-navy block"
                >
                  <Image
                    src={
                      ind.image_url ||
                      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={ind.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300 brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/95 backdrop-blur-md text-brand-blue shadow-md group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-2.5 left-3.5 right-3.5">
                    <h3 className="text-white font-bold text-sm sm:text-base font-display line-clamp-1">
                      {ind.name}
                    </h3>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ind.description}
                  </p>

                  {/* Supplied Roles Badges */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Supplied Roles:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {roles.map((r: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-brand-light text-brand-navy text-[10px] sm:text-[11px] font-medium border border-slate-200"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1.5">
                    <Link
                      href="/industries"
                      prefetch={true}
                      className="w-full flex items-center justify-between text-xs font-bold text-brand-blue hover:text-brand-navy group/btn"
                    >
                      <span>Explore Workforce Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Industries */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Explore All Industrial Workforce Solutions</span>
            <ArrowRight className="w-4 h-4 text-brand-orange" />
          </Link>
        </div>
      </div>
    </section>
  );
}
