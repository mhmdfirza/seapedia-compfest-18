import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function BuyerProfile() {
    return (
        <PrivateRoute requiredRole="buyer">
            <PlaceholderPage
                title="Profil & Informasi Akun"
                icon="👤"
                description="Halaman profil dan pengaturan akun pembeli. Sedang dalam pengembangan."
                backHref="/dashboard/buyer"
                backLabel="Dashboard"
            />
        </PrivateRoute>
    );
}
