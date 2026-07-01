export type AppReview = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    color: string;
};

const INITIAL_REVIEWS: AppReview[] = [
<<<<<<< HEAD
    { id: 1, name: 'Gilar Jalu Shock Breaker', rating: 5, comment: 'Sangat puas dengan barangnya, pengiriman cepat!', date: '2 hari yang lalu', color: 'bg-rose-500' },
    { id: 2, name: 'Denny Koplinx', rating: 4, comment: 'Barang bagus, tapi packing kurang aman.', date: '1 minggu yang lalu', color: 'bg-emerald-500' },
    { id: 3, name: 'Chandra Stang Kiri', rating: 5, comment: 'Kualitas mantap, sesuai dengan deskripsi.', date: '3 jam yang lalu', color: 'bg-amber-500' },
    { id: 4, name: 'Nala Imut', rating: 3, comment: 'Lumayan lah untuk harga segini.', date: '1 bulan yang lalu', color: 'bg-cyan-500' },
    { id: 5, name: 'Matthew Nolan ', rating: 5, comment: 'Pasti beli lagi di sini, recommended seller.', date: 'kemarin', color: 'bg-violet-500' },
    { id: 6, name: 'Kipli Saripudin', rating: 4, comment: 'Warna agak beda sedikit dari foto, tapi overall bagus.', date: '5 hari yang lalu', color: 'bg-pink-500' },
=======
    {
        id: 1, name: 'Rina Kartika', rating: 5, comment: 'SEAPEDIA luar biasa! Pengiriman cepat, harga kompetitif, dan layanan customer support yang sangat responsif. Paling suka fitur flash sale-nya!', date: '2 hari lalu', color: 'bg-rose-500'
    },
    {
        id: 2, name: 'Budi Prasetyo', rating: 5, comment: 'Sudah setahun pakai SEAPEDIA buat belanja kebutuhan rumah tangga. Seller-sellernya terpercaya dan barang selalu sesuai deskripsi. Recommended!', date: '5 hari lalu', color: 'bg-emerald-500'
    },
    {
        id: 3, name: 'Dewi Anggraeni', rating: 4, comment: 'Aplikasinya user-friendly banget, mudah cari produk yang diinginkan. Pengiriman kadang agak lama ke daerah, tapi overall memuaskan.', date: '1 minggu lalu', color: 'bg-amber-500'
    },
    {
        id: 4, name: 'Ahmad Faisal', rating: 5, comment: 'Platform terbaik untuk jualan online! Sebagai seller, dashboard-nya lengkap dan fee-nya masuk akal. Omset meningkat 3x sejak gabung SEAPEDIA.', date: '2 minggu lalu', color: 'bg-cyan-500'
    },
    {
        id: 5, name: 'Siti Nurhaliza', rating: 4, comment: 'Suka banget fitur wallet-nya, top up gampang dan pembayaran instan. Voucher-voucher promonya juga sering banget. Mantap!', date: '3 minggu lalu', color: 'bg-violet-500'
    },
    {
        id: 6, name: 'Rizky Maulana', rating: 5, comment: 'Jadi driver di SEAPEDIA penghasilannya lumayan dan sistemnya transparan. Aplikasi driver-nya juga smooth, jarang error. Top deh!', date: '1 bulan lalu', color: 'bg-pink-500'
    },
>>>>>>> dev-level6
];