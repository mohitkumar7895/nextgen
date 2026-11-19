'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useSite } from '@/context/SiteContext';

const manpowerCategories = [
  'Housekeeping Services',
  'Store & Warehouse Staff',
  'Technical Manpower (Electricians/Fitters)',
  'Driver Services (Commercial/Chauffeur)',
  'Factory Assembly Line Workers',
  'Construction & Site Helpers',
  'Security & Facility Support Staff',
  'Other / Customized Manpower',
];

interface InquiryFormProps {
  initialCategory?: string;
  className?: string;
}

export function InquiryForm({ initialCategory, className = '' }: InquiryFormProps) {
  const { settings, whatsappUrl } = useSite();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    mobile_number: '',
    email_address: '',
    manpower_category: initialCategory || 'Housekeeping Services',
    employees_required: 5,
    location: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.company_name ||
      !formData.mobile_number ||
      !formData.email_address ||
      !formData.location
    ) {
      toast.error('Please fill in all mandatory fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const refId = data.id || Date.now().toString().slice(-4);
        setSubmitted(true);
        setSubmittedData({ ...formData, id: refId });
        toast.success('Inquiry saved in Admin Portal! Opening WhatsApp...');

        // Send inquiry to WhatsApp 9727930894
        const text = `*NEW WORKFORCE INQUIRY (Ref #NX-${refId})*
👤 *Client Name:* ${formData.full_name}
🏢 *Company:* ${formData.company_name}
📱 *Phone:* ${formData.mobile_number}
✉️ *Email:* ${formData.email_address}
💼 *Category:* ${formData.manpower_category}
👥 *Headcount:* ${formData.employees_required} Staff Members
📍 *Location:* ${formData.location}
💬 *Message:* ${formData.message || 'Please provide quotation'}

_Sent via NexGen Workforce Services Website_`;

        const phone = (settings.contact_whatsapp || '9727930894').replace(/[^0-9]/g, '');
        const clean = phone.startsWith('91') ? phone : `91${phone}`;
        const waUrl = `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(text)}`;

        try {
          window.open(waUrl, '_blank');
        } catch {
          // popup blocker handled by UI button
        }
      } else {
        toast.error(data.error || 'Failed to submit inquiry.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const data = submittedData || formData;
    const refString = submittedData?.id ? `#NX-${submittedData.id}` : 'Direct Website Inquiry';
    const text = `*WORKFORCE INQUIRY (${refString})*
👤 *Client Name:* ${data.full_name || 'Prospective Client'}
🏢 *Company:* ${data.company_name || 'N/A'}
📱 *Phone:* ${data.mobile_number || 'N/A'}
💼 *Category:* ${data.manpower_category || 'Manpower Supply'}
👥 *Headcount:* ${data.employees_required || 5} Staff
📍 *Location:* ${data.location || 'Gujarat'}
💬 *Message:* ${data.message || 'Need staffing quote and rate card.'}`;

    const phone = (settings.contact_whatsapp || '9727930894').replace(/[^0-9]/g, '');
    const clean = phone.startsWith('91') ? phone : `91${phone}`;
    return `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl ${className}`}>
      {submitted ? (
        <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black font-display text-brand-navy">
              Staffing Proposal Request Logged!
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Reference ID: #NX-{submittedData?.id || Date.now().toString().slice(-4)}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-brand-light border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
            <p>
              <strong className="text-brand-navy">Client:</strong> {submittedData?.full_name} (
              {submittedData?.company_name})
            </p>
            <p>
              <strong className="text-brand-navy">Category:</strong> {submittedData?.manpower_category}
            </p>
            <p>
              <strong className="text-brand-navy">Headcount:</strong> {submittedData?.employees_required} Staff Members
            </p>
            <p>
              <strong className="text-brand-navy">Location:</strong> {submittedData?.location}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our Gujarat staffing coordinator is preparing your quotation and rate card. You may also connect instantly on WhatsApp with this request.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open WhatsApp & Send to 9727930894</span>
            </a>

            <a
              href="tel:+919727930894"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>Call Helpline: 9727930894</span>
            </a>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  full_name: '',
                  company_name: '',
                  mobile_number: '',
                  email_address: '',
                  manpower_category: 'Housekeeping Services',
                  employees_required: 5,
                  location: '',
                  message: '',
                });
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-black font-display text-brand-navy">
              Request a Custom Staffing Proposal
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Submit your exact headcount & shift details. Receive transparent pricing within 2 hours.
            </p>
          </div>

          {/* Row 1: Full Name & Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-blue" />
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nakul Chavada"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-brand-orange" />
                Company / Organization Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Engineering Ltd."
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>
          </div>

          {/* Row 2: Mobile Number & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Mobile / Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9727930894"
                value={formData.mobile_number}
                onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-bright" />
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="contact@company.com"
                value={formData.email_address}
                onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>
          </div>

          {/* Row 3: Category & Headcount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                Required Manpower Category *
              </label>
              <select
                value={formData.manpower_category}
                onChange={(e) => setFormData({ ...formData, manpower_category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm bg-white"
              >
                {manpowerCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-blue" />
                Number of Employees Required *
              </label>
              <input
                type="number"
                min={1}
                max={5000}
                required
                value={formData.employees_required}
                onChange={(e) =>
                  setFormData({ ...formData, employees_required: parseInt(e.target.value, 10) || 1 })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>
          </div>

          {/* Row 4: Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              Work Location (City / Industrial Area) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bavla GIDC, Sanand, Changodar, Ahmedabad"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            />
          </div>

          {/* Row 5: Message / Requirements Details */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              Detailed Message / Specific Criteria (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Specify shift timing, technical certifications, machine models, or special uniform preferences..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-yellow hover:opacity-95 text-white font-extrabold text-sm sm:text-base shadow-orange-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <span>Registering Inquiry & Generating WhatsApp...</span>
              ) : (
                <>
                  <span>Submit Inquiry & Send to WhatsApp (9727930894)</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Or Direct Chat on WhatsApp (Nakul Chavada • 9727930894)</span>
            </a>

            <p className="text-[11px] text-center text-slate-500">
              🔒 Inquiries are logged directly into the NexGen Admin Dashboard with automated audit tracking.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
