export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { SettingsModel } from '@/models/Settings';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const stats = await SettingsModel.getStatistics();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, label, value, numeric_value, suffix } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await SettingsModel.updateStatistic(id, { label, value, numeric_value, suffix });
    return NextResponse.json({ success: true, message: 'Statistic updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
