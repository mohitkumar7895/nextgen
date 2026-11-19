export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { SettingsModel } from '@/models/Settings';
import { getAdminSession } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = parseInt(params.id, 10);
    const body = await req.json();
    await SettingsModel.saveIndustry({ ...body, id });
    return NextResponse.json({ success: true, message: 'Industry updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = parseInt(params.id, 10);
    await SettingsModel.deleteIndustry(id);
    return NextResponse.json({ success: true, message: 'Industry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
