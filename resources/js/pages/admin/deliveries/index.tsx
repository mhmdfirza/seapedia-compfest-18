import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminDeliveries() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Monitoring Pengiriman" icon="🚚" description="Monitor semua pengiriman yang sedang berjalan di platform." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
