import { NextRequest, NextResponse } from 'next/server';
import { AdminModel } from '@/models/Admin';
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth';
import { AdminLoginSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AdminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const admin = await AdminModel.findByEmail(email);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, admin.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    await AdminModel.updateLastLogin(admin.id);

    const sessionPayload = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    const token = await createSessionToken(sessionPayload);
    setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: sessionPayload,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
