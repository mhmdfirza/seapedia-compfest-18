import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],

    // ── Docker HMR Configuration ───────────────────────────────────────
    // Vite runs inside the 'node' container but the browser runs on the
    // host. We need to tell Vite to:
    //   1. Listen on 0.0.0.0 (not localhost) so Docker can route traffic.
    //   2. Set the HMR host to 'localhost' so the browser's WebSocket
    //      connects to the host machine, which Docker maps to the container.
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: 'localhost',
        },
        // Watch for file changes inside the container.
        watch: {
            usePolling: true,
        },
    },
});
