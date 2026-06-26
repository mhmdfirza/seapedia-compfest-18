import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function DriverProfile() {
    return (
        <PrivateRoute requiredRole="driver">
            <PlaceholderPage
                title="Profil Driver"
                icon="🧑‍✈️"
                description="Informasi dan pengaturan profil driver. Sedang dalam pengembangan."
                backHref="/dashboard/driver"
                backLabel="Dashboard"
            />
        </PrivateRoute>
    );
}
