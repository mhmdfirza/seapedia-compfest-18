import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout, { MenuItem } from 'res/components/layout/DashboardLayout';
import ProductCard from 'res/components/ui/productcard';
import Badge from 'res/components/ui/badge';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/buyer', icon: <span>🏠</span> },
    { label: 'Profil', href: '/dashboard/buyer/profile', icon: <span>👤</span> },
    { label: 'Dompet', href: '/dashboard/buyer/wallet', icon: <span>💰</span> },
    { label: 'Alamat', href: '/dashboard/buyer/address', icon: <span>📍</span> },
    { label: 'Keranjang', href: '/dashboard/buyer/cart', icon: <span>🛒</span> },
    { label: 'Pesanan Saya', href: '/dashboard/buyer/orders', icon: <span>📦</span> },
];

const DUMMY_USER = { name: 'Budi Santoso', email: 'budi@email.com', roles: ['buyer' as const] };

const SUMMARY_CARDS = [
    { label: 'Saldo Dompet', value: 'Rp 1.452.000', icon: '💰', color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Pesanan Aktif', value: '3', icon: '🚚', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Pesanan', value: '47', icon: '📦', color: 'text-neutral-dark', bg: 'bg-neutral-light' },
    { label: 'Poin Reward', value: '2.350 pts', icon: '⭐', color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const RECENT_ORDERS = [
    { id: 'SEA-2025-001', product: 'Wireless Noise-Canceling Headphones Pro Max', date: '26 Jun 2025', total: 1299000, status: 'Dalam Pengiriman' },
    { id: 'SEA-2025-002', product: 'Oversized Premium Cotton Hoodie (Abu)', date: '24 Jun 2025', total: 259000, status: 'Selesai' },
    { id: 'SEA-2025-003', product: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', date: '21 Jun 2025', total: 169000, status: 'Selesai' },
];

const STATUS_VARIANT: Record<string, 'primary' | 'secondary' | 'neutral' | 'danger'> = {
    'Dalam Pengiriman': 'primary',
    'Selesai': 'neutral',
    'Dibatalkan': 'danger',
    'Menunggu Pembayaran': 'secondary',
};

const SHORTCUTS = [
    { label: 'Isi Saldo', href: '/dashboard/buyer/wallet', icon: '💳' },
    { label: 'Lacak Pesanan', href: '/dashboard/buyer/orders', icon: '🔍' },
    { label: 'Ulasan Saya', href: '#', icon: '⭐' },
    { label: 'Wishlist', href: '#', icon: '❤️' },
];

const RECOMMENDED = [
    { id: 1, title: 'Wireless Noise-Canceling Headphones Pro Max', price: 1299000, originalPrice: 1999000, rating: 4.8, sold: 2341, location: 'Jakarta Selatan', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Oversized Premium Cotton Hoodie', price: 259000, originalPrice: 399000, rating: 4.6, sold: 5890, location: 'Bandung', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', price: 169000, originalPrice: 249000, rating: 4.7, sold: 3200, location: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Smartwatch Band 8 PRO Amoled HRM', price: 399000, originalPrice: 799000, rating: 4.7, sold: 9800, location: 'Jakarta', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
];

export default function BuyerDashboard() {
    return (
        <DashboardLayout role="buyer" user={DUMMY_USER} menuItems={MENU_ITEMS} activePath="/dashboard/buyer">
            <Head title="Dashboard Buyer – SEAPEDIA" />
            <div className="p-5 lg:p-7 space-y-6 w-full">

                {/* Greeting */}
                <div className="bg-gradient-to-br from-primary to-green-700 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }}
                    />
                    <p className="text-white/70 text-sm mb-1">Selamat Datang 👋</p>
                    <h1 className="font-display text-2xl font-bold mb-1">{DUMMY_USER.name}!</h1>
                    <p className="text-white/80 text-sm">Member sejak Juni 2024 · Saldo aktif</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {SUMMARY_CARDS.map((c) => (
                        <div key={c.label} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-11 h-11 rounded-full ${c.bg} flex items-center justify-center text-xl flex-shrink-0`}>{c.icon}</div>
                            <div>
                                <p className={`text-base font-bold ${c.color} leading-tight`}>{c.value}</p>
                                <p className="text-xs text-neutral-medium mt-0.5">{c.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pesanan Terbaru */}
                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <h2 className="font-display font-semibold text-neutral-dark">Pesanan Terbaru</h2>
                        <Link href="/dashboard/buyer/orders" className="text-xs text-primary hover:underline font-medium">Lihat Semua →</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-xs text-neutral-medium border-b border-border bg-neutral-light/50">
                                    <th className="py-2.5 px-5 text-left">ID Pesanan</th>
                                    <th className="py-2.5 px-3 text-left">Produk</th>
                                    <th className="py-2.5 px-3 text-right hidden md:table-cell">Total</th>
                                    <th className="py-2.5 px-3 text-center">Status</th>
                                    <th className="py-2.5 px-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RECENT_ORDERS.map((o) => (
                                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-neutral-light/40 transition-colors">
                                        <td className="py-3 px-5 font-mono text-xs text-neutral-medium">{o.id}</td>
                                        <td className="py-3 px-3 text-neutral-dark max-w-[160px] truncate text-xs">{o.product}</td>
                                        <td className="py-3 px-3 text-right font-semibold text-neutral-dark hidden md:table-cell">{formatPrice(o.total)}</td>
                                        <td className="py-3 px-3 text-center">
                                            <Badge variant={STATUS_VARIANT[o.status] ?? 'neutral'} className="text-[10px]">{o.status}</Badge>
                                        </td>
                                        <td className="py-3 px-5 text-right">
                                            <Link href="/dashboard/buyer/orders" className="text-xs text-primary hover:underline font-medium">Detail</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Shortcut Buttons */}
                <div>
                    <h2 className="font-display font-semibold text-neutral-dark mb-3">Shortcut</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {SHORTCUTS.map((s) => (
                            <Link key={s.label} href={s.href}
                                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all text-center group">
                                <span className="text-2xl">{s.icon}</span>
                                <span className="text-xs font-medium text-neutral-dark group-hover:text-primary">{s.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Rekomendasi Produk */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-display font-semibold text-neutral-dark">Rekomendasi Produk</h2>
                        <Link href="/products" className="text-xs text-primary hover:underline font-medium">Lihat Semua →</Link>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        {RECOMMENDED.map((p) => <ProductCard key={p.id} {...p} />)}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
