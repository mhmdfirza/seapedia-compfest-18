<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class BuyerDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('buyer/dashboard', [
            'totalOrders' => 0,
            'placeholder' => null,
            'message' => 'Data placeholder untuk fitur mendatang'
        ]);
    }
}
