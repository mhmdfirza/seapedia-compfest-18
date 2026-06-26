import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/sections/navbar';
import Footer from '@/components/sections/footer';
import Container from '@/components/ui/container';
import ProductCard from '@/components/ui/productcard';
import Badge from '@/components/ui/badge';

const ALL_PRODUCTS = [
    { id: 1, title: 'Wireless Noise-Canceling Headphones Pro Max', price: 1299000, originalPrice: 1999000, rating: 4.8, sold: 2341, location: 'Jakarta Selatan', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', category: 'Elektronik' },
    { id: 2, title: 'Oversized Premium Cotton Hoodie', price: 259000, originalPrice: 399000, rating: 4.6, sold: 5890, location: 'Bandung', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80', category: 'Fashion' },
    { id: 3, title: 'Luxury Matte Lip Kit 12 Pcs Set', price: 89000, originalPrice: 150000, rating: 4.5, sold: 12000, location: 'Surabaya', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80', category: 'Kecantikan' },
    { id: 4, title: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', price: 169000, originalPrice: 249000, rating: 4.7, sold: 3200, location: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=400&q=80', category: 'Olahraga' },
    { id: 5, title: 'Drone 4K Camera Stabilizer Foldable', price: 3299000, originalPrice: 4500000, rating: 4.9, sold: 890, location: 'Jakarta Pusat', image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=400&q=80', category: 'Elektronik' },
    { id: 6, title: 'Minimalist Leather Wallet Slim RFID', price: 149000, rating: 4.4, sold: 7650, location: 'Medan', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80', category: 'Fashion' },
    { id: 7, title: 'Air Fryer Digital 4.5L Touch Screen', price: 449000, originalPrice: 699000, rating: 4.8, sold: 4100, location: 'Semarang', image: 'https://images.unsplash.com/photo-1648146938682-20b8e64e4c5f?auto=format&fit=crop&w=400&q=80', category: 'Rumah' },
    { id: 8, title: 'Mechanical Gaming Keyboard RGB Backlit', price: 389000, originalPrice: 550000, rating: 4.6, sold: 1890, location: 'Bekasi', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80', category: 'Elektronik' },
    { id: 9, title: 'Smartwatch Band 8 PRO Amoled HRM', price: 399000, originalPrice: 799000, rating: 4.7, sold: 9800, location: 'Jakarta', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', category: 'Elektronik' },
    { id: 10, title: 'Sepatu Sneakers Nike Air Force 1 OG', price: 899000, originalPrice: 1499000, rating: 4.9, sold: 6700, location: 'Surabaya', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', category: 'Fashion' },
    { id: 11, title: 'Blender Portable Mini USB 380ml', price: 49000, originalPrice: 119000, rating: 4.5, sold: 23000, location: 'Bandung', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80', category: 'Rumah' },
    { id: 12, title: 'Skincare Set Vitamin C Glow Series', price: 129000, originalPrice: 279000, rating: 4.8, sold: 15000, location: 'Jakarta', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=80', category: 'Kecantikan' },
];

const CATEGORIES = ['Semua', 'Elektronik', 'Fashion', 'Kecantikan', 'Olahraga', 'Rumah'];
const SORT_OPTIONS = ['Relevansi', 'Harga Terendah', 'Harga Tertinggi', 'Terlaris', 'Rating Tertinggi'];
const PRICE_RANGES = [
    { label: 'Semua Harga', value: '' },
    { label: '< Rp50.000', value: '0-50000' },
    { label: 'Rp50.000 – Rp200.000', value: '50000-200000' },
    { label: 'Rp200.000 – Rp500.000', value: '200000-500000' },
    { label: '> Rp500.000', value: '500000-99999999' },
];

export default function ProductIndex() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [sortBy, setSortBy] = useState('Relevansi');
    const [priceRange, setPriceRange] = useState('');

    const filtered = ALL_PRODUCTS.filter((p) => {
        const catOk = selectedCategory === 'Semua' || p.category === selectedCategory;
        let priceOk = true;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            priceOk = p.price >= min && p.price <= max;
        }
        return catOk && priceOk;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'Harga Terendah') return a.price - b.price;
        if (sortBy === 'Harga Tertinggi') return b.price - a.price;
        if (sortBy === 'Terlaris') return (b.sold ?? 0) - (a.sold ?? 0);
        if (sortBy === 'Rating Tertinggi') return (b.rating ?? 0) - (a.rating ?? 0);
        return 0;
    });

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Semua Produk – SEAPEDIA" />
            <Navbar />

            <main className="flex-grow py-6">
                <Container>
                    {/* Breadcrumb */}
                    <nav className="text-xs text-neutral-medium mb-4 flex items-center gap-1">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>›</span>
                        <span className="text-neutral-dark font-medium">Semua Produk</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-56 flex-shrink-0 space-y-4">
                            <div className="bg-white rounded-xl border border-border p-4">
                                <h3 className="font-semibold text-neutral-dark text-sm mb-3">Kategori</h3>
                                <div className="space-y-1.5">
                                    {CATEGORIES.map((cat) => (
                                        <button key={cat} onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-primary-light text-primary font-medium' : 'text-neutral-medium hover:bg-neutral-light'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-4">
                                <h3 className="font-semibold text-neutral-dark text-sm mb-3">Harga</h3>
                                <div className="space-y-1.5">
                                    {PRICE_RANGES.map((p) => (
                                        <button key={p.value} onClick={() => setPriceRange(p.value)}
                                            className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${priceRange === p.value ? 'bg-primary-light text-primary font-medium' : 'text-neutral-medium hover:bg-neutral-light'}`}>
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-border p-4">
                                <h3 className="font-semibold text-neutral-dark text-sm mb-3">Rating</h3>
                                {[4, 3, 2, 1].map((r) => (
                                    <button key={r} className="flex items-center gap-1 text-sm text-neutral-medium hover:text-primary py-1 w-full">
                                        {'★'.repeat(r)}{'☆'.repeat(5 - r)} <span className="text-xs ml-1">{r}+</span>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* Main content */}
                        <div className="flex-1">
                            {/* Sort bar */}
                            <div className="bg-white rounded-xl border border-border p-3 flex flex-wrap items-center gap-2 mb-4">
                                <span className="text-sm text-neutral-medium mr-2">Urutkan:</span>
                                {SORT_OPTIONS.map((opt) => (
                                    <button key={opt} onClick={() => setSortBy(opt)}
                                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${sortBy === opt ? 'border-primary text-primary bg-primary-light' : 'border-border text-neutral-medium hover:border-primary hover:text-primary'}`}>
                                        {opt}
                                    </button>
                                ))}
                                <span className="ml-auto text-xs text-neutral-medium">{sorted.length} produk ditemukan</span>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {sorted.map((p) => (
                                    <ProductCard key={p.id} {...p} />
                                ))}
                            </div>

                            {sorted.length === 0 && (
                                <div className="text-center py-12 text-neutral-medium">
                                    <div className="text-5xl mb-4">🔍</div>
                                    <p className="font-medium">Produk tidak ditemukan</p>
                                    <p className="text-sm">Coba ubah filter pencarian kamu</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
