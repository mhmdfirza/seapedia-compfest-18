import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Container from '@/components/ui/container';
import Button from '@/components/ui/button';

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

const ORDER_ITEMS = [
    { id: 1, title: 'Wireless Noise-Canceling Headphones Pro Max', price: 1299000, qty: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' },
    { id: 2, title: 'Oversized Premium Cotton Hoodie', price: 259000, qty: 2, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80' },
];

const PAYMENT_METHODS = [
    { id: 'gopay', label: 'GoPay', icon: '📱' },
    { id: 'ovo', label: 'OVO', icon: '💜' },
    { id: 'bca', label: 'Transfer BCA', icon: '🏦' },
    { id: 'mandiri', label: 'Mandiri Virtual Account', icon: '💳' },
    { id: 'cod', label: 'Bayar di Tempat (COD)', icon: '💵' },
];

export default function CheckoutIndex() {
    const [paymentMethod, setPaymentMethod] = useState('gopay');
    const [note, setNote] = useState('');

    const subtotal = ORDER_ITEMS.reduce((acc, i) => acc + i.price * i.qty, 0);
    const shipping = 15000;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Checkout – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    <h1 className="font-display text-xl font-bold text-neutral-dark mb-5">Checkout</h1>
                    <div className="flex flex-col lg:flex-row gap-5">
                        {/* Left: Address + Payment */}
                        <div className="flex-1 space-y-4">
                            {/* Delivery Address */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-semibold text-neutral-dark">📍 Alamat Pengiriman</h2>
                                    <Link href="/buyer/address" className="text-xs text-primary hover:underline">Ganti Alamat</Link>
                                </div>
                                <div className="bg-primary-light rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-neutral-dark">Budi Santoso <span className="text-xs font-normal text-neutral-medium ml-2">+62 812-3456-7890</span></p>
                                            <p className="text-sm text-neutral-medium mt-0.5">Jl. Sudirman No. 45, RT 03/RW 05, Menteng, Jakarta Pusat, DKI Jakarta 10310</p>
                                        </div>
                                        <span className="text-[10px] border border-primary text-primary rounded px-1.5 py-0.5">Utama</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Method */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h2 className="font-semibold text-neutral-dark mb-4">🚚 Metode Pengiriman</h2>
                                <div className="space-y-2">
                                    {['SEAPEDIA Express (1-2 hari)', 'JNE Reguler (3-5 hari)', 'TIKI (4-6 hari)'].map((opt, i) => (
                                        <label key={opt} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${i === 0 ? 'border-primary bg-primary-light' : 'border-border hover:border-primary'}`}>
                                            <div className="flex items-center gap-2">
                                                <input type="radio" name="shipping" defaultChecked={i === 0} className="accent-primary" />
                                                <span className="text-sm text-neutral-dark">{opt}</span>
                                            </div>
                                            <span className="text-sm font-medium text-neutral-dark">{formatPrice(15000 + i * 3000)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h2 className="font-semibold text-neutral-dark mb-4">💳 Metode Pembayaran</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {PAYMENT_METHODS.map((pm) => (
                                        <label key={pm.id} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === pm.id ? 'border-primary bg-primary-light' : 'border-border hover:border-primary'}`}>
                                            <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id}
                                                onChange={() => setPaymentMethod(pm.id)} className="accent-primary" />
                                            <span className="text-lg">{pm.icon}</span>
                                            <span className="text-sm text-neutral-dark">{pm.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Note */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h2 className="font-semibold text-neutral-dark mb-3">📝 Catatan untuk Penjual</h2>
                                <textarea value={note} onChange={e => setNote(e.target.value)}
                                    placeholder="Tulis catatan tambahan untuk penjual (opsional)..."
                                    className="w-full border border-border rounded-lg p-3 text-sm placeholder:text-neutral-medium focus:outline-none focus:border-primary resize-none" rows={3} />
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="w-full lg:w-72 flex-shrink-0">
                            <div className="bg-white rounded-xl border border-border p-4 sticky top-20 space-y-4">
                                <h2 className="font-semibold text-neutral-dark">Ringkasan Pesanan</h2>
                                <div className="space-y-3">
                                    {ORDER_ITEMS.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <img src={item.image} alt="" className="w-14 h-14 object-cover rounded-lg border border-border" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-neutral-dark line-clamp-2">{item.title}</p>
                                                <p className="text-xs text-neutral-medium mt-0.5">x{item.qty}</p>
                                                <p className="text-xs font-semibold text-neutral-dark">{formatPrice(item.price * item.qty)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr className="border-border" />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-neutral-medium">
                                        <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-medium">
                                        <span>Ongkos Kirim</span><span>{formatPrice(shipping)}</span>
                                    </div>
                                    <hr className="border-border" />
                                    <div className="flex justify-between font-bold text-neutral-dark">
                                        <span>Total</span><span className="text-primary">{formatPrice(total)}</span>
                                    </div>
                                </div>
                                <Button size="lg" className="w-full justify-center">Bayar Sekarang</Button>
                                <p className="text-[10px] text-neutral-medium text-center">Dengan melanjutkan, kamu setuju dengan Syarat & Ketentuan SEAPEDIA</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
