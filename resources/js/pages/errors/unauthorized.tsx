import { Head, Link } from '@inertiajs/react';

export default function Unauthorized() {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center text-center px-6">
            <Head title="403 – Tidak Diizinkan" />
            <div className="text-8xl mb-6">🚫</div>
            <h1 className="font-display text-6xl font-bold text-danger mb-3">403</h1>
            <p className="text-xl font-semibold text-neutral-dark mb-2">Akses Ditolak</p>
            <p className="text-neutral-medium mb-8 max-w-sm">
                Kamu tidak memiliki akses ke halaman ini. Pastikan role aktifmu sudah sesuai.
            </p>
            <div className="flex gap-3">
                <Link
                    href="/select-role"
                    className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-md"
                >
                    🔄 Ganti Role
                </Link>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-border bg-white text-neutral-dark font-semibold px-6 py-3 rounded-xl hover:bg-neutral-light transition-colors"
                >
                    🏠 Beranda
                </Link>
            </div>
        </div>
    );
}
