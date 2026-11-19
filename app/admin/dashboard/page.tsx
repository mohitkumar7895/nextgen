'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatShortDate } from '@/lib/utils';
import { toast } from 'sonner';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-amber-100 text-amber-800 border-amber-200',
  contacted: 'bg-purple-100 text-purple-800 border-purple-200',
  converted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200',
};

const PIE_COLORS = ['#0647A5', '#FF6500', '#079BEF', '#FFB900', '#10B981', '#6366F1'];

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (inquiryId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Inquiry status updated to ${newStatus}`);
        fetchDashboardData();
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error updating status');
    }
  };

  const metrics = data?.metrics || {
    totalInquiries: 0,
    newInquiries: 0,
    totalServices: 4,
    totalIndustries: 8,
    totalMessages: 0,
  };

  const monthlyStats = data?.monthlyStats || [
    { month: 'Jun', count: 12 },
    { month: 'Jul', count: 18 },
    { month: 'Aug', count: 24 },
    { month: 'Sep', count: 29 },
    { month: 'Oct', count: 35 },
    { month: 'Nov', count: 42 },
  ];

  const categoryStats = data?.categoryStats || [
    { category: 'Housekeeping Services', count: 45 },
    { category: 'Store & Warehouse Staff', count: 38 },
    { category: 'Technical Manpower', count: 28 },
    { category: 'Driver Services', count: 19 },
  ];

  const recentInquiries = data?.recentInquiries || [];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            NexGen Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time management for manpower inquiries, services catalog, and website content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/inquiries/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-light hover:bg-slate-200 text-brand-navy font-bold text-xs transition-colors border border-slate-200"
          >
            <FileDown className="w-4 h-4 text-brand-blue" />
            <span>Export Inquiries CSV</span>
          </a>

          <Link
            href="/admin/dashboard/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>Manage All Quotes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Top KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Inquiries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Inquiries
            </p>
            <h3 className="text-3xl font-black font-display text-brand-navy mt-1">
              {metrics.totalInquiries}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1">
              {metrics.newInquiries} New pending quotes
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active Services */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Services
            </p>
            <h3 className="text-3xl font-black font-display text-brand-navy mt-1">
              {metrics.totalServices}
            </h3>
            <p className="text-[11px] font-semibold text-brand-blue mt-1">
              Managed dynamically
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Industries Served */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Industries Served
            </p>
            <h3 className="text-3xl font-black font-display text-brand-navy mt-1">
              {metrics.totalIndustries}
            </h3>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Gujarat Industrial Hubs
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Contact Messages */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contact Inquiries
            </p>
            <h3 className="text-3xl font-black font-display text-brand-navy mt-1">
              {metrics.totalMessages}
            </h3>
            <p className="text-[11px] font-semibold text-brand-orange mt-1">
              Direct web messages
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-navy flex items-center justify-center border border-slate-200">
            <MessageSquare className="w-6 h-6 text-brand-orange" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Chart: Monthly Trends (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-brand-navy">
                Inquiry Trends (Last 6 Months)
              </h3>
              <p className="text-xs text-slate-500">
                Staffing requests logged via web forms & WhatsApp
              </p>
            </div>
            <span className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#082C66',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#0647A5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Category Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-brand-navy">
              Demand by Manpower Category
            </h3>
            <p className="text-xs text-slate-500">Distribution of client staff requests</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {categoryStats.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#082C66',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
            {categoryStats.slice(0, 4).map((c: any, i: number) => (
              <div key={i} className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="truncate text-slate-600 font-medium">{c.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-brand-navy">
              Recent Workforce Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Latest client staffing requests requiring action
            </p>
          </div>

          <Link
            href="/admin/dashboard/inquiries"
            className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1"
          >
            <span>View All ({metrics.totalInquiries})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Ref</th>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Staff Req.</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-400">
                      #{inq.id}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{inq.full_name}</p>
                      <p className="text-slate-500 text-[11px]">{inq.company_name}</p>
                      <p className="text-brand-blue text-[11px] font-mono">{inq.mobile_number}</p>
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {inq.manpower_category}
                    </td>
                    <td className="p-4 font-bold text-brand-navy">
                      {inq.employees_required} staff
                    </td>
                    <td className="p-4 text-slate-600 truncate max-w-[150px]">
                      {inq.location}
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatShortDate(inq.created_at)}
                    </td>
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
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
