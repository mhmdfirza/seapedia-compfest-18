import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Logo from '@/components/ui/logo';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-neutral-light flex">
            <Head title="Masuk – SEAPEDIA" />

            {/* Left Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-green-700 items-center justify-center p-12">
                <div className="text-white text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Logo />
                        <span className="text-3xl font-bold font-display">SEAPEDIA</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-4">Marketplace #1 Indonesia</h2>
                    <p className="text-white/80 text-lg leading-relaxed mb-8">
                        Belanja jutaan produk, jual lebih mudah, antar lebih cepat — semua dalam satu platform.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        {[
                            { val: '100K+', label: 'Seller Aktif' },
                            { val: '5M+', label: 'Pembeli' },
                            { val: '10K+', label: 'Driver' },
                        ].map(s => (
                            <div key={s.label} className="bg-white/10 rounded-xl p-4">
                                <p className="text-2xl font-bold">{s.val}</p>
                                <p className="text-xs text-white/70 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <Logo />
                        <span className="text-xl font-bold text-primary font-display">SEAPEDIA</span>
                    </div>

                    <h1 className="font-display text-2xl font-bold text-neutral-dark mb-1">Masuk ke SEAPEDIA</h1>
                    <p className="text-sm text-neutral-medium mb-6">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-primary font-medium hover:underline">Daftar gratis</Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-dark mb-1.5">Email</label>
                            <Input
                                type="email"
                                placeholder="nama@email.com"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                error={!!errors.email}
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-neutral-dark">Password</label>
                                <Link href="#" className="text-xs text-primary hover:underline">Lupa password?</Link>
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    error={!!errors.password}
                                    autoComplete="current-password"
                                    className="pr-10"
                                />
                                <button type="button" onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-medium hover:text-neutral-dark text-sm">
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="w-4 h-4 accent-primary" />
                            <label htmlFor="remember" className="text-sm text-neutral-medium">Ingat saya</label>
                        </div>

                        <Button type="submit" size="lg" className="w-full justify-center" disabled={processing}>
                            {processing ? 'Memproses...' : 'Masuk'}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                        <div className="relative flex justify-center text-xs text-neutral-medium bg-neutral-light px-4">atau masuk dengan</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 border border-border rounded-lg px-4 py-2.5 text-sm text-neutral-dark hover:bg-neutral-light hover:border-primary transition-colors">
                            <span>🌐</span> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-border rounded-lg px-4 py-2.5 text-sm text-neutral-dark hover:bg-neutral-light hover:border-primary transition-colors">
                            <span>📘</span> Facebook
                        </button>
                    </div>

                    <p className="text-center text-xs text-neutral-medium mt-6">
                        Dengan masuk, kamu menyetujui{' '}
                        <Link href="#" className="text-primary hover:underline">Syarat & Ketentuan</Link>{' '}
                        dan{' '}
                        <Link href="#" className="text-primary hover:underline">Kebijakan Privasi</Link> SEAPEDIA.
                    </p>
                </div>
            </div>
        </div>
    );
}