<?php

namespace Tests\Feature\Security;

use Tests\TestCase;
use App\Traits\ResourceOwnershipTrait;
use Illuminate\Auth\Access\AuthorizationException;

class StubController
{
    use ResourceOwnershipTrait;

    public function handleSellerProductStub($product)
    {
        $this->authorizeSellerProduct($product);
    }

    public function handleBuyerOrderStub($order)
    {
        $this->authorizeBuyerOrder($order);
    }
}

class ResourceOwnershipTest extends TestCase
{
    public function test_seller_cannot_edit_other_seller_product()
    {
        // Setup isolated mock objects
        $sellerAuthId = 999;
        \Illuminate\Support\Facades\Auth::shouldReceive('id')->andReturn($sellerAuthId);
        
        $foreignProduct = new \stdClass();
        $foreignProduct->store = (object)['user_id' => 100]; // Owned by user 100

        $controller = new StubController();

        $this->expectException(AuthorizationException::class);
        $this->expectExceptionMessage('Anda tidak berhak mengakses produk ini.');

        $controller->handleSellerProductStub($foreignProduct);
    }

    public function test_buyer_cannot_access_other_buyer_order()
    {
        $buyerAuthId = 123;
        \Illuminate\Support\Facades\Auth::shouldReceive('id')->andReturn($buyerAuthId);
        
        $foreignOrder = new \stdClass();
        $foreignOrder->buyer_id = 999; 

        $controller = new StubController();

        $this->expectException(AuthorizationException::class);
        $this->expectExceptionMessage('Anda tidak berhak mengakses order ini.');

        $controller->handleBuyerOrderStub($foreignOrder);
    }
}
