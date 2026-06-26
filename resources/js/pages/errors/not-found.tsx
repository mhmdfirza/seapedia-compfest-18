import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center text-center px-6">
            <Head title="404 – Halaman Tidak Ditemukan" />
            <div className="text-8xl mb-6">🌊</div>
            <h1 className="font-display text-6xl font-bold text-primary mb-3">404</h1>
            <p className="text-xl font-semibold text-neutral-dark mb-2">Halaman Tidak Ditemukan</p>
            <p className="text-neutral-medium mb-8 max-w-sm">
                Halaman yang kamu cari sudah tenggelam ke dalam laut atau tidak pernah ada.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-md"
            >
                🏠 Kembali ke Beranda
            </Link>
        </div>
    );
}
