import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout, { MenuItem } from 'res/components/layout/DashboardLayout';
import Badge from 'res/components/ui/badge';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/seller', icon: <span>🏠</span> },
    { label: 'Profil Toko', href: '/dashboard/seller/profile', icon: <span>🏪</span> },
    { label: 'Produk', href: '/dashboard/seller/products', icon: <span>📦</span> },
    { label: 'Pesanan Masuk', href: '/dashboard/seller/orders', icon: <span>🧾</span> },
    { label: 'Laporan Pendapatan', href: '/dashboard/seller/income', icon: <span>📊</span> },
];

const DUMMY_USER = { name: 'TechWorld Store', email: 'techworld@email.com', roles: ['seller' as const] };

const SUMMARY_CARDS = [
    { label: 'Total Produk', value: '34', icon: '📦', color: 'text-neutral-dark', bg: 'bg-neutral-light', badge: null },
    { label: 'Pesanan Baru', value: '12', icon: '🧾', color: 'text-danger', bg: 'bg-red-50', badge: '12 baru' },
    { label: 'Produk Terlaris', value: 'Headphones Pro', icon: '🏆', color: 'text-yellow-600', bg: 'bg-yellow-50', badge: null },
    { label: 'Pendapatan Bln Ini', value: 'Rp 18.450.000', icon: '💰', color: 'text-primary', bg: 'bg-primary-light', badge: null },
];

const INCOMING_ORDERS = [
    { id: 'SEA-001', product: 'Wireless Headphones Pro Max', buyer: 'Budi S.', status: 'Baru', date: '26 Jun' },
    { id: 'SEA-002', product: 'Oversized Hoodie (x2)', buyer: 'Siti A.', status: 'Diproses', date: '25 Jun' },
    { id: 'SEA-003', product: 'Gaming Keyboard RGB', buyer: 'Rizky F.', status: 'Dikirim', date: '24 Jun' },
    { id: 'SEA-004', product: 'Air Fryer Digital 4.5L', buyer: 'Dewi R.', status: 'Selesai', date: '23 Jun' },
    { id: 'SEA-005', product: 'Drone 4K Camera', buyer: 'Ali H.', status: 'Baru', date: '22 Jun' },
];

const STATUS_VARIANT: Record<string, 'primary' | 'secondary' | 'neutral' | 'danger'> = {
    'Baru': 'danger', 'Diproses': 'secondary', 'Dikirim': 'primary', 'Selesai': 'neutral'
};

const LOW_STOCK = [
    { name: 'Air Fryer Digital 4.5L', stock: 3 },
    { name: 'Wireless Headphones Pro Max', stock: 4 },
    { name: 'Drone 4K Camera PRO', stock: 2 },
];

export default function SellerDashboard() {
    return (
        <DashboardLayout role="seller" user={DUMMY_USER} menuItems={MENU_ITEMS} activePath="/dashboard/seller">
            <Head title="Dashboard Seller – SEAPEDIA" />
            <div className="p-5 lg:p-7 space-y-6 w-full">

                {/* Greeting */}
                <div className="bg-gradient-to-br from-[#c05a00] to-secondary rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }}
                    />
                    <p className="text-white/70 text-sm mb-1">Dashboard Toko</p>
                    <h1 className="font-display text-2xl font-bold mb-1">TechWorld Store 🏪</h1>
                    <p className="text-white/80 text-sm">Toko aktif · Rating 4.8 ★ · 234 produk terjual bulan ini</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {SUMMARY_CARDS.map((c) => (
                        <div key={c.label} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow relative">
                            <div className={`w-11 h-11 rounded-full ${c.bg} flex items-center justify-center text-xl flex-shrink-0`}>{c.icon}</div>
                            <div className="min-w-0">
                                <p className={`text-base font-bold ${c.color} leading-tight truncate`}>{c.value}</p>
                                <p className="text-xs text-neutral-medium mt-0.5">{c.label}</p>
                            </div>
                            {c.badge && (
                                <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{c.badge}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {/* Pesanan Masuk Terbaru */}
                    <div className="xl:col-span-2 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                            <h2 className="font-display font-semibold text-neutral-dark">Pesanan Masuk Terbaru</h2>
                            <Link href="/dashboard/seller/orders" className="text-xs text-primary hover:underline font-medium">Lihat Semua →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-xs text-neutral-medium border-b border-border bg-neutral-light/50">
                                        <th className="py-2.5 px-4 text-left">No. Pesanan</th>
                                        <th className="py-2.5 px-3 text-left hidden md:table-cell">Produk</th>
                                        <th className="py-2.5 px-3 text-left">Pembeli</th>
                                        <th className="py-2.5 px-3 text-center">Status</th>
                                        <th className="py-2.5 px-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {INCOMING_ORDERS.map((o) => (
                                        <tr key={o.id} className="border-b border-border last:border-0 hover:bg-neutral-light/40 transition-colors">
                                            <td className="py-3 px-4 font-mono text-xs text-neutral-medium">{o.id}</td>
                                            <td className="py-3 px-3 text-xs text-neutral-dark max-w-[140px] truncate hidden md:table-cell">{o.product}</td>
                                            <td className="py-3 px-3 font-medium text-neutral-dark text-sm">{o.buyer}</td>
                                            <td className="py-3 px-3 text-center">
                                                <Badge variant={STATUS_VARIANT[o.status] ?? 'neutral'} className="text-[10px]">{o.status}</Badge>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <button className="text-xs text-primary hover:underline font-medium">Proses</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Stok Menipis + Quick Actions */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                            <h2 className="font-display font-semibold text-neutral-dark mb-3">⚠️ Stok Menipis</h2>
                            <div className="space-y-2.5">
                                {LOW_STOCK.map((p) => (
                                    <div key={p.name} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                                        <span className="text-secondary text-base">⚠️</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-neutral-dark truncate">{p.name}</p>
                                            <p className="text-xs text-secondary font-semibold mt-0.5">Sisa {p.stock} unit</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                            <h2 className="font-display font-semibold text-neutral-dark mb-3">Aksi Cepat</h2>
                            <div className="space-y-2">
                                <Link href="/dashboard/seller/products" className="flex items-center gap-2.5 w-full bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
                                    <span>➕</span> Tambah Produk Baru
                                </Link>
                                <Link href="/dashboard/seller/orders" className="flex items-center gap-2.5 w-full bg-neutral-light text-neutral-dark text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-neutral-light/70 border border-border transition-colors">
                                    <span>📋</span> Lihat Semua Pesanan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
