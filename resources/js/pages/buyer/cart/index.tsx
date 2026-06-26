import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from 'res/components/sections/navbar';
import Footer from 'res/components/sections/footer';
import Container from 'res/components/ui/container';
import Button from 'res/components/ui/button';

type CartItem = { id: number; title: string; price: number; qty: number; image: string; seller: string; };

const INITIAL_CART: CartItem[] = [
    { id: 1, title: 'Wireless Noise-Canceling Headphones Pro Max', price: 1299000, qty: 1, seller: 'TechWorld Store', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' },
    { id: 2, title: 'Oversized Premium Cotton Hoodie', price: 259000, qty: 2, seller: 'Urban Threads', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80' },
    { id: 3, title: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', price: 169000, qty: 1, seller: 'FitLife Sports', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=200&q=80' },
];

function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
}

export default function CartIndex() {
    const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
    const [selected, setSelected] = useState<number[]>([1, 2, 3]);

    const updateQty = (id: number, delta: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
    const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
    const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

    const selectedItems = items.filter(i => selected.includes(i.id));
    const subtotal = selectedItems.reduce((acc, i) => acc + i.price * i.qty, 0);
    const shippingFee = selectedItems.length > 0 ? 15000 : 0;
    const total = subtotal + shippingFee;

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Keranjang Belanja – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    <h1 className="font-display text-xl font-bold text-neutral-dark mb-5">Keranjang Belanja</h1>
                    {items.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-border">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="font-semibold text-neutral-dark mb-2">Keranjang kamu masih kosong</p>
                            <p className="text-sm text-neutral-medium mb-5">Yuk, mulai temukan produk favoritmu!</p>
                            <Link href="/products"><Button size="md">Mulai Belanja</Button></Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-5">
                            {/* Cart Items */}
                            <div className="flex-1 space-y-3">
                                {/* Select all */}
                                <div className="bg-white rounded-xl border border-border px-4 py-3 flex items-center gap-3">
                                    <input type="checkbox" id="selectAll" className="w-4 h-4 accent-primary"
                                        checked={selected.length === items.length}
                                        onChange={() => setSelected(selected.length === items.length ? [] : items.map(i => i.id))} />
                                    <label htmlFor="selectAll" className="text-sm font-medium text-neutral-dark">Pilih Semua ({items.length})</label>
                                </div>

                                {items.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl border border-border p-4">
                                        <div className="flex items-start gap-3">
                                            <input type="checkbox" className="w-4 h-4 accent-primary mt-1"
                                                checked={selected.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)} />
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg border border-border" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-neutral-medium mb-0.5">🏪 {item.seller}</p>
                                                <p className="text-sm font-medium text-neutral-dark line-clamp-2 mb-2">{item.title}</p>
                                                <p className="text-base font-bold text-neutral-dark">{formatPrice(item.price)}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <button onClick={() => removeItem(item.id)} className="text-xs text-neutral-medium hover:text-danger transition-colors">Hapus</button>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary text-sm">−</button>
                                                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary text-sm">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="w-full lg:w-72 flex-shrink-0">
                                <div className="bg-white rounded-xl border border-border p-4 sticky top-20">
                                    <h2 className="font-semibold text-neutral-dark mb-4">Ringkasan Belanja</h2>
                                    <div className="space-y-2.5 text-sm mb-4">
                                        <div className="flex justify-between text-neutral-medium">
                                            <span>Total Harga ({selectedItems.reduce((a, i) => a + i.qty, 0)} barang)</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-neutral-medium">
                                            <span>Ongkos Kirim</span>
                                            <span>{shippingFee > 0 ? formatPrice(shippingFee) : '-'}</span>
                                        </div>
                                        <div className="flex justify-between text-primary font-medium">
                                            <span>Hemat</span>
                                            <span>-{formatPrice(0)}</span>
                                        </div>
                                        <hr className="border-border" />
                                        <div className="flex justify-between font-bold text-neutral-dark text-base">
                                            <span>Total Tagihan</span>
                                            <span>{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                    <Link href="/dashboard/buyer/checkout">
                                        <Button size="lg" className="w-full justify-center" disabled={selectedItems.length === 0}>
                                            Beli ({selectedItems.length})
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </main>
            <Footer />
        </div>
    );
}
