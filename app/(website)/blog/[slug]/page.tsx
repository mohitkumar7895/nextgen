import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { BlogModel } from '@/models/Blog';
import { formatShortDate, formatDate } from '@/lib/utils';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Building,
  Phone,
} from 'lucide-react';
import { CtaBanner } from '@/components/home/CtaBanner';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await BlogModel.findBySlug(params.slug);
  if (!blog) {
    return { title: 'Article Not Found | NEXGEN WORKFORCE SERVICES' };
  }

  return {
    title: `${blog.meta_title || blog.title} | NEXGEN WORKFORCE SERVICES`,
    description:
      blog.meta_description ||
      blog.excerpt ||
      'Industrial manpower and statutory labor compliance insights from NexGen Workforce Services.',
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await BlogModel.findBySlug(params.slug);
  if (!blog) {
    notFound();
  }

  const allBlogs = await BlogModel.getAllPublished();
  const related = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  const whatsappShareText = encodeURIComponent(
    `Read this insight from NexGen Workforce Services: "${blog.title}" - https://nexgenworkforce.com/blog/${blog.slug}`
  );

  return (
    <article className="bg-white min-h-screen">
      {/* Article Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-nexgen-hero text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-bright text-xs font-bold uppercase tracking-wider border border-white/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            <span>{blog.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight uppercase">
            {blog.title}
          </h1>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-orange" />
              <span>{blog.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-bright" />
              <span>{formatDate(blog.created_at)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{blog.read_time}</span>
            </span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="text-brand-orange">/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span className="text-brand-orange">/</span>
            <span className="text-brand-bright truncate max-w-xs">{blog.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Featured Hero Image */}
          <div className="relative h-[300px] sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-brand-navy">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-center brightness-[0.92]"
            />
          </div>

          {/* Executive Summary / Key Takeaways Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-light border-l-4 border-brand-orange shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-brand-navy font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>Executive Brief</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          </div>

          {/* Formatted Article Prose */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    className="text-xl sm:text-2xl font-bold font-display text-brand-navy pt-4 border-b border-slate-100 pb-2"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={idx} className="space-y-2 pl-4 list-disc marker:text-brand-orange">
                    {items.map((it, i) => (
                      <li key={i} className="text-slate-700">
                        {it.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                const items = paragraph.split('\n');
                return (
                  <ol key={idx} className="space-y-2 pl-4 list-decimal marker:text-brand-blue font-medium">
                    {items.map((it, i) => (
                      <li key={i} className="text-slate-700">
                        {it.replace(/^\d\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author Bio Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-navy text-brand-orange flex items-center justify-center text-xl font-bold font-display shrink-0 shadow-md">
              NC
            </div>
            <div className="space-y-1 text-center sm:text-left flex-1">
              <h4 className="text-base font-bold text-brand-navy font-display">
                {blog.author}
              </h4>
              <p className="text-xs text-brand-blue font-semibold">
                Proprietor & Managing Director • NEXGEN WORKFORCE SERVICES
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Overseeing end-to-end industrial staffing, plant technicians, warehouse crews, and statutory compliance across Gujarat’s premier manufacturing zones.
              </p>
            </div>
            <a
              href={`https://wa.me/919727930894?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share on WhatsApp</span>
            </a>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-8 border-t border-slate-200 space-y-6">
              <h3 className="text-xl font-bold font-display text-brand-navy">
                Related Workforce Publications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    prefetch={true}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex items-start gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-brand-navy">
                      <Image
                        src={rel.image_url}
                        alt={rel.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{rel.read_time}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBanner />
    </article>
  );
}
