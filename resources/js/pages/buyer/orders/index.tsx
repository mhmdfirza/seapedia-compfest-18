import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Footer from '@/components/sections/footer';
import Container from '@/components/ui/container';
import Badge from '@/components/ui/badge';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const TABS = ['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

const ORDERS = [
    {
        id: 'SEA-20250620-0001', date: '20 Jun 2025', status: 'Dikirim',
        items: [{ title: 'Wireless Noise-Canceling Headphones Pro Max', qty: 1, price: 1299000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' }],
        total: 1314000, seller: 'TechWorld Store', tracking: 'SEA1234567890'
    },
    {
        id: 'SEA-20250618-0002', date: '18 Jun 2025', status: 'Selesai',
        items: [{ title: 'Oversized Premium Cotton Hoodie', qty: 2, price: 259000, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80' }],
        total: 533000, seller: 'Urban Threads', tracking: 'JNE9876543210'
    },
    {
        id: 'SEA-20250615-0003', date: '15 Jun 2025', status: 'Selesai',
        items: [{ title: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', qty: 1, price: 169000, image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=200&q=80' }],
        total: 184000, seller: 'FitLife Sports', tracking: 'TIKI2468101214'
    },
    {
        id: 'SEA-20250610-0004', date: '10 Jun 2025', status: 'Menunggu Pembayaran',
        items: [{ title: 'Smartwatch Band 8 PRO Amoled', qty: 1, price: 399000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80' }],
        total: 414000, seller: 'TechWorld Store', tracking: ''
    },
];

const STATUS_VARIANT: Record<string, 'primary' | 'secondary' | 'danger' | 'neutral'> = {
    'Dikirim': 'primary', 'Selesai': 'neutral', 'Menunggu Pembayaran': 'secondary', 'Diproses': 'primary', 'Dibatalkan': 'danger'
};

export default function OrdersIndex() {
    const [activeTab, setActiveTab] = useState('Semua');
    const filtered = activeTab === 'Semua' ? ORDERS : ORDERS.filter(o => o.status === activeTab);

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Pesanan Saya – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    <h1 className="font-display text-xl font-bold text-neutral-dark mb-5">Pesanan Saya</h1>

                    {/* Tabs */}
                    <div className="bg-white rounded-xl border border-border mb-4 overflow-x-auto">
                        <div className="flex">
                            {TABS.map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary font-semibold' : 'border-transparent text-neutral-medium hover:text-neutral-dark'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order List */}
                    <div className="space-y-4">
                        {filtered.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-xl border border-border">
                                <div className="text-5xl mb-3">📦</div>
                                <p className="font-medium text-neutral-dark">Belum ada pesanan di sini</p>
                                <p className="text-sm text-neutral-medium mt-1">Yuk mulai belanja di SEAPEDIA!</p>
                            </div>
                        )}
                        {filtered.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl border border-border p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-xs text-neutral-medium">{order.date} · {order.seller}</p>
                                        <p className="text-xs text-neutral-medium font-mono">{order.id}</p>
                                    </div>
                                    <Badge variant={STATUS_VARIANT[order.status] ?? 'neutral'}>{order.status}</Badge>
                                </div>

                                {order.items.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-center py-2">
                                        <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover border border-border" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-neutral-dark line-clamp-1">{item.title}</p>
                                            <p className="text-xs text-neutral-medium">x{item.qty} · {formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                                    <div>
                                        <span className="text-xs text-neutral-medium">Total: </span>
                                        <span className="text-sm font-bold text-neutral-dark">{formatPrice(order.total)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {order.status === 'Selesai' && (
                                            <Link href={`/products/${order.items[0].title}`}>
                                                <button className="text-xs border border-primary text-primary rounded-lg px-3 py-1.5 hover:bg-primary-light transition-colors">Beli Lagi</button>
                                            </Link>
                                        )}
                                        {order.status === 'Dikirim' && order.tracking && (
                                            <button className="text-xs bg-primary text-white rounded-lg px-3 py-1.5 hover:bg-primary-dark transition-colors">Lacak Paket</button>
                                        )}
                                        {order.status === 'Menunggu Pembayaran' && (
                                            <button className="text-xs bg-secondary text-white rounded-lg px-3 py-1.5 hover:opacity-90 transition-colors">Bayar Sekarang</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
