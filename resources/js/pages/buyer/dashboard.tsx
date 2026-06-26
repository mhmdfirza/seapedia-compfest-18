import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Footer from '@/components/sections/footer';
import Container from '@/components/ui/container';
import SectionTitle from '@/components/ui/sectiontitle';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import ProductCard from '@/components/ui/productcard';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const RECOMMENDED = [
    { id: 1, title: 'Wireless Noise-Canceling Headphones Pro Max', price: 1299000, originalPrice: 1999000, rating: 4.8, sold: 2341, location: 'Jakarta Selatan', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Oversized Premium Cotton Hoodie', price: 259000, originalPrice: 399000, rating: 4.6, sold: 5890, location: 'Bandung', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', price: 169000, originalPrice: 249000, rating: 4.7, sold: 3200, location: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Smartwatch Band 8 PRO Amoled HRM', price: 399000, originalPrice: 799000, rating: 4.7, sold: 9800, location: 'Jakarta', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
];

const QUICK_LINKS = [
    { label: 'Pesanan Saya', href: '/buyer/orders', icon: '📦' },
    { label: 'Keranjang', href: '/buyer/cart', icon: '🛒' },
    { label: 'Dompet', href: '/buyer/wallet', icon: '💰' },
    { label: 'Alamat', href: '/buyer/address', icon: '📍' },
    { label: 'Ulasan', href: '#', icon: '⭐' },
    { label: 'Bantuan', href: '#', icon: '💬' },
];

export default function BuyerDashboard() {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Dashboard – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-6 text-white mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-white/70 mb-1">Selamat datang,</p>
                            <h1 className="font-display text-xl font-bold">Budi Santoso 👋</h1>
                            <p className="text-white/80 text-sm mt-1">Member sejak Juni 2024 · Saldo: {formatPrice(1452000)}</p>
                        </div>
                        <div className="hidden sm:flex flex-col gap-2">
                            <Link href="/buyer/wallet">
                                <Button size="sm" className="bg-white text-primary hover:bg-primary-light border-transparent font-semibold">Top Up Saldo</Button>
                            </Link>
                            <Link href="/buyer/orders">
                                <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 border border-white/30">Lacak Pesanan</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                        {QUICK_LINKS.map((link) => (
                            <Link key={link.label} href={link.href}
                                className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all">
                                <span className="text-2xl">{link.icon}</span>
                                <span className="text-xs text-neutral-dark font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Active Orders */}
                    <div className="bg-white rounded-xl border border-border p-4 mb-5">
                        <SectionTitle title="Pesanan Aktif" action={<Link href="/buyer/orders" className="text-primary text-xs hover:underline">Lihat Semua →</Link>} />
                        <div className="flex items-center gap-4 p-3 bg-primary-light rounded-xl">
                            <div className="text-2xl">🚚</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-neutral-dark">Wireless Noise-Canceling Headphones Pro Max</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="primary" className="text-[10px]">Dalam Pengiriman</Badge>
                                    <span className="text-xs text-neutral-medium">Estimasi tiba Hari Ini</span>
                                </div>
                            </div>
                            <button className="text-xs bg-primary text-white rounded-lg px-3 py-1.5 hover:bg-primary-dark transition-colors whitespace-nowrap">Lacak Paket</button>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    <SectionTitle
                        title="Rekomendasi Untukmu"
                        subtitle="Berdasarkan riwayat belanjamu"
                        action={<Link href="/products" className="text-primary text-xs hover:underline">Lihat Semua →</Link>}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {RECOMMENDED.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
