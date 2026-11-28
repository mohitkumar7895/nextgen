'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Upload,
  Copy,
  Check,
  ImageIcon,
  Trash2,
  FolderOpen,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MediaManagementPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('general');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/upload');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      setUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Image uploaded successfully to server!');
        fetchMedia();
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch {
      toast.error('Network error during upload');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success('Image URL copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy">
            Media Management & Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload and manage logos, banners, team photographs, and facility media.
          </p>
        </div>

        {/* Upload Button with Category Selector */}
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 font-semibold"
          >
            <option value="general">General Media</option>
            <option value="logo">Brand Logos</option>
            <option value="banner">Hero Banners</option>
            <option value="services">Service Photos</option>
          </select>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Preset Default Brand Assets */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold font-display text-brand-navy">
          Core Brand Assets (SVG & PNG)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-brand-light border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-8">
                <Image src="/logo/nexgen-logo.svg" alt="NexGen Logo" fill className="object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">Logo (Color)</span>
            </div>
            <button
              onClick={() => copyToClipboard('/logo/nexgen-logo.svg')}
              className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-brand-blue"
              title="Copy path"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-brand-navy border border-brand-blue/30 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-8">
                <Image src="/logo/nexgen-logo-white.svg" alt="NexGen Logo White" fill className="object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-200">Logo (White)</span>
            </div>
            <button
              onClick={() => copyToClipboard('/logo/nexgen-logo-white.svg')}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              title="Copy path"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-brand-light border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/logo/nexgen-icon.svg" alt="NexGen Icon" fill className="object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">Emblem Icon</span>
            </div>
            <button
              onClick={() => copyToClipboard('/logo/nexgen-icon.svg')}
              className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-brand-blue"
              title="Copy path"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Media Gallery */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold font-display text-brand-navy">
          Uploaded Media Files ({mediaList.length})
        </h3>

        {mediaList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-2xl">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p>No uploaded media yet. Click &quot;Upload Image&quot; above to add images.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaList.map((m) => (
              <div
                key={m.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col"
              >
                <div className="relative h-36 w-full bg-slate-200">
                  <Image
                    src={m.file_url}
                    alt={m.alt_text || m.original_name}
                    fill
                    unoptimized={true}
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="p-3 bg-white flex items-center justify-between border-t border-slate-100">
                  <div className="truncate mr-2">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {m.original_name}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase">
                      {m.media_category}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(m.file_url)}
                    className="p-1.5 rounded-lg hover:bg-brand-blue/10 text-brand-blue shrink-0"
                    title="Copy Image URL"
                  >
                    {copiedUrl === m.file_url ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
