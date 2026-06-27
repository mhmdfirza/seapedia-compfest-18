import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout, { MenuItem } from 'res/components/layout/DashboardLayout';
import Button from 'res/components/ui/button';
import SectionTitle from 'res/components/ui/sectiontitle';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/driver', icon: <span>🏠</span> },
    { label: 'Profil', href: '/dashboard/driver/profile', icon: <span>👤</span> },
    { label: 'Cari Pekerjaan', href: '/dashboard/driver/jobs', icon: <span>🔍</span> },
    { label: 'Pekerjaan Aktif', href: '/dashboard/driver/active-job', icon: <span>🚚</span> },
    { label: 'Riwayat', href: '/dashboard/driver/history', icon: <span>📜</span> },
    { label: 'Pendapatan', href: '/dashboard/driver/earnings', icon: <span>💰</span> },
];

const DUMMY_USER = { name: 'Arif Kurniawan', email: 'arif@email.com', roles: ['driver' as const] };

const STATS = [
    { label: 'Pekerjaan Selesai', value: '8', icon: '✅', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pendapatan Harian', value: 'Rp 185.000', icon: '💵', color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Pendapatan Bulan', value: 'Rp 4.250.000', icon: '💰', color: 'text-neutral-dark', bg: 'bg-neutral-light' },
    { label: 'Rating Driver', value: '4.9 ★', icon: '⭐', color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const AVAILABLE_JOBS = [
    { id: 'JOB-001', from: 'TechWorld Store, Jakarta Selatan', to: 'Budi S., Kebayoran Baru', distance: '5.2 km', fee: 25000, deadline: '14:00' },
    { id: 'JOB-002', from: 'Urban Threads, Bandung', to: 'Siti A., Cicendo', distance: '3.8 km', fee: 18000, deadline: '15:30' },
    { id: 'JOB-003', from: 'Glow Beauty, Jakarta Pusat', to: 'Dewi R., Menteng', distance: '2.1 km', fee: 12000, deadline: '16:00' },
];

export default function DriverDashboard() {
    const [isAvailable, setIsAvailable] = useState(true);

    return (
        <DashboardLayout role="driver" user={DUMMY_USER} menuItems={MENU_ITEMS} activePath="/dashboard/driver">
            <Head title="Dashboard Driver – SEAPEDIA" />
            <div className="p-5 lg:p-7 space-y-6 w-full">

                {/* Header & Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-neutral-dark mb-1">Halo, {DUMMY_USER.name}! Siap Bertugas? 🚚</h1>
                        <p className="text-sm text-neutral-medium">Plat nomor B 1234 XYZ · Motor</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-border shadow-sm">
                        <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-primary animate-pulse' : 'bg-neutral-medium'}`} />
                        <span className="text-sm font-semibold text-neutral-dark">Status:</span>
                        <button
                            onClick={() => setIsAvailable(!isAvailable)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? 'bg-primary' : 'bg-neutral-medium'}`}
                        >
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3 shadow-sm">
                            <div className={`w-11 h-11 rounded-full ${s.bg} flex items-center justify-center text-xl flex-shrink-0`}>{s.icon}</div>
                            <div>
                                <p className={`text-base font-bold ${s.color} leading-tight`}>{s.value}</p>
                                <p className="text-xs text-neutral-medium mt-0.5">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Available Jobs */}
                <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-neutral-light/50">
                        <h2 className="font-display font-semibold text-neutral-dark">Pekerjaan Tersedia 📦</h2>
                        <Link href="/dashboard/driver/jobs" className="text-xs text-primary hover:underline font-medium">Buka Peta &rarr;</Link>
                    </div>
                    <div className="divide-y divide-border">
                        {AVAILABLE_JOBS.map((job) => (
                            <div key={job.id} className="p-5 hover:bg-neutral-light/30 transition-colors flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                                        <span className="text-xs font-mono text-neutral-medium bg-neutral-light px-2 py-0.5 rounded">{job.id}</span>
                                        <span className="text-base font-bold text-primary">{formatPrice(job.fee)}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs md:text-sm text-neutral-dark">
                                        <div className="mt-1 flex flex-col items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                            <div className="w-0.5 h-4 bg-border my-0.5" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <p><span className="text-neutral-medium font-medium">Dari:</span> {job.from}</p>
                                            <p><span className="text-neutral-medium font-medium">Ke:</span> {job.to}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-0 border-border">
                                    <div className="flex gap-3 text-xs text-neutral-medium md:justify-end">
                                        <span className="flex items-center gap-1">📏 {job.distance}</span>
                                        <span className="flex items-center gap-1">⏰ {job.deadline}</span>
                                    </div>
                                    <Button disabled className="w-full md:w-auto mt-1 cursor-not-allowed opacity-50 bg-neutral-medium">Ambil Pekerjaan</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {AVAILABLE_JOBS.length === 0 && (
                        <div className="p-10 text-center text-neutral-medium">
                            <p className="text-4xl mb-2">🤷‍♂️</p>
                            <p>Belum ada pekerjaan di sekitarmu.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
