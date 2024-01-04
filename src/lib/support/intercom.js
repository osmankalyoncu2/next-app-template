"use client";

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {
    AppCustomisation
} from '@/lib/app/customisation';

const Intercom = () => {
    const api_base = AppCustomisation.tools.intercom.api_url || "https://api-iam.intercom.io";
    const app_id = AppCustomisation.tools.intercom.app_id || "";
    const intercom_enabled = AppCustomisation.tools.intercom.enabled && (app_id !== "");

    const { data: session, status } = useSession();

    useEffect(() => {
        if (!intercom_enabled) return; // If Intercom is disabled, don’t load it.

        // If you want non-users to be able to chat via Intercom, comment out the following line:
        if (status === "unauthenticated") return; // Don’t load Intercom if the user is not logged in

        // We don’t want to load Intercom if the user details are still loading.
        //if (status === "loading") return;

        // We don’t want to load Intercom if the user details are not available.
        if (status === "authenticated") {
            window.intercomSettings = {
                api_base: api_base,
                app_id: app_id,
                //user_id: session?.user?.id, // TODO: Setup next-auth to return a user_id
                email: session?.user?.email, // Working
                name: session?.user?.name, // Working
                //created_at: user?.created_at, // TODO: Setup next-auth to return a created_at timestamp
                //user_hash: user?.user_hash, // TODO: HMAC using SHA-256 hash of the user_id, email and HMAC key
            };
        } else {
            window.intercomSettings = {
                api_base: api_base,
                app_id: app_id,
            };
        }


        (function () {
            var w = window;
            var ic = w.Intercom;
            if (typeof ic === "function") {
                ic('reattach_activator');
                ic('update', w.intercomSettings);
            } else {
                var d = document;
                var i = function () { i.c(arguments); };
                i.q = [];
                i.c = function (args) { i.q.push(args); };
                w.Intercom = i;
                var l = function () {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/' + app_id;
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === 'complete') {
                    l();
                } else if (w.attachEvent) {
                    w.attachEvent('onload', l);
                } else {
                    w.addEventListener('load', l, false);
                }
            }
        })();
    }, [session, status]);

    return null;
};

export default Intercom;
