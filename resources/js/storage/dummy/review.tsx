export type AppReview = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    color: string;
};

const INITIAL_REVIEWS: AppReview[] = [
    {
        id: 1, name: 'Gilar Jalu Shock Breaker', rating: 5, comment: 'SEAPEDIA luar biasa! Pengiriman cepat, harga kompetitif, dan layanan customer support yang sangat responsif. Paling suka fitur flash sale-nya!', date: '2 hari lalu', color: 'bg-rose-500'
    },
    {
        id: 2, name: 'Denny Koplinx', rating: 5, comment: 'Sudah setahun pakai SEAPEDIA buat belanja kebutuhan rumah tangga. Seller-sellernya terpercaya dan barang selalu sesuai deskripsi. Recommended!', date: '5 hari lalu', color: 'bg-emerald-500'
    },
    {
        id: 3, name: 'Chandra Stang Kiri', rating: 4, comment: 'Aplikasinya user-friendly banget, mudah cari produk yang diinginkan. Pengiriman kadang agak lama ke daerah, tapi overall memuaskan.', date: '1 minggu lalu', color: 'bg-amber-500'
    },
    {
        id: 4, name: 'Nala Imut', rating: 5, comment: 'Platform terbaik untuk jualan online! Sebagai seller, dashboard-nya lengkap dan fee-nya masuk akal. Omset meningkat 3x sejak gabung SEAPEDIA.', date: '2 minggu lalu', color: 'bg-cyan-500'
    },
    {
        id: 5, name: 'Matthew Nolan', rating: 4, comment: 'Suka banget fitur wallet-nya, top up gampang dan pembayaran instan. Voucher-voucher promonya juga sering banget. Mantap!', date: '3 minggu lalu', color: 'bg-violet-500'
    },
    {
        id: 6, name: 'Kipli Saripudin', rating: 5, comment: 'Jadi driver di SEAPEDIA penghasilannya lumayan dan sistemnya transparan. Aplikasi driver-nya juga smooth, jarang error. Top deh!', date: '1 bulan lalu', color: 'bg-pink-500'
    },
];

export default INITIAL_REVIEWS;