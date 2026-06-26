import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminVouchers() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Manajemen Voucher" icon="🎟️" description="Kelola voucher diskon untuk pengguna platform." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
