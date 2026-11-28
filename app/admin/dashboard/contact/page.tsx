'use client';

import React, { useEffect, useState } from 'react';
import {
  Save,
  Phone,
  Mail,
  MapPin,
  FileCheck2,
  User,
  MessageSquare,
  Trash2,
  Check,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export default function ContactManagementPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const [setRes, msgRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/contact'),
      ]);

      if (setRes.ok) {
        const s = await setRes.json();
        setSettings(s);
      }
      if (msgRes.ok) {
        const m = await msgRes.json();
        setMessages(m);
      }
    } catch (err) {
      console.error('Failed to load contact data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('site_settings_updated', Date.now().toString());
        }
        toast.success('Corporate contact information updated successfully!');
      } else {
        toast.error('Failed to update contact settings');
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
            Contact & Business Information
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage company phones, WhatsApp helpline, registered address, GST number, and contact form messages.
          </p>
        </div>

        <button
          onClick={handleSaveContactInfo}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Contact Details'}</span>
        </button>
      </div>

      {/* Official Business Details Form */}
      <form onSubmit={handleSaveContactInfo} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold font-display text-brand-navy">
            1. Official Company Identification
          </h2>
          <p className="text-xs text-slate-500">
            Visible in Navbar, Footer, and Contact sections across the site
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Client / Contact Name *
            </label>
            <input
              type="text"
              value={settings.client_contact_name || ''}
              onChange={(e) => handleChange('client_contact_name', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              GST Number (GSTIN) *
            </label>
            <input
              type="text"
              value={settings.contact_gst_number || ''}
              onChange={(e) => handleChange('contact_gst_number', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Primary Mobile Number *
            </label>
            <input
              type="tel"
              value={settings.contact_phone_primary || ''}
              onChange={(e) => handleChange('contact_phone_primary', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-brand-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Additional Mobile Number
            </label>
            <input
              type="tel"
              value={settings.contact_phone_secondary || ''}
              onChange={(e) => handleChange('contact_phone_secondary', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Official WhatsApp Number *
            </label>
            <input
              type="tel"
              value={settings.contact_whatsapp || ''}
              onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Official Email Address *
          </label>
          <input
            type="email"
            value={settings.contact_email || ''}
            onChange={(e) => handleChange('contact_email', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Registered Business Address *
          </label>
          <textarea
            rows={3}
            value={settings.contact_address || ''}
            onChange={(e) => handleChange('contact_address', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Google Maps Embed URL (Iframe src)
          </label>
          <input
            type="text"
            value={settings.contact_map_embed || ''}
            onChange={(e) => handleChange('contact_map_embed', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
          />
        </div>

        <ImageUploadField
          label="Registered Office & Operations Desk Photo"
          description="Photograph of the official office desk (Nakul Chavada / Kerala, Bavla) shown on the homepage and contact page."
          value={settings.office_location_image || ''}
          defaultImage="/images/office/office-location.jpg"
          onChange={(url) => handleChange('office_location_image', url)}
          category="office"
        />
      </form>

      {/* Incoming Contact Messages Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-brand-navy">
              2. Messages Received via Contact Form ({messages.length})
            </h2>
            <p className="text-xs text-slate-500">
              General inquiries and visitor correspondence
            </p>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No contact messages recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messages.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{m.name}</td>
                    <td className="p-4">
                      <p className="text-slate-800">{m.email}</p>
                      <p className="text-slate-400 font-mono text-[11px]">{m.phone || 'N/A'}</p>
                    </td>
                    <td className="p-4 font-semibold text-brand-navy max-w-[150px] truncate">
                      {m.subject || 'General Inquiry'}
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2">{m.message}</p>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(m.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
