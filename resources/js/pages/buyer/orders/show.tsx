import PlaceholderPage from 'res/components/ui/placeholderpage';
import PrivateRoute from 'res/components/guards/privateroute';

export default function BuyerOrderDetail() {
    return (
        <PrivateRoute requiredRole="buyer">
            <PlaceholderPage
                title="Detail Pesanan"
                icon="📦"
                description="Detail dari pesanan yang dipilih. Sedang dalam pengembangan."
                backHref="/dashboard/buyer/orders"
                backLabel="Riwayat Pesanan"
            />
        </PrivateRoute>
    );
}
