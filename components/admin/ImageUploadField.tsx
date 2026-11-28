'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, RefreshCw, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  value: string;
  onChange: (url: string) => void;
  defaultImage?: string;
  category?: string;
}

// Client-side high-quality image compressor
async function compressImage(file: File): Promise<{ file: File; dataUrl: string }> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ file, dataUrl: (e.target?.result as string) || '' });
      reader.onerror = () => resolve({ file, dataUrl: '' });
      reader.readAsDataURL(file);
      return;
    }

    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1920;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({ file, dataUrl: '' });
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({ file, dataUrl });
            return;
          }
          const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve({ file: compressedFile, dataUrl });
        },
        'image/jpeg',
        0.88
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ file, dataUrl: '' });
    };
    img.src = url;
  });
}

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  defaultImage,
  category = 'website',
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const displayImage = value || defaultImage || '';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    try {
      setUploading(true);
      // Compress image client-side to ensure it never exceeds Vercel 4.5MB serverless limits
      const { file: compressedFile, dataUrl } = await compressImage(file);

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('category', category);
      formData.append('alt_text', label);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.url) {
        onChange(data.url);
        setPreviewError(false);
        toast.success(`${label} uploaded successfully!`);
      } else {
        // Fallback: If Vercel server upload errored, embed high-quality compressed dataUrl directly
        if (dataUrl) {
          onChange(dataUrl);
          setPreviewError(false);
          toast.success(`${label} image selected! Click "Save" to apply.`);
        } else {
          toast.error(data?.error || 'Failed to upload image. Please try again.');
        }
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Network issue during upload. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleResetToDefault = () => {
    if (defaultImage) {
      onChange('');
      setPreviewError(false);
      toast.info(`Reset to default image.`);
    }
  };

  const handleClear = () => {
    onChange('');
    setPreviewError(false);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-brand-light/60 border border-slate-200 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {defaultImage && value && value !== defaultImage && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-brand-blue bg-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
              title="Reset back to default template image"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>
          )}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 bg-white px-2 py-1 rounded-lg border border-slate-200 transition-colors"
              title="Clear custom image"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Image Preview Box */}
        <div className="sm:col-span-4 relative h-32 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner flex items-center justify-center group">
          {displayImage && !previewError ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImage}
                alt={label}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                onError={() => setPreviewError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                <span className="font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                  {value ? 'Custom Image' : 'Default Image'}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
              </div>
            </>
          ) : (
            <div className="text-center p-3 text-slate-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-500 opacity-60" />
              <p className="text-[11px] font-medium">
                {previewError ? 'Unable to load image' : 'No image selected'}
              </p>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
              <RefreshCw className="w-6 h-6 animate-spin text-brand-orange mb-1" />
              <span className="text-xs font-bold">Compressing & Uploading...</span>
            </div>
          )}
        </div>

        {/* Upload Controls & URL Input */}
        <div className="sm:col-span-8 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs shadow-sm transition-all duration-200 disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{uploading ? 'Processing...' : 'Upload Image from Computer/Phone'}</span>
            </button>

            <span className="text-[11px] text-slate-500">
              Auto-optimized for high-speed web loading
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-slate-600">
                Image URL or Path
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {value ? 'Auto-filled on upload or paste custom URL' : 'Currently using default'}
              </span>
            </div>
            <input
              type="text"
              value={value && value.startsWith('data:') ? `[Uploaded Image: ${Math.round(value.length / 1024)} KB]` : value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                setPreviewError(false);
              }}
              placeholder={defaultImage || 'https://... or /uploads/...'}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
