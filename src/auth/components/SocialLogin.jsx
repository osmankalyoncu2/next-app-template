"use client";

import Spinner from "@/components/aui/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

// Prop Types
import PropTypes from 'prop-types'

SocialLoginProviders.propTypes = {
    type: PropTypes.string,
    csrfToken: PropTypes.string,
    providers: PropTypes.object
};

export default function SocialLoginProviders({
    type = "Continue",
    csrfToken,
    providers
}) {
    const [clickedStates, setClickedStates] = useState({});

    const handleClick = (providerId) => {
        setClickedStates({ ...clickedStates, [providerId]: true });
    };

    return (
        <>
            {Object.values(providers).filter((provider) => provider.name !== "Email").length >= 1 && (
                <div className="relative my-6 w-full">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-primary-500" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-background px-2 text-xs text-primary-400 font-bold">OR</span>
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
                                variant="outline"
                                disabled={clickedStates[provider.id]}
                                className="relative px-2 py-2 flex flex-row justify-center items-center w-full"
                            >
                                {clickedStates[provider.id] && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center w-full h-full"
                                    >
                                        <Spinner color="text-secondary-foreground" />
                                    </div>
                                )}
                                <div
                                    className="flex flex-row justify-center items-center w-full h-full"
                                >
                                    <Image
                                        loading="lazy"
                                        height={20}
                                        width={20}
                                        alt="provider-logo"
                                        className="inline-block h-full"
                                        src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                                    />
                                    <span className="ml-2 text-secondary-foreground font-semibold text-sm">
                                        {type} with {provider.name}
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