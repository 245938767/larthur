import { Suspense } from 'react';

import { Footer } from '@/app/(main)/Footer';
import { QueryProvider } from '@/app/QueryProvider';

import Header from './Header';
import { Container } from '@/components/ui/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="relative text-zinc-800 dark:text-zinc-200">
        <Header />
        <main><Container className='mt-10'>{children}</Container></main>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </QueryProvider>
  );
}
