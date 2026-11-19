'use client';

import React, { useEffect, useState } from 'react';
import { Save, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContentManagementPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [settingsRes, statsRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/statistics'),
      ]);

      if (settingsRes.ok) {
        const s = await settingsRes.json();
        setSettings(s);
      }
      if (statsRes.ok) {
        const st = await statsRes.json();
        setStats(st);
      }
    } catch (err) {
      console.error('Failed to load content settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('Website content saved successfully! Frontend reflects changes immediately.');
      } else {
        toast.error('Failed to save settings');
      }
    } catch {
      toast.error('Network error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleStatUpdate = async (stat: any) => {
    try {
      const res = await fetch('/api/statistics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat),
      });
      if (res.ok) {
        toast.success(`Updated ${stat.label}`);
      } else {
        toast.error('Failed to update statistic');
      }
    } catch {
      toast.error('Error updating statistic');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading content settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            Website Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit homepage hero text, CTAs, company introduction, and animated statistics in real time.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all duration-200 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Section 1: Hero Section Content */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold font-display text-brand-navy">
              1. Homepage Hero Section
            </h2>
            <p className="text-xs text-slate-500">
              Headline, tagline, and call-to-action button links
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Hero Main Heading
              </label>
              <input
                type="text"
                value={settings.hero_heading || ''}
                onChange={(e) => handleChange('hero_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Hero Subheading / Supporting Text
              </label>
              <textarea
                rows={2}
                value={settings.hero_subheading || ''}
                onChange={(e) => handleChange('hero_subheading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_primary_text || ''}
                  onChange={(e) => handleChange('hero_cta_primary_text', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Primary CTA Button Link URL
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_primary_link || ''}
                  onChange={(e) => handleChange('hero_cta_primary_link', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Secondary CTA Button Label
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_secondary_text || ''}
                  onChange={(e) => handleChange('hero_cta_secondary_text', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Secondary CTA Button Link URL
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_secondary_link || ''}
                  onChange={(e) => handleChange('hero_cta_secondary_link', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Company Introduction Content */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold font-display text-brand-navy">
              2. Company Introduction
            </h2>
            <p className="text-xs text-slate-500">
              Introduction title, main paragraph, and leadership highlight
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Introduction Heading
              </label>
              <input
                type="text"
                value={settings.company_intro_heading || ''}
                onChange={(e) => handleChange('company_intro_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Main Company Introduction Text
              </label>
              <textarea
                rows={3}
                value={settings.company_intro_text || ''}
                onChange={(e) => handleChange('company_intro_text', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Secondary Highlight / Quotation
              </label>
              <textarea
                rows={2}
                value={settings.company_intro_highlight || ''}
                onChange={(e) => handleChange('company_intro_highlight', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bottom Call to Action Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold font-display text-brand-navy">
              3. Call-To-Action (CTA) Banner
            </h2>
            <p className="text-xs text-slate-500">
              Heading and text for bottom lead generation banner
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                CTA Heading
              </label>
              <input
                type="text"
                value={settings.cta_heading || ''}
                onChange={(e) => handleChange('cta_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                CTA Description
              </label>
              <textarea
                rows={2}
                value={settings.cta_description || ''}
                onChange={(e) => handleChange('cta_description', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Section 4: Animated Statistics Editor */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold font-display text-brand-navy">
            4. Animated Statistics (Counters)
          </h2>
          <p className="text-xs text-slate-500">
            Edit displayed numbers, labels, and suffixes on the live counter bar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((st, idx) => (
            <div
              key={st.id}
              className="p-4 rounded-2xl bg-brand-light border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-brand-blue">
                  Metric #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleStatUpdate(st)}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Save Metric
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[idx].label = e.target.value;
                    setStats(newStats);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Display Value
                  </label>
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => {
                      const newStats = [...stats];
                      newStats[idx].value = e.target.value;
                      setStats(newStats);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Numeric (for counter)
                  </label>
                  <input
                    type="number"
                    value={st.numeric_value}
                    onChange={(e) => {
                      const newStats = [...stats];
                      newStats[idx].numeric_value = parseInt(e.target.value, 10) || 0;
                      setStats(newStats);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
