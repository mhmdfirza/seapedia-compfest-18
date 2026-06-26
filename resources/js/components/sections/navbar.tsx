import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Container from '@/components/ui/container';
import Logo from '@/components/ui/logo';
import Button from '@/components/ui/button';

// Icons as inline SVG for zero deps
const SearchIcon = () => (
    <svg className="w-5 h-5 text-neutral-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
);
const CartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
);
const BellIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
    </svg>
);
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const categories = ['Elektronik', 'Fashion', 'Makanan & Minuman', 'Kesehatan', 'Rumah & Taman', 'Olahraga', 'Otomotif'];

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    // Try to get auth user from Inertia page props; fallback to null
    let authUser: { name?: string; role?: string } | null = null;
    try {
        const page = usePage<{ auth?: { user?: { name: string; role: string } } }>();
        authUser = page.props.auth?.user ?? null;
    } catch { /* noop */ }

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
            {/* Top bar */}
            <Container>
                <div className="flex h-16 items-center gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
                        <Logo />
                        <span className="text-lg font-bold text-primary font-display">SEAPEDIA</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl">
                        <div className="flex w-full rounded-lg border border-border overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari produk di SEAPEDIA..."
                                className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-white placeholder:text-neutral-medium"
                            />
                            <button className="bg-primary hover:bg-primary-dark transition-colors px-4 flex items-center justify-center">
                                <SearchIcon />
                                <span className="sr-only">Cari</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        {authUser ? (
                            <>
                                {/* Cart */}
                                <Link href="/buyer/cart" className="relative p-2 text-neutral-dark hover:text-primary transition-colors">
                                    <CartIcon />
                                    <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                                </Link>
                                {/* Bell */}
                                <button className="relative p-2 text-neutral-dark hover:text-primary transition-colors">
                                    <BellIcon />
                                    <span className="absolute -top-0.5 -right-0.5 bg-danger text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
                                </button>
                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setUserDropdownOpen(v => !v)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-light transition-colors text-sm font-medium text-neutral-dark"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                                            {authUser.name?.[0]?.toUpperCase() ?? 'U'}
                                        </div>
                                        <span className="hidden lg:block max-w-[100px] truncate">{authUser.name}</span>
                                        <ChevronDownIcon />
                                    </button>
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-white shadow-md py-1 z-50">
                                            {authUser.role === 'buyer' && (
                                                <>
                                                    <Link href="/buyer/dashboard" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Dashboard</Link>
                                                    <Link href="/buyer/orders" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Pesanan Saya</Link>
                                                    <Link href="/buyer/wallet" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Dompet</Link>
                                                </>
                                            )}
                                            {authUser.role === 'seller' && (
                                                <>
                                                    <Link href="/seller/dashboard" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Dashboard Toko</Link>
                                                    <Link href="/seller/products" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Kelola Produk</Link>
                                                    <Link href="/seller/orders" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Pesanan Masuk</Link>
                                                </>
                                            )}
                                            {authUser.role === 'driver' && (
                                                <>
                                                    <Link href="/driver/dashboard" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Dashboard Driver</Link>
                                                    <Link href="/driver/jobs" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Daftar Pengiriman</Link>
                                                    <Link href="/driver/earnings" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Penghasilan</Link>
                                                </>
                                            )}
                                            {authUser.role === 'admin' && (
                                                <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light">Panel Admin</Link>
                                            )}
                                            <hr className="my-1 border-border" />
                                            <Link href="/logout" method="post" as="button" className="w-full text-left block px-4 py-2 text-sm text-danger hover:bg-neutral-light">Keluar</Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" size="sm">Masuk</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="primary" size="sm">Daftar</Button>
                                </Link>
                            </>
                        )}
                        {/* Mobile Menu toggle */}
                        <button
                            className="md:hidden p-2 text-neutral-dark hover:text-primary"
                            onClick={() => setMobileMenuOpen(v => !v)}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>

                {/* Categories bar (desktop) */}
                <div className="hidden md:flex items-center gap-6 pb-2 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`}
                            className="text-xs text-neutral-medium hover:text-primary whitespace-nowrap transition-colors pb-1 border-b-2 border-transparent hover:border-primary">
                            {cat}
                        </Link>
                    ))}
                </div>
            </Container>

            {/* Mobile Search */}
            <div className="md:hidden px-4 py-2 border-t border-border">
                <div className="flex rounded-lg border border-border overflow-hidden focus-within:border-primary">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        className="flex-1 px-3 py-2 text-sm focus:outline-none"
                    />
                    <button className="bg-primary px-3 flex items-center">
                        <SearchIcon />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-3">
                    {categories.map((cat) => (
                        <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`}
                            className="block text-sm text-neutral-dark hover:text-primary py-1">
                            {cat}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}