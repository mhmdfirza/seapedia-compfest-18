import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function AdminUsers() {
    return (
        <PrivateRoute requiredRole="admin">
            <PlaceholderPage title="Monitoring User" icon="👥" description="Kelola dan monitor semua pengguna terdaftar." backHref="/dashboard/admin" backLabel="Dashboard" />
        </PrivateRoute>
    );
}
