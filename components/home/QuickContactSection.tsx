'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  FileCheck2,
  User,
  MessageCircle,
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { toast } from 'sonner';

export function QuickContactSection() {
  const { settings } = useSite();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const phonePrimary = settings.contact_phone_primary || '9727930894';
  const phoneSecondary = settings.contact_phone_secondary || '9727930895';
  const email = settings.contact_email || 'nexgenworkforce@gmail.com';
  const address =
    settings.contact_address ||
    'Ratna Sagar, 1st Floor, Shop No. A-105, Survey No. 335 A/B/K, Near Kerala Bridge, Bavla, Ahmedabad, Gujarat – 382220, India.';
  const gst = settings.contact_gst_number || '24CEOPC1058Q1Z6';
  const contactName = settings.client_contact_name || 'CHAVADA NAKUL';
  const mapEmbed =
    settings.contact_map_embed ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14697.55018654817!2d72.35515286576882!3d22.843793754432095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e865f9ff7ff25%3A0xbc7d54b726487e41!2sBavla%2C%20Gujarat%20382220!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success('Message saved in Admin Portal! Opening WhatsApp...');

        const text = `*NEW CONTACT MESSAGE (Website Lead)*
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone || 'Not provided'}
✉️ *Email:* ${formData.email}
📝 *Subject:* ${formData.subject || 'General Workforce Inquiry'}
💬 *Message:* ${formData.message}

_Sent via NexGen Workforce Services Contact Form_`;

        const phone = (settings.contact_whatsapp || '9727930894').replace(/[^0-9]/g, '');
        const clean = phone.startsWith('91') ? phone : `91${phone}`;
        const waUrl = `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(text)}`;

        try {
          window.open(waUrl, '_blank');
        } catch {
          // popup blocked handled by button
        }
      } else {
        toast.error(data.error || 'Failed to submit message.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const text = `*DIRECT CONTACT INQUIRY*
👤 *Name:* ${formData.name || 'Website Visitor'}
📱 *Phone:* ${formData.phone || 'N/A'}
✉️ *Email:* ${formData.email || 'N/A'}
💬 *Message:* ${formData.message || 'I would like to inquire about manpower solutions.'}`;
    const phone = (settings.contact_whatsapp || '9727930894').replace(/[^0-9]/g, '');
    const clean = phone.startsWith('91') ? phone : `91${phone}`;
    return `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact NexGen"
          title="Connect with Our Workforce"
          highlight="Management Team"
          description="Have specific headcount requirements or want to discuss enterprise industrial staffing? Reach out to us directly or visit our registered office."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Official Contact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-brand-light p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-brand-navy font-display">
                Official Registered Office
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs">Address</strong>
                    <span className="text-slate-600 leading-snug text-xs">
                      {address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs">Contact Person</strong>
                    <span className="text-slate-600 text-xs">{contactName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs">Direct Mobile Helplines</strong>
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
                      <a href={`tel:+91${phonePrimary}`} className="hover:text-brand-blue">
                        +91 {phonePrimary}
                      </a>
                      <span>•</span>
                      <a href={`tel:+91${phoneSecondary}`} className="hover:text-brand-blue">
                        +91 {phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs">Email Correspondence</strong>
                    <a
                      href={`mailto:${email}`}
                      className="text-brand-blue hover:underline text-xs font-medium"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-200">
                  <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-brand-navy font-semibold text-xs">Goods and Services Tax (GSTIN)</strong>
                    <span className="font-mono text-xs text-slate-800 font-bold">
                      {gst}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-48 w-full relative">
              <iframe
                src={mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NexGen Workforce Office Location"
              />
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-brand-navy font-display">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in your message and our workforce team will get in touch promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">Message Delivered to Admin & WhatsApp!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your message has been stored in our system and forwarded directly to Nakul Chavada (9727930894).
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/30"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp: 9727930894</span>
                    </a>
                    <a
                      href="tel:+919727930894"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-blue transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Call: 9727930894</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nakul Chavada"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone / Mobile
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9727930894"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Manpower requirement"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Please describe your workforce requirements, headcount, or inquiry details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy hover:from-brand-navy hover:to-brand-blue text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Saving Message & Forwarding to WhatsApp...</span>
                      ) : (
                        <>
                          <span>Submit Message & Send to WhatsApp (9727930894)</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Direct WhatsApp Message (9727930894)</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
