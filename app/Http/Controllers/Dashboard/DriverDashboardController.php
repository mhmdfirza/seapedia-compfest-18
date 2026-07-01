<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DriverDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('driver/dashboard', [
            'placeholder_data' => 0,
            'placeholder' => null,
            'message' => 'Data placeholder untuk fitur mendatang'
        ]);
    }
}
