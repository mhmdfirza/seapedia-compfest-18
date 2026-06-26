import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Logo from '@/components/ui/logo';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const ROLES = [
    { id: 'buyer', label: 'Pembeli', icon: '🛍️', desc: 'Belanja produk dari ribuan seller terpercaya' },
    { id: 'seller', label: 'Penjual', icon: '🏪', desc: 'Buka toko dan jual produkmu ke jutaan pembeli' },
    { id: 'driver', label: 'Driver', icon: '🚴', desc: 'Antar pesanan dan dapatkan penghasilan tambahan' },
];

export default function Register() {
    const [selectedRole, setSelectedRole] = useState('buyer');
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen bg-neutral-light flex">
            <Head title="Daftar Akun – SEAPEDIA" />

            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary to-green-700 items-center justify-center p-12">
                <div className="text-white text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Logo />
                        <span className="text-2xl font-bold font-display">SEAPEDIA</span>
                    </div>
                    <h2 className="text-2xl font-display font-bold mb-3">Bergabung Bersama Kami</h2>
                    <p className="text-white/80 leading-relaxed mb-6">Daftar gratis dan mulai perjalananmu di marketplace terbaik Indonesia.</p>
                    <div className="space-y-3">
                        {['Bebas biaya pendaftaran', 'Transaksi aman terjamin', 'Support 24/7 siap membantu', 'Ribuan fitur lengkap'].map((f) => (
                            <div key={f} className="flex items-center gap-2 text-sm text-white/90">
                                <span className="text-green-300 font-bold">✓</span> {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-lg">
                    <div className="flex items-center gap-2 mb-6 lg:hidden">
                        <Logo />
                        <span className="text-xl font-bold text-primary font-display">SEAPEDIA</span>
                    </div>

                    <h1 className="font-display text-2xl font-bold text-neutral-dark mb-1">Buat Akun Baru</h1>
                    <p className="text-sm text-neutral-medium mb-5">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-primary font-medium hover:underline">Masuk sekarang</Link>
                    </p>

                    {/* Role Selection */}
                    <div className="mb-5">
                        <p className="text-sm font-medium text-neutral-dark mb-2">Daftar sebagai:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {ROLES.map((role) => (
                                <button key={role.id} type="button" onClick={() => { setSelectedRole(role.id); setData('role', role.id); }}
                                    className={`p-3 border-2 rounded-xl text-center transition-all ${selectedRole === role.id ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/50'}`}>
                                    <div className="text-2xl mb-1">{role.icon}</div>
                                    <p className={`text-xs font-semibold ${selectedRole === role.id ? 'text-primary' : 'text-neutral-dark'}`}>{role.label}</p>
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-neutral-medium mt-2">{ROLES.find(r => r.id === selectedRole)?.desc}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-dark mb-1.5">Nama Lengkap</label>
                            <Input placeholder="Nama Lengkap" value={data.name} onChange={e => setData('name', e.target.value)} error={!!errors.name} />
                            {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-dark mb-1.5">Email</label>
                            <Input type="email" placeholder="nama@email.com" value={data.email} onChange={e => setData('email', e.target.value)} error={!!errors.email} />
                            {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-neutral-dark mb-1.5">Password</label>
                                <Input type="password" placeholder="Min. 8 karakter" value={data.password} onChange={e => setData('password', e.target.value)} error={!!errors.password} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-dark mb-1.5">Konfirmasi Password</label>
                                <Input type="password" placeholder="Ulangi password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                            </div>
                        </div>
                        {errors.password && <p className="text-xs text-danger">{errors.password}</p>}

                        <Button type="submit" size="lg" className="w-full justify-center mt-2" disabled={processing}>
                            {processing ? 'Mendaftar...' : `Daftar sebagai ${ROLES.find(r => r.id === selectedRole)?.label}`}
                        </Button>
                    </form>

                    <p className="text-center text-xs text-neutral-medium mt-4">
                        Dengan mendaftar, kamu setuju dengan{' '}
                        <Link href="#" className="text-primary hover:underline">Syarat & Ketentuan</Link>{' '}
                        dan{' '}
                        <Link href="#" className="text-primary hover:underline">Kebijakan Privasi</Link> kami.
                    </p>
                </div>
            </div>
        </div>
    );
}
