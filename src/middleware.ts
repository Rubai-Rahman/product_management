import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Get token from cookies or headers
  const token =
    request.cookies.get('auth-token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  // If it's a public route and user is authenticated, redirect to products
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  // If it's a protected route and user is not authenticated, redirect to login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
