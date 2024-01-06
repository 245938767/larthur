import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { TailwindIndicator } from '@/components/site/tailwind-indicator';

import '@/styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
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
    </>
  );
}
