import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function SellerIncome() {
    return (
        <PrivateRoute requiredRole="seller">
            <PlaceholderPage
                title="Laporan Pendapatan"
                icon="💹"
                description="Laporan dan riwayat pendapatan toko. Sedang dalam pengembangan."
                backHref="/dashboard/seller"
                backLabel="Dashboard"
            />
        </PrivateRoute>
    );
}
