export const products = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `Produk Spesial ${i + 1}`,
    price: 50000 + (i * 25000),
    originalPrice: 75000 + (i * 35000),
    discountPercent: Math.round(((75000 + (i * 35000) - (50000 + (i * 25000))) / (75000 + (i * 35000))) * 100),
    images: [
        `https://picsum.photos/400/400?random=${i * 3 + 1}`,
        `https://picsum.photos/400/400?random=${i * 3 + 2}`,
        `https://picsum.photos/400/400?random=${i * 3 + 3}`
    ],
    rating: parseFloat((((i * 1.3) % 2) + 3).toFixed(1)),
    reviewCount: (i * 27) % 500 + 10,
    soldCount: (i * 115) % 2000 + 50,
    stock: (i * 13) % 100 + 5,
    category: ['Elektronik', 'Pakaian Pria', 'Home & Living', 'Olahraga', 'Otomotif'][i % 5],
    storeId: (i % 8) + 1,
    storeName: `Toko Dummy ${(i % 8) + 1}`,
    storeCity: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'][i % 5],
    description: `<p>Ini adalah deskripsi sangat detail untuk <strong>Produk Spesial ${i + 1}</strong>. Produk ini diproduksi dengan standar kualitas tinggi untuk menjamin kepuasan Anda.</p>
    <ul>
      <li>Material premium berstandar internasional</li>
      <li>Desain ergonomis dan modern</li>
      <li>Garansi resmi selama 1 tahun penuh</li>
    </ul>
    <p>Jangan sampai kehabisan, stok sangat terbatas!</p>`,
    variants: [
        { id: 1, name: 'Warna', options: ['Merah', 'Biru', 'Hitam'] },
        { id: 2, name: 'Ukuran', options: ['S', 'M', 'L', 'XL'] }
    ]
}));
