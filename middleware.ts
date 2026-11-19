import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'nexgen_enterprise_super_secret_jwt_key_2026_guarantee_secure_auth'
);

const TOKEN_COOKIE_NAME = 'nexgen_admin_token';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // 1. If visiting /admin or /admin/dashboard routes, require valid JWT token
  if (pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(TOKEN_COOKIE_NAME);
      return res;
    }
  }

  // 2. If already logged in and visiting /admin/login, redirect to /admin/dashboard
  if (pathname === '/admin/login') {
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      } catch {
        // Token invalid, stay on login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
