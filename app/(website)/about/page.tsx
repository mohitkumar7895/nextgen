import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Building,
  HeartHandshake,
  Clock,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata = {
  title: 'About Us | NEXGEN WORKFORCE SERVICES - Gujarat, India',
  description:
    'Learn about NexGen Workforce Services: Our mission, vision, core values, and workforce philosophy. Based in Bavla, Ahmedabad, Gujarat.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page Header / Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span>Corporate Profile & Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Build People. <span className="gradient-text-orange">Build Success.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            NEXGEN WORKFORCE SERVICES is Gujarat&apos;s trusted workforce management and manpower supply partner, bridging enterprise industrial goals with skilled, disciplined, and verified human capital.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright">About Us</span>
          </div>
        </div>
      </section>

      {/* 1. Company Introduction */}
      <section className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Collage (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                  alt="NexGen Workforce Operations in Gujarat"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                    Gujarat Headquarters
                  </p>
                  <p className="text-lg font-bold">Bavla, Ahmedabad – 382220</p>
                </div>
              </div>

              {/* Floating Compliance Card */}
              <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl border border-slate-200 shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-brand-navy">GST Registered Entity</h5>
                    <p className="font-mono text-[11px] text-slate-600">24CEOPC1058Q1Z6</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span>Our Heritage & Origin</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-display text-brand-navy leading-tight">
                Pioneering Professional Workforce Management Across Gujarat
              </h2>

              <p className="text-slate-700 leading-relaxed text-base">
                <strong>NEXGEN WORKFORCE SERVICES</strong> was established with a singular, clear mandate: to eliminate the operational friction, high turnover, and statutory liabilities traditionally associated with unorganized labor supply.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Operating from our central office in <strong>Bavla, Ahmedabad</strong>, near the industrial lifelines of Kerala Bridge, Sanand GIDC, Changodar, and Dholera SIR, we provide end-to-end workforce solutions spanning technical technicians, warehouse inventory staff, certified commercial drivers, and meticulous housekeeping crews.
              </p>

              {/* 3 Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-brand-light border border-slate-200">
                  <Users className="w-6 h-6 text-brand-blue mb-2" />
                  <h4 className="font-bold text-sm text-brand-navy">Vetted Talent</h4>
                  <p className="text-xs text-slate-500 mt-1">Multi-stage trade trials & ID checks.</p>
                </div>

                <div className="p-4 rounded-2xl bg-brand-light border border-slate-200">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-sm text-brand-navy">100% Compliant</h4>
                  <p className="text-xs text-slate-500 mt-1">PF, ESIC, insurance & labor code.</p>
                </div>

                <div className="p-4 rounded-2xl bg-brand-light border border-slate-200">
                  <Clock className="w-6 h-6 text-brand-orange mb-2" />
                  <h4 className="font-bold text-sm text-brand-navy">48-Hr Deploy</h4>
                  <p className="text-xs text-slate-500 mt-1">Ready standby workforce pool.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision, and Values */}
      <section className="py-20 lg:py-24 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Strategic Direction"
            title="Our Guiding Purpose,"
            highlight="Mission & Vision"
            description="Built upon integrity, operational rigor, and deep respect for both our workforce personnel and the enterprise partners we serve."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Mission */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-display text-brand-navy mb-3">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To supply reliable, certified, and motivated workforce talent that empowers enterprise operations to run at peak productivity, while safeguarding worker welfare, dignified remuneration, and comprehensive statutory safety.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                <span>Core Objective</span>
              </div>
            </div>

            {/* Card 2: Vision */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-display text-brand-navy mb-3">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To be recognized across Gujarat and India as the premier gold standard for organized manpower management, renowned for zero-defect compliance, ethical labor practices, and measurable client success.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                <span>Long-Term Horizon</span>
              </div>
            </div>

            {/* Card 3: Values */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-display text-brand-navy mb-3">Our Core Values</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <strong>Integrity First:</strong> Transparent contracts & zero hidden deductions.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <strong>Punctuality & Discipline:</strong> 100% shift adherence.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <strong>Safety Mindset:</strong> EHS and LOTO protocols at all times.
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                <span>Operational Pillars</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Workforce Philosophy */}
      <section id="workforce" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Workforce Philosophy"
            title="People are Not Just Numbers."
            highlight="They Build Success."
            description="Our tagline 'Build People, Build Success' defines how we treat, train, and support every worker deployed on your site."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                At NexGen Workforce Services, we believe that an enterprise is only as strong as the people who clean its floors, manage its inventory, maintain its electrical conduits, and steer its cargo trucks.
              </p>
              <p>
                When a worker is respected, trained with precision tools, paid on time with complete PF/ESIC receipts, and guided by responsive supervisors, they show up with pride, minimize errors, and protect your equipment.
              </p>
              <div className="p-5 rounded-2xl bg-brand-light border-l-4 border-brand-orange space-y-2">
                <h4 className="font-bold text-brand-navy text-sm">
                  The NexGen Three-Way Trust:
                </h4>
                <p className="text-xs text-slate-600">
                  1. The Client receives guaranteed productivity and zero labor disputes.<br />
                  2. The Worker receives fair wages, safety training, and dignity.<br />
                  3. The Community flourishes with sustainable economic empowerment.
                </p>
              </div>
            </div>

            <div className="relative h-[360px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="NexGen Technical Manpower Team"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner />
    </div>
  );
}
