import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function SellerProfile() {
    return (
        <PrivateRoute requiredRole="seller">
            <PlaceholderPage
                title="Profil & Informasi Toko"
                icon="🏪"
                description="Pengaturan profil dan informasi toko seller. Sedang dalam pengembangan."
                backHref="/dashboard/seller"
                backLabel="Dashboard"
            />
        </PrivateRoute>
    );
}
