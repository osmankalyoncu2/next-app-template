"use client"

import Link from "next/link"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { cn } from '@/lib/utils/utils';
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { AppCustomisation } from '@/lib/app/customisation';
import Search from '@/components/aui/SearchBar';
import getDeviceType from '@/lib/utils/deviceType';
import { signOut, useSession } from 'next-auth/react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Prop Types
import PropTypes from 'prop-types'

Navigation.propTypes = {
    children: PropTypes.node,
    defaultCollapsed: PropTypes.bool,
    defaultLayout: PropTypes.arrayOf(PropTypes.number),
};

export default function Navigation({
    children,
    defaultCollapsed = false,
    defaultLayout = [15, 85],
}) {
    const [navigation, setNavigation] = useState(AppCustomisation.navigation);
    const pathname = usePathname();
    const admin_navigation = AppCustomisation.admin;
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const [deviceType, setDeviceType] = useState('unknown');

    const { data: session } = useSession();

    useEffect(() => {
        setDeviceType(getDeviceType());
    }, []);

    // if the user is an admin then combine the admin navigation with the navigation
    useEffect(() => {
        if (session?.user && session.user.role === 'admin') {
            setNavigation([...AppCustomisation.navigation, ...admin_navigation]);
        }
    }, [session, admin_navigation]);

    // if the current path starts with the path of the navigation item, then display the navigation provider
    if (!navigation.some((item) => pathname.startsWith(item.href))) return children;

    let shortcut;
    if (deviceType === 'windows') {
        shortcut = 'Ctrl+K';
    } else if (deviceType === 'mac') {
        shortcut = '⌘+K';
    } else {
        shortcut = 'Search...';
    }

    return (
        <TooltipProvider>
            <Search open={openSearchBar} setOpen={setOpenSearchBar} items={navigation} />
            <div className='h-screen'>
                <ResizablePanelGroup
                    direction="horizontal"
                    onLayout={(sizes) => {
                        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                            sizes
                        )}`
                    }}
                    className="h-full items-stretch"
                >
                    <ResizablePanel
                        defaultSize={defaultLayout[0]}
                        collapsedSize={0}
                        collapsible={true}
                        minSize={10}
                        maxSize={25}
                        // instead of using onCollapse or onExpand which is unreliable, we'll use onResize which returns data that we can use to determine if the panel is collapsed or not
                        onResize={(size) => {
                            if (size === 0) {
                                setIsCollapsed(true);
                                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                                    true
                                )}`
                            } else {
                                setIsCollapsed(false);
                                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                                    false
                                )}`
                            }
                        }}
                        className={cn(isCollapsed && "transition-all duration-300 ease-in-out", "min-w-[50px]")}
                    >
                        <div className={cn("flex h-[52px] items-center justify-center border-b", isCollapsed ? 'h-[52px]' : 'px-1')}>
                            <AccountManager isCollapsed={isCollapsed} />
                        </div>
                        <div
                            className="flex flex-col h-[calc(100%-60px)]"
                        >
                            {Sidebar({ isCollapsed: isCollapsed, items: navigation, pathname: pathname })}
                            {isCollapsed ? (
                                <Tooltip key="settings-index" delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <div
                                            className="mt-auto w-full px-2"
                                        >
                                            <Link
                                                href={AppCustomisation.settings.page.href}
                                                className={cn(
                                                    buttonVariants({ variant: 'ghost', size: "icon" }),
                                                    "size-9 w-full"
                                                )}
                                            >
                                                <AppCustomisation.settings.page.icon
                                                    className="size-5"
                                                />
                                                <span className="sr-only">Settings</span>
                                            </Link>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="flex items-center gap-4">
                                        Settings
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <div
                                    className="px-1 mt-auto w-full"
                                >
                                    <Link
                                        href={AppCustomisation.settings.page.href}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: "sm" }),
                                            "justify-start w-full",
                                        )}
                                    >
                                        <AppCustomisation.settings.page.icon
                                            className="size-5 mr-2"
                                        />
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={30} defaultSize={defaultLayout[1]}>
                        <div className="h-screen max-h-screen">
                            <div className={cn(
                                "sticky top-0 z-40 backdrop-blur-3xl bg-transparent border-primary-800",
                            )}>
                                <div className="relative flex flex-1 cursor-text h-[52px] border-b">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <button
                                        id="search-field"
                                        className="relative h-full w-full border-0 py-0 pr-0 text-primary placeholder:text-primary-200 focus:ring-0 sm:text-sm bg-transparent flex items-center"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpenSearchBar(true);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setOpenSearchBar(true);
                                            }
                                        }}
                                    >
                                        <Badge
                                            className='rounded-md'
                                            variant="outline"
                                        >
                                            {shortcut}
                                        </Badge>
                                        <span className='ml-2'>
                                            {deviceType === 'windows' || deviceType === 'mac'
                                                ? 'Search for anything...'
                                                : ''}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <ScrollArea className="relative h-[calc(100vh-52px)]">
                                <div
                                    className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
                                >
                                    {children}
                                </div>
                            </ScrollArea>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </TooltipProvider >
    )
}

AccountManager.propTypes = {
    isCollapsed: PropTypes.bool,
    accounts: PropTypes.arrayOf(
        PropTypes.shape({
            email: PropTypes.string,
            label: PropTypes.string,
            icon: PropTypes.node,
        })
    ),
};

function AccountManager({
    isCollapsed = false,
    accounts = [
        {
            email: "arsen@makenext.app",
            label: "Arsen",
            icon: (
                <Image
                    src={AppCustomisation.branding.logos.mini.src}
                    alt={AppCustomisation.branding.logos.mini.alt}
                    width={16}
                    height={16}
                    className="rounded-full"
                />
            ),
        },
    ]
}) {
    const [selectedAccount, setSelectedAccount] = useState(accounts[0].email)

    return (
        <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger
                className={cn(
                    "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                    isCollapsed &&
                    "flex size-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
                )}
                aria-label="Select account"
            >
                <SelectValue placeholder="Select an account">
                    {accounts.find((account) => account.email === selectedAccount)?.icon}
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                        {
                            accounts.find((account) => account.email === selectedAccount)
                                ?.label
                        }
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {accounts.map((account) => (
                    <SelectItem key={account.email} value={account.email}>
                        <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                            {account.icon}
                            {account.email}
                        </div>
                    </SelectItem>
                ))}
                <Separator className="my-1" />
                <Button
                    className="w-full"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        signOut();
                    }}
                >
                    Signout
                </Button>
            </SelectContent>
        </Select>
    )
}

Sidebar.propTypes = {
    isCollapsed: PropTypes.bool,
    pathname: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            href: PropTypes.string,
            icon: PropTypes.node,
            no_display: PropTypes.bool,
            label: PropTypes.string,
        })
    ),
};

function Sidebar({
    isCollapsed = false,
    pathname,
    items = []
}) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="relative group flex flex-col py-2 data-[collapsed=true]:py-2 min-w-[50px]"
        >
            <nav className="grid gap-1.5 px-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {items.map((item) => {
                    if (item.no_display) return null;
                    if (item.href === pathname) { item.variant = 'default' } else { item.variant = 'ghost' };

                    return isCollapsed ? (
                        <Tooltip key={item.name} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: item.variant, size: "icon" }),
                                        "size-9",
                                        item.variant === "default" &&
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    <item.icon className="size-5" />
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                                {item.name}
                                {item.label && (
                                    <span className="ml-auto text-muted-foreground">
                                        {item.label}
                                    </span>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: item.variant, size: "sm" }),
                                item.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start"
                            )}
                        >
                            <item.icon className="mr-2 size-5" />
                            {item.name}
                            {item.label && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        item.variant === "default" &&
                                        "text-background dark:text-white"
                                    )}
                                >
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}