import DashboardPlaceholderPage from 'res/components/layout/DashboardPlaceholderPage';
import { MenuItem } from 'res/components/layout/DashboardLayout';

const MENU_ITEMS: MenuItem[] = [
    { label: 'Beranda', href: '/dashboard/driver', icon: <span>🏠</span> },
    { label: 'Profil', href: '/dashboard/driver/profile', icon: <span>👤</span> },
    { label: 'Cari Pekerjaan', href: '/dashboard/driver/jobs', icon: <span>🔍</span> },
    { label: 'Pekerjaan Aktif', href: '/dashboard/driver/active-job', icon: <span>🚚</span> },
    { label: 'Riwayat', href: '/dashboard/driver/history', icon: <span>📜</span> },
    { label: 'Pendapatan', href: '/dashboard/driver/earnings', icon: <span>💰</span> },
];
const USER = { name: 'Arif Kurniawan', email: 'arif@email.com', roles: ['driver' as const] };

export default function DriverProfile() {
    return (
        <DashboardPlaceholderPage
            role="driver" user={USER} menuItems={MENU_ITEMS} activePath="/dashboard/driver/profile"
            title="Profil & Kendaraan"
            icon="👤"
        />
    );
}
