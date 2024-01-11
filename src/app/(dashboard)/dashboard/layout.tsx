import '../../globals.css';
import '../../clerk.css';
import '../../prism.css';

import { Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/app/(main)/Footer';
import { QueryProvider } from '@/app/QueryProvider';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="relative text-zinc-800 dark:text-zinc-200">
        <Header />
        <main>{children}</main>
        <Toaster />
        <Suspense>
          <Footer />
        </Suspense>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
}
