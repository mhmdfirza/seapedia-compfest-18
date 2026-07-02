import React from "react";
import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ReviewProvider } from 'res/contexts/reviewcontext';
import { AuthProvider } from 'res/contexts/authcontext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'SEAPEDIA';

class ErrorBoundary extends React.Component<any, { hasError: boolean, error: any }> {
    constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
    render() {
        if (this.state.hasError) return <div style={{ padding: 20, color: 'red' }}><h1>React Error</h1><pre>{String(this.state.error?.stack || this.state.error)}</pre></div>;
        return this.props.children;
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')) as any,
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ErrorBoundary>
                <AuthProvider>
                    <ReviewProvider>
                        <App {...props} />
                    </ReviewProvider>
                </AuthProvider>
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
