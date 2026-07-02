<?php

namespace App\Traits;

use Illuminate\Auth\Access\AuthorizationException;

trait ResourceOwnershipTrait
{
    /**
     * @throws AuthorizationException
     */
    protected function authorizeSellerProduct($product)
    {
        if ($product->store->user_id !== auth()->id()) {
            throw new AuthorizationException('Anda tidak berhak mengakses produk ini.');
        }
    }

    /**
     * @throws AuthorizationException
     */
    protected function authorizeBuyerOrder($order)
    {
        if ($order->buyer_id !== auth()->id()) {
            throw new AuthorizationException('Anda tidak berhak mengakses order ini.');
        }
    }

    /**
     * @throws AuthorizationException
     */
    protected function authorizeDriverJob($job)
    {
        if ($job->driver_id !== auth()->id()) {
            throw new AuthorizationException('Anda tidak berhak mengakses pekerjaan ini.');
        }
    }

    /**
     * @throws AuthorizationException
     */
    protected function authorizeSellerOrder($order)
    {
        $hasMatchingProduct = false;
        
        // Ambil store dari seller yang sedang login
        $store = \App\Models\Store::where('user_id', auth()->id())->first();
        if (!$store) {
            throw new AuthorizationException('Toko tidak ditemukan.');
        }

        // Cek apakah order memiliki item dari toko milik user
        foreach ($order->items as $item) {
            if ($item->product && $item->product->store_id === $store->id) {
                $hasMatchingProduct = true;
                break;
            }
        }
        
        if (!$hasMatchingProduct) {
            throw new AuthorizationException('Anda tidak berhak mengakses order ini. Order tidak mengandung produk dari toko Anda.');
        }
    }
}
