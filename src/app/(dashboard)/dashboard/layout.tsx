import { Suspense } from 'react';

import { Footer } from '@/app/(main)/Footer';
import { QueryProvider } from '@/app/QueryProvider';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="relative text-zinc-800 dark:text-zinc-200">
        <Header />
        <main>{children}</main>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </QueryProvider>
  );
}
