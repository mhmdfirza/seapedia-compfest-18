import React from 'react';
import { Link } from '@inertiajs/react';

// Icons
const HomeIcon = () => (
    <svg className="w-5 h-5 focus:outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const SearchIcon = () => (
    <svg className="w-5 h-5 focus:outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
);
const CartIcon = () => (
    <svg className="w-5 h-5 focus:outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
);
const UserIcon = () => (
    <svg className="w-5 h-5 focus:outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export type BottomNavProps = {
    authUser: any;
    currentPath?: string;
};

export default function BottomNav({ authUser, currentPath = '/' }: BottomNavProps) {
    const isBuyer = authUser?.role === 'buyer';

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border h-16 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe">
            <Link
                href="/"
                className={`flex flex-col items-center justify-center w-full py-2 ${currentPath === '/' ? 'text-primary' : 'text-neutral-medium hover:text-primary'}`}
            >
                <HomeIcon />
                <span className="text-[10px] font-medium mt-1">Beranda</span>
            </Link>

            <Link
                href="/products"
                className={`flex flex-col items-center justify-center w-full py-2 ${currentPath.startsWith('/products') ? 'text-primary' : 'text-neutral-medium hover:text-primary'}`}
            >
                <SearchIcon />
                <span className="text-[10px] font-medium mt-1">Pencarian</span>
            </Link>

            {isBuyer && (
                <Link
                    href="/dashboard/buyer/cart"
                    className={`relative flex flex-col items-center justify-center w-full py-2 ${currentPath.startsWith('/dashboard/buyer/cart') ? 'text-primary' : 'text-neutral-medium hover:text-primary'}`}
                >
                    <CartIcon />
                    <span className="absolute top-1.5 right-1/4 bg-secondary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        3
                    </span>
                    <span className="text-[10px] font-medium mt-1">Keranjang</span>
                </Link>
            )}

            <Link
                href={authUser ? `/dashboard/${authUser.role}` : '/login'}
                className="flex flex-col items-center justify-center w-full py-2 text-neutral-medium hover:text-primary"
            >
                {authUser ? (
                    <>
                        <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-[10px]">
                            {authUser.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <span className="text-[10px] font-medium mt-1 truncate max-w-[60px]">
                            {authUser.name}
                        </span>
                    </>
                ) : (
                    <>
                        <UserIcon />
                        <span className="text-[10px] font-medium mt-1">Masuk</span>
                    </>
                )}
            </Link>
        </nav>
    );
}
