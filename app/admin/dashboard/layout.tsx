'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Search,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Website Content', href: '/admin/dashboard/content', icon: FileText },
  { name: 'Services Management', href: '/admin/dashboard/services', icon: Briefcase },
  { name: 'Blog & Articles', href: '/admin/dashboard/blogs', icon: BookOpen },
  { name: 'Inquiries & Quotes', href: '/admin/dashboard/inquiries', icon: Users },
  { name: 'Contact & Messages', href: '/admin/dashboard/contact', icon: MessageSquare },
  { name: 'Media Library', href: '/admin/dashboard/media', icon: ImageIcon },
  { name: 'SEO & Meta Tags', href: '/admin/dashboard/seo', icon: Search },
  { name: 'Admin Settings', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname() || '';
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If loading, display brand loading screen
  if (loading) {
    return <LoadingScreen message="Verifying administrative access..." />;
  }

  // If not logged in, prompt to login
  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/admin/login');
    }
    return <LoadingScreen message="Redirecting to login..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Header */}
      <header className="lg:hidden bg-brand-navy text-white px-4 py-3 flex items-center justify-between border-b border-brand-blue/30 sticky top-0 z-40">
        <Link href="/admin/dashboard" className="relative w-32 h-9">
          <Image
            src="/logo/logologo.jpeg"
            alt="NexGen Admin"
            fill
            className="object-contain object-left rounded"
          />
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-navy text-slate-300 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Brand Logo */}
          <div className="p-6 border-b border-slate-700/60 flex items-center justify-between">
            <Link href="/admin/dashboard" className="block relative w-40 h-11">
              <Image
                src="/logo/logologo.jpeg"
                alt="NexGen Workforce Services"
                fill
                className="object-contain object-left rounded"
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin/dashboard'
                  ? pathname === '/admin/dashboard'
                  : Boolean(pathname && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-orange" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Live Site Actions */}
        <div className="p-4 border-t border-slate-700/60 space-y-3">
          {/* View Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-brand-bright hover:text-white text-xs font-semibold transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </div>
            <span className="text-[10px] text-slate-400">Opens tab</span>
          </a>

          {/* User Badge */}
          <div className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
