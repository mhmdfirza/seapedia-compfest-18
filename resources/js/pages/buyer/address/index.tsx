import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from 'res/components/sections/navbar';
import Container from 'res/components/ui/container';
import SectionTitle from 'res/components/ui/sectiontitle';
import Button from 'res/components/ui/button';
import Badge from 'res/components/ui/badge';

const MOCK_ADDRESSES = [
    {
        id: 1, label: 'Rumah', name: 'Budi Santoso', phone: '+62 812-3456-7890',
        address: 'Jl. Sudirman No. 45, RT 03/RW 05', city: 'Menteng, Jakarta Pusat', zip: '10310', primary: true
    },
    {
        id: 2, label: 'Kantor', name: 'Budi Santoso', phone: '+62 812-3456-7890',
        address: 'Gedung Graha Mentari Lt. 5, Jl. TB Simatupang No. 1', city: 'Pasar Minggu, Jakarta Selatan', zip: '12760', primary: false
    },
];

export default function AddressIndex() {
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-light flex flex-col">
            <Head title="Alamat Saya – SEAPEDIA" />
            <Navbar />
            <main className="flex-grow py-6">
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="font-display text-xl font-bold text-neutral-dark">Alamat Saya 📍</h1>
                            <Button size="sm" onClick={() => setShowForm(v => !v)}>+ Tambah Alamat</Button>
                        </div>

                        {/* Add Address Form */}
                        {showForm && (
                            <div className="bg-white rounded-xl border border-primary p-5 mb-4">
                                <p className="font-semibold text-neutral-dark mb-4">Tambah Alamat Baru</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs font-medium text-neutral-dark mb-1">Nama Lengkap</label>
                                        <input type="text" placeholder="Nama Penerima" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs font-medium text-neutral-dark mb-1">Nomor HP</label>
                                        <input type="tel" placeholder="+62 812..." className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-neutral-dark mb-1">Label Alamat</label>
                                        <div className="flex gap-2">
                                            {['Rumah', 'Kantor', 'Lainnya'].map((l) => (
                                                <button key={l} className="text-xs border border-border rounded-lg px-3 py-1.5 hover:border-primary hover:bg-primary-light hover:text-primary transition-colors">{l}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-neutral-dark mb-1">Alamat Lengkap</label>
                                        <textarea placeholder="Nama jalan, nomor, RT/RW, kelurahan..." className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" rows={3} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-dark mb-1">Kota / Kabupaten</label>
                                        <input type="text" placeholder="Jakarta Pusat" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-dark mb-1">Kode Pos</label>
                                        <input type="text" placeholder="10310" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button size="sm">Simpan Alamat</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
                                </div>
                            </div>
                        )}

                        {/* Address List */}
                        <div className="space-y-3">
                            {addresses.map((addr) => (
                                <div key={addr.id} className={`bg-white rounded-xl border p-4 ${addr.primary ? 'border-primary' : 'border-border'}`}>
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-neutral-dark">{addr.name}</span>
                                            <Badge variant="neutral" className="text-[10px]">{addr.label}</Badge>
                                            {addr.primary && <Badge variant="primary" className="text-[10px]">Utama</Badge>}
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-medium mb-0.5">{addr.phone}</p>
                                    <p className="text-sm text-neutral-dark">{addr.address}</p>
                                    <p className="text-sm text-neutral-dark">{addr.city} {addr.zip}</p>
                                    <div className="flex gap-2 mt-3">
                                        <button className="text-xs text-primary hover:underline">Ubah</button>
                                        {!addr.primary && (
                                            <>
                                                <span className="text-border">|</span>
                                                <button className="text-xs text-neutral-medium hover:text-primary">Jadikan Utama</button>
                                                <span className="text-border">|</span>
                                                <button className="text-xs text-danger hover:underline" onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))}>Hapus</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
