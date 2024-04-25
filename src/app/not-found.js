export const metadata = {
	title: "Not Found",
}

import Link from "next/link";
import {
	ChevronLeftIcon
} from "@heroicons/react/20/solid";

export default function FourOhFour() {
    return (
        <main
            className="bg-primary-950 h-screen w-screen z-50"
        >
            <div
                className="absolute top-6 left-6 bg-primary-950"
            >
                <Link
                    href="/"
                    className="text-primary-200 font-semibold hover:text-primary-100 transition duration-200 ease-in-out flex flex-row justify-start items-center text-sm px-3 py-2 hover:bg-primary-900 rounded-full"
                >
                    <ChevronLeftIcon
                        className="inline-block size-4 mr-1"
                    />
                    Home
                </Link>
            </div>

            <div
                className="h-full w-full flex mx-auto max-w-md flex-col justify-center items-center"
            >
                <div
                    className="text-left mb-8 w-full"
                >
                    <h1
                        className="text-primary text-xl font-semibold mb-2"
                    >
                        This page could not be found.
                    </h1>
                    <p
                        className="text-primary-200 text-base mb-4"
                    >
                        Contact support if you believe this is an error.
                    </p>
                    <Link
                        href="/"
                        className="text-primary-100 font-semibold hover:text-primary transition duration-200 ease-in-out flex flex-row justify-start items-center text-sm"
                    >
                        Head back home
                    </Link>
                </div>
            </div>
        </main>
    )
}