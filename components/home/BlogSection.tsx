'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, User, BookOpen } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogItem } from '@/models/Blog';
import { formatShortDate } from '@/lib/utils';

const fallbackBlogs: BlogItem[] = [
  {
    id: 1,
    slug: 'gujarat-industrial-manpower-trends-2025',
    title: 'Navigating Industrial Manpower Demand in Gujarat’s Manufacturing Corridors',
    category: 'Workforce Management',
    author: 'Nakul Chavada',
    read_time: '4 min read',
    image_url:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    is_featured: 1,
    status: 'published',
    excerpt:
      'How Gujarat’s rapid manufacturing expansion across Sanand, Bavla, and Changodar is transforming skilled technical labor requirements and deployment benchmarks.',
    content: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    slug: 'statutory-compliance-esic-pf-workforce-safety',
    title: 'The Essential Guide to Statutory Labor Compliance: PF, ESIC & Workplace Safety',
    category: 'Compliance & Regulations',
    author: 'Nakul Chavada',
    read_time: '5 min read',
    image_url:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    is_featured: 1,
    status: 'published',
    excerpt:
      'Why 100% adherence to Provident Fund, ESIC, and factory safety protocols is non-negotiable for enterprise manufacturing plants and logistics hubs.',
    content: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    slug: 'optimizing-warehouse-logistics-staffing',
    title: 'Scaling Warehouse Logistics & Material Handling Teams for Peak Demand',
    category: 'Staffing Insights',
    author: 'Nakul Chavada',
    read_time: '4 min read',
    image_url:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    is_featured: 1,
    status: 'published',
    excerpt:
      'Best practices for managing storekeepers, inventory controllers, packaging crews, and heavy commercial drivers during festive and supply chain peaks.',
    content: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function BlogSection() {
  const [blogs, setBlogs] = useState<BlogItem[]>(fallbackBlogs);

  useEffect(() => {
    fetch('/api/blogs?status=published&limit=3')
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setBlogs(data.blogs);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Workforce Intelligence"
          title="Latest Industry Insights &"
          highlight="Staffing Best Practices"
          description="Actionable intelligence on labor laws, plant safety, headcount optimization, and workforce compliance in Gujarat."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="bg-brand-light rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Header */}
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

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-brand-navy/90 backdrop-blur-md text-white text-[11px] font-bold border border-brand-bright/30 shadow-md">
                      {blog.category}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] font-medium text-slate-200 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-brand-orange" />
                    <span>{blog.read_time}</span>
                  </div>
                </Link>

                {/* Article Info */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{blog.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatShortDate(blog.created_at)}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${blog.slug}`} prefetch={true} className="block group/title">
                    <h3 className="text-base sm:text-lg font-bold text-brand-navy font-display line-clamp-2 leading-snug group-hover/title:text-brand-blue transition-colors">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Read More CTA */}
              <div className="p-5 pt-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  prefetch={true}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white group-hover:bg-brand-blue text-brand-blue group-hover:text-white font-bold text-xs transition-all duration-300 border border-slate-200"
                >
                  <span>Read Complete Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Link */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/blog"
            prefetch={true}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-brand-orange" />
            <span>Explore All Industry Articles & Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
