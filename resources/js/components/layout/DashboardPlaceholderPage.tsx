import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout, { DashboardLayoutProps } from 'res/components/layout/DashboardLayout';

type DashboardPlaceholderPageProps = Omit<DashboardLayoutProps, 'children'> & {
    title: string;
    icon?: string;
    description?: string;
};

/**
 * Placeholder page with the sidebar dashboard layout.
 * Digunakan untuk semua sub-halaman yang belum diimplementasikan.
 */
export default function DashboardPlaceholderPage({
    title,
    icon = '🚧',
    description = 'Fitur ini akan segera hadir di level berikutnya.',
    ...layoutProps
}: DashboardPlaceholderPageProps) {
    const backHref = {
        buyer: '/dashboard/buyer',
        seller: '/dashboard/seller',
        driver: '/dashboard/driver',
        admin: '/dashboard/admin',
    }[layoutProps.role];

    return (
        <DashboardLayout {...layoutProps}>
            <Head title={`${title} – SEAPEDIA`} />
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                <div className="text-7xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>{icon}</div>
                <h1 className="font-display text-2xl font-bold text-neutral-dark mb-3">{title}</h1>
                <p className="text-neutral-medium text-sm max-w-sm mb-8 leading-relaxed">{description}</p>
                <div className="flex gap-3 flex-wrap justify-center">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors text-sm"
                    >
                        ← Kembali ke Beranda
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white text-neutral-dark border border-border font-semibold px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                        Ke Halaman Utama
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
