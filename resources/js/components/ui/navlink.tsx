import React from 'react';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

export default function NavLink({
    href,
    children,
}: NavLinkProps) {
    return (
        <a
            href={href}
            className="font-medium text-gray-600 transition hover:text-blue-600"
        >
            {children}
        </a>
    );
}