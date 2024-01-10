// Suggestion: add something here about tailwind color classes
// also about the use of ui components

// TODO: Write something about how this is an example marketing page
// and users can add their own marketing pages in the middleware

import Link from "next/link";

export default function HomePage({

}) {
    return (
        <>
            {/* Add a better background - we don't want it to be too plain... */}
            <section
                id="hero"
                className="bg-black min-h-screen flex items-center justify-center w-full bg-repeat"
            >
                <div
                    className=""
                >
                    <h1
                        className="relative text-5xl text-white text-center font-bold"
                    >
                        Make Next App
                        <span className="absolute rounded-md bg-white/10 px-2 py-1 ml-2 text-xs font-bold">
                            Alpha
                        </span>
                    </h1>
                    <p
                        className="text-white text-center mt-2 text-base"
                    >
                        The fastest way to build a product for the web.
                    </p>
                    <div
                        className="flex justify-center my-4 gap-x-4 text-xs"
                    >
                        <Link
                            className="bg-white/5 ring-1 ring-white/10 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors duration-200 ease-in-out"
                            href="https://github.com/arsenstorm/next-app-template"
                            target="_blank"
                        >
                            View on GitHub
                        </Link>
                        <Link
                            className="bg-white/5 ring-1 ring-white/10 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors duration-200 ease-in-out"
                            href="/login"
                        >
                            See what’s inside
                        </Link>
                    </div>
                    <sub
                        className="text-white text-center block"
                    >
                        And the best part? It’s <span className="font-bold underline underline-offset-2">free</span>.
                    </sub>
                </div>
            </section>
            {/* Add an infinite scrolling section of features here */}
        </>
    )
}