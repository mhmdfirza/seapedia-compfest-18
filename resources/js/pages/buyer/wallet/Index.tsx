import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Container from '@/components/ui/container';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import SectionTitle from '@/components/ui/sectiontitle';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const TRANSACTIONS = [
    { id: 'TXN-001', type: 'debit', label: 'Pembayaran Pesanan SEA-001', amount: 1314000, date: '26 Jun 2025' },
    { id: 'TXN-002', type: 'credit', label: 'Top Up GoPay', amount: 500000, date: '25 Jun 2025' },
    { id: 'TXN-003', type: 'debit', label: 'Pembayaran Pesanan SEA-002', amount: 533000, date: '18 Jun 2025' },
    { id: 'TXN-004', type: 'credit', label: 'Refund Pesanan SEA-000', amount: 199000, date: '15 Jun 2025' },
    { id: 'TXN-005', type: 'credit', label: 'Top Up Transfer BCA', amount: 1000000, date: '10 Jun 2025' },
];

const TOP_UP_OPTIONS = [25000, 50000, 100000, 200000, 500000, 1000000];

export default function WalletIndex() {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Dompet SEA – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    <h1 className="font-display text-xl font-bold text-neutral-dark mb-5">Dompet SEA 💰</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Balance Card */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-gradient-to-br from-primary to-green-600 rounded-2xl p-6 text-white">
                                <p className="text-sm text-white/70 mb-1">Saldo SEAPEDIA Wallet</p>
                                <p className="text-4xl font-bold font-display mb-4">{formatPrice(1452000)}</p>
                                <div className="flex gap-3">
                                    <Button size="sm" className="bg-white text-primary hover:bg-primary-light border-transparent font-semibold">Top Up</Button>
                                    <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-semibold">Tarik Dana</Button>
                                </div>
                            </div>

                            {/* Transaction History */}
                            <div className="bg-white rounded-xl border border-border p-4">
                                <SectionTitle title="Riwayat Transaksi" />
                                <div className="space-y-3">
                                    {TRANSACTIONS.map((tx) => (
                                        <div key={tx.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${tx.type === 'credit' ? 'bg-primary-light text-primary' : 'bg-red-50 text-danger'}`}>
                                                {tx.type === 'credit' ? '↓' : '↑'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-neutral-dark truncate">{tx.label}</p>
                                                <p className="text-xs text-neutral-medium">{tx.date}</p>
                                            </div>
                                            <p className={`text-sm font-bold flex-shrink-0 ${tx.type === 'credit' ? 'text-primary' : 'text-danger'}`}>
                                                {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Up Panel */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl border border-border p-4">
                                <SectionTitle title="Top Up Saldo" />
                                <p className="text-xs text-neutral-medium mb-3">Pilih nominal top up:</p>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {TOP_UP_OPTIONS.map((amount) => (
                                        <button key={amount} className="text-sm border border-border rounded-lg px-3 py-2 hover:border-primary hover:bg-primary-light hover:text-primary transition-colors text-neutral-dark font-medium">
                                            {formatPrice(amount)}
                                        </button>
                                    ))}
                                </div>
                                <Button size="md" className="w-full justify-center">Top Up Sekarang</Button>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-4">
                                <p className="text-sm font-semibold text-neutral-dark mb-3">Keamanan Wallet</p>
                                <div className="space-y-2">
                                    {[
                                        { label: 'PIN Wallet', status: 'Aktif', ok: true },
                                        { label: 'Verifikasi 2 Langkah', status: 'Aktif', ok: true },
                                        { label: 'Biometrik', status: 'Belum Aktif', ok: false },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between">
                                            <span className="text-xs text-neutral-medium">{item.label}</span>
                                            <Badge variant={item.ok ? 'primary' : 'neutral'} className="text-[10px]">{item.status}</Badge>
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
