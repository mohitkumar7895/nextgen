'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  FileCheck2,
  User,
  ArrowRight,
  ShieldCheck,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function Footer() {
  const { settings, whatsappUrl } = useSite();

  const phonePrimary = settings.contact_phone_primary || '9727930894';
  const phoneSecondary = settings.contact_phone_secondary || '9727930895';
  const email = settings.contact_email || 'nexgenworkforce@gmail.com';
  const gst = settings.contact_gst_number || '24CEOPC1058Q1Z6';
  const contactName = settings.client_contact_name || 'CHAVADA NAKUL';
  const address =
    settings.contact_address ||
    'Ratna Sagar, 1st Floor, Shop No. A-105, Survey No. 335 A/B/K, Near Kerala Bridge (Plus Code: Q8JF+VHG), Kerala, Bavla, Ahmedabad, Gujarat – 382220, India.';

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-8 border-t border-brand-blue/30 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-700/60">
          {/* Col 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-40 sm:w-48 h-12 sm:h-14 flex items-center">
                <Image
                  src="/logo/logologo.jpeg"
                  alt="NexGen Workforce Services"
                  fill
                  className="object-contain object-left rounded-md"
                />
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              NexGen Workforce Services is a trusted manpower supply and workforce management company based in Bavla, Ahmedabad, Gujarat. We empower industrial plants, corporate facilities, and logistics hubs with skilled, vetted, and disciplined professionals.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-brand-bright">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>100% Statutory & Labor Compliant</span>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WhatsApp Us
              </a>
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-orange/20"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  About NexGen
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  Industries Served
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote" className="hover:text-brand-bright transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-bright" />
              Workforce Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/services/housekeeping" className="hover:text-brand-bright transition-colors block">
                  <span className="font-semibold text-white">Housekeeping Services</span>
                  <span className="block text-slate-400 text-xs">Sanitization & facility upkeep</span>
                </Link>
              </li>
              <li>
                <Link href="/services/store-warehouse" className="hover:text-brand-bright transition-colors block">
                  <span className="font-semibold text-white">Store & Warehouse Staff</span>
                  <span className="block text-slate-400 text-xs">Storekeepers & logistics helpers</span>
                </Link>
              </li>
              <li>
                <Link href="/services/technical-manpower" className="hover:text-brand-bright transition-colors block">
                  <span className="font-semibold text-white">Technical Manpower</span>
                  <span className="block text-slate-400 text-xs">Electricians & technicians</span>
                </Link>
              </li>
              <li>
                <Link href="/services/driver-services" className="hover:text-brand-bright transition-colors block">
                  <span className="font-semibold text-white">Driver Services</span>
                  <span className="block text-slate-400 text-xs">Commercial transport drivers</span>
                </Link>
              </li>
              <li>
                <Link href="/services/security-services" className="hover:text-brand-bright transition-colors block">
                  <span className="font-semibold text-white">Company Security Guard Supply</span>
                  <span className="block text-slate-400 text-xs">Certified plant guards & gate security</span>
                </Link>
              </li>
              <li>
                <Link href="/services/industrial-canteen" className="hover:text-brand-bright transition-colors block">
                  <span className="font-semibold text-white">Industrial Canteen Services</span>
                  <span className="block text-slate-400 text-xs">Factory cooks & catering management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              Registered Office
            </h4>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-slate-300">{address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-brand-bright shrink-0" />
                <span>Contact Person: <strong className="text-white">{contactName}</strong></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:+91${phonePrimary}`} className="text-white hover:text-brand-bright font-semibold">
                    +91 {phonePrimary}
                  </a>
                  <a href={`tel:+91${phoneSecondary}`} className="text-slate-300 hover:text-brand-bright">
                    +91 {phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                <a href={`mailto:${email}`} className="text-slate-300 hover:text-white break-all">
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  GSTIN: <strong className="text-white font-mono">{gst}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">NEXGEN WORKFORCE SERVICES</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-500">Tagline: Build People, Build Success.</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
