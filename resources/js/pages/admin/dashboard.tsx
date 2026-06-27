import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout, { MenuItem } from 'res/components/layout/DashboardLayout';
import Badge from 'res/components/ui/badge';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/admin', icon: <span>📊</span> },
    { label: 'Monitoring User', href: '/dashboard/admin/users', icon: <span>👥</span> },
    { label: 'Monitoring Toko', href: '/dashboard/admin/stores', icon: <span>🏪</span> },
    { label: 'Monitoring Produk', href: '/dashboard/admin/products', icon: <span>📦</span> },
    { label: 'Monitoring Pesanan', href: '/dashboard/admin/orders', icon: <span>🧾</span> },
    { label: 'Voucher & Promo', href: '/dashboard/admin/promos', icon: <span>🎁</span> },
    { label: 'Monitoring Pengiriman', href: '/dashboard/admin/deliveries', icon: <span>🚚</span> },
];

const DUMMY_USER = { name: 'Admin Utama', email: 'admin@seapedia.com', roles: ['admin' as const] };

const STATS = [
    { label: 'Total User', value: '12,450', icon: '👥', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Toko', value: '1,234', icon: '🏪', color: 'text-secondary', bg: 'bg-orange-50' },
    { label: 'Total Produk', value: '84,210', icon: '📦', color: 'text-neutral-dark', bg: 'bg-neutral-light' },
    { label: 'Total Pesanan (Harian)', value: '3,842', icon: '🛒', color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Revenue (Platform Fee)', value: 'Rp 42Jt', icon: '💹', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pesanan Bermasalah', value: '12', icon: '⚠️', color: 'text-danger', bg: 'bg-red-50' },
];

const RECENT_ACTIVITY = [
    { text: 'User Budi S. baru saja mandaftar sebagai Buyer.', time: '2 mnt lalu' },
    { text: 'Toko "Maju Jaya" mengajukan verifikasi toko.', time: '15 mnt lalu' },
    { text: 'Pesanan SEA-0492 dilaporkan (Barang rusak).', time: '1 jam lalu' },
    { text: 'Voucher "MERDEKA50" sedang digunakan (500 limit tercapai).', time: '4 jam lalu' },
];

export default function AdminDashboard() {
    return (
        <DashboardLayout role="admin" user={DUMMY_USER} menuItems={MENU_ITEMS} activePath="/dashboard/admin">
            <Head title="Admin Control Panel – SEAPEDIA" />
            <div className="p-5 lg:p-7 space-y-6 max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-neutral-dark rounded-2xl p-6 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}
                    />
                    <div className="relative z-10">
                        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Control Panel</p>
                        <h1 className="font-display text-2xl font-bold mb-1">Admin SEAPEDIA ⚙️</h1>
                        <p className="text-white/80 text-sm">Sistem pusat pemantauan aktivitas marketplace hari ini</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="bg-white rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 xl:flex-col xl:items-start xl:gap-2">
                                <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center text-lg flex-shrink-0`}>{s.icon}</div>
                                <div className="min-w-0">
                                    <p className={`text-xl font-bold ${s.color} leading-tight truncate`}>{s.value}</p>
                                    <p className="text-xs text-neutral-medium mt-0.5 xl:mt-1">{s.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {/* Activity Feed & User Breakdown */}
                    <div className="xl:col-span-1 space-y-5">
                        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-border">
                                <h2 className="font-display font-semibold text-neutral-dark">Ringkasan Role Pengguna</h2>
                            </div>
                            <div className="p-5 flex flex-col items-center">
                                {/* SVG Donut Chart */}
                                <div className="relative w-40 h-40 mb-4">
                                    <svg viewBox="0 0 36 36" className="absolute top-0 left-0 w-full h-full text-blue-600 block">
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="65, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#F47B20" strokeWidth="3" strokeDasharray="30, 100" strokeDashoffset="-65" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#03AC0E" strokeWidth="3" strokeDasharray="5, 100" strokeDashoffset="-95" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-xl font-bold text-neutral-dark">12.4k</span>
                                        <span className="text-[10px] text-neutral-medium font-medium uppercase">Total</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600" /> <span className="text-neutral-dark">Buyer</span></div>
                                        <span className="font-bold">65% (8,092)</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary" /> <span className="text-neutral-dark">Seller</span></div>
                                        <span className="font-bold">30% (3,735)</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> <span className="text-neutral-dark">Driver</span></div>
                                        <span className="font-bold">5% (623)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-border shadow-sm p-4">
                            <h2 className="font-display text-sm font-semibold text-neutral-dark mb-3">Aksi Cepat</h2>
                            <div className="space-y-2">
                                <button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold px-4 py-2 rounded-lg text-sm transition-colors text-left flex justify-between items-center group">
                                    <span>Buat Voucher Promo</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </button>
                                <button className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-4 py-2 rounded-lg text-sm transition-colors text-left flex justify-between items-center group">
                                    <span>Tinjau Laporan (12)</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access / Tables */}
                    <div className="xl:col-span-2 bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
                        <div className="px-5 py-4 border-b border-border">
                            <h2 className="font-display font-semibold text-neutral-dark">Aktivitas Sistem Terbaru ⚡</h2>
                        </div>
                        <div className="flex-1 p-5 space-y-4">
                            {RECENT_ACTIVITY.map((act, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center relative mt-1">
                                        <div className="w-2 h-2 rounded-full bg-primary absolute z-10" />
                                        {i !== RECENT_ACTIVITY.length - 1 && (
                                            <div className="w-0.5 h-full bg-neutral-200 mt-2" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <p className="text-sm text-neutral-dark">{act.text}</p>
                                        <p className="text-xs text-neutral-medium mt-1">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
