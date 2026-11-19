export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { execute, query } from '@/lib/db';
import { ContactMessageSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;
    const res = await execute(
      `INSERT INTO contact_messages (name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, 'unread');`,
      [name, email, phone || null, subject || null, message]
    );

    return NextResponse.json({
      success: true,
      id: res.insertId,
      message: 'Your message has been sent successfully! Our team will respond shortly.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const rows = await query<any>('SELECT * FROM contact_messages ORDER BY created_at DESC;');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
