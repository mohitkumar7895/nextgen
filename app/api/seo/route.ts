export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { SeoModel } from '@/models/SEO';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const route = searchParams.get('route');

    if (route) {
      const item = await SeoModel.getByRoute(route);
      return NextResponse.json(item || {});
    }

    const items = await SeoModel.getAll();
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await SeoModel.save(body);
    return NextResponse.json({ success: true, message: 'SEO metadata saved successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
