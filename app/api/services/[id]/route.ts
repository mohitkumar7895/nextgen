export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ServiceModel } from '@/models/Service';
import { getAdminSession } from '@/lib/auth';
import { ServiceFormSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      // If it's a slug, fetch by slug
      const service = await ServiceModel.findBySlug(params.id);
      if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(service);
    }

    const service = await ServiceModel.findById(id);
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const body = await req.json();

    // Auto-generate & sanitize slug
    let rawSlug = body.slug || body.title || '';
    let cleanSlug = slugify(rawSlug);
    if (!cleanSlug) {
      cleanSlug = `service-${id}`;
    }

    // Check slug collision
    let uniqueSlug = cleanSlug;
    let counter = 1;
    while (true) {
      const existing = await ServiceModel.findBySlug(uniqueSlug);
      if (!existing || existing.id === id) break;
      uniqueSlug = `${cleanSlug}-${counter}`;
      counter++;
    }
    body.slug = uniqueSlug;

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

    await ServiceModel.update(id, parsed.data as any);
    return NextResponse.json({ success: true, message: 'Service updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await ServiceModel.delete(id);
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
