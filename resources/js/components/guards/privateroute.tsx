import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useAuth, UserRole } from 'res/contexts/authcontext';

interface PrivateRouteProps {
    /** Role yang dibutuhkan untuk mengakses halaman ini. */
    requiredRole: UserRole;
    children: React.ReactNode;
}

/**
 * Bungkus komponen halaman dengan PrivateRoute untuk:
 * 1. Redirect ke /login jika user belum login.
 * 2. Redirect ke /select-role jika role aktif tidak sesuai.
 */
export default function PrivateRoute({ requiredRole, children }: PrivateRouteProps) {
    const { isLoggedIn, activeRole } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.visit('/login');
        } else if (activeRole !== requiredRole) {
            router.visit('/select-role');
        }
    }, [isLoggedIn, activeRole, requiredRole]);

    // Jangan render children sambil menunggu redirect
    if (!isLoggedIn || activeRole !== requiredRole) {
        return null;
    }

    return <>{children}</>;
}
