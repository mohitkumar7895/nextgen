export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { SettingsModel } from '@/models/Settings';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const settings = await SettingsModel.getAllSettings();
    const res = NextResponse.json(settings);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await SettingsModel.updateSettings(body);
    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
