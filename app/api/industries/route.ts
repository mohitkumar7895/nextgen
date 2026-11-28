export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { SettingsModel } from '@/models/Settings';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const industries = await SettingsModel.getIndustries(!all);
    const res = NextResponse.json(industries);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const id = await SettingsModel.saveIndustry(body);
    return NextResponse.json({ success: true, id, message: 'Industry created successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
