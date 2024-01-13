import { env } from 'process';
import React from 'react';
import Link from 'next/link';
import { CursorClickIcon, UsersIcon } from '@/assets';

import { kvKeys } from '@/config/kv';
import { navigationItems } from '@/config/nav';
import { prettifyNumber } from '@/lib/math';
import redis from '@/lib/redis';
import { Container } from '@/components/ui/Container';

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-lime-500 dark:hover:text-lime-400"
    >
      {children}
    </Link>
  );
}
function Links() {
  return (
    <nav className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      {navigationItems.map(({ href, text }) => (
        <NavLink key={href} href={href}>
          {text}
        </NavLink>
      ))}
    </nav>
  );
}
async function TotalPageViews() {
  let views: number;
  if (env.VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.totalPageViews);
  } else {
    views = 345678;
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <UsersIcon className="h-4 w-4" />
      <span title={`${Intl.NumberFormat('en-US').format(views)}次浏览`}>
        总浏览量&nbsp;
        <span className="font-medium">{prettifyNumber(views, true)}</span>
      </span>
    </span>
  );
}
type VisitorGeolocation = {
  country: string;
  city?: string;
  flag: string;
};
async function LastVisitorInfo() {
  // Displays the previous address of the current access user
  let lastVisitor: VisitorGeolocation | undefined = undefined;
  if (env.VERCEL_ENV === 'production') {
    const [lv, cv] = await redis.mget(
      [kvKeys.lastVisitor, kvKeys.currentVisitor],
      () => {}
    );
    lastVisitor = lv ? JSON.parse(lv) : undefined;
    // The current user address is saved and displayed for the next user visit
    await redis.set(
      kvKeys.lastVisitor,
      cv ??
        JSON.stringify({
          country: 'US',
          flag: '🇺🇸',
        })
    );
  }

  if (!lastVisitor) {
    lastVisitor = {
      country: 'US',
      flag: '🇺🇸',
    };
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <CursorClickIcon className="h-4 w-4" />
      <span>
        最近访客来自&nbsp;
        {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
      </span>
      <span className="font-medium">{lastVisitor.flag}</span>
    </span>
  );
}

export async function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="mx-auto mb-8 max-w-md"></div>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="text-sm text-zinc-500/80 dark:text-zinc-400/80">
                &copy; {new Date().getFullYear()} Larthur. Copy： GitHub
              </p>
              <Links />
            </div>
          </Container.Inner>
          <Container.Inner className="mt-6">
            <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
              <React.Suspense>{<TotalPageViews />}</React.Suspense>
              <React.Suspense>{<LastVisitorInfo />}</React.Suspense>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
