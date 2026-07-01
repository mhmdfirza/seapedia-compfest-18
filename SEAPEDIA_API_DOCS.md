# SEAPEDIA API Documentation

Welcome to the internal API documentation for SEAPEDIA. This documentation covers all RESTful API endpoints and core application functionality utilized by the Inertia.js frontend and external clients.

All API requests (unless public) require an active session cookie or a Bearer Token (Sanctum) in the `Authorization` header.

---
## Output Formats
Most endpoints return standard grouped JSON responses in the following format:
```json
{
  "message": "Human readable action status",
  "data": { ... } // Response Object, if any
}
```

---
## 1. Authentication (`/api/v1/auth`)

### Login Endpoint
* **HTTP Method**: `POST`
* **Path**: `/api/v1/auth/login`
* **Description**: Authenticate a user and create a session mapping/Sanctum token.
* **Headers Required**: `Accept: application/json`
* **Request Body**:
```json
{
  "email": "buyer@demo.com",
  "password": "password123"
}
```
* **Success Response (200 OK)**:
```json
{
  "message": "Login successful",
  "data": {
    "token": "1|abcdef123...",
    "user": {
      "id": 1,
      "name": "Demo Buyer",
      "email": "buyer@demo.com"
    }
  }
}
```

### Register Endpoint
* **HTTP Method**: `POST`
* **Path**: `/api/v1/auth/register`
* **Description**: Create a new account with base role assignment.
* **Request Body**:
```json
{
  "name": "New User",
  "email": "newuser@demo.com",
  "password": "password123",
  "password_confirmation": "password123",
  "roles": ["buyer"] 
}
```

### Logout Endpoint
* **HTTP Method**: `POST`
* **Path**: `/api/v1/auth/logout`
* **Headers Required**: `Authorization: Bearer {token}`
* **Description**: Invalidates the user's active session and token.

---
## 2. Role Management (`/api/v1/roles`)

### Get Roles
* **HTTP Method**: `GET`
* **Path**: `/api/v1/roles`
* **Headers Required**: `Authorization: Bearer {token}`
* **Description**: Fetch all roles possessed by the currently authenticated user.

### Select Active Role
* **HTTP Method**: `POST`
* **Path**: `/api/v1/roles/select`
* **Headers Required**: `Authorization: Bearer {token}`
* **Description**: Switch the current active context for multi-role users. The backend validates and scopes all subsequent requests based on this active role.
* **Request Body**:
```json
{
  "role": "seller"
}
```

---
## 3. Product Catalog (Public & Seller)

### List Products
* **HTTP Method**: `GET`
* **Path**: `/api/v1/products`
* **Description**: Fetch product catalog. Supported query parameters: `search`, `category`, `store_id`.

### Store Management (Seller Dashboard)
* **HTTP Method**: `POST`
* **Path**: `/api/v1/dashboard/seller/products`
* **Headers Required**: `Authorization: Bearer {token}` (Active Role: Seller)
* **Description**: Add a new product to the seller's active store.
* **Request Body**: (Multipart/form-data)
  * `name` (string)
  * `description` (text)
  * `price` (numeric)
  * `stock` (numeric)
  * `image` (file)

---
## 4. Cart and Checkout (Buyer)

### Add to Cart
* **HTTP Method**: `POST`
* **Path**: `/api/v1/cart`
* **Headers Required**: `Authorization: Bearer {token}` (Active Role: Buyer)
* **Description**: Adds product to cart. Note the **Single-Store Checkout Rule**: if the cart contains products from store A, adding a product from store B will return a 422 error.
* **Request Body**:
```json
{
  "product_id": 10,
  "quantity": 1
}
```
* **Error Response (422 Unprocessable Entity)**:
```json
{
  "message": "Cart can only contain items from a single store. Please clear your cart or finish checkout first.",
  "errors": { "store_id": ["Cart conflict"] }
}
```

### Checkout Calculation & Confirmation
* **HTTP Method**: `POST`
* **Path**: `/api/v1/checkout`
* **Headers Required**: `Authorization: Bearer {token}`
* **Description**: Completes the order based on the cart. Calculates taxes (12% PPN) and applies any active promo codes.
* **Request Body**:
```json
{
  "voucher_code": "PROMO10",
  "payment_method": "wallet"
}
```

---
## 5. Wallet Top-up (Buyer)

### Top-Up Balance
* **HTTP Method**: `POST`
* **Path**: `/api/v1/wallet/topup`
* **Headers Required**: `Authorization: Bearer {token}`
* **Description**: Simulates adding balance to a user's SEAPEDIA wallet.
* **Request Body**:
```json
{
  "amount": 500000
}
```

---
## 6. Delivery Jobs (Driver)

### List Available Deliveries
* **HTTP Method**: `GET`
* **Path**: `/api/v1/dashboard/driver/jobs`
* **Headers Required**: `Authorization: Bearer {token}` (Active Role: Driver)
* **Description**: Lists pending seller orders ready for delivery.

### Complete Delivery
* **HTTP Method**: `POST`
* **Path**: `/api/v1/dashboard/driver/jobs/{id}/complete`
* **Headers Required**: `Authorization: Bearer {token}`
* **Description**: Marks the task as completed. Credit is pushed to the Driver's Earning module.

---
## 7. Admin Monitoring & Overdue Simulation (Admin)

### Admin Overview
* **HTTP Method**: `GET`
* **Path**: `/api/v1/dashboard/admin/stats`
* **Headers Required**: `Authorization: Bearer {token}` (Active Role: Admin)
* **Description**: View platform-wide aggregations (GMV, registered users, disputed orders).

### Overdue Auto-Refund Simulation Trigger
* **HTTP Method**: `POST`
* **Path**: `/api/v1/dashboard/admin/simulate-time`
* **Headers Required**: `Authorization: Bearer {token}` (Active Role: Admin)
* **Description**: Fast-forwards time logic within the underlying environment to test overdue SLAs on Instant, Next Day, and Regular deliveries. Triggers the auto-refund chron-job.
* **Request Body**:
```json
{
  "add_hours": 24
}
```
* **Success Response (200 OK)**:
```json
{
  "message": "Time simulated. Triggered 5 auto-refund events.",
  "data": {
    "refunded_orders": [101, 105, 110]
  }
}
```
