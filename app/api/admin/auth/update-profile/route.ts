import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, verifyPassword, hashPassword } from '@/lib/auth';
import { AdminModel } from '@/models/Admin';
import { ChangePasswordSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    const currentAdmin = await AdminModel.findById(session.id);
    if (!currentAdmin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    if (action === 'password') {
      const parsed = ChangePasswordSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.errors[0]?.message || 'Invalid password data' },
          { status: 400 }
        );
      }

      const isCurrentMatch = await verifyPassword(parsed.data.currentPassword, currentAdmin.password_hash);
      if (!isCurrentMatch) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      const newHash = await hashPassword(parsed.data.newPassword);
      await AdminModel.updatePassword(session.id, newHash);
      return NextResponse.json({ success: true, message: 'Password updated successfully' });
    }

    if (action === 'profile') {
      const { name, email } = body;
      if (!name || !email) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
      }

      await AdminModel.updateProfile(session.id, name.trim(), email.toLowerCase().trim());
      return NextResponse.json({ success: true, message: 'Profile updated successfully' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
