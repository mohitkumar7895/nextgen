import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogModel, BlogItem } from '@/models/Blog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Calendar, Clock, User, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { formatShortDate } from '@/lib/utils';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata = {
  title: 'Blog & Workforce Insights | NEXGEN WORKFORCE SERVICES - Gujarat',
  description:
    'Expert articles, labor law compliance guides, factory safety protocols, and industrial staffing strategies from NexGen Workforce Services.',
};

export const dynamic = 'force-dynamic';

export default async function BlogIndexPage() {
  let blogs: BlogItem[] = [];
  try {
    blogs = await BlogModel.getAllPublished();
  } catch (err) {
    console.error('Failed to load blogs:', err);
  }

  const featured = blogs[0];
  const regular = blogs.slice(1);

  return (
    <div className="bg-brand-light">
      {/* Blog Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            <span>Industrial & Corporate Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase">
            Workforce <span className="gradient-text-gold">Insights & Blog</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Practical knowledge, statutory compliance roadmaps, and staffing operational frameworks written by Gujarat’s seasoned workforce specialists.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright">Blog & Insights</span>
          </div>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Article Hero Spotlight */}
          {featured && (
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] bg-brand-navy overflow-hidden">
                <Image
                  src={featured.image_url}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-brand-orange text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    Featured Insight
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="px-2.5 py-0.5 rounded-md bg-brand-light text-brand-navy border border-slate-200">
                      {featured.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{featured.read_time}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${featured.slug}`} prefetch={true} className="block group/h">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-brand-navy leading-snug group-hover/h:text-brand-blue transition-colors">
                      {featured.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <User className="w-3.5 h-3.5 text-brand-blue" />
                    <span className="font-semibold">{featured.author}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{formatShortDate(featured.created_at)}</span>
                  </div>

                  <Link
                    href={`/blog/${featured.slug}`}
                    prefetch={true}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-brand-navy">
                Recent Publications & Compliance Guides
              </h3>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {blogs.length} Articles Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regular.map((blog) => (
                <article
                  key={blog.id || blog.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Image */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      prefetch={true}
                      className="relative h-48 sm:h-52 w-full overflow-hidden block bg-brand-navy"
                    >
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.95]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-brand-navy/90 backdrop-blur-md text-white text-[11px] font-bold border border-brand-bright/30 shadow-md">
                          {blog.category}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] font-medium text-slate-200 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-brand-orange" />
                        <span>{blog.read_time}</span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <User className="w-3.5 h-3.5 text-brand-blue" />
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span>{formatShortDate(blog.created_at)}</span>
                      </div>

                      <Link href={`/blog/${blog.slug}`} prefetch={true} className="block group/title">
                        <h4 className="text-base sm:text-lg font-bold text-brand-navy font-display line-clamp-2 leading-snug group-hover/title:text-brand-blue transition-colors">
                          {blog.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      href={`/blog/${blog.slug}`}
                      prefetch={true}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-brand-light group-hover:bg-brand-blue text-brand-blue group-hover:text-white font-bold text-xs transition-all duration-300 border border-slate-200"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBanner />
    </div>
  );
}
