'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  FileDown,
  Trash2,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Building,
  User,
  MapPin,
  Calendar,
  Eye,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { formatShortDate, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-amber-100 text-amber-800 border-amber-200',
  contacted: 'bg-purple-100 text-purple-800 border-purple-200',
  converted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200',
};

export default function InquiriesManagementPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/inquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Status updated to ${newStatus}`);
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      setSavingNotes(true);
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: selectedInquiry.status,
          internal_notes: selectedInquiry.internal_notes || '',
        }),
      });
      if (res.ok) {
        toast.success('Internal notes saved successfully');
        setInquiries((prev) =>
          prev.map((inq) =>
            inq.id === selectedInquiry.id
              ? { ...inq, internal_notes: selectedInquiry.internal_notes }
              : inq
          )
        );
      } else {
        toast.error('Failed to save notes');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Inquiry deleted');
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        fetchInquiries();
      } else {
        toast.error('Failed to delete inquiry');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const getWhatsAppChatUrl = (phone: string, name: string) => {
    const clean = phone.replace(/[^0-9]/g, '');
    const finalPhone = clean.startsWith('91') ? clean : `91${clean}`;
    const text = `Hello ${name}, this is Nakul Chavada from NexGen Workforce Services regarding your manpower staffing inquiry.`;
    return `https://wa.me/${finalPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      {/* Header & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            Inquiry & Quote Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review incoming corporate staffing requests, track progress, log internal notes, and export to CSV.
          </p>
        </div>

        <a
          href="/api/inquiries/export"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-light hover:bg-slate-200 text-brand-navy font-bold text-xs border border-slate-200 shadow-sm transition-colors"
        >
          <FileDown className="w-4 h-4 text-brand-blue" />
          <span>Export All ({total}) to CSV</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'new', 'in_progress', 'contacted', 'converted', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, client, mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </form>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400">
                  Ref #{selectedInquiry.id}
                </span>
                <h2 className="text-xl font-bold font-display text-brand-navy mt-0.5">
                  Inquiry: {selectedInquiry.company_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={getWhatsAppChatUrl(
                  selectedInquiry.mobile_number,
                  selectedInquiry.full_name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Client</span>
              </a>

              <a
                href={`tel:${selectedInquiry.mobile_number}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-light text-brand-navy font-bold text-xs hover:bg-slate-200 transition-colors border border-slate-200"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call {selectedInquiry.mobile_number}</span>
              </a>

              <a
                href={`mailto:${selectedInquiry.email_address}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-light text-brand-navy font-bold text-xs hover:bg-slate-200 transition-colors border border-slate-200"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>Email Client</span>
              </a>
            </div>

            {/* Details Grid */}
            <div className="p-4 rounded-2xl bg-brand-light border border-slate-200 space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-xs block font-bold uppercase">Client Name</span>
                  <strong className="text-slate-800">{selectedInquiry.full_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block font-bold uppercase">Company</span>
                  <strong className="text-slate-800">{selectedInquiry.company_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block font-bold uppercase">Category</span>
                  <strong className="text-brand-blue">{selectedInquiry.manpower_category}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block font-bold uppercase">Employees Required</span>
                  <strong className="text-brand-orange text-base">
                    {selectedInquiry.employees_required} Staff
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block font-bold uppercase">Work Location</span>
                  <strong className="text-slate-800">{selectedInquiry.location}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block font-bold uppercase">Date Received</span>
                  <span className="text-slate-600">{formatDate(selectedInquiry.created_at)}</span>
                </div>
              </div>

              {selectedInquiry.message && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 text-xs block font-bold uppercase mb-1">
                    Client Requirements Notes
                  </span>
                  <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-200 text-xs leading-relaxed">
                    {selectedInquiry.message}
                  </p>
                </div>
              )}
            </div>

            {/* Status & Internal Notes Editor */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Inquiry Status
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                    handleStatusUpdate(selectedInquiry.id, newStatus);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  <option value="new">New (Unattended)</option>
                  <option value="in_progress">In Progress (Rate card prepared)</option>
                  <option value="contacted">Contacted (Spoke with client)</option>
                  <option value="converted">Converted (Contract Signed)</option>
                  <option value="rejected">Rejected / Dropped</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Internal Staffing Notes (Private to Admin)
                </label>
                <textarea
                  rows={3}
                  value={selectedInquiry.internal_notes || ''}
                  onChange={(e) =>
                    setSelectedInquiry({ ...selectedInquiry, internal_notes: e.target.value })
                  }
                  placeholder="Record quote amounts, supervisor assigned, client feedback..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingNotes ? 'Saving...' : 'Save Internal Notes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No inquiries match the current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Ref</th>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Count</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-400">
                      #{inq.id}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{inq.full_name}</p>
                      <p className="text-slate-500 text-[11px]">{inq.company_name}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-brand-navy font-mono">{inq.mobile_number}</p>
                      <p className="text-slate-500 text-[11px] truncate max-w-[140px]">{inq.email_address}</p>
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {inq.manpower_category}
                    </td>
                    <td className="p-4 font-bold text-brand-navy">
                      {inq.employees_required}
                    </td>
                    <td className="p-4 text-slate-600 truncate max-w-[120px]">
                      {inq.location}
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatShortDate(inq.created_at)}
                    </td>
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusUpdate(inq.id, e.target.value)}
                        className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none ${
                          STATUS_COLORS[inq.status] || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-brand-blue"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={getWhatsAppChatUrl(inq.mobile_number, inq.full_name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 inline-block rounded-lg hover:bg-emerald-50 text-emerald-600"
                        title="WhatsApp Client"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
