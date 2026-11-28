export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { BlogModel } from '@/models/Blog';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : undefined;

    const data = await BlogModel.getAll({ status, category, search, limit, offset });
    const res = NextResponse.json(data);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  } catch (error: any) {
    console.error('Blogs API GET error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json({ error: 'Title, excerpt, and content are required' }, { status: 400 });
    }

    const id = await BlogModel.create(body);
    return NextResponse.json({ success: true, id, message: 'Blog article published successfully' });
  } catch (error: any) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
