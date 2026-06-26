import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'buyer' | 'seller' | 'driver' | 'admin';

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    roles: UserRole[];
    activeRole: UserRole | null;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoggedIn: boolean;
    activeRole: UserRole | null;
    login: (role?: UserRole) => void;
    logout: () => void;
    switchRole: (role: UserRole) => void;
}

// ─── DUMMY USER ──────────────────────────────────────────────────────────────
// Ganti bagian ini dengan data dari API saat backend sudah siap.
const DUMMY_USER: AuthUser = {
    id: 1,
    name: 'Budi Santoso',
    email: 'budi@seapedia.id',
    roles: ['buyer', 'seller', 'driver'],
    activeRole: null,
};
// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    const isLoggedIn = user !== null;
    const activeRole = user?.activeRole ?? null;

    /** Login dengan optional role. Jika role diberikan, langsung set active role. */
    const login = (role?: UserRole) => {
        setUser({ ...DUMMY_USER, activeRole: role ?? null });
    };

    const logout = () => {
        setUser(null);
    };

    const switchRole = (role: UserRole) => {
        if (!user) return;
        if (!user.roles.includes(role)) return;
        setUser({ ...user, activeRole: role });
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, activeRole, login, logout, switchRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
