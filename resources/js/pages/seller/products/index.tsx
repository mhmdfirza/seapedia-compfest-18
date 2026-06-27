import DashboardPlaceholderPage from 'res/components/layout/DashboardPlaceholderPage';
import { MenuItem } from 'res/components/layout/DashboardLayout';

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/seller', icon: <span>🏠</span> },
    { label: 'Profil Toko', href: '/dashboard/seller/profile', icon: <span>🏪</span> },
    { label: 'Produk', href: '/dashboard/seller/products', icon: <span>📦</span> },
    { label: 'Pesanan Masuk', href: '/dashboard/seller/orders', icon: <span>🧾</span> },
    { label: 'Laporan Pendapatan', href: '/dashboard/seller/income', icon: <span>📊</span> },
];
const USER = { name: 'TechWorld Store', email: 'techworld@email.com', roles: ['seller' as const] };

export default function SellerProducts() {
    return (
        <DashboardPlaceholderPage
            role="seller" user={USER} menuItems={MENU_ITEMS} activePath="/dashboard/seller/products"
            title="Kelola Produk"
            icon="📦"
            description="Fitur ini akan segera hadir di level berikutnya."
        />
    );
}
