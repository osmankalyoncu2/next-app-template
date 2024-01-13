// Note: This is the same code as signin/page.jsx, with a few changes

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ChevronLeftIcon,
    ArrowRightIcon
} from '@heroicons/react/20/solid'

// Authentication
import { submitForm } from "@/auth/submitForm";
import { useSession, getProviders, getCsrfToken } from "next-auth/react"
import SocialLoginProviders from "@/auth/components/SocialLogin";
import { authPages } from "@/auth/paths";

// UI
import Spinner from "@/components/aui/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Legal from "@/auth/components/Legal";

export default function SignUp() {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function getToken() {
            const csrfToken = await getCsrfToken();

            setToken(csrfToken);
        }

        getToken();
    }, []);

    useEffect(() => {
        // get providers and save them to state
        async function saveProviders() {
            const providers = await getProviders();
            setProviders(providers);
        }

        saveProviders();
    }, [])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    if (status === "loading") {
        return <></>;
    }

    if (session) {
        window.location.href = "/";
    }

    return (
        <main
            className="bg-primary-950 h-screen w-screen z-50"
        >
            <div
                className="absolute top-6 left-6 bg-primary-950"
            >
                <Link
                    href="/"
                    className="text-secondary-foreground font-semibold hover:text-primary-100 transition duration-200 ease-in-out flex flex-row justify-start items-center text-sm px-3 py-2 hover:bg-primary-900 rounded-full"
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
                        Log in to Make Next App
                    </h1>
                    <p
                        className="text-secondary-foreground text-base mb-4"
                    >
                        Already have an account?{' '}
                        <Link
                            href={authPages.signIn}
                            className="text-primary font-bold"
                        >
                            Sign in
                        </Link>.
                    </p>
                </div>
                <form
                    className="w-full flex flex-col justify-center items-center"
                    method="post"
                    onSubmit={
                        async (event) => {
                            setLoading(true);
                            await submitForm(event);
                            setLoading(false);
                        }}
                >
                    <input name="token" type="hidden" defaultValue={token} />

                    <label
                        className="text-neutral-400 text-sm mb-2 w-full"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        className="w-full mb-4"
                        placeholder="arsen@makenext.app"
                        onChange={handleEmailChange}
                    />

                    <Button
                        id="submitBtn"
                        variant="default"
                        type="submit"
                        className="relative w-full flex flex-row justify-center items-center"
                        disabled={email === "" || loading}
                    >
                        {loading && <Spinner />}
                        Continue
                        <ArrowRightIcon
                            className="inline-block size-5 ml-1"
                        />
                    </Button>
                </form>
                <SocialLoginProviders
                    type="Signup"
                    csrfToken={token}
                    providers={providers}
                />
                <Legal />
            </div>
        </main>
    )
}