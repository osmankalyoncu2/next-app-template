"use client";

import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
    QuestionMarkCircleIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import classNames from "@/lib/utils/classNames";

export default function Search({
    open,
    setOpen = () => { },
    items
}) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const filteredItems =
        query === ""
            ? []
            : items.filter((item) => {
                const queryLower = query.toLowerCase();
                return item.name.toLowerCase().includes(queryLower) ||
                    item.keywords.some(keyword => keyword.toLowerCase().includes(queryLower));
            });

    // if the user presses ctrl+k or cmd+k, open the search bar
    if (typeof window !== "undefined") {
        window.addEventListener("keydown", (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                setOpen(true);
            }
        });
    }

    return (
        <Transition.Root
            show={open}
            as={Fragment}
            afterLeave={() => setQuery("")}
            appear
        >
            <Dialog
                as="div"
                className="relative"
                onClose={setOpen}
                style={{
                    zIndex: 9999,
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-[2px]" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="bg-primary-950 bg-opacity-50 mx-auto max-w-2xl transform divide-y divide-primary-50/5 overflow-hidden rounded-xl shadow-2xl ring-1 ring-primary-50/5 backdrop-blur backdrop-filter transition-all">
                            <Combobox onChange={(item) => {
                                router.push(item.href);
                                setOpen(false);
                            }}>
                                <div className="relative">
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-primary-200"
                                        aria-hidden="true"
                                    />
                                    <Combobox.Input
                                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-primary-50 focus:ring-0 sm:text-sm placeholder-primary-200"
                                        placeholder="Search..."
                                        autoComplete="off"
                                        onChange={(event) => setQuery(event.target.value)}
                                    />
                                </div>

                                {(filteredItems.length > 0) && (
                                    <Combobox.Options
                                        static
                                        className="max-h-80 scroll-py-2 divide-y divide-primary-50/5 overflow-y-auto"
                                    >
                                        <li className="p-2">
                                            <ul className="text-sm text-primary-200">
                                                {filteredItems.map((item) => (
                                                    <Combobox.Option
                                                        key={item.name}
                                                        value={item}
                                                        className={({ active }) =>
                                                            classNames(
                                                                "flex cursor-pointer select-none items-center rounded-md px-3 py-2",
                                                                active && "bg-primary-800/15 text-primary-50"
                                                            )
                                                        }
                                                    >
                                                        {({ active }) => (
                                                            <>
                                                                <ArrowTopRightOnSquareIcon
                                                                    className={classNames(
                                                                        "size-6 flex-none text-primary-200"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                <span className="ml-3 flex-auto truncate">
                                                                    {item.name}
                                                                </span>
                                                                {active && (
                                                                    <span className="ml-3 flex-none text-primary-200">
                                                                        Jump to...
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </ul>
                                        </li>
                                    </Combobox.Options>
                                )}

                                {query !== "" && filteredItems.length === 0 && (
                                    <div className="px-6 py-14 text-center sm:px-14">
                                        <QuestionMarkCircleIcon
                                            className="mx-auto h-6 w-6 text-primary-50 text-opacity-40"
                                            aria-hidden="true"
                                        />
                                        <p className="mt-4 text-sm text-primary-50">
                                            No results for &quot;{query}&quot;
                                        </p>
                                    </div>
                                )}
                            </Combobox>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
