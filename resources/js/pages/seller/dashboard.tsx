import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from 'res/components/sections/navbar';
import Container from 'res/components/ui/container';
import Button from 'res/components/ui/button';
import Badge from 'res/components/ui/badge';
import SectionTitle from 'res/components/ui/sectiontitle';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const STATS = [
    { label: 'Total Pendapatan', value: 'Rp 48.250.000', icon: '💰', color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Pesanan Masuk', value: '127', icon: '📦', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Produk Aktif', value: '34', icon: '🛍️', color: 'text-secondary', bg: 'bg-orange-50' },
    { label: 'Rating Toko', value: '4.8 ★', icon: '⭐', color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const RECENT_ORDERS = [
    { id: 'SEA-001', buyer: 'Budi S.', product: 'Wireless Headphones Pro Max', total: 1299000, status: 'Diproses', date: '26 Jun' },
    { id: 'SEA-002', buyer: 'Siti A.', product: 'Oversized Hoodie (x2)', total: 518000, status: 'Dikirim', date: '25 Jun' },
    { id: 'SEA-003', buyer: 'Rizky F.', product: 'Gaming Keyboard RGB', total: 389000, status: 'Selesai', date: '24 Jun' },
    { id: 'SEA-004', buyer: 'Dewi R.', product: 'Air Fryer Digital 4.5L', total: 449000, status: 'Selesai', date: '23 Jun' },
    { id: 'SEA-005', buyer: 'Ali H.', product: 'Drone 4K Camera', total: 3299000, status: 'Menunggu Pembayaran', date: '22 Jun' },
];

const STATUS_VARIANT: Record<string, 'primary' | 'secondary' | 'danger' | 'neutral'> = {
    'Dikirim': 'primary', 'Selesai': 'neutral', 'Menunggu Pembayaran': 'secondary', 'Diproses': 'primary', 'Dibatalkan': 'danger'
};

const TOP_PRODUCTS = [
    { title: 'Wireless Headphones Pro Max', sold: 234, stock: 12, revenue: 303966000 },
    { title: 'Gaming Keyboard RGB', sold: 189, stock: 25, revenue: 73521000 },
    { title: 'Air Fryer Digital 4.5L', sold: 156, stock: 8, revenue: 70044000 },
];

export default function SellerDashboard() {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Dashboard Seller – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="font-display text-2xl font-bold text-neutral-dark">Dashboard Toko 🏪</h1>
                            <p className="text-sm text-neutral-medium mt-1">Selamat datang kembali, TechWorld Store</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/seller/products/create"><Button size="sm" variant="outline">+ Tambah Produk</Button></Link>
                            <Link href="/seller/products"><Button size="sm">Kelola Produk</Button></Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {STATS.map((s) => (
                            <div key={s.label} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center text-xl flex-shrink-0`}>{s.icon}</div>
                                <div>
                                    <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                                    <p className="text-xs text-neutral-medium">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Recent Orders */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
                            <SectionTitle title="Pesanan Terbaru" action={<Link href="/seller/orders" className="text-primary text-xs hover:underline">Lihat Semua →</Link>} />
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-xs text-neutral-medium border-b border-border">
                                            <th className="py-2 text-left">ID Pesanan</th>
                                            <th className="py-2 text-left">Pembeli</th>
                                            <th className="py-2 text-left hidden md:table-cell">Produk</th>
                                            <th className="py-2 text-right">Total</th>
                                            <th className="py-2 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RECENT_ORDERS.map((o) => (
                                            <tr key={o.id} className="border-b border-border last:border-0 hover:bg-neutral-light transition-colors">
                                                <td className="py-2.5 text-xs font-mono text-neutral-medium">{o.id}</td>
                                                <td className="py-2.5 font-medium text-neutral-dark">{o.buyer}</td>
                                                <td className="py-2.5 text-neutral-medium hidden md:table-cell max-w-[150px] truncate">{o.product}</td>
                                                <td className="py-2.5 text-right font-semibold text-neutral-dark">{formatPrice(o.total)}</td>
                                                <td className="py-2.5 text-center">
                                                    <Badge variant={STATUS_VARIANT[o.status] ?? 'neutral'} className="text-[10px]">{o.status}</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="bg-white rounded-xl border border-border p-5">
                            <SectionTitle title="Produk Terlaris" />
                            <div className="space-y-3">
                                {TOP_PRODUCTS.map((p, i) => (
                                    <div key={p.title} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-neutral-dark truncate">{p.title}</p>
                                            <p className="text-xs text-neutral-medium">{p.sold} terjual · stok {p.stock}</p>
                                        </div>
                                        <p className="text-xs font-bold text-primary flex-shrink-0">{formatPrice(p.revenue)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 pt-4 border-t border-border">
                                <p className="text-xs text-neutral-medium mb-2">Stok Hampir Habis ⚠️</p>
                                <div className="space-y-1.5">
                                    {['Air Fryer Digital 4.5L (8 unit)', 'Wireless Headphones Pro Max (12 unit)'].map(p => (
                                        <div key={p} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                                            <span className="text-secondary text-xs">⚠️</span>
                                            <span className="text-xs text-neutral-dark">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
