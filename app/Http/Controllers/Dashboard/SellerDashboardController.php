<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SellerDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('seller/dashboard', [
            'placeholder_data' => 0,
            'placeholder' => null,
            'message' => 'Data placeholder untuk fitur mendatang'
        ]);
    }
}
