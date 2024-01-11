export const metadata = {
    title: "Admin Dashboard",
}

import Title from "@/components/ui/Title";
import { auth } from "@/auth/auth";
import Link from "next/link";

const links = [
    {
        title: "User Management",
        subtitle: "Manage your users, grant permissions, impersonate and terminate accounts.",
        href: "/admin/users"
    },
    {
        title: "App Analytics",
        subtitle: "View the stats of your product.",
        href: "/admin/analytics"
    },
    {
        title: "Configuration",
        subtitle: "Configure your app, change settings, add integrations and more.",
        href: "/admin/configure"
    }
];

export default async function AdminPage({

}) {
    const session = await auth();

    return (
        <>
            <Title
                title={"Admin Page"}
                subtitle={"Here you can manage your app, view analytics, logs and more."}
            />
            <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-10"
            >
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="bg-primary-900 border border-primary-800 shadow overflow-hidden rounded-lg px-6 py-4 hover:bg-primary-800 transition duration-200 ease-in-out min-h-48 flex justify-end items-start flex-col"
                    >
                        <h5
                            className="text-md font-medium text-primary-50"
                        >
                            {link.title}
                        </h5>
                        <p
                            className="mt-1 text-sm text-primary-200"
                        >
                            {link.subtitle}
                        </p>
                    </Link>
                ))}
            </div>
        </>
    )
}