"use client";

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    Cog6ToothIcon,
    XMarkIcon,
} from '@heroicons/react/16/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { classNames } from '@/lib/utils/classNames';
import { AppCustomisation } from '@/lib/app/customisation';
import Search from '@/components/SearchBar';

export default function NavigationProvider({
    children
}) {
    const [open, setOpen] = useState(false);
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const pathname = usePathname();
    const navigation = AppCustomisation.navigation;

    useEffect(() => {
        if (open) {
            setOpen(false);
        }
    }, [pathname]);

    return (
        <>
            <Search open={openSearchBar} setOpen={setOpenSearchBar} items={navigation} />
            <div>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 backdrop-blur-[2px]" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-primary-50" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-950 px-6 pb-4 border-r border-primary-800">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src={AppCustomisation.branding.logos.mini.src}
                                                alt={AppCustomisation.branding.logos.mini.alt}
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => {
                                                            if (item.no_display) return;
                                                            return (
                                                                <li key={item.name}>
                                                                    <Link
                                                                        href={item.href}
                                                                        className={classNames(
                                                                            item.href === pathname
                                                                                ? 'bg-primary-800 text-primary-50'
                                                                                : 'text-primary-200 hover:text-primary-50 hover:bg-primary-800',
                                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                        )}
                                                                    >
                                                                        <item.icon
                                                                            className={classNames(
                                                                                item.href === pathname
                                                                                    ? 'text-primary-50'
                                                                                    : 'text-primary-200 group-hover:text-primary-50',
                                                                                'h-6 w-6 shrink-0'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    <Link
                                                        href="/settings"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-200 hover:bg-primary-800 hover:text-primary-50"
                                                    >
                                                        <Cog6ToothIcon
                                                            className="h-6 w-6 shrink-0 text-primary-200 group-hover:text-primary-50"
                                                            aria-hidden="true"
                                                        />
                                                        Settings
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-primary-800 bg-transparent px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src={AppCustomisation.branding.logos.mini.src}
                                alt={AppCustomisation.branding.logos.mini.alt}
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-2">
                                        {navigation.map((item) => {
                                            if (item.no_display) return;
                                            return (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={classNames(
                                                            item.href === pathname
                                                                ? 'bg-primary-800 text-primary-50'
                                                                : 'text-primary-200 hover:text-primary-50 hover:bg-primary-800',
                                                            'group flex justify-start items-center gap-x-2 rounded-md px-2 py-1 text-sm leading-6 transition duration-200 ease-in-out'
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                item.href === pathname
                                                                    ? 'text-primary-50'
                                                                    : 'text-primary-200 group-hover:text-primary-50',
                                                                'size-4 shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <Link
                                        href="/settings"
                                        className="group -mx-2 flex items-center gap-x-3 rounded-md px-2 py-1 text-sm font-semibold leading-6 text-primary-200 hover:bg-primary-800 hover:text-primary-50 transition duration-200 ease-in-out"
                                    >
                                        <Cog6ToothIcon
                                            className="size-4 shrink-0 text-primary-200 group-hover:text-primary-50"
                                            aria-hidden="true"
                                        />
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-64">
                    <div className="sticky top-0 z-40 lg:px-8 backdrop-blur-3xl bg-transparent border-b border-primary-800">
                        <div className="flex h-16 items-center gap-x-4 bg-transparent px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                            <img
                                className="h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />

                            {/* Separator */}
                            <div className="h-6 w-px bg-primary-600 lg:hidden" aria-hidden="true" />

                            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                <div className="relative flex flex-1 cursor-text">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-primary-200"
                                        aria-hidden="true"
                                    />
                                    <div
                                        id="search-field"
                                        className="relative h-full w-full border-0 py-0 pl-8 pr-0 text-primary-50 placeholder:text-primary-200 focus:ring-0 sm:text-sm bg-transparent flex items-center"
                                        type="search"
                                        name="search"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpenSearchBar(true);
                                        }}
                                    >
                                        <span>
                                            Search...
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-primary-200 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}