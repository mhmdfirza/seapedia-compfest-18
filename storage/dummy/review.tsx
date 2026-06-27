export type AppReview = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    color: string;
};

const INITIAL_REVIEWS: AppReview[] = [
    { id: 1, name: 'Gilar Jalu Shock Breaker', rating: 5, comment: 'Sangat puas dengan barangnya, pengiriman cepat!', createdAt: '2 hari yang lalu' },
    { id: 2, name: 'Denny Koplinx', rating: 4, comment: 'Barang bagus, tapi packing kurang aman.', createdAt: '1 minggu yang lalu' },
    { id: 3, name: 'Chandra Stang Kiri', rating: 5, comment: 'Kualitas mantap, sesuai dengan deskripsi.', createdAt: '3 jam yang lalu' },
    { id: 4, name: 'Nala Imut', rating: 3, comment: 'Lumayan lah untuk harga segini.', createdAt: '1 bulan yang lalu' },
    { id: 5, name: 'Matthew Nolan ', rating: 5, comment: 'Pasti beli lagi di sini, recommended seller.', createdAt: 'kemarin' },
    { id: 6, name: 'Kipli Saripudin', rating: 4, comment: 'Warna agak beda sedikit dari foto, tapi overall bagus.', createdAt: '5 hari yang lalu' },
];