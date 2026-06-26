import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Container from '@/components/ui/container';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import SectionTitle from '@/components/ui/sectiontitle';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const STATS = [
    { label: 'Total Users', value: '12,450', icon: '👥', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Stores', value: '1,234', icon: '🏪', color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Revenue Platform', value: 'Rp 982 Jt', icon: '💹', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Verifikasi', value: '23', icon: '⏳', color: 'text-secondary', bg: 'bg-orange-50' },
];

const RECENT_USERS = [
    { id: 1, name: 'Budi Santoso', email: 'budi@email.com', role: 'Buyer', joined: '25 Jun 2025', status: 'Aktif' },
    { id: 2, name: 'TechWorld Store', email: 'techworld@email.com', role: 'Seller', joined: '24 Jun 2025', status: 'Aktif' },
    { id: 3, name: 'Arif Kurniawan', email: 'arif@email.com', role: 'Driver', joined: '23 Jun 2025', status: 'Aktif' },
    { id: 4, name: 'Sari Dewi', email: 'sari@email.com', role: 'Buyer', joined: '22 Jun 2025', status: 'Aktif' },
    { id: 5, name: 'Maju Jaya Store', email: 'majujaya@email.com', role: 'Seller', joined: '21 Jun 2025', status: 'Perlu Verifikasi' },
];

const ROLE_VARIANT: Record<string, 'primary' | 'secondary' | 'neutral' | 'danger'> = {
    'Buyer': 'primary', 'Seller': 'secondary', 'Driver': 'neutral'
};

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: '📊', active: true },
    { label: 'Users', href: '/admin/users', icon: '👥' },
    { label: 'Toko', href: '/admin/stores', icon: '🏪' },
    { label: 'Produk', href: '/admin/products', icon: '📦' },
    { label: 'Pesanan', href: '/admin/orders', icon: '🧾' },
    { label: 'Promo', href: '/admin/discounts/promos', icon: '🎁' },
    { label: 'Voucher', href: '/admin/discounts/vouchers', icon: '🎫' },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Admin Panel – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-5">
                        {/* Sidebar Nav */}
                        <aside className="w-full lg:w-52 flex-shrink-0">
                            <div className="bg-white rounded-xl border border-border p-3 space-y-1">
                                <p className="text-xs text-neutral-medium px-2 py-1 font-semibold uppercase tracking-wide">Panel Admin</p>
                                {NAV_ITEMS.map((item) => (
                                    <Link key={item.label} href={item.href}
                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? 'bg-primary-light text-primary font-medium' : 'text-neutral-dark hover:bg-neutral-light'}`}>
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 space-y-5">
                            {/* Header */}
                            <div>
                                <h1 className="font-display text-2xl font-bold text-neutral-dark">Admin Panel 📊</h1>
                                <p className="text-sm text-neutral-medium mt-0.5">Ringkasan platform SEAPEDIA hari ini</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {STATS.map((s) => (
                                    <div key={s.label} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center text-xl flex-shrink-0`}>{s.icon}</div>
                                        <div>
                                            <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                                            <p className="text-xs text-neutral-medium">{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Users Table */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <SectionTitle title="Pengguna Terbaru"
                                    action={<Link href="/admin/users" className="text-primary text-xs hover:underline">Lihat Semua →</Link>}
                                />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-xs text-neutral-medium border-b border-border">
                                                <th className="py-2 text-left">Nama</th>
                                                <th className="py-2 text-left">Email</th>
                                                <th className="py-2 text-center">Role</th>
                                                <th className="py-2 text-left hidden md:table-cell">Bergabung</th>
                                                <th className="py-2 text-center">Status</th>
                                                <th className="py-2 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RECENT_USERS.map((u) => (
                                                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-neutral-light transition-colors">
                                                    <td className="py-2.5 font-medium text-neutral-dark">{u.name}</td>
                                                    <td className="py-2.5 text-neutral-medium text-xs">{u.email}</td>
                                                    <td className="py-2.5 text-center">
                                                        <Badge variant={ROLE_VARIANT[u.role] ?? 'neutral'} className="text-[10px]">{u.role}</Badge>
                                                    </td>
                                                    <td className="py-2.5 text-neutral-medium text-xs hidden md:table-cell">{u.joined}</td>
                                                    <td className="py-2.5 text-center">
                                                        <Badge variant={u.status === 'Aktif' ? 'primary' : 'secondary'} className="text-[10px]">{u.status}</Badge>
                                                    </td>
                                                    <td className="py-2.5 text-right">
                                                        <button className="text-xs text-primary hover:underline">Detail</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <SectionTitle title="Aksi Cepat" />
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { label: 'Tambah Voucher', href: '/admin/discounts/vouchers/create', icon: '🎫' },
                                        { label: 'Buat Promo', href: '/admin/discounts/promos/create', icon: '🎁' },
                                        { label: 'Verifikasi Seller', href: '/admin/stores', icon: '✅' },
                                        { label: 'Laporan Platform', href: '#', icon: '📈' },
                                    ].map((action) => (
                                        <Link key={action.label} href={action.href}>
                                            <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light transition-all text-center cursor-pointer">
                                                <span className="text-2xl">{action.icon}</span>
                                                <span className="text-xs font-medium text-neutral-dark">{action.label}</span>
                                            </div>
                                        </Link>
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
