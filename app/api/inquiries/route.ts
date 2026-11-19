export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { InquiryModel } from '@/models/Inquiry';
import { getAdminSession } from '@/lib/auth';
import { InquirySchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : undefined;

    const data = await InquiryModel.getAll({ status, search, limit, offset });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const id = await InquiryModel.create(parsed.data);
    return NextResponse.json({
      success: true,
      id,
      message: 'Thank you! Your workforce inquiry has been submitted successfully. Our team will contact you shortly.',
    });
  } catch (error: any) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
