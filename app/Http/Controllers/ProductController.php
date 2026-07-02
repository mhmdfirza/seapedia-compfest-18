<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display the products list page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('products/index');
    }

    /**
     * Display the specific product page.
     *
     * @param string|int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        return Inertia::render('products/show', ['id' => $id]);
    }
}
