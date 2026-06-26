import React from 'react';
import { Link } from '@inertiajs/react';
import Container from 'res/components/ui/container';
import Logo from 'res/components/ui/logo';

const footerLinks = {
    'Tentang SEAPEDIA': [
        { label: 'Tentang Kami', href: '/about' },
        { label: 'Karir', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Kebijakan Privasi', href: '#' },
        { label: 'Syarat & Ketentuan', href: '#' },
    ],
    'Layanan Pelanggan': [
        { label: 'Pusat Bantuan', href: '#' },
        { label: 'Cara Berbelanja', href: '#' },
        { label: 'Cara Berjualan', href: '#' },
        { label: 'Pengiriman', href: '#' },
        { label: 'Pengembalian Barang', href: '#' },
    ],
    'Promosi': [
        { label: 'Flash Sale', href: '#' },
        { label: 'Voucher & Promo', href: '#' },
        { label: 'Program Afiliasi', href: '#' },
        { label: 'SEA Points Rewards', href: '#' },
    ],
    'Jual Bersama Kami': [
        { label: 'Daftar Sebagai Seller', href: '/register' },
        { label: 'Daftar Sebagai Driver', href: '/register' },
        { label: 'Panduan Seller', href: '#' },
        { label: 'Pusat Seller', href: '/seller/dashboard' },
    ],
};

const paymentIcons = ['💳 Visa', '🏦 BCA', '📱 GoPay', '📱 OVO', '🏧 Mandiri', '💸 Transfer'];
const socialLinks = [
    { label: 'Instagram', href: '#', icon: '📷' },
    { label: 'Facebook', href: '#', icon: '📘' },
    { label: 'Twitter/X', href: '#', icon: '🐦' },
    { label: 'YouTube', href: '#', icon: '▶️' },
    { label: 'TikTok', href: '#', icon: '🎵' },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-white mt-12">
            {/* Main footer content */}
            <Container>
                <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Logo />
                            <span className="text-lg font-bold text-primary font-display">SEAPEDIA</span>
                        </div>
                        <p className="text-xs text-neutral-medium leading-relaxed mb-4">
                            Platform marketplace terpercaya yang menghubungkan Seller, Buyer, dan Driver dalam satu ekosistem digital Asia Tenggara.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            {socialLinks.map((s) => (
                                <a key={s.label} href={s.href}
                                    className="text-neutral-medium hover:text-primary transition-colors text-lg"
                                    title={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h3 className="font-semibold text-neutral-dark text-sm mb-4">{heading}</h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href}
                                            className="text-xs text-neutral-medium hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Payment Methods */}
                <div className="border-t border-border py-6">
                    <p className="text-xs font-semibold text-neutral-dark mb-3">Metode Pembayaran Kami</p>
                    <div className="flex flex-wrap gap-2">
                        {paymentIcons.map((p) => (
                            <span key={p} className="px-3 py-1.5 rounded border border-border text-xs text-neutral-medium bg-neutral-light">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Bottom bar */}
            <div className="border-t border-border bg-neutral-light">
                <Container>
                    <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-2">
                        <p className="text-xs text-neutral-medium">
                            © 2025 SEAPEDIA. All rights reserved. Proyek COMPFEST 18 — Software Engineering Academy.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-xs text-neutral-medium hover:text-primary">Kebijakan Privasi</Link>
                            <Link href="#" className="text-xs text-neutral-medium hover:text-primary">Syarat Layanan</Link>
                            <Link href="#" className="text-xs text-neutral-medium hover:text-primary">Sitemap</Link>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
