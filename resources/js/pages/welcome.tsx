import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from 'res/components/sections/navbar';
import Footer from 'res/components/sections/footer';
import HeroSection from 'res/components/sections/hero';
import ReviewSection from 'res/components/sections/review';
import Container from 'res/components/ui/container';
import ProductCard from 'res/components/ui/productcard';
import SectionTitle from 'res/components/ui/sectiontitle';
import Button from 'res/components/ui/button';
import Badge from 'res/components/ui/badge';

const FEATURED_PRODUCTS = [
    { id: 1, title: 'Wireless Noise-Canceling Headphones Pro Max', price: 1299000, originalPrice: 1999000, rating: 4.8, sold: 2341, location: 'Jakarta Selatan', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Oversized Premium Cotton Hoodie Uniqlo Style', price: 259000, originalPrice: 399000, rating: 4.6, sold: 5890, location: 'Bandung', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Luxury Matte Lip Kit FOCALLURE 12 Pcs Set', price: 89000, originalPrice: 150000, rating: 4.5, sold: 12000, location: 'Surabaya', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Anti-Slip TPE Yoga Mat Extra Thick 8mm', price: 169000, originalPrice: 249000, rating: 4.7, sold: 3200, location: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=400&q=80' },
    { id: 5, title: 'Drone DJI Mini 4K Camera Stabilizer', price: 3299000, originalPrice: 4500000, rating: 4.9, sold: 890, location: 'Jakarta Pusat', image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=400&q=80' },
    { id: 6, title: 'Minimalist Leather Wallet Slim RFID Block', price: 149000, rating: 4.4, sold: 7650, location: 'Medan', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80' },
    { id: 7, title: 'Air Fryer Digital 4.5L Stainless Steel Touch', price: 449000, originalPrice: 699000, rating: 4.8, sold: 4100, location: 'Semarang', image: 'https://images.unsplash.com/photo-1648146938682-20b8e64e4c5f?auto=format&fit=crop&w=400&q=80' },
    { id: 8, title: 'Mechanical Gaming Keyboard RGB Backlit', price: 389000, originalPrice: 550000, rating: 4.6, sold: 1890, location: 'Bekasi', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80' },
];

const FLASH_SALE_PRODUCTS = [
    { id: 9, title: 'Smartwatch Xiaomi Band 8 PRO Amoled', price: 399000, originalPrice: 799000, rating: 4.7, sold: 9800, location: 'Jakarta', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', badge: 'Flash Sale' },
    { id: 10, title: 'Sepatu Sneakers Nike Air Force 1 OG', price: 899000, originalPrice: 1499000, rating: 4.9, sold: 6700, location: 'Surabaya', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', badge: 'Flash Sale' },
    { id: 11, title: 'Blender Portable Mini USB 380ml', price: 49000, originalPrice: 119000, rating: 4.5, sold: 23000, location: 'Bandung', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80', badge: 'Flash Sale' },
    { id: 12, title: 'Skincare Set Vitamin C Glow Series', price: 129000, originalPrice: 279000, rating: 4.8, sold: 15000, location: 'Jakarta', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=80', badge: 'Flash Sale' },
];

const TOP_STORES = [
    { name: 'TechWorld Store', category: 'Elektronik', icon: '💻', rating: 4.9, products: 1240 },
    { name: 'Glow Beauty', category: 'Kecantikan', icon: '💄', rating: 4.8, products: 780 },
    { name: 'FitLife Sports', category: 'Olahraga', icon: '🏋️', rating: 4.7, products: 430 },
    { name: 'Urban Threads', category: 'Fashion', icon: '👔', rating: 4.8, products: 2100 },
    { name: 'Dapur Nusantara', category: 'Kuliner', icon: '🍜', rating: 4.9, products: 320 },
    { name: 'HomeDeco ID', category: 'Rumah', icon: '🏠', rating: 4.7, products: 950 },
];

export default function Welcome() {
    return (
        <div className="min-h-screen bg-neutral-light">
            <Head title="SEAPEDIA – Marketplace #1 Indonesia" />
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Flash Sale Section */}
            <section className="py-8">
                <Container>
                    <SectionTitle
                        title="⚡ Flash Sale"
                        subtitle="Berakhir dalam waktu terbatas!"
                        action={
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {['01', '23', '45'].map((t, i) => (
                                        <React.Fragment key={i}>
                                            <span className="bg-neutral-dark text-white text-xs font-bold rounded px-1.5 py-1 min-w-[28px] text-center">{t}</span>
                                            {i < 2 && <span className="text-neutral-dark font-bold text-xs self-center">:</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <Link href="/products" className="text-primary text-sm font-medium hover:underline">Lihat Semua →</Link>
                            </div>
                        }
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {FLASH_SALE_PRODUCTS.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </Container>
            </section>

            {/* Trending Products */}
            <section className="py-8">
                <Container>
                    <SectionTitle
                        title="🔥 Produk Terlaris"
                        subtitle="Dipilih oleh ribuan pelanggan puas"
                        action={<Link href="/products" className="text-primary text-sm font-medium hover:underline">Lihat Semua →</Link>}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {FEATURED_PRODUCTS.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </Container>
            </section>

            {/* Why SEAPEDIA Section */}
            <section className="py-12 bg-white">
                <Container>
                    <SectionTitle title="Mengapa Memilih SEAPEDIA?" subtitle="Kami hadir dengan keunggulan nyata untuk belanja online lebih menyenangkan" align="center" className="mb-8 justify-center" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Driver terverifikasi siap antar produkmu dalam hitungan jam.' },
                            { icon: '🔒', title: 'Transaksi Aman', desc: 'Uang dipegang SEAPEDIA sampai barang diterima dengan selamat.' },
                            { icon: '💰', title: 'Harga Terbaik', desc: 'Flash sale harian dan voucher eksklusif untuk semua pengguna.' },
                            { icon: '⭐', title: 'Seller Terpercaya', desc: 'Semua seller terverifikasi dengan rating dan ulasan nyata dari pembeli.' },
                        ].map((item) => (
                            <div key={item.title} className="text-center p-6 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200">
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="font-semibold text-neutral-dark mb-2 text-sm">{item.title}</h3>
                                <p className="text-xs text-neutral-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Top Stores */}
            <section className="py-8">
                <Container>
                    <SectionTitle
                        title="🏪 Toko Terpopuler"
                        subtitle="Belanja dari seller berprestasi dengan rating terbaik"
                        action={<Link href="/products" className="text-primary text-sm font-medium hover:underline">Lihat Semua Toko →</Link>}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {TOP_STORES.map((store) => (
                            <Link key={store.name} href="#" className="group flex flex-col items-center text-center p-4 rounded-xl border border-border bg-white hover:border-primary hover:shadow-md transition-all duration-200">
                                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                                    {store.icon}
                                </div>
                                <p className="text-xs font-semibold text-neutral-dark leading-tight mb-1">{store.name}</p>
                                <Badge variant="primary" className="text-[10px]">{store.category}</Badge>
                                <p className="text-[10px] text-neutral-medium mt-2">⭐ {store.rating} · {store.products} produk</p>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Ulasan Pengguna SEAPEDIA */}
            <ReviewSection />

            {/* CTA Banner - Become Seller */}
            <section className="py-10 bg-gradient-to-r from-primary to-green-600">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                        <div>
                            <h2 className="font-display text-2xl font-bold mb-2">Mulai Berjualan di SEAPEDIA</h2>
                            <p className="text-white/80 text-sm">Bergabung dengan 100.000+ seller aktif dan raih penghasilan lebih.</p>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-primary hover:bg-primary-light border-transparent font-bold">
                                    Daftar Jadi Seller
                                </Button>
                            </Link>
                            <Link href="#">
                                <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-bold">
                                    Pelajari Lebih Lanjut
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </div>
    );
}
