'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Package,
  Wrench,
  Truck,
  Briefcase,
  AlertCircle,
  Eye,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';

const defaultEmptyService = {
  id: 0,
  title: '',
  slug: '',
  subtitle: '',
  short_description: '',
  full_description: '',
  icon_name: 'Briefcase',
  image_url: '',
  banner_url: '',
  key_responsibilities: [''],
  benefits: [''],
  industry_applications: [''],
  status: 'active',
  display_order: 0,
  meta_title: '',
  meta_description: '',
};

export default function ServicesManagementPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services?all=true');
      if (res.ok) {
        const json = await res.json();
        setServices(json);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (svc: any) => {
    setEditingService({
      ...svc,
      key_responsibilities: Array.isArray(svc.key_responsibilities) && svc.key_responsibilities.length > 0 ? svc.key_responsibilities : [''],
      benefits: Array.isArray(svc.benefits) && svc.benefits.length > 0 ? svc.benefits : [''],
      industry_applications: Array.isArray(svc.industry_applications) && svc.industry_applications.length > 0 ? svc.industry_applications : [''],
    });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingService({ ...defaultEmptyService, slug: `service-${Date.now().toString().slice(-4)}` });
    setIsNew(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Service deleted successfully');
        fetchServices();
      } else {
        toast.error('Failed to delete service');
      }
    } catch {
      toast.error('Error deleting service');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService.title || !editingService.slug || !editingService.short_description) {
      toast.error('Title, slug, and short description are required.');
      return;
    }

    try {
      setSaving(true);
      const url = isNew ? '/api/services' : `/api/services/${editingService.id}`;
      const method = isNew ? 'POST' : 'PUT';

      // Clean empty list items
      const payload = {
        ...editingService,
        key_responsibilities: editingService.key_responsibilities.filter((s: string) => s.trim().length > 0),
        benefits: editingService.benefits.filter((s: string) => s.trim().length > 0),
        industry_applications: editingService.industry_applications.filter((s: string) => s.trim().length > 0),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(isNew ? 'Service created successfully' : 'Service updated successfully');
        setEditingService(null);
        fetchServices();
      } else {
        toast.error(data.error || 'Failed to save service');
      }
    } catch {
      toast.error('Network error saving service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, update, and manage dynamic workforce categories, responsibilities, and SEO metadata.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Editing Modal / Drawer */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl font-bold font-display text-brand-navy">
                {isNew ? 'Create New Workforce Service' : `Edit: ${editingService.title}`}
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug * (e.g. housekeeping)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) =>
                      setEditingService({ ...editingService, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={editingService.subtitle || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Description (Homepage Card) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService.short_description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, short_description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Description (Detail Page)
                </label>
                <textarea
                  rows={4}
                  value={editingService.full_description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, full_description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Icon Name
                  </label>
                  <select
                    value={editingService.icon_name || 'Briefcase'}
                    onChange={(e) =>
                      setEditingService({ ...editingService, icon_name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Sparkles">Sparkles (Housekeeping)</option>
                    <option value="Package">Package (Warehouse)</option>
                    <option value="Wrench">Wrench (Technical)</option>
                    <option value="Truck">Truck (Drivers)</option>
                    <option value="Briefcase">Briefcase (General)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={editingService.status || 'active'}
                    onChange={(e) =>
                      setEditingService({ ...editingService, status: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingService.display_order || 0}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        display_order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* Image & Banner URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="text"
                    value={editingService.image_url || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, image_url: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Header Banner URL
                  </label>
                  <input
                    type="text"
                    value={editingService.banner_url || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, banner_url: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* Responsibilities Dynamic List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Key Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingService({
                        ...editingService,
                        key_responsibilities: [...editingService.key_responsibilities, ''],
                      })
                    }
                    className="text-xs text-brand-blue font-bold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {editingService.key_responsibilities.map((r: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={r}
                        onChange={(e) => {
                          const list = [...editingService.key_responsibilities];
                          list[idx] = e.target.value;
                          setEditingService({ ...editingService, key_responsibilities: list });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        placeholder="e.g. Daily sanitization of facility premises"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const list = editingService.key_responsibilities.filter(
                            (_: any, i: number) => i !== idx
                          );
                          setEditingService({ ...editingService, key_responsibilities: list });
                        }}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Icon</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-navy shrink-0">
                      <Image
                        src={
                          svc.image_url ||
                          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80'
                        }
                        alt={svc.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{svc.title}</p>
                      <p className="text-slate-500 text-[11px] line-clamp-1">{svc.subtitle}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-brand-blue">
                    /services/{svc.slug}
                  </td>
                  <td className="p-4 font-medium text-slate-600">
                    {svc.icon_name}
                  </td>
                  <td className="p-4 font-bold text-brand-navy">
                    {svc.display_order}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        svc.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {svc.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      target="_blank"
                      className="p-1.5 inline-block rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand-blue"
                      title="View on site"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleEdit(svc)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand-orange"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
