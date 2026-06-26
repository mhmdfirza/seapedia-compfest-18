import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminPromos() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Manajemen Promo" icon="🏷️" description="Kelola promo dan penawaran spesial di platform." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
