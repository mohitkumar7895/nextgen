'use client';

import React, { useEffect, useState } from 'react';
import {
  Save,
  Search,
  ExternalLink,
  Globe,
  FileCode,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SeoManagementPage() {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [currentSeo, setCurrentSeo] = useState<any>({
    page_route: '/',
    meta_title: '',
    meta_description: '',
    keywords: '',
    og_image: '',
    canonical_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSeoData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/seo');
      if (res.ok) {
        const data = await res.json();
        setSeoList(data);
        const homeSeo = data.find((item: any) => item.page_route === selectedRoute);
        if (homeSeo) setCurrentSeo(homeSeo);
      }
    } catch (err) {
      console.error('Failed to load SEO data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const handleRouteChange = (route: string) => {
    setSelectedRoute(route);
    const found = seoList.find((item: any) => item.page_route === route);
    if (found) {
      setCurrentSeo(found);
    } else {
      setCurrentSeo({
        page_route: route,
        meta_title: '',
        meta_description: '',
        keywords: '',
        og_image: '/logo/nexgen-logo.png',
        canonical_url: `https://nexgenworkforce.com${route}`,
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSeo),
      });

      if (res.ok) {
        toast.success(`SEO metadata saved for ${selectedRoute}!`);
        fetchSeoData();
      } else {
        toast.error('Failed to save SEO metadata');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            Search Engine Optimization (SEO)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage page titles, descriptions, keywords, Open Graph previews, sitemap, and robots.txt.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Meta Tags'}</span>
        </button>
      </div>

      {/* Crawlers and Sitemap Diagnostics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-navy group-hover:text-brand-blue">
                Dynamic XML Sitemap
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">/sitemap.xml (Active)</p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
        </a>

        <a
          href="/robots.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-navy group-hover:text-brand-blue">
                Robots.txt Directive
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">/robots.txt (Configured)</p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
        </a>
      </div>

      {/* Route Selector Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
        {['/', '/about', '/services', '/industries', '/contact', '/get-a-quote'].map((route) => (
          <button
            key={route}
            type="button"
            onClick={() => handleRouteChange(route)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
              selectedRoute === route
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {route === '/' ? 'Home (/)' : route}
          </button>
        ))}
      </div>

      {/* SEO Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold font-display text-brand-navy">
            Metadata Configuration for Route: <span className="font-mono text-brand-blue">{selectedRoute}</span>
          </h2>
          <p className="text-xs text-slate-500">
            Define search snippet and social card properties
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Meta Title (Recommended: 50-60 characters)
          </label>
          <input
            type="text"
            required
            value={currentSeo.meta_title || ''}
            onChange={(e) => setCurrentSeo({ ...currentSeo, meta_title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Length: {(currentSeo.meta_title || '').length} chars
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Meta Description (Recommended: 140-160 characters)
          </label>
          <textarea
            rows={3}
            required
            value={currentSeo.meta_description || ''}
            onChange={(e) => setCurrentSeo({ ...currentSeo, meta_description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Length: {(currentSeo.meta_description || '').length} chars
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Target Search Keywords (Comma separated)
          </label>
          <input
            type="text"
            value={currentSeo.keywords || ''}
            onChange={(e) => setCurrentSeo({ ...currentSeo, keywords: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
            placeholder="manpower supply gujarat, staffing agency ahmedabad, skilled labor"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Open Graph Image URL (og:image)
            </label>
            <input
              type="text"
              value={currentSeo.og_image || ''}
              onChange={(e) => setCurrentSeo({ ...currentSeo, og_image: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Canonical URL
            </label>
            <input
              type="text"
              value={currentSeo.canonical_url || ''}
              onChange={(e) => setCurrentSeo({ ...currentSeo, canonical_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>
        </div>

        {/* Live Google Search Snippet Simulation */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Google Search SERP Preview
          </label>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-xl font-sans">
            <span className="text-xs text-slate-500 font-mono block">
              https://nexgenworkforce.com{selectedRoute}
            </span>
            <h4 className="text-base text-blue-800 hover:underline font-medium cursor-pointer line-clamp-1 mt-0.5">
              {currentSeo.meta_title || 'NEXGEN WORKFORCE SERVICES'}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-2 mt-1">
              {currentSeo.meta_description || 'Preview description will appear here...'}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
