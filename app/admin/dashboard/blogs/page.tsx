'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  X,
  Save,
  BookOpen,
  Calendar,
  Clock,
  User,
  ExternalLink,
} from 'lucide-react';
import { BlogItem } from '@/models/Blog';
import { formatShortDate } from '@/lib/utils';
import { toast } from 'sonner';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

const CATEGORIES = [
  'Workforce Management',
  'Compliance & Regulations',
  'Staffing Insights',
  'Industrial Safety',
  'Facility Operations',
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Workforce Management',
    author: 'Nakul Chavada',
    read_time: '4 min read',
    image_url:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    is_featured: false,
    status: 'published' as 'published' | 'draft',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/blogs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Workforce Management',
      author: 'Nakul Chavada',
      read_time: '4 min read',
      image_url:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      status: 'published',
      excerpt: '',
      content: '',
      meta_title: '',
      meta_description: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      author: blog.author,
      read_time: blog.read_time,
      image_url: blog.image_url,
      is_featured: !!blog.is_featured,
      status: blog.status,
      excerpt: blog.excerpt,
      content: blog.content,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingBlog ? prev.slug : slug,
    }));
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error('Please fill in title, excerpt, and content.');
      return;
    }

    try {
      setSaving(true);
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && (data.success || data.id)) {
        toast.success(
          editingBlog ? 'Blog article updated successfully!' : 'Blog article published!'
        );
        setModalOpen(false);
        fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to save blog post.');
      }
    } catch {
      toast.error('Network error. Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Blog article deleted');
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error('Failed to delete blog article');
      }
    } catch {
      toast.error('Network error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-brand-navy">
            Blog & Articles Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish, edit, and manage industry insights, statutory compliance guides, and workforce news.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold text-xs sm:text-sm shadow-orange-glow hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchBlogs();
          }}
          className="relative w-full sm:w-80"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, category, or excerpt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="all">All Statuses ({total})</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500 space-y-2">
            <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading blog articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">No Articles Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Get started by creating your first workforce blog article.
            </p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold"
            >
              Write First Article
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-brand-navy">
                          <Image
                            src={b.image_url}
                            alt={b.title}
                            fill
                            unoptimized={true}
                            className="object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{b.title}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{b.excerpt}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand-navy font-semibold border border-slate-200 text-[11px]">
                        {b.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-700">{b.author}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {formatShortDate(b.created_at)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-blue hover:bg-slate-100 transition-colors"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-orange hover:bg-slate-100 transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteBlog(b.id, b.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-display text-brand-navy">
                  {editingBlog ? 'Edit Blog Article' : 'Write New Workforce Article'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  All changes will reflect live on the website immediately.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navigating Industrial Manpower Demand in Gujarat"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. industrial-manpower-demand"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Article Feature / Cover Image"
                description="Displayed in blog grids, cards, and at the top of the article."
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                category="blogs"
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Excerpt / Executive Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise 2-sentence summary of the article..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Article Body (Supports paragraphs & ### headings) *
                </label>
                <textarea
                  required
                  rows={7}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the complete article body here. Use '### Section Name' for headings..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <label htmlFor="is_featured" className="text-xs font-bold text-slate-700">
                    Feature on Blog Homepage Spotlight
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-brand-orange" />
                  <span>{saving ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
