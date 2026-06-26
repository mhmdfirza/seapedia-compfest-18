import React from 'react';
import { Link } from '@inertiajs/react';
import Container from 'res/components/ui/container';
import Button from 'res/components/ui/button';

const categories = [
    { name: 'Elektronik', emoji: '📱', color: 'bg-blue-50 text-blue-600', href: '/products?category=Elektronik' },
    { name: 'Fashion', emoji: '👗', color: 'bg-pink-50 text-pink-600', href: '/products?category=Fashion' },
    { name: 'Makanan', emoji: '🍜', color: 'bg-orange-50 text-orange-500', href: '/products?category=Makanan' },
    { name: 'Kesehatan', emoji: '💊', color: 'bg-green-50 text-green-600', href: '/products?category=Kesehatan' },
    { name: 'Rumah', emoji: '🏠', color: 'bg-yellow-50 text-yellow-600', href: '/products?category=Rumah' },
    { name: 'Olahraga', emoji: '⚽', color: 'bg-teal-50 text-teal-600', href: '/products?category=Olahraga' },
    { name: 'Otomotif', emoji: '🚗', color: 'bg-red-50 text-red-500', href: '/products?category=Otomotif' },
    { name: 'Lihat Semua', emoji: '✨', color: 'bg-primary-light text-primary', href: '/products' },
];

const promoCards = [
    {
        title: 'Flash Sale 09.09',
        subtitle: 'Diskon hingga 90% untuk ribuan produk pilihan!',
        cta: 'Belanja Sekarang',
        href: '/products',
        gradient: 'from-red-500 to-orange-400',
        emoji: '⚡',
    },
    {
        title: 'Gratis Ongkir Seluruh Indonesia',
        subtitle: 'Minimal belanja Rp50.000 tanpa kode promo',
        cta: 'Cek Produknya',
        href: '/products',
        gradient: 'from-primary to-green-500',
        emoji: '🚚',
    },
];

export default function HeroSection() {
    return (
        <section className="py-6">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Main Hero Banner */}
                    <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-green-600 text-white relative min-h-[260px] flex items-center p-8">
                        {/* Background decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/10 rounded-full translate-y-1/3" />

                        <div className="relative z-10 max-w-lg">
                            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-medium mb-4">
                                🎉 Sambut SEAPEDIA — Platform Belanja Masa Kini
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
                                Marketplace #1 Indonesia untuk Semua Kebutuhanmu
                            </h1>
                            <p className="text-white/80 text-sm mb-6">
                                Temukan jutaan produk dari penjual terpercaya seluruh Indonesia dengan pengiriman cepat ke seluruh nusantara.
                            </p>
                            <div className="flex gap-3">
                                <Link href="/products">
                                    <Button size="md" className="bg-white text-primary hover:bg-primary-light border-transparent font-semibold">
                                        Mulai Belanja
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="md" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-semibold">
                                        Jadi Seller
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Promo Side Cards */}
                    <div className="flex flex-col gap-4">
                        {promoCards.map((promo) => (
                            <div key={promo.title}
                                className={`rounded-xl overflow-hidden bg-gradient-to-br ${promo.gradient} text-white p-5 flex-1 flex flex-col justify-between relative min-h-[120px]`}>
                                <div className="absolute top-2 right-3 text-4xl opacity-30">{promo.emoji}</div>
                                <div>
                                    <p className="text-lg font-bold mb-1">{promo.title}</p>
                                    <p className="text-xs text-white/80 mb-3">{promo.subtitle}</p>
                                </div>
                                <Link href={promo.href}>
                                    <span className="inline-flex items-center bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5 text-xs font-semibold">
                                        {promo.cta} →
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="mt-6">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                        {categories.map((cat) => (
                            <Link key={cat.name} href={cat.href}
                                className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-neutral-light transition-colors text-center">
                                <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                    {cat.emoji}
                                </div>
                                <span className="text-xs text-neutral-dark font-medium leading-tight">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
