'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { dashboardNavigationItems } from '@/config/nav';
import { clsxm } from '@/lib/helper';
import { Container } from '@/components/ui/Container';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Avatar } from '@/components/Avatar';
import { ThemeSwitcher } from '@/components/site/ThemeSwitcher';

export default function Header() {
  const pathname = usePathname();
  const isCreatePost =
    pathname === '/dashboard' || pathname === '/dashboard/posts';

  const [isShowingAltAvatar, setIsShowingAltAvatar] = React.useState(false);
  const onAvatarContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsShowingAltAvatar((prev) => !prev);
    },
    []
  );
  return (
    <>
      <div className="top-0 z-10 h-16 pt-6">
        <Container className=" w-full ">
          <div className="relative flex gap-4">
            <AnimatePresence>
              <motion.div
                layoutId="avatar"
                layout
                onContextMenu={onAvatarContextMenu}
              >
                <Avatar>
                  <Avatar.Image alt={isShowingAltAvatar} />
                </Avatar>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-1 ">
              <NavigationMenu>
                <NavigationMenuList>
                  {dashboardNavigationItems.map(({ href, text }) => (
                    <Items href={href} key={href}>
                      {text}
                    </Items>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            {isCreatePost && <CreatePostButton />}
            <div className="pointer-events-auto">
              <ThemeSwitcher />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
function Items({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActivity = usePathname() === href;
  return (
    <NavigationMenuItem>
      <Link
        href={href}
        className={clsxm(
          'relative block whitespace-nowrap text-sm transition',
          'group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 ',
          'text-sm font-medium',
          isActivity
            ? 'text-lime-600 dark:text-lime-400'
            : 'hover:text-lime-600 dark:hover:text-lime-400'
        )}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  );
}

function CreatePostButton() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className={clsxm(
            'pointer-events-auto relative flex h-10 rounded-full transition-opacity duration-500 hover:opacity-100',
            'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
            'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
            'hover:from-zinc-50/90 hover:to-white/80 hover:shadow-lg hover:shadow-zinc-400/25 hover:ring-1 hover:ring-zinc-400/10',
            'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
            '[--spotlight-color:rgb(236_252_203_/_0.6)] dark:[--spotlight-color:rgb(217_249_157_/_0.07)]'
          )}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
        >
          <Link
            className=" bg-transparent px-3 py-2.5 text-sm font-medium hover:text-lime-600 dark:hover:text-lime-400"
            href={'/dashboard/create'}
          >
            CreatePost
          </Link>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
