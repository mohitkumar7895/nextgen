'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('admin@nexgen.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back, Admin!');
      router.push('/admin/dashboard');
    } else {
      setErrorMessage(result.error || 'Invalid credentials');
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy p-4 relative overflow-hidden">
      {/* Background Lighting Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Card */}
        <div className="text-center mb-8">
          <div className="relative w-44 h-14 mx-auto mb-2">
            <Image
              src="/logo/logologo.jpeg"
              alt="NexGen Workforce Services"
              fill
              priority
              className="object-contain rounded-md"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-brand-bright font-bold">
            Administrative Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black font-display text-brand-navy">
              Admin Sign In
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your authorized credentials to access the NexGen CMS
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="mb-6 p-3.5 rounded-2xl bg-brand-light border border-slate-200 text-xs text-slate-700">
            <div className="flex items-center justify-between font-bold text-brand-navy mb-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Default Credentials
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@nexgen.com');
                  setPassword('admin123');
                  toast.info('Credentials filled!');
                }}
                className="text-brand-blue hover:underline text-[11px]"
              >
                Auto-Fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-600 space-y-0.5">
              <p>Email: <strong>admin@nexgen.com</strong></p>
              <p>Pass: <strong>admin123</strong></p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexgen.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy hover:from-brand-navy hover:to-brand-blue text-white font-bold text-sm shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-brand-blue font-semibold transition-colors"
            >
              ← Return to Main Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
