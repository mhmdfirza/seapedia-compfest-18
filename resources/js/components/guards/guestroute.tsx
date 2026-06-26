import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useAuth } from 'res/contexts/authcontext';

interface GuestRouteProps {
    children: React.ReactNode;
}

const ROLE_DASHBOARD: Record<string, string> = {
    buyer: '/dashboard/buyer',
    seller: '/dashboard/seller',
    driver: '/dashboard/driver',
    admin: '/dashboard/admin',
};

/**
 * Bungkus halaman login/register dengan GuestRoute.
 * Jika user sudah login, redirect ke dashboard role aktif mereka
 * atau ke /select-role jika belum memilih role.
 */
export default function GuestRoute({ children }: GuestRouteProps) {
    const { isLoggedIn, activeRole } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            const destination = activeRole ? ROLE_DASHBOARD[activeRole] : '/select-role';
            router.visit(destination);
        }
    }, [isLoggedIn, activeRole]);

    if (isLoggedIn) return null;

    return <>{children}</>;
}
