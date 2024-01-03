import clsx from 'clsx';
import { twMerge } from "tailwind-merge";

export function classNames(...classes) {
    if (classes.length === 1) return classes[0];    
    return clsx(twMerge(classes));
}

export default classNames;