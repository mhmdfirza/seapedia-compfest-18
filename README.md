# SEAPEDIA

## Project Overview
SEAPEDIA is a robust, multi-role e-commerce marketplace built using Laravel 11 and React (Inertia.js). The platform is designed to handle high-fidelity e-commerce flows supporting four distinct account roles: Admin, Seller, Buyer, and Driver. Key features include product metadata management, digital wallet top-ups, dynamic cart and checkout with accurate 12% PPN tax calculation, integrated discount vouchers and promos, dedicated delivery job workflows, comprehensive admin monitoring, and automated overdue SLA refund handling. The application aims to solve all levels of the challenge requirements with strong session security and database resiliency. 

## Prerequisites
Before you begin, ensure you have the following installed on your target machine:
- **PHP**: 8.2 or higher
- **Composer**: 2.7 or higher
- **Node.js**: 20.x or higher (with `npm` v10+)
- **Database Engine**: PostgreSQL 15+ or MySQL 8.0+
- *(Optional)* **Docker & Docker Compose**: If you prefer containerized deployment utilizing Laravel Sail.

## Environment Setup
1. Copy the provided environment example file to quickly set up your application constraints:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and review the configurations. The `.env.example` comes thoroughly documented. Setup your local environment as follows:
   * **Application & Keys**: Set `APP_URL` to your preferred host (default `http://localhost:8000`). Run `php artisan key:generate` to set `APP_KEY`.
   * **Database Connection**: Update `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` to match your local running database instance.
   * **Authentication & Seed Secrets**: Adjust `ADMIN_EMAIL` and `ADMIN_PASSWORD` (default ones are provided) which will be used securely during the database seed script to grant an Admin-tier account privilege without UI registration.
   * **App Porting**: Note the `APP_PORT` and `VITE_PORT` variables for port resolutions.

## Installation and Running the Project
Follow these step-by-step numbered instructions to install dependencies and run SEAPEDIA locally.

1. **Install Backend Dependencies**: Run composer to install PHP packages from `composer.json` without interaction:
   ```bash
   composer install
   ```
2. **Generate Application Key**: (If you haven't yet, automatically handled via composer scripts sometimes):
   ```bash
   php artisan key:generate
   ```
3. **Database Migration and Seeding**: Ensure your database engine is running. Create the target database (e.g., `seapedia`), then run:
   ```bash
   php artisan migrate:fresh --seed
   ```
   *This command drops all tables, recreates the schema, and automatically seeds the platform with all necessary demo entities including the Admin, Buyers, Sellers, Drivers, fallback products, stores, and discount vouchers.*
4. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```
5. **Start the Development Servers**: You must run both the backend server and the frontend Vite server. Laravel 11 provides a wrapper for this using `concurrently`:
   ```bash
   composer run dev
   ```
   Alternatively, you can run them in two separate terminal windows:
   * Terminal 1: `php artisan serve` (Starts application on `http://localhost:8000`)
   * Terminal 2: `npm run dev` (Starts Vite asset building)

## Admin Account Setup
The Admin role in SEAPEDIA is a heavily privileged tier that cannot be created or obtained via normal frontend registration flows. By default, the `php artisan migrate:fresh --seed` command natively provisions the Admin using the `AdminSeeder`. 
You can customize the credentials by injecting `ADMIN_EMAIL` and `ADMIN_PASSWORD` into your `.env` file before executing the migrations. Evaluators strongly rely on this method to securely test Level 6 dashboard monitoring features without granting access unnecessarily. 

## Demo Accounts
Running the seed step populates the application with fully configured accounts for testing end-to-end functionality right out of the box. Use any of the following credentials to log in (`password: password123` applies to all):

* **Admin**: `admin@seapedia.demo`
* **Multi-Role (Seller & Buyer)**: `sellerbuyer@demo.com`
* **Multi-Role (Buyer & Driver)**: `buyerdriver@demo.com`
* **Single Role Seller**: `seller@demo.com`
* **Single Role Buyer**: `buyer@demo.com`
* **Single Role Driver**: `driver@demo.com`

All corresponding demo stores, products, and roles are pre-assigned and attached.

## Single-Store Checkout Rule
When using SEAPEDIA's cart component, **a single cart may only contain products sourced from one specific store**. If a Buyer attempts to add an item from "Store B" while their cart currently holds an item from "Store A", the addition triggers an HTTP 422 error, notifying the user. This logic is strictly enforced in the backend cart schema and checkout loop to greatly simplify seller fulfillment logic, guarantee predictable multi-party payouts, and maintain coherent delivery route logic for individual drivers.

## Discount and Tax Rules
During Checkout, product totals are subject to an exact 12% PPN calculated upon the base price.
* **Vouchers & Promos**: In SEAPEDIA, Vouchers act as global discounts, whereas Promos are store-specific codes injected by sellers. They are mutually exclusive per individual order layer to prevent price crashing. 
* **Calculation Flow**: A flat-rate discount voucher deducts directly from the sub-total *prior* to tax evaluation. This ensures PPN is accurately calculated and extracted based purely on the final taxed revenue. Example flow: (Cart Total - Voucher Discount) + 12% Tax = Final Payable Total.

## Driver Earning Rule
A driver claims a pending package task via the Driver dashboard. The driver operates on a flat mileage base model augmented by weight modifiers. Currently, once a job is flipped to "Completed", an isolated backend process distributes exactly **90%** of the standard accumulated delivery fee directly to the driver's abstract Earning Wallet while retaining 10% as service tax for the platform.

## Overdue SLA and Time Simulation
SLA rules define expiration deadlines for Instant (4 hours), Next Day (24 hours), and Regular (3 Days) delivery scopes. If a Seller fails to hand a package to a Driver, or a Driver fails to deliver a package by the respective expiration deadline, the system flags the order as Overdue.
* **Auto-Refund**: A scheduled chron job handles overdue queries and automatically triggers fund reversions to the Buyer’s associated Wallet and adjusts stock allocations incrementally.
* **Simulation Testing**: Evaluators without the capacity to wait 3 Days can simulate timeline expirations. Admins can log in, access the "Monitoring" dashboard tab, and invoke a specialized `Simulate Time` action node that broadcasts a request (`/api/v1/dashboard/admin/simulate-time`) to immediately offset the environment timeline array and instantaneously execute the Overdue routine logic for UI review.

## API Documentation
The comprehensive API endpoints for internal mechanisms (Cart logic, Checkout validation, Overdue triggers, Role Management, Driver Jobs, and Setup constraints) spanning all roles are detailed extensively in Markdown form. 

Please natively refer to: **[SEAPEDIA_API_DOCS.md](SEAPEDIA_API_DOCS.md)** located at the repository root. This document mirrors a Postman/Swagger schema format to clearly detail HTTP methodologies, parameters, and example generic outputs.

## Security Notes
Security and resilience are core aspects of SEAPEDIA.
* **SQL Injection**: All direct DB query manipulation is entirely abstracted and parameterized. SEAPEDIA primarily leverages Laravel Eloquent ORM, bypassing raw queries. Where parameter binding is necessary, native PDO sanitization handles inputs aggressively implicitly avoiding string concatenation variants.
* **XSS**: Whenever dynamic data (such as product review comments) is painted on Inertia React layers, JSX natively escapes potentially hazardous strings prior to the DOM paint. Similarly, Laravel's backend validation strictly forbids HTML injection payloads utilizing `strip_tags` parsing hooks.
* **Input Validation**: `FormRequests` statically validate all inward traffic globally. If a checkout uses incorrect limits, lacks authorization, or tries a non-existent email, a standard 422 HTTP Payload returns explaining errors alongside exact failure fields (e.g., minimum bounds violation, string length, etc).
* **Session Behavior**: Authorization tokens via Laravel Sanctum secure stateless flows. Web dashboards lean on strictly secured HttpOnly session cookies (with 120min timeout lifetimes) ensuring that Javascript cannot capture core tokens on the client edge. Automatic invalidation routes run post logout mappings or extended unauthenticated delays.
* **Role-Based Access Control (RBAC)**: All sub-routes (Seller routes, Admin monitoring, etc.) are strictly shielded via the `EnsureActiveRole::class` Middleware layer natively verifying Active role tokens against the remote session array per specific HTTP request. The backend strictly ignores manipulated `localStorage` frontend tokens, fetching truth directly against session bounds.

## Git Commit History
You can navigate the active development cycle repository logic directly pointing toward GitLab or GitHub via this internal repository. Development is committed cleanly following the logical feature expansions per level challenge criteria. We encourage evaluators to traverse feature-bound commit hashes sequentially to overview integration layers and structural thinking routines. 

## Deployment Link (if applicable)
Currently, SEAPEDIA is optimized for local multi-docker integration. A live Vercel MVP mirror demo exists strictly for React UI layout tests (without reliable persistent databases). Local evaluation is definitively recommended utilizing `composer dev`.

## Testing Guide
Follow this walkthrough logic to test SEAPEDIA end to end:
1. **Public/Guest Exploration**: Navigate to `http://localhost:8000/`. You should be able to freely traverse product endpoints, view item stats, and read public Product application reviews.
2. **Setup Role & Items**: Login using `sellerbuyer@demo.com`. If interacting as the Seller Role, append a new product via the "Store Management -> Add Item" flow inside the Seller Dashboard matrix. Test input validation by leaving title constraints blank.
3. **Cart Collision & Checkouts**: Log out and authenticate as the simple Buyer via `buyer@demo.com`. Go into the main product catalog, click "Add to Cart" for products specifically linked to the previous seller. Trigger the **Single-Store Checkout** error by clicking an entirely different brand's product.
4. **Discounts and Wallets**: Inside the cart, navigate towards Checkout. Input abstract promo keys (e.g. `PROMO10`) checking correct Sub-total drops cascading over 12% PPN application logic. Proceed towards order lock logic utilizing demo wallet balance.
5. **Fulfillment (Seller)**: Log backward into the Seller interface. Transition the fresh item purchase from Pending `->` Dispatched contexts.
6. **Delivery Execution**: Login utilizing the `driver@demo.com` account. Under Job listings, assert control over the dispatched job loop, testing earning increments visually modifying your metrics board.
7. **Simulation Loop**: Swap lastly to the Admin user (`admin@seapedia.demo`). Fire the Simulation timeline module offsetting +24/72 hours. Validate that overdue non-picked packages strictly update and trigger refunds automatically.
