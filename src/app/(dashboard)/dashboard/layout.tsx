import '@/styles/globals.css';

import { Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/app/(main)/Footer';
import { QueryProvider } from '@/app/QueryProvider';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center ">
        <div className="flex w-full ">
          <div className="w-full bg-zinc-50/90 ring-1 ring-zinc-100 dark:bg-zinc-900/80 dark:ring-zinc-400/20" />
        </div>
      </div>
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
    </>
  );
}
