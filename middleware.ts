import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const isRegistered = request.cookies.get('registered')?.value === 'true'
  const formSubmitted = request.cookies.get('formSubmitted')?.value === 'true'
  const adminAccess = request.cookies.get('adminAccess')?.value === 'true'
  const path = request.nextUrl.pathname

  // Clear all cookies when accessing register page
  if (path === '/register') {
    const response = NextResponse.next()
    response.cookies.delete('registered')
    response.cookies.delete('formSubmitted')
    response.cookies.delete('adminAccess')
    return response
  }

  // Dashboard specific protection - check this before main protection
  if (path === '/dashboard') {
    if (!adminAccess) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // Main route protection
  if (!isRegistered && path !== '/register') {
    return NextResponse.redirect(new URL('/register', request.url))
  }

  // Route-specific flow control
  switch (path) {
    case '/':
      if (!isRegistered) {
        return NextResponse.redirect(new URL('/register', request.url))
      }
      break

    case '/patients':
      if (isRegistered && !formSubmitted) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/', request.url))

    case '/success':
      if (!formSubmitted) {
        return NextResponse.redirect(new URL('/patients', request.url))
      }
      break
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/register',
    '/patients',
    '/success',
    '/dashboard',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
