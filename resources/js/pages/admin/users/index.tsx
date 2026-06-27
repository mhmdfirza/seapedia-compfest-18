import DashboardPlaceholderPage from 'res/components/layout/DashboardPlaceholderPage';
import { MenuItem } from 'res/components/layout/DashboardLayout';

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/admin', icon: <span>📊</span> },
    { label: 'Monitoring User', href: '/dashboard/admin/users', icon: <span>👥</span> },
    { label: 'Monitoring Toko', href: '/dashboard/admin/stores', icon: <span>🏪</span> },
    { label: 'Monitoring Produk', href: '/dashboard/admin/products', icon: <span>📦</span> },
    { label: 'Monitoring Pesanan', href: '/dashboard/admin/orders', icon: <span>🧾</span> },
    { label: 'Voucher & Promo', href: '/dashboard/admin/promos', icon: <span>🎁</span> },
    { label: 'Monitoring Pengiriman', href: '/dashboard/admin/deliveries', icon: <span>🚚</span> },
];
const USER = { name: 'Admin Utama', email: 'admin@seapedia.com', roles: ['admin' as const] };

export default function AdminUsers() {
    return (
        <DashboardPlaceholderPage
            role="admin" user={USER} menuItems={MENU_ITEMS} activePath="/dashboard/admin/users"
            title="Monitoring User" icon="👥"
        />
    );
}
