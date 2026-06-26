import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function DriverActiveJob() {
    return (
        <PrivateRoute requiredRole="driver">
            <PlaceholderPage
                title="Pekerjaan Aktif"
                icon="🚚"
                description="Informasi pekerjaan pengiriman yang sedang berjalan. Sedang dalam pengembangan."
                backHref="/dashboard/driver"
                backLabel="Dashboard"
            />
        </PrivateRoute>
    );
}
