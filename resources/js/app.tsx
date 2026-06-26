import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ReviewProvider } from 'res/contexts/reviewcontext';
import { AuthProvider } from 'res/contexts/authcontext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'SEAPEDIA';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')) as any,
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <AuthProvider>
                <ReviewProvider>
                    <App {...props} />
                </ReviewProvider>
            </AuthProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
