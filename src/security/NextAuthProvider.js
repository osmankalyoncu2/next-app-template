"use client";

import { SessionProvider } from "next-auth/react";

NextAuthProvider.propTypes = {
    children: PropTypes.node
};

export default function NextAuthProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}