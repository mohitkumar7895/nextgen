export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ServiceModel } from '@/models/Service';
import { getAdminSession } from '@/lib/auth';
import { ServiceFormSchema } from '@/lib/validations';

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
    return NextResponse.json(services);
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
    const parsed = ServiceFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const existing = await ServiceModel.findBySlug(parsed.data.slug);
    if (existing) {
      return NextResponse.json({ error: 'A service with this URL slug already exists' }, { status: 400 });
    }

    const id = await ServiceModel.create(parsed.data as any);
    return NextResponse.json({ success: true, id, message: 'Service created successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
