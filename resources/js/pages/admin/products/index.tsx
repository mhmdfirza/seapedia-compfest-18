import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminProducts() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Monitoring Produk" icon="📦" description="Monitor seluruh produk yang tersedia di platform." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
