"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ChevronLeftIcon,
    ArrowRightIcon
} from '@heroicons/react/20/solid'
import Image from "next/image";

// Authentication
import { submitForm } from "@/lib/auth/submitForm";
import { useSession, getProviders, getCsrfToken } from "next-auth/react"
import TextInput from "@/components/Input";
import Button from "@/components/Button";
import Spinner from "@/components/Loader";

export default function SignIn() {
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
            className="bg-primary-950 h-screen w-screen absolute top-0 left-0 z-50"
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
                        className="text-primary-50 text-xl font-semibold mb-2"
                    >
                        Log in to Next App Template
                    </h1>
                    <p
                        className="text-primary-200 text-base mb-4"
                    >
                        Don’t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-primary-50"
                        >
                            Sign up
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

                    <TextInput
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
                        type="submit"
                        className="relative w-full bg-primary-50 text-primary-950 px-2 py-2 hover:bg-primary-100 flex flex-row justify-center items-center"
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
                    csrfToken={token}
                    providers={providers}
                />
                <div
                    className="mt-6 w-full text-left text-xs text-primary-200"
                >
                    <p

                    >
                        By signing in, you agree to our{' '}
                        <Link
                            href="/terms"
                            className="text-primary-50"
                        >
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="/privacy"
                            className="text-primary-50"
                        >
                            Privacy Policy
                        </Link>.
                    </p>
                </div>
            </div>
        </main>
    )
}

function SocialLoginProviders({
    csrfToken,
    providers
}) {
    const provider_logos = "https://authjs.dev/img/providers/"; // {provider_id}.svg or {provider_id}-dark.svg
    const [clickedStates, setClickedStates] = useState({});

    const handleClick = (providerId) => {
        setClickedStates({ ...clickedStates, [providerId]: true });
    };

    return (
        <>
            {Object.values(providers).filter((provider) => provider.name !== "Email").length > 1 && (
                <div className="relative my-6 w-full">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-primary-500" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-primary-950 px-2 text-xs text-primary-400 font-bold">OR</span>
                    </div>
                </div>
            )}
            <div
                className="grid grid-cols-2 w-full gap-4"
            >
                {Object.values(providers).map((provider) => {
                    if (provider.name === "Email") return null;

                    return (
                        <form
                            key={provider.id}
                            method="POST"
                            action={`/api/auth/signin/${provider.id}`}
                            onSubmit={() => handleClick(provider.id)}
                        >
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <Button
                                type="submit"
                                disabled={clickedStates[provider.id]}
                                className="relative bg-primary-700 border-primary-600 px-2 py-2 flex flex-row justify-center items-center text-primary-50 w-full"
                            >
                                {clickedStates[provider.id] && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center w-full h-full"
                                    >
                                        <Spinner />
                                    </div>
                                )}
                                <div

                                >
                                    <Image
                                        loading="lazy"
                                        height={20}
                                        width={20}
                                        alt="provider-logo"
                                        className="grayscale inline-block h-full"
                                        src={provider_logos + provider.id + ".svg"}
                                    />
                                    <span className="ml-2 text-primary-200 font-semibold text-sm">
                                        Login with {provider.name}
                                    </span>
                                </div>
                            </Button>
                        </form>
                    )
                })}
            </div>
        </>
    )
}