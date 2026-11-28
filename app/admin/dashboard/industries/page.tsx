'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Factory,
  HardHat,
  Boxes,
  Building2,
  Store,
  Cpu,
  Waypoints,
  ShieldCheck,
  Truck,
  Wrench,
  AlertCircle,
  Eye,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

const iconOptions = [
  { name: 'Factory', label: 'Factory (Manufacturing)', icon: Factory },
  { name: 'HardHat', label: 'HardHat (Construction)', icon: HardHat },
  { name: 'Boxes', label: 'Boxes (Warehousing & 3PL)', icon: Boxes },
  { name: 'Building2', label: 'Building2 (Corporate)', icon: Building2 },
  { name: 'Store', label: 'Store (Commercial & Retail)', icon: Store },
  { name: 'Cpu', label: 'Cpu (Plants & High-Tech)', icon: Cpu },
  { name: 'Waypoints', label: 'Waypoints (Infrastructure)', icon: Waypoints },
  { name: 'ShieldCheck', label: 'ShieldCheck (Facility Mgmt)', icon: ShieldCheck },
  { name: 'Truck', label: 'Truck (Logistics & Fleet)', icon: Truck },
  { name: 'Wrench', label: 'Wrench (Engineering Maintenance)', icon: Wrench },
];

const defaultEmptyIndustry = {
  id: 0,
  name: '',
  slug: '',
  description: '',
  icon_name: 'Factory',
  image_url: '',
  workforce_types: [''],
  status: 'active',
  display_order: 0,
};

export default function IndustriesManagementPage() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndustry, setEditingIndustry] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/industries?all=true&_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        setIndustries(json);
      }
    } catch (err) {
      console.error('Failed to load industries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleEdit = (ind: any) => {
    setEditingIndustry({
      ...ind,
      workforce_types:
        Array.isArray(ind.workforce_types) && ind.workforce_types.length > 0
          ? ind.workforce_types
          : [''],
    });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingIndustry({
      ...defaultEmptyIndustry,
      slug: `industry-${Date.now().toString().slice(-4)}`,
      display_order: industries.length + 1,
    });
    setIsNew(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this industry vertical?')) return;
    try {
      const res = await fetch(`/api/industries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('industries_updated', Date.now().toString());
        }
        toast.success('Industry deleted successfully');
        fetchIndustries();
      } else {
        toast.error('Failed to delete industry');
      }
    } catch {
      toast.error('Error deleting industry');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndustry.name || !editingIndustry.slug || !editingIndustry.description) {
      toast.error('Name, slug, and description are required.');
      return;
    }

    try {
      setSaving(true);
      const url = isNew ? '/api/industries' : `/api/industries/${editingIndustry.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        ...editingIndustry,
        workforce_types: (editingIndustry.workforce_types || []).filter(
          (s: string) => s.trim().length > 0
        ),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('industries_updated', Date.now().toString());
        }
        toast.success(
          isNew ? 'Industry vertical created successfully!' : 'Industry vertical updated successfully!'
        );
        setEditingIndustry(null);
        fetchIndustries();
      } else {
        toast.error(data.error || 'Failed to save industry');
      }
    } catch {
      toast.error('Network error saving industry');
    } finally {
      setSaving(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const item = iconOptions.find((o) => o.name === iconName);
    return item ? item.icon : Factory;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            Industries Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage industry verticals, photos, descriptions, and workforce roles shown across the website.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Industry</span>
        </button>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold font-display text-brand-navy">
            Active & Inactive Industry Sectors ({industries.length})
          </h2>
          <span className="text-xs text-slate-400">Ordered by display ranking</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading industries data...</div>
        ) : industries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No industry verticals found. Click &quot;Add New Industry&quot; above to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Industry Sector</th>
                  <th className="p-4">Icon & Slug</th>
                  <th className="p-4">Supplied Roles</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Order</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {industries.map((ind) => {
                  const Icon = getIconComponent(ind.icon_name);
                  const roles = Array.isArray(ind.workforce_types)
                    ? ind.workforce_types
                    : [];

                  return (
                    <tr key={ind.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-12 rounded-xl overflow-hidden bg-brand-navy shrink-0 border border-slate-200">
                            {ind.image_url ? (
                              <Image
                                src={ind.image_url}
                                alt={ind.name}
                                fill
                                unoptimized={true}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/50">
                                <Icon className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-brand-navy text-sm">{ind.name}</p>
                            <p className="text-slate-500 text-[11px] line-clamp-1 max-w-sm mt-0.5">
                              {ind.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-blue">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="font-mono text-slate-500 text-[11px]">/{ind.slug}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {roles.slice(0, 3).map((r: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-700"
                            >
                              {r}
                            </span>
                          ))}
                          {roles.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-semibold self-center">
                              +{roles.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ind.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              ind.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          {ind.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="p-4 font-mono font-bold text-slate-700 text-xs">
                        #{ind.display_order}
                      </td>

                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(ind)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue text-slate-600 transition-colors"
                            title="Edit Industry"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(ind.id)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-400 transition-colors"
                            title="Delete Industry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {editingIndustry && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-lg font-bold font-display text-brand-navy">
                  {isNew ? 'Create New Industry Sector' : `Edit: ${editingIndustry.name}`}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update title, sector description, icon, photo, and workforce tags
                </p>
              </div>
              <button
                onClick={() => setEditingIndustry(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Row 1: Name and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Industry Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingIndustry.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      if (isNew) {
                        const slug = name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                        setEditingIndustry({ ...editingIndustry, name, slug });
                      } else {
                        setEditingIndustry({ ...editingIndustry, name });
                      }
                    }}
                    placeholder="e.g. Automobile & Industrial Manufacturing"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingIndustry.slug}
                    onChange={(e) =>
                      setEditingIndustry({ ...editingIndustry, slug: e.target.value })
                    }
                    placeholder="e.g. automobile-manufacturing"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Row 2: Icon, Status, Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Sector Icon
                  </label>
                  <select
                    value={editingIndustry.icon_name || 'Factory'}
                    onChange={(e) =>
                      setEditingIndustry({ ...editingIndustry, icon_name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Status
                  </label>
                  <select
                    value={editingIndustry.status || 'active'}
                    onChange={(e) =>
                      setEditingIndustry({ ...editingIndustry, status: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
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
                    value={editingIndustry.display_order || 0}
                    onChange={(e) =>
                      setEditingIndustry({
                        ...editingIndustry,
                        display_order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sector Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingIndustry.description || ''}
                  onChange={(e) =>
                    setEditingIndustry({ ...editingIndustry, description: e.target.value })
                  }
                  placeholder="Summarize the workforce supplied and industrial relevance..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Row 4: Photo / Image Upload */}
              <ImageUploadField
                label="Industry Sector Image"
                description="Upload an image from your device or paste a URL for this industry card."
                value={editingIndustry.image_url || ''}
                defaultImage="/images/industries/automobile.jpg"
                onChange={(url) => setEditingIndustry({ ...editingIndustry, image_url: url })}
                category="industries"
              />

              {/* Row 5: Supplied Workforce Types / Roles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Supplied Roles & Workforce Types
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingIndustry({
                        ...editingIndustry,
                        workforce_types: [...(editingIndustry.workforce_types || []), ''],
                      })
                    }
                    className="text-xs text-brand-blue font-bold hover:underline"
                  >
                    + Add Role
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingIndustry.workforce_types || []).map((role: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => {
                          const list = [...editingIndustry.workforce_types];
                          list[idx] = e.target.value;
                          setEditingIndustry({ ...editingIndustry, workforce_types: list });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="e.g. Robotic Welders, Assembly Helpers, Quality Techs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const list = editingIndustry.workforce_types.filter(
                            (_: any, i: number) => i !== idx
                          );
                          setEditingIndustry({ ...editingIndustry, workforce_types: list });
                        }}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingIndustry(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Industry Sector'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
