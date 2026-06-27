import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from 'res/components/sections/navbar';
import Footer from 'res/components/sections/footer';
import Container from 'res/components/ui/container';
import Button from 'res/components/ui/button';
import Badge from 'res/components/ui/badge';
import StarRating from 'res/components/ui/starrating';
import Toast from 'res/components/ui/toast';

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

const AVATAR_COLORS = ['bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-cyan-500', 'bg-violet-500', 'bg-pink-500'];

type ProductReview = {
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
    color: string;
};

const INITIAL_REVIEWS: ProductReview[] = [
    { id: 1, user: 'Ahmad R.', rating: 5, date: '20 Jun 2025', comment: 'Kualitas suaranya luar biasa. ANC benar-benar bekerja dengan baik di kereta commuter. Highly recommended!', color: 'bg-rose-500' },
    { id: 2, user: 'Siti F.', rating: 5, date: '18 Jun 2025', comment: 'Pengiriman cepat, packaging aman. Headphone sesuai deskripsi. Puas banget beli di SEAPEDIA.', color: 'bg-emerald-500' },
    { id: 3, user: 'Budi S.', rating: 4, date: '15 Jun 2025', comment: 'Suaranya bagus, tapi earpad sedikit keras untuk pemakaian lama. Overall masih worth the price.', color: 'bg-amber-500' },
];

const RATING_LABELS: Record<number, string> = { 1: 'Sangat Buruk', 2: 'Buruk', 3: 'Cukup', 4: 'Bagus', 5: 'Sangat Bagus' };

function formatPrice(price: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export default function ProductShow() {
    const page = usePage<any>();
    const authUser = page.props.auth?.user ?? null;

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);
    const [showToast, setShowToast] = useState(false);
    const discountPercent = Math.round((1 - MOCK_PRODUCT.price / MOCK_PRODUCT.originalPrice) * 100);

    // Product review form state
    const [reviewName, setReviewName] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({});

    const avgRating = reviews.length ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10 : 0;

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!reviewName.trim()) errs.name = 'Nama wajib diisi';
        if (!reviewRating) errs.rating = 'Rating wajib dipilih';
        if (reviewComment.trim().length < 20) errs.comment = 'Komentar minimal 20 karakter';
        setReviewErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const newReview: ProductReview = {
            id: Date.now(),
            user: reviewName.trim(),
            rating: reviewRating,
            date: 'Baru saja',
            comment: reviewComment.trim(),
            color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
        };
        setReviews((prev) => [newReview, ...prev]);
        setReviewName('');
        setReviewRating(0);
        setReviewComment('');
        setReviewErrors({});
        setShowToast(true);
    };

    const displayRating = hoverRating || reviewRating;

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
                                            <StarRating rating={avgRating} count={reviews.length} />
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

                            {/* Reviews Section */}
                            <div className="bg-white rounded-xl border border-border p-5">
                                <h2 className="font-semibold text-neutral-dark mb-4">Ulasan Pembeli ({reviews.length})</h2>
                                <div className="flex items-center gap-4 mb-5 p-4 bg-neutral-light rounded-xl">
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-neutral-dark">{avgRating}</p>
                                        <StarRating rating={avgRating} className="justify-center mt-1" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        {[5, 4, 3, 2, 1].map((r) => {
                                            const count = reviews.filter(rv => rv.rating === r).length;
                                            const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                                            return (
                                                <div key={r} className="flex items-center gap-2">
                                                    <span className="text-xs text-neutral-medium w-4">{r}</span>
                                                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                                                    </div>
                                                    <span className="text-[10px] text-neutral-medium w-6">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-4 mb-6">
                                    {reviews.map((r) => (
                                        <div key={r.id} className="border-b border-border pb-4 last:border-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-8 h-8 rounded-full ${r.color} text-white flex items-center justify-center text-xs font-bold`}>
                                                    {r.user.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-neutral-dark">{r.user}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-0.5">
                                                            {Array.from({ length: 5 }, (_, i) => (
                                                                <span key={i} className={`text-xs ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-neutral-medium">{r.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-neutral-medium ml-11">{r.comment}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Product Review Form */}
                                <div className="border-t border-border pt-5">
                                    <h3 className="font-semibold text-neutral-dark mb-3">✍️ Tulis Ulasan Produk</h3>
                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-dark mb-1.5">Nama</label>
                                            <input
                                                type="text"
                                                value={reviewName}
                                                onChange={e => setReviewName(e.target.value)}
                                                placeholder="Nama kamu"
                                                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${reviewErrors.name ? 'border-danger focus:ring-danger/30' : 'border-border focus:ring-primary/30 focus:border-primary'}`}
                                            />
                                            {reviewErrors.name && <p className="text-xs text-danger mt-1">{reviewErrors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-dark mb-1.5">Rating</label>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} type="button"
                                                        onClick={() => setReviewRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="text-2xl transition-transform hover:scale-110 focus:outline-none">
                                                        {star <= displayRating ? '⭐' : '☆'}
                                                    </button>
                                                ))}
                                                {displayRating > 0 && (
                                                    <span className={`text-sm font-medium ml-2 ${displayRating >= 4 ? 'text-primary' : displayRating >= 3 ? 'text-amber-500' : 'text-danger'}`}>
                                                        {RATING_LABELS[displayRating]}
                                                    </span>
                                                )}
                                            </div>
                                            {reviewErrors.rating && <p className="text-xs text-danger mt-1">{reviewErrors.rating}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-dark mb-1.5">Komentar</label>
                                            <div className="relative">
                                                <textarea
                                                    value={reviewComment}
                                                    onChange={e => setReviewComment(e.target.value)}
                                                    placeholder="Ceritakan pengalamanmu..."
                                                    rows={3}
                                                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none transition-colors ${reviewErrors.comment ? 'border-danger focus:ring-danger/30' : 'border-border focus:ring-primary/30 focus:border-primary'}`}
                                                />
                                                <span className={`absolute bottom-2 right-3 text-[10px] ${reviewComment.length < 20 ? 'text-neutral-medium' : 'text-primary'}`}>
                                                    {reviewComment.length}/20 min
                                                </span>
                                            </div>
                                            {reviewErrors.comment && <p className="text-xs text-danger mt-1">{reviewErrors.comment}</p>}
                                        </div>

                                        <Button type="submit" size="md">Kirim Ulasan Produk</Button>
                                    </form>
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

                                {authUser ? (
                                    <div className="space-y-2">
                                        {authUser.role !== 'buyer' ? (
                                            <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded text-center mb-2">Gunakan akun Buyer untuk membeli produk.</p>
                                        ) : (
                                            <>
                                                <Link href="/dashboard/buyer/cart">
                                                    <Button variant="outline" size="md" className="w-full justify-center text-sm">+ Keranjang</Button>
                                                </Link>
                                                <Link href="/dashboard/buyer/checkout">
                                                    <Button variant="primary" size="md" className="w-full justify-center text-sm">Beli Sekarang</Button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link href="/login" className="block">
                                            <Button variant="primary" size="md" className="w-full justify-center text-sm">Masuk untuk Beli</Button>
                                        </Link>
                                    </div>
                                )}
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
            <Toast message="Ulasan produk berhasil dikirim! Terima kasih 🎉" show={showToast} onClose={() => setShowToast(false)} />
        </div>
    );
}
