import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { TailwindIndicator } from '@/components/site/tailwind-indicator';

import '@/styles/globals.css';

import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {/* <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            '[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10',
            fontSans.variable
          )}
        > */}
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <div className=" flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">{children}</div>
        </div>
        <TailwindIndicator />
      </TooltipProvider>
      {/* </body>
      </html> */}
    </>
  );
}
