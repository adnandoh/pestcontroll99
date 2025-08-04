import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // Check if the request is coming from the non-www domain
  if (host === 'pestcontrol99.com') {
    // Redirect to www version
    url.host = 'www.pestcontrol99.com';
    url.protocol = 'https:';
    
    return NextResponse.redirect(url, 301);
  }

  // Handle trailing slash for www domain
  if (host === 'www.pestcontrol99.com' || host?.includes('localhost')) {
    const pathname = url.pathname;
    
    // Add trailing slash if it doesn't exist and it's not a file
    if (!pathname.endsWith('/') && !pathname.includes('.')) {
      url.pathname = pathname + '/';
      return NextResponse.redirect(url, 301);
    }
  }

  // Continue with the request if it's already www or localhost
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