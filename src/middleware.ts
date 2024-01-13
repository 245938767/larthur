import { env } from 'process';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import countries from '~/lib/countries.json';

import { kvKeys } from './config/kv';
// import redis from './lib/redis';

async function beforeAuthMiddleware(req: NextRequest) {
  const { geo, nextUrl } = req;
  if (geo && env.VERCEL_ENV === 'production') {
    const country = geo.country;
    const city = geo.city;

    const countryInfo = countries.find((x) => x.cca2 === country);
    if (countryInfo) {
      const flag = countryInfo.flag;
      // await redis.set(
      //   kvKeys.currentVisitor,
      //   JSON.stringify({ country, city, flag })
      // );
    }
  }
  return NextResponse.next();
}

export default authMiddleware({
  beforeAuth: beforeAuthMiddleware,
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
