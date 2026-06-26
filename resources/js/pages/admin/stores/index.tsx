import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminStores() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Monitoring Toko" icon="🏪" description="Kelola dan monitor semua toko yang terdaftar." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
