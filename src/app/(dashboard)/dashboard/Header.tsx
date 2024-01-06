'use client';
import { GitHubBrandIcon, GoogleBrandIcon, MailIcon } from '@/assets';
import { Avatar } from '@/components/Avatar';
import { ThemeSwitcher } from '@/components/site/ThemeSwitcher';
import { Container } from '@/components/ui/Container';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { dashboardNavigationItems } from '@/config/nav';
import { url } from '@/lib';
import { clsxm } from '@/lib/helper';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Header() {
    const pathname = usePathname();
    const isCreatePost=pathname==='/dashboard' || pathname==='/dashboard/posts';

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
            <div
                className="top-0 z-10 h-16 pt-6"
            >
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
                        <div className="flex flex-1 justify-left">

                            <NavigationMenu>
                                <NavigationMenuList>
                                    {dashboardNavigationItems.map(({ href, text }) => (
                                        <Items href={href} key={href} >
                                            {text}
                                        </Items>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        {isCreatePost &&(<CreatePostButton />)}
                        <UserIcon pathname={pathname} />
                        <div className="pointer-events-auto">
                            <ThemeSwitcher />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
function UserIcon({ pathname }: { pathname: string }) {
    const { user } = useUser();
    const StrategyIcon = React.useMemo(() => {
        const strategy = user?.primaryEmailAddress?.verification.strategy;
        if (!strategy) {
            return null;
        }
        switch (strategy) {
            case 'from_oauth_github':
                return GitHubBrandIcon as (
                    props: React.ComponentProps<'svg'>
                ) => JSX.Element;
            case 'from_oauth_google':
                return GoogleBrandIcon;
            default:
                return MailIcon;
        }
    }, [user?.primaryEmailAddress?.verification.strategy]);
    return (
        <AnimatePresence>
            <SignedIn key="user-info">
                <motion.div
                    className="pointer-events-auto relative flex h-10 items-center"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                >
                    <UserButton
                        afterSignOutUrl={url(pathname).href}
                        appearance={{
                            elements: {
                                avatarBox: 'w-9 h-9 ring-2 ring-white/20',
                            },
                        }}
                    />
                    {StrategyIcon && (
                        <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 select-none items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                            <StrategyIcon className="h-3 w-3" />
                        </span>
                    )}
                </motion.div>
            </SignedIn>
        </AnimatePresence>

    );
};
function Items({ href, children }: { href: string, children: React.ReactNode }) {
    const isActivity = usePathname() === href;
    return (
        <NavigationMenuItem >
            <Link href={href}
                className={clsxm(
                    //   "relative block whitespace-nowrap px-3 py-2 transition",
                    isActivity
                        ? "text-lime-600 dark:text-lime-400"
                        : "hover:text-lime-600 dark:hover:text-lime-400"
                )}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {children}
                </NavigationMenuLink>
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
