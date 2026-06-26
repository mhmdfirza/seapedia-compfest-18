import React from 'react';
import { Link } from '@inertiajs/react';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

export default function NavLink({
    href,
    children,
}: NavLinkProps) {
    return (
        <Link
            href={href}
            className="font-medium text-gray-600 transition hover:text-blue-600"
        >
            {children}
        </Link>
    );
}