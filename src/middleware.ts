import { NextResponse } from 'next/server';
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      // If the user is admin, allow them to access route
      if (req.nextUrl.pathname.includes('/dashboard')) {
        if (process.env.NEXT_PUBLIC_CLERK_USER_ID === auth.userId) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL('/not-found', req.url));
        }
      }
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
  publicRoutes: ['/', '/blog(.*)', '/projects'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
