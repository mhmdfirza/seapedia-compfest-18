import DashboardPlaceholderPage from 'res/components/layout/DashboardPlaceholderPage';
import { MenuItem } from 'res/components/layout/DashboardLayout';

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/buyer', icon: <span>🏠</span> },
    { label: 'Profil', href: '/dashboard/buyer/profile', icon: <span>👤</span> },
    { label: 'Dompet', href: '/dashboard/buyer/wallet', icon: <span>💰</span> },
    { label: 'Alamat', href: '/dashboard/buyer/address', icon: <span>📍</span> },
    { label: 'Keranjang', href: '/dashboard/buyer/cart', icon: <span>🛒</span> },
    { label: 'Pesanan Saya', href: '/dashboard/buyer/orders', icon: <span>📦</span> },
];
const USER = { name: 'Budi Santoso', email: 'budi@email.com', roles: ['buyer' as const] };

export default function BuyerAddress() {
    return (
        <DashboardPlaceholderPage
            role="buyer" user={USER} menuItems={MENU_ITEMS} activePath="/dashboard/buyer/address"
            title="Daftar Alamat"
            icon="📍"
            description="Fitur ini akan segera hadir di level berikutnya."
        />
    );
}
