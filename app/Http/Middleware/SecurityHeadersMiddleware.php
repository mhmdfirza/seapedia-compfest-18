<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeadersMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Tambahkan fallback jika response bukan class Illuminate\Http\Response, misalnya jika $next($request) mengembalikan string atau array.
        if (method_exists($response, 'header')) {
            $response->header('X-Content-Type-Options', 'nosniff');
            $response->header('X-Frame-Options', 'SAMEORIGIN');
            $response->header('X-XSS-Protection', '1; mode=block');
            $response->header('Referrer-Policy', 'strict-origin-when-cross-origin');
            // Construct Content Security Policy
            $csp = "default-src 'self'; ";
            $csp .= "img-src 'self' data: https: blob:; ";
            $csp .= "font-src 'self' data: https://fonts.gstatic.com; ";
            
            if (app()->environment('local')) {
                // Allow Vite dev server and inline scripts/styles for React
                $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; ";
                $csp .= "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:5173; ";
                $csp .= "connect-src 'self' ws://localhost:5173 http://localhost:5173; ";
            } else {
                $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval'; ";
                $csp .= "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ";
                $csp .= "connect-src 'self'; ";
            }
            
            $response->header('Content-Security-Policy', $csp);
            if ($request->is('api/*')) {
                $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
            }
        }

        return $response;
    }
}
