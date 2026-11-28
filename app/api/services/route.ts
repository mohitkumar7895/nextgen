export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ServiceModel } from '@/models/Service';
import { getAdminSession } from '@/lib/auth';
import { ServiceFormSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    if (all) {
      const session = await getAdminSession();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const services = await ServiceModel.getAllAdmin();
      return NextResponse.json(services);
    }

    const services = await ServiceModel.getAllActive();
    const res = NextResponse.json(services);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  } catch (error: any) {
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

    // Auto-generate & sanitize slug
    let rawSlug = body.slug || body.title || '';
    let cleanSlug = slugify(rawSlug);
    if (!cleanSlug) {
      cleanSlug = `service-${Date.now().toString().slice(-4)}`;
    }

    // Auto-disambiguate slug if already exists in DB so service creation never fails
    let uniqueSlug = cleanSlug;
    let counter = 1;
    while (await ServiceModel.findBySlug(uniqueSlug)) {
      uniqueSlug = `${cleanSlug}-${counter}`;
      counter++;
    }
    body.slug = uniqueSlug;

    // Provide default short description if empty
    if (!body.short_description || body.short_description.trim() === '') {
      body.short_description = body.subtitle || `Professional ${body.title || 'workforce'} services provided by NexGen across Gujarat.`;
    }

    const parsed = ServiceFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const id = await ServiceModel.create(parsed.data as any);
    return NextResponse.json({
      success: true,
      id,
      slug: parsed.data.slug,
      message: 'Service created successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
