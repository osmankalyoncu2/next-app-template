import clsx from 'clsx';
import { twMerge } from "tailwind-merge";

export function classNames(...classes) {
    return clsx(twMerge(classes));
}