import { Head, Link } from '@inertiajs/react';

interface PlaceholderPageProps {
    title: string;
    icon?: string;
    description?: string;
    backHref?: string;
    backLabel?: string;
}

/**
 * Komponen placeholder untuk halaman yang belum diimplementasikan.
 * Hapus dan ganti dengan implementasi nyata saat backend siap.
 */
export default function PlaceholderPage({
    title,
    icon = '🚧',
    description = 'Halaman ini sedang dalam pengembangan dan akan segera tersedia.',
    backHref = '/',
    backLabel = 'Kembali',
}: PlaceholderPageProps) {
    return (
        <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center text-center px-6">
            <Head title={`${title} – SEAPEDIA`} />
            <div className="text-7xl mb-5">{icon}</div>
            <h1 className="font-display text-2xl font-bold text-neutral-dark mb-2">{title}</h1>
            <p className="text-neutral-medium mb-6 max-w-sm text-sm">{description}</p>
            <Link
                href={backHref}
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors text-sm"
            >
                ← {backLabel}
            </Link>
        </div>
    );
}
