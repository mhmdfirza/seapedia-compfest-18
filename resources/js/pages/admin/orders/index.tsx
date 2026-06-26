import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminOrders() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Monitoring Pesanan" icon="🗂️" description="Monitor semua transaksi pesanan di platform." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
