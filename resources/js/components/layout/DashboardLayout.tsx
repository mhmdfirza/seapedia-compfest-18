import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DashboardRole = 'buyer' | 'seller' | 'driver' | 'admin';

export type MenuItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export type DashboardUser = {
    name: string;
    email: string;
    avatarInitial?: string;
    roles?: DashboardRole[];
};

export type DashboardLayoutProps = {
    role: DashboardRole;
    user: DashboardUser;
    menuItems: MenuItem[];
    activePath: string;
    children: React.ReactNode;
};

// ─── Role Config ─────────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<DashboardRole, { label: string; badgeColor: string; badgeBg: string }> = {
    buyer: { label: 'Buyer', badgeColor: 'text-primary', badgeBg: 'bg-primary-light' },
    seller: { label: 'Seller', badgeColor: 'text-secondary', badgeBg: 'bg-orange-50' },
    driver: { label: 'Driver', badgeColor: 'text-blue-600', badgeBg: 'bg-blue-50' },
    admin: { label: 'Admin', badgeColor: 'text-red-600', badgeBg: 'bg-red-50' },
};

const ROLE_HOME: Record<DashboardRole, string> = {
    buyer: '/dashboard/buyer',
    seller: '/dashboard/seller',
    driver: '/dashboard/driver',
    admin: '/dashboard/admin',
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const XIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const SwitchRoleIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);
const LogoutIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

// ─── Sidebar Content ──────────────────────────────────────────────────────────

type SidebarProps = Omit<DashboardLayoutProps, 'children'> & {
    collapsed: boolean;
    onClose?: () => void;
};

function SidebarContent({ role, user, menuItems, activePath, collapsed, onClose }: SidebarProps) {
    const config = ROLE_CONFIG[role];
    const hasMultipleRoles = (user.roles?.length ?? 0) > 1;

    return (
        <div className="flex flex-col h-full">
            {/* Logo + Close (mobile) */}
            <div className={`flex items-center px-4 h-16 border-b border-white/10 flex-shrink-0 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="font-display font-bold text-white text-lg tracking-tight">SEAPEDIA</span>
                    </Link>
                )}
                {collapsed && (
                    <Link href="/">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                    </Link>
                )}
                {onClose && !collapsed && (
                    <button onClick={onClose} className="text-white/60 hover:text-white p-1 transition-colors">
                        <XIcon />
                    </button>
                )}
            </div>

            {/* User Info + Role Badge */}
            {!collapsed && (
                <div className="px-4 py-4 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-base flex-shrink-0 ring-2 ring-white/30">
                            {user.avatarInitial ?? user.name[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                            <p className="text-white/60 text-xs truncate">{user.email}</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.badgeBg} ${config.badgeColor}`}>
                        {config.label}
                    </span>
                </div>
            )}
            {collapsed && (
                <div className="flex justify-center py-4 border-b border-white/10 flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm ring-2 ring-white/30">
                        {user.avatarInitial ?? user.name[0]?.toUpperCase()}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 px-2">
                {menuItems.map((item) => {
                    const isActive = activePath === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all group ${isActive
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                {item.icon}
                            </span>
                            {!collapsed && (
                                <span className="text-sm font-medium truncate">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="flex-shrink-0 px-2 pb-4 border-t border-white/10 pt-3 space-y-1">
                {hasMultipleRoles && !collapsed && (
                    <Link
                        href="/select-role"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all w-full text-sm font-medium"
                    >
                        <SwitchRoleIcon />
                        <span>Ganti Peran</span>
                    </Link>
                )}
                {hasMultipleRoles && collapsed && (
                    <Link href="/select-role" className="flex justify-center py-2.5 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all" title="Ganti Peran">
                        <SwitchRoleIcon />
                    </Link>
                )}
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all w-full text-sm font-medium ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? 'Keluar' : undefined}
                >
                    <LogoutIcon />
                    {!collapsed && <span>Keluar</span>}
                </Link>
            </div>
        </div>
    );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function DashboardLayout({ role, user, menuItems, activePath, children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Auto-collapse based on window resize
    useEffect(() => {
        const handler = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDrawerOpen(false); // Close drawer moving from mobile to tablet+
            } else if (width >= 768 && width < 1024) {
                setDrawerOpen(false);
                setCollapsed(true);
            } else if (width >= 1024) {
                setDrawerOpen(false);
                setCollapsed(false);
            }
        };
        // Initial set
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const sidebarBg = {
        buyer: 'bg-[#1a2e1a]',
        seller: 'bg-[#2d1e0f]',
        driver: 'bg-[#0f1d2d]',
        admin: 'bg-[#1a0f1a]',
    }[role];

    return (
        <div className="min-h-screen bg-neutral-light flex">

            {/* ── Desktop/Tablet Sidebar ── */}
            <aside
                className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${sidebarBg} ${collapsed ? 'w-16' : 'w-60'}`}
            >
                <SidebarContent
                    role={role} user={user} menuItems={menuItems} activePath={activePath}
                    collapsed={collapsed}
                />
                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(v => !v)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all text-neutral-medium hover:text-primary z-50"
                    title={collapsed ? 'Perluas sidebar' : 'Perkecil sidebar'}
                >
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </button>
            </aside>

            {/* ── Mobile Drawer Overlay ── */}
            {drawerOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* ── Mobile Sidebar Drawer ── */}
            <aside
                className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col transition-transform duration-300 ${sidebarBg} ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <SidebarContent
                    role={role} user={user} menuItems={menuItems} activePath={activePath}
                    collapsed={false}
                    onClose={() => setDrawerOpen(false)}
                />
            </aside>

            {/* ── Main Content Area ── */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-60'}`}>
                {/* Mobile Top Bar */}
                <header className="md:hidden sticky top-0 z-30 bg-white border-b border-border h-14 flex items-center px-4 gap-3 shadow-sm">
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="p-2 text-neutral-dark hover:text-primary transition-colors -ml-1"
                    >
                        <MenuIcon />
                    </button>
                    <span className="font-display font-bold text-primary text-base">SEAPEDIA</span>
                    <div className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${ROLE_CONFIG[role].badgeBg} ${ROLE_CONFIG[role].badgeColor}`}>
                        {ROLE_CONFIG[role].label}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 pb-20 md:pb-6">
                    {children}
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border h-16 flex items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe">
                    {/* Show first 4 menu items + home */}
                    {[
                        { label: 'Beranda', href: ROLE_HOME[role], icon: <HomeIcon /> },
                        ...menuItems.slice(1, 4),
                    ].map((item) => {
                        const isActive = activePath === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors ${isActive ? 'text-primary' : 'text-neutral-medium hover:text-primary'}`}
                            >
                                <span className="text-[18px] leading-none">{item.icon}</span>
                                <span className="text-[10px] font-medium mt-0.5 truncate max-w-[48px] text-center">{item.label}</span>
                            </Link>
                        );
                    })}
                    {/* More button (opens drawer for remaining items) */}
                    {menuItems.length > 4 && (
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-neutral-medium hover:text-primary transition-colors"
                        >
                            <span className="text-[18px] leading-none">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </span>
                            <span className="text-[10px] font-medium mt-0.5">Lainnya</span>
                        </button>
                    )}
                </nav>
            </div>
        </div>
    );
}
