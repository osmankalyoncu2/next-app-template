"use client";

import { SessionProvider } from "next-auth/react";

// Prop Types
import PropTypes from 'prop-types'

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