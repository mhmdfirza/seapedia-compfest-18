import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Footer from '@/components/sections/footer';
import Container from '@/components/ui/container';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import StarRating from '@/components/ui/starrating';

const MOCK_PRODUCT = {
    id: 1,
    title: 'Wireless Noise-Canceling Headphones Pro Max',
    price: 1299000,
    originalPrice: 1999000,
    rating: 4.8,
    reviewCount: 2341,
    sold: 5678,
    stock: 24,
    seller: { name: 'TechWorld Store', location: 'Jakarta Selatan', rating: 4.9, totalSales: 12000 },
    description: 'Nikmati kualitas audio premium dengan teknologi Active Noise Canceling generasi terbaru. Driver 40mm menghadirkan bass yang dalam dan treble yang jernih. Baterai hingga 30 jam, charging hanya 1.5 jam. Cocok untuk bekerja, belajar, dan perjalanan.',
    images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80',
    ],
    specs: [
        { label: 'Driver', value: '40mm Dynamic' },
        { label: 'Baterai', value: '30 Jam' },
        { label: 'Konektivitas', value: 'Bluetooth 5.3 + 3.5mm' },
        { label: 'Berat', value: '250g' },
        { label: 'Garansi', value: '1 Tahun Resmi' },
    ],
};

const REVIEWS = [
    { id: 1, user: 'Ahmad R.', rating: 5, date: '20 Jun 2025', comment: 'Kualitas suaranya luar biasa. ANC benar-benar bekerja dengan baik di kereta commuter. Highly recommended!' },
    { id: 2, user: 'Siti F.', rating: 5, date: '18 Jun 2025', comment: 'Pengiriman cepat, packaging aman. Headphone sesuai deskripsi. Puas banget beli di SEAPEDIA.' },
    { id: 3, user: 'Budi S.', rating: 4, date: '15 Jun 2025', comment: 'Suaranya bagus, tapi earpad sedikit keras untuk pemakaian lama. Overall masih worth the price.' },
];

function formatPrice(price: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export default function ProductShow() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const discountPercent = Math.round((1 - MOCK_PRODUCT.price / MOCK_PRODUCT.originalPrice) * 100);

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title={`${MOCK_PRODUCT.title} – SEAPEDIA`} />
            <Navbar />

            <main className="flex-grow py-6">
                <Container>
                    {/* Breadcrumb */}
                    <nav className="text-xs text-neutral-medium mb-4 flex items-center gap-1">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>›</span>
                        <Link href="/products" className="hover:text-primary">Produk</Link>
                        <span>›</span>
                        <span className="text-neutral-dark font-medium truncate max-w-[200px]">{MOCK_PRODUCT.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Images + Info */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Product main card */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image Gallery */}
                                    <div className="md:w-2/5 flex-shrink-0">
                                        <div className="relative rounded-lg overflow-hidden border border-border aspect-square mb-3">
                                            <img src={MOCK_PRODUCT.images[selectedImage]} alt={MOCK_PRODUCT.title}
                                                className="w-full h-full object-cover" />
                                            <Badge variant="danger" className="absolute top-2 left-2">{discountPercent}% OFF</Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            {MOCK_PRODUCT.images.map((img, i) => (
                                                <button key={i} onClick={() => setSelectedImage(i)}
                                                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors ${selectedImage === i ? 'border-primary' : 'border-border'}`}>
                                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <h1 className="text-lg font-semibold text-neutral-dark mb-2 leading-snug">{MOCK_PRODUCT.title}</h1>

                                        <div className="flex items-center gap-3 mb-3">
                                            <StarRating rating={MOCK_PRODUCT.rating} count={MOCK_PRODUCT.reviewCount} />
                                            <span className="text-xs text-neutral-medium">|</span>
                                            <span className="text-xs text-neutral-medium">{MOCK_PRODUCT.sold.toLocaleString()} terjual</span>
                                        </div>

                                        <div className="bg-primary-light rounded-lg p-3 mb-4">
                                            <p className="text-2xl font-bold text-neutral-dark">{formatPrice(MOCK_PRODUCT.price)}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-neutral-medium line-through">{formatPrice(MOCK_PRODUCT.originalPrice)}</span>
                                                <Badge variant="danger">{discountPercent}%</Badge>
                                            </div>
                                        </div>

                                        {/* Specs */}
                                        <div className="space-y-2 mb-4">
                                            {MOCK_PRODUCT.specs.map((s) => (
                                                <div key={s.label} className="flex gap-3 text-sm">
                                                    <span className="text-neutral-medium w-28 flex-shrink-0">{s.label}</span>
                                                    <span className="text-neutral-dark font-medium">{s.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-neutral-medium border-t border-border pt-3">
                                            <span>📦 Stok tersisa:</span>
                                            <span className="text-neutral-dark font-medium">{MOCK_PRODUCT.stock} unit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h2 className="font-semibold text-neutral-dark mb-3">Deskripsi Produk</h2>
                                <p className="text-sm text-neutral-medium leading-relaxed">{MOCK_PRODUCT.description}</p>
                            </div>

                            {/* Reviews */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h2 className="font-semibold text-neutral-dark mb-4">Ulasan Pembeli ({MOCK_PRODUCT.reviewCount.toLocaleString()})</h2>
                                <div className="flex items-center gap-4 mb-5 p-4 bg-neutral-light rounded-xl">
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-neutral-dark">{MOCK_PRODUCT.rating}</p>
                                        <StarRating rating={MOCK_PRODUCT.rating} className="justify-center mt-1" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        {[5, 4, 3, 2, 1].map((r) => (
                                            <div key={r} className="flex items-center gap-2">
                                                <span className="text-xs text-neutral-medium w-4">{r}</span>
                                                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r === 5 ? 70 : r === 4 ? 20 : 5}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {REVIEWS.map((r) => (
                                        <div key={r.id} className="border-b border-border pb-4 last:border-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold">
                                                    {r.user[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-neutral-dark">{r.user}</p>
                                                    <div className="flex items-center gap-2">
                                                        <StarRating rating={r.rating} />
                                                        <span className="text-xs text-neutral-medium">{r.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-neutral-medium ml-11">{r.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Buy Panel */}
                        <div className="space-y-4">
                            {/* Buy box */}
                            <div className="bg-white rounded-xl border border-border p-5 sticky top-20">
                                <p className="text-sm font-medium text-neutral-dark mb-3">Jumlah</p>
                                <div className="flex items-center gap-3 mb-4">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-lg">−</button>
                                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(q => Math.min(MOCK_PRODUCT.stock, q + 1))}
                                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-lg">+</button>
                                    <span className="text-xs text-neutral-medium">Stok: {MOCK_PRODUCT.stock}</span>
                                </div>

                                <div className="flex justify-between text-sm mb-4">
                                    <span className="text-neutral-medium">Subtotal</span>
                                    <span className="font-bold text-neutral-dark">{formatPrice(MOCK_PRODUCT.price * quantity)}</span>
                                </div>

                                <div className="space-y-2">
                                    <Link href="/buyer/cart">
                                        <Button variant="outline" size="md" className="w-full justify-center">+ Keranjang</Button>
                                    </Link>
                                    <Link href="/buyer/checkout">
                                        <Button variant="primary" size="md" className="w-full justify-center">Beli Sekarang</Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Seller info */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h3 className="text-sm font-semibold text-neutral-dark mb-3">Info Penjual</h3>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">
                                        {MOCK_PRODUCT.seller.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-dark">{MOCK_PRODUCT.seller.name}</p>
                                        <p className="text-xs text-neutral-medium">📍 {MOCK_PRODUCT.seller.location}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="bg-neutral-light rounded-lg p-2">
                                        <p className="text-xs font-bold text-neutral-dark">⭐ {MOCK_PRODUCT.seller.rating}</p>
                                        <p className="text-[10px] text-neutral-medium">Rating Toko</p>
                                    </div>
                                    <div className="bg-neutral-light rounded-lg p-2">
                                        <p className="text-xs font-bold text-neutral-dark">{(MOCK_PRODUCT.seller.totalSales / 1000).toFixed(0)}K+</p>
                                        <p className="text-[10px] text-neutral-medium">Produk Terjual</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
