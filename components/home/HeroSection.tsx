'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Wrench,
  Package,
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

interface BannerSlide {
  id: number;
  slideTag: string;
  badge: string;
  badgeIcon: any;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix?: string;
  subheading: string;
  features: string[];
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  bgImage: string;
}

export function HeroSection() {
  const { settings } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const banners: BannerSlide[] = [
    {
      id: 1,
      slideTag: '01 • Automobile & Industrial Staffing',
      badge: 'Gujarat’s Premier Automotive & Plant Workforce Partner • Sanand • Bavla',
      badgeIcon: ShieldCheck,
      headlinePrefix: 'Empowering Gujarat’s',
      headlineHighlight: 'Automotive & Plant',
      headlineSuffix: 'Manufacturing Workforces.',
      subheading:
        settings.hero_subheading ||
        'Your Premier Partner for Automobile Assembly Lines, Industrial Machinery Plants, Technical Staffing, and Quality Workforce Solutions across Gujarat.',
      features: [
        'Automobile Assembly Specialists',
        '100% PF & ESIC Statutory Compliance',
        'Rapid 24–48 Hr Plant Deployment',
      ],
      primaryBtnText: settings.hero_cta_primary_text || 'Get Workforce Solutions',
      primaryBtnLink: settings.hero_cta_primary_link || '/get-a-quote',
      secondaryBtnText: settings.hero_cta_secondary_text || 'Contact Our Team',
      secondaryBtnLink: settings.hero_cta_secondary_link || '/contact',
      // Real Automotive Commercial Vehicle Assembly Plant Photo (User Verified)
      bgImage: '/images/hero/automobile-assembly-line.jpg',
    },
    {
      id: 2,
      slideTag: '02 • Technical & Engineering Staff',
      badge: 'Certified Plant Specialists & Industrial Technicians',
      badgeIcon: Wrench,
      headlinePrefix: 'Certified',
      headlineHighlight: 'Technical Manpower',
      headlineSuffix: 'for Zero Factory Downtime.',
      subheading:
        'Experienced industrial electricians, mechanical fitters, machine operators, and maintenance technicians ready for immediate deployment in factories and GIDC estates.',
      features: [
        'Certified Industrial Electricians',
        'Mechanical & Breakdown Maintenance',
        'LOTO & Factory Safety Protocol Experts',
      ],
      primaryBtnText: 'Explore Technical Manpower',
      primaryBtnLink: '/services/technical-manpower',
      secondaryBtnText: 'Hire Plant Technicians',
      secondaryBtnLink: '/get-a-quote?category=Technical+Manpower',
      // High-Tech Industrial Robotics & Precision Assembly
      bgImage: '/images/hero/automobile-robotics.jpg',
    },
    {
      id: 3,
      slideTag: '03 • Warehouse & Logistics',
      badge: 'Warehousing, Logistics & Facility Staffing',
      badgeIcon: Package,
      headlinePrefix: 'Scalable Staffing for',
      headlineHighlight: 'Warehouses, Stores',
      headlineSuffix: '& Commercial Facilities.',
      subheading:
        'Dependable storekeepers, inventory assistants, packing crews, commercial heavy drivers, and professional housekeeping teams for smooth supply chain execution.',
      features: [
        'Storekeepers & WMS Assistants',
        'Commercial Drivers with Clean Records',
        'Hospital-Grade Corporate Housekeeping',
      ],
      primaryBtnText: 'Explore Warehouse Staff',
      primaryBtnLink: '/services/store-warehouse',
      secondaryBtnText: 'Request Headcount Quote',
      secondaryBtnLink: '/get-a-quote?category=Store+%26+Warehouse+Staff',
      // Modern High-Capacity Manufacturing Facility
      bgImage: '/images/hero/automobile-plant-1.jpg',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Guaranteed automatic slide transition every 4.5 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, currentSlide]);

  const handleManualSlide = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] overflow-hidden bg-brand-navy">
      {/* 3 Complete Banners - Each Banner has its own background + content unified inside */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px]">
        {banners.map((banner, index) => {
          const isActive = index === currentSlide;
          const BadgeIcon = banner.badgeIcon;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-8 z-0 pointer-events-none'
                  : 'opacity-0 translate-x-8 z-0 pointer-events-none'
              }`}
            >
              {/* Full-bleed Clean Photography Background - Natural colors, no artificial colored tint */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={banner.bgImage}
                  alt={banner.badge}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center brightness-[0.92] contrast-[1.02]"
                />

                {/* Clean, neutral readability gradient - strictly behind text on the left, leaving the photo clear and natural */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent lg:w-3/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent h-40 bottom-0 top-auto" />
              </div>

              {/* Integrated Banner Content - Part of the banner itself */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] py-12 sm:py-16">
                <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-5">
                  {/* Banner Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/90 border border-brand-bright/40 text-xs sm:text-sm font-bold text-white shadow-lg backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                    <BadgeIcon className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span className="text-brand-bright tracking-wide text-[11px] sm:text-xs">
                      {banner.badge}
                    </span>
                  </div>

                  {/* Main Banner Headline - Using Regal Cinzel Display Serif with Platinum & Gold Sheen */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-[1.18] drop-shadow-md uppercase">
                    <span className="gradient-text-platinum block sm:inline">
                      {banner.headlinePrefix}{' '}
                    </span>
                    <span className="gradient-text-gold inline-block">
                      {banner.headlineHighlight}
                    </span>{' '}
                    {banner.headlineSuffix && (
                      <span className="text-white block sm:inline">
                        {banner.headlineSuffix}
                      </span>
                    )}
                  </h1>

                  {/* Banner Subheading */}
                  <p className="text-xs sm:text-base lg:text-lg text-slate-100 font-normal leading-relaxed max-w-2xl drop-shadow">
                    {banner.subheading}
                  </p>

                  {/* Banner Key Feature Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-100">
                    {banner.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>

                  {/* Banner CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <Link
                      href={banner.primaryBtnLink}
                      prefetch={true}
                      className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-brand-orange to-brand-yellow px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-orange-glow hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>{banner.primaryBtnText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>

                    <Link
                      href={banner.secondaryBtnLink}
                      prefetch={true}
                      className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/25 text-white font-bold text-xs sm:text-sm transition-all duration-300 backdrop-blur-md hover:scale-[1.02] text-center"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-brand-bright" />
                      <span>{banner.secondaryBtnText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Controls - Hidden on mobile to avoid covering text, visible from sm up */}
      <button
        onClick={() => {
          if (timerRef.current) clearInterval(timerRef.current);
          prevSlide();
        }}
        className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-brand-navy/80 hover:bg-brand-orange border border-white/25 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md items-center justify-center"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <button
        onClick={() => {
          if (timerRef.current) clearInterval(timerRef.current);
          nextSlide();
        }}
        className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-brand-navy/80 hover:bg-brand-orange border border-white/25 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md items-center justify-center"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Bottom Interactive Slide Category Pills with Animated Timer Indicator */}
      <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-center sm:justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        {/* Banner Pill Tabs - Ultra compact on mobile, full text on tablet & desktop */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto bg-black/60 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white/15 shadow-xl max-w-[95vw] overflow-x-auto no-scrollbar">
          {banners.map((b, index) => {
            const isSel = index === currentSlide;
            return (
              <button
                key={b.id}
                onClick={() => handleManualSlide(index)}
                className={`relative overflow-hidden px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-300 shrink-0 ${
                  isSel
                    ? 'bg-gradient-to-r from-brand-orange to-brand-yellow text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="sm:hidden">0{index + 1} {b.slideTag.split('•')[1] || ''}</span>
                <span className="hidden sm:inline">{b.slideTag}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Counter */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto text-xs font-mono text-slate-300 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          <span className="text-brand-orange font-bold">0{currentSlide + 1}</span>
          <span className="text-slate-500">/</span>
          <span>0{banners.length}</span>
        </div>
      </div>
    </section>
  );
}
