import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
        './resources/**/*.tsx',
        './resources/**/*.ts',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#03AC0E', // Primary Green
                    dark: '#028A0B',    // Primary Green Dark
                    light: '#E8F8E9',   // Primary Green Light
                },
                secondary: {
                    DEFAULT: '#F47B20', // Secondary Orange
                },
                neutral: {
                    dark: '#1D1D1D',    // Neutral Dark
                    medium: '#6B7280',  // Neutral Medium
                    light: '#F3F4F6',   // Neutral Light
                },
                danger: {
                    DEFAULT: '#EF4444', // Red Danger
                },
                border: '#E5E7EB',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                'xl': '12px',
                'lg': '8px',
                'full': '9999px',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
};
