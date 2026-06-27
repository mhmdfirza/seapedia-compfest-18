export type AppReview = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    color: string;
};

const INITIAL_REVIEWS: AppReview[] = [
    { id: 1, name: 'Gilar Jalu Shock Breaker', rating: 5, comment: 'Sangat puas dengan barangnya, pengiriman cepat!', date: '2 hari yang lalu', color: 'bg-rose-500' },
    { id: 2, name: 'Denny Koplinx', rating: 4, comment: 'Barang bagus, tapi packing kurang aman.', date: '1 minggu yang lalu', color: 'bg-emerald-500' },
    { id: 3, name: 'Chandra Stang Kiri', rating: 5, comment: 'Kualitas mantap, sesuai dengan deskripsi.', date: '3 jam yang lalu', color: 'bg-amber-500' },
    { id: 4, name: 'Nala Imut', rating: 3, comment: 'Lumayan lah untuk harga segini.', date: '1 bulan yang lalu', color: 'bg-cyan-500' },
    { id: 5, name: 'Matthew Nolan ', rating: 5, comment: 'Pasti beli lagi di sini, recommended seller.', date: 'kemarin', color: 'bg-violet-500' },
    { id: 6, name: 'Kipli Saripudin', rating: 4, comment: 'Warna agak beda sedikit dari foto, tapi overall bagus.', date: '5 hari yang lalu', color: 'bg-pink-500' },
];