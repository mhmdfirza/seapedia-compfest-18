import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function DriverHistory() {
    return (
        <PrivateRoute requiredRole="driver">
            <PlaceholderPage
                title="Riwayat Pekerjaan"
                icon="📋"
                description="Riwayat pekerjaan pengiriman yang telah selesai. Sedang dalam pengembangan."
                backHref="/dashboard/driver"
                backLabel="Dashboard"
            />
        </PrivateRoute>
    );
}
