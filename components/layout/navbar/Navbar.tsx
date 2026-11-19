'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Package,
  Wrench,
  Truck,
  Building2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const coreServices = [
  {
    title: 'Housekeeping Services',
    slug: 'housekeeping',
    desc: 'Commercial & industrial facility sanitization',
    icon: Sparkles,
  },
  {
    title: 'Store & Warehouse Staff',
    slug: 'store-warehouse',
    desc: 'Storekeepers, inventory & dispatch personnel',
    icon: Package,
  },
  {
    title: 'Technical Manpower',
    slug: 'technical-manpower',
    desc: 'Electricians, mechanical & plant technicians',
    icon: Wrench,
  },
  {
    title: 'Driver Services',
    slug: 'driver-services',
    desc: 'Commercial transport & executive chauffeurs',
    icon: Truck,
  },
];

export function Navbar() {
  const { settings } = useSite();
  const pathname = usePathname() || '';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const phonePrimary = settings.contact_phone_primary || '9727930894';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services', isDropdown: true },
    { name: 'Industries', href: '/industries' },
    { name: 'Blog', href: '/blog' },
    { name: 'Our Workforce', href: '/about#workforce' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Top Corporate Strip */}
      <header
        className={`w-full text-xs transition-all duration-300 ${
          scrolled ? 'hidden' : 'block bg-brand-navy text-slate-300 py-2 border-b border-brand-blue/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-brand-bright font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Gujarat&apos;s Trusted Manpower Partner
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-slate-300">
              GST: <strong className="text-white font-mono">{settings.contact_gst_number || '24CEOPC1058Q1Z6'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:+91${phonePrimary.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-brand-orange transition-colors font-semibold"
            >
              <Phone className="w-3 h-3 text-brand-orange" />
              <span>+91 {phonePrimary}</span>
            </a>
            <span className="text-slate-500">|</span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sticky Navbar */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-nav shadow-lg py-3'
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-36 sm:w-48 h-11 sm:h-14 flex items-center">
                <Image
                  src="/logo/logologo.jpeg"
                  alt="NexGen Workforce Services"
                  fill
                  priority
                  className="object-contain object-left group-hover:scale-[1.02] transition-transform duration-200 rounded-md"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && Boolean(pathname && pathname.startsWith(link.href)));

                if (link.isDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                          isActive
                            ? 'text-brand-blue bg-brand-blue/5'
                            : 'text-slate-700 hover:text-brand-blue hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen ? 'rotate-180 text-brand-orange' : ''
                          }`}
                        />
                      </Link>

                      {/* Mega Dropdown */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2">
                          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 ring-1 ring-black/5">
                            <div className="p-2 border-b border-slate-100 mb-2">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                                Manpower Categories
                              </p>
                            </div>
                            <div className="space-y-1">
                              {coreServices.map((svc) => {
                                const Icon = svc.icon;
                                return (
                                  <Link
                                    key={svc.slug}
                                    href={`/services/${svc.slug}`}
                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-blue/5 group transition-colors"
                                  >
                                    <div className="p-2 rounded-lg bg-brand-light text-brand-blue group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-slate-800 group-hover:text-brand-blue">
                                        {svc.title}
                                      </p>
                                      <p className="text-[11px] text-slate-500 line-clamp-1">
                                        {svc.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="pt-2 mt-2 border-t border-slate-100">
                              <Link
                                href="/services"
                                className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-brand-blue hover:text-brand-navy"
                              >
                                <span>View All Workforce Services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={true}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'text-brand-blue bg-brand-blue/5'
                        : 'text-slate-700 hover:text-brand-blue hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/get-a-quote"
                prefetch={true}
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-brand-orange to-brand-yellow px-5 py-2.5 text-sm font-bold text-white shadow-orange-glow hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/get-a-quote"
                prefetch={true}
                className="rounded-lg bg-brand-orange text-white px-3 py-1.5 text-xs font-bold"
              >
                Quote
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-brand-blue hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? 'bg-brand-blue/10 text-brand-blue'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3">
                Core Services
              </p>
              <div className="grid grid-cols-1 gap-1">
                {coreServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-lg"
                  >
                    <svc.icon className="w-4 h-4 text-brand-orange" />
                    <span>{svc.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href={`tel:+91${phonePrimary.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-light text-brand-navy font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call Helpline: +91 {phonePrimary}</span>
              </a>

              <Link
                href="/get-a-quote"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold text-sm shadow-md"
              >
                <span>Request Staffing Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
