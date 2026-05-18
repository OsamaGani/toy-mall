# Talle Furniture Mart — Full E-Commerce Platform

A complete e-commerce + service-bookings website for **Talle Furniture Mart**, a Mumbai-based chair manufacturer, retailer and repair workshop. Built with React + Node.js + MongoDB.

## Features

### Customer Side
- Home page with hero carousel, chair categories, featured products, brands, best sellers, new arrivals
- Shop page with filters (category, brand, **material**, sort)
- Product detail page with image gallery, reviews, ratings, colour variants
- Shopping cart (persists in localStorage)
- Checkout with saved address book + payment methods (COD or Razorpay — UPI, cards, netbanking, wallets)
- User registration & login (JWT)
- Profile management & address book
- My Orders + Order tracking
- Product reviews (logged-in users)
- Search by keyword
- **Chair Repair & Service** landing page (replaces the legacy `/action-toys` route) — surfaces hydraulic, reupholstery, wheel/base and refurbishing listings

### Admin Dashboard (custom built)
- Dashboard with revenue, orders, products, users stats + recent orders
- **Products** — full CRUD (add, edit, delete, set discount, toggle featured/best-seller/new-arrival, multi-image upload)
- **Service & Parts** — manage Talle-branded repair / spare-part listings shown on the Chair Repair page
- **Orders** — view all, filter by status, update status (pending/processing/shipped/delivered/cancelled), delete
- **Users** — view all, toggle admin role, delete
- **Categories** — full CRUD
- **Brands** — full CRUD
- Image uploads (multer / Cloudinary)

## Tech Stack

**Frontend:** React 18 · Vite · React Router · Tailwind CSS · Axios · React Hot Toast · React Icons
**Backend:** Node.js · Express · MongoDB · Mongoose · JWT · Bcrypt · Multer · Razorpay

## Project Structure

```
toy-mall/                      (folder name kept for git continuity)
├── backend/                   Node.js + Express + MongoDB API
│   ├── config/db.js
│   ├── models/                User, Product, Category, Brand, Order
│   ├── routes/                auth, products, categories, brands, orders, users, upload, payment
│   ├── middleware/auth.js     JWT + admin guard
│   ├── utils/seedData.js      Sample chair products, brands, categories
│   ├── uploads/               Local image storage
│   └── server.js
└── frontend/                  React + Vite + Tailwind
    ├── src/
    │   ├── api/axios.js
    │   ├── config/
    │   │   ├── contact.js     STORE_NAME, address, phone, social
    │   │   └── departments.js Chair department hierarchy + materials list
    │   ├── context/           AuthContext, CartContext
    │   ├── components/        Navbar, Footer, ProductCard, AdminLayout, ShopByAge (material), etc.
    │   ├── pages/             Home, Shop, ProductDetail, Cart, Checkout, Login, Register, Profile, Orders
    │   └── pages/admin/       Dashboard, Products, ProductForm, Orders, Users, Categories, Brands, Service & Parts
    └── vite.config.js
```

## Setup

### 1. Prerequisites
- Node.js 18+
- MongoDB (local install **or** free MongoDB Atlas cluster)

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env       # then edit values (Windows: copy .env.example .env)
npm run seed               # seeds demo chair products, categories, brands, admin + customer users
npm run dev                # http://localhost:5000
```

Edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tallefurnituremart
JWT_SECRET=any_long_random_string         # min 32 chars; generate with `openssl rand -hex 32`
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173

# Razorpay (Indian payment gateway) — leave blank to disable online payment.
# COD still works without these.
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev                # http://localhost:5173
```

Vite already proxies `/api` and `/uploads` to `http://localhost:5000`, so no extra config is needed.

## Demo Accounts (created by seed script)

| Role     | Email                              | Password    |
|----------|------------------------------------|-------------|
| Admin    | admin@tallefurnituremart.com       | admin123    |
| Customer | customer@tallefurnituremart.com    | customer123 |

After login as admin, click **Admin Dashboard** in the user dropdown to manage products / orders / users.

## API Reference (highlights)

| Method | Endpoint                              | Auth      | Description                       |
|--------|---------------------------------------|-----------|-----------------------------------|
| POST   | /api/auth/register                    | -         | Create new account                |
| POST   | /api/auth/login                       | -         | Login                             |
| GET    | /api/auth/me                          | User      | Current user                      |
| PUT    | /api/auth/me                          | User      | Update profile                    |
| GET    | /api/products                         | -         | List with filters (incl. `material`) |
| GET    | /api/products/:id                     | -         | Single product                    |
| POST   | /api/products                         | Admin     | Create product                    |
| PUT    | /api/products/:id                     | Admin     | Update product                    |
| DELETE | /api/products/:id                     | Admin     | Delete product                    |
| POST   | /api/products/:id/reviews             | User      | Add review                        |
| GET    | /api/categories                       | -         | List categories                   |
| POST/PUT/DELETE /api/categories       | Admin     | CRUD                              |
| GET    | /api/brands                           | -         | List brands                       |
| POST/PUT/DELETE /api/brands           | Admin     | CRUD                              |
| POST   | /api/orders                           | User      | Place order                       |
| GET    | /api/orders/myorders                  | User      | My orders                         |
| GET    | /api/orders                           | Admin     | All orders                        |
| PUT    | /api/orders/:id/status                | Admin     | Update status                     |
| GET/PUT/DELETE /api/users             | Admin     | Manage users                      |
| POST   | /api/upload                           | Admin     | Upload image                      |
| POST   | /api/payment/razorpay/create-order    | User      | Create Razorpay order             |
| POST   | /api/payment/razorpay/verify          | User      | Verify HMAC signature after pay   |
| POST   | /api/payment/razorpay/webhook         | -         | Razorpay server-to-server webhook |
| GET/POST/PUT/DELETE /api/addresses    | User      | Saved address book CRUD           |

## Razorpay (optional)

To enable online payments (UPI, cards, netbanking, wallets):
1. Sign up at https://razorpay.com
2. From the dashboard, copy your **Key ID** and **Key Secret**
3. Paste into `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env`
4. (Recommended) Add a webhook in Razorpay dashboard pointing to
   `https://YOUR-API/api/payment/razorpay/webhook`, set its secret in
   `RAZORPAY_WEBHOOK_SECRET`, and tick the `payment.captured` event
5. Restart the backend

If Razorpay isn't configured, customers can still order via Cash on Delivery.

## Production Build

```bash
cd frontend
npm run build              # outputs dist/
```

Serve `dist/` with any static host (Vercel, Netlify, Cloudflare Pages, Nginx) and point it to your deployed Express API.

## Customizing

- **Add categories/brands:** Admin → Categories / Brands → Add
- **Add chairs:** Admin → Products → Add Product (uploads images, sets discount, marks featured/best-seller/new-arrival, picks material)
- **Add service items:** Admin → Service & Parts → Add Service Item (auto-tagged with brand=Talle, surfaces on the Chair Repair page)
- **Branding:** edit `frontend/src/config/contact.js` (store name, address, phones, emails), `frontend/tailwind.config.js` (`primary` color), and the logo text in `Navbar.jsx` / `Footer.jsx`
- **Hero slides:** edit `heroSlides` array in `frontend/src/pages/Home.jsx`
- **Department hierarchy / materials list:** edit `frontend/src/config/departments.js`

## License

Built for educational/personal commercial use. All chairs are seeded under the in-house Talle brand (own manufacturing — no resold third-party stock). Client company names shown in the "Our Clients" sections (WeWork, Roller Bearing, Upstep Academy, Respo Financial, etc.) should be replaced with the real customer list before going fully public.
