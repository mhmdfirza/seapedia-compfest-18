import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from 'res/components/sections/navbar';
import Container from 'res/components/ui/container';
import Badge from 'res/components/ui/badge';
import Button from 'res/components/ui/button';
import SectionTitle from 'res/components/ui/sectiontitle';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const JOB_STATUS_TABS = ['Tersedia', 'Sedang Berlangsung', 'Selesai'];

const AVAILABLE_JOBS = [
    { id: 'DRV-001', from: 'TechWorld Store, Jakarta Selatan', to: 'Budi S., Kebayoran Baru', distance: '5.2 km', fee: 25000, weight: '1.2 kg', deadline: '14:00' },
    { id: 'DRV-002', from: 'Urban Threads, Bandung', to: 'Siti A., Cicendo', distance: '3.8 km', fee: 18000, weight: '0.5 kg', deadline: '15:30' },
    { id: 'DRV-003', from: 'Glow Beauty, Jakarta Pusat', to: 'Dewi R., Menteng', distance: '2.1 km', fee: 12000, weight: '0.3 kg', deadline: '16:00' },
];

const STATS = [
    { label: 'Penghasilan Hari Ini', value: 'Rp 185.000', icon: '💵', color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Pengiriman Selesai', value: '8', icon: '✅', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pengiriman Berlangsung', value: '1', icon: '🚴', color: 'text-secondary', bg: 'bg-orange-50' },
    { label: 'Rating Driver', value: '4.9 ★', icon: '⭐', color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

export default function DriverDashboard() {
    const [activeTab, setActiveTab] = useState('Tersedia');

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Dashboard Driver – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="font-display text-2xl font-bold text-neutral-dark">Dashboard Driver 🚴</h1>
                            <p className="text-sm text-neutral-medium mt-1">Selamat bekerja, Arif Kurniawan</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs text-primary font-medium">Online</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Job Tabs */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
                            <div className="flex border-b border-border">
                                {JOB_STATUS_TABS.map((tab) => (
                                    <button key={tab} onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 text-sm transition-colors ${activeTab === tab ? 'text-primary font-semibold border-b-2 border-primary' : 'text-neutral-medium'}`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="p-4 space-y-3">
                                {activeTab === 'Tersedia' && AVAILABLE_JOBS.map((job) => (
                                    <div key={job.id} className="border border-border rounded-xl p-4 hover:border-primary transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-mono text-neutral-medium">{job.id}</span>
                                            <span className="text-sm font-bold text-primary">{formatPrice(job.fee)}</span>
                                        </div>
                                        <div className="space-y-1.5 mb-3">
                                            <div className="flex gap-2 text-xs text-neutral-medium">
                                                <span className="text-primary font-bold">↑</span>
                                                <span>{job.from}</span>
                                            </div>
                                            <div className="flex gap-2 text-xs text-neutral-medium">
                                                <span className="text-secondary font-bold">↓</span>
                                                <span>{job.to}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3 text-xs text-neutral-medium">
                                                <span>📏 {job.distance}</span>
                                                <span>⚖️ {job.weight}</span>
                                                <span>⏰ Batas {job.deadline}</span>
                                            </div>
                                            <Link href={`/driver/jobs/${job.id}`}>
                                                <Button size="sm">Ambil</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {activeTab !== 'Tersedia' && (
                                    <div className="text-center py-10 text-neutral-medium">
                                        <div className="text-4xl mb-3">{activeTab === 'Sedang Berlangsung' ? '🚴' : '✅'}</div>
                                        <p className="text-sm">Tidak ada pengiriman {activeTab.toLowerCase()}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Earnings Summary */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl border border-border p-4">
                                <SectionTitle title="Penghasilan Minggu Ini" />
                                <div className="text-center py-3">
                                    <p className="text-3xl font-bold text-primary">Rp 1.245.000</p>
                                    <p className="text-xs text-neutral-medium mt-1">42 pengiriman berhasil</p>
                                </div>
                                <div className="space-y-2 mt-3">
                                    {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d, i) => {
                                        const heights = [40, 65, 30, 80, 55, 90, 20];
                                        return (
                                            <div key={d} className="flex items-center gap-2">
                                                <span className="text-xs text-neutral-medium w-6">{d}</span>
                                                <div className="flex-1 h-2 bg-neutral-light rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${heights[i]}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Link href="/driver/earnings">
                                    <Button variant="outline" size="sm" className="w-full justify-center mt-3">Lihat Riwayat Penghasilan</Button>
                                </Link>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-4">
                                <p className="text-sm font-semibold text-neutral-dark mb-3">Profil Driver</p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center text-lg">A</div>
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-dark">Arif Kurniawan</p>
                                        <p className="text-xs text-neutral-medium">Motor · Plat B 1234 XYZ</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-neutral-light rounded-lg p-2">
                                        <p className="text-sm font-bold text-neutral-dark">4.9</p>
                                        <p className="text-[10px] text-neutral-medium">Rating</p>
                                    </div>
                                    <div className="bg-neutral-light rounded-lg p-2">
                                        <p className="text-sm font-bold text-neutral-dark">842</p>
                                        <p className="text-[10px] text-neutral-medium">Pengiriman</p>
                                    </div>
                                    <div className="bg-neutral-light rounded-lg p-2">
                                        <p className="text-sm font-bold text-neutral-dark">98%</p>
                                        <p className="text-[10px] text-neutral-medium">Tepat Waktu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
