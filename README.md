# ⚜️ Decoriva — Luxury Event Styling Platform

**Decoriva** is a modern full‑stack web platform that connects clients with professional event decorators for weddings, corporate events, and luxury home styling. The project focuses on **premium user experience**, **secure role-based workflows**, and **real-world production architecture**.

🔗 **Live:** [https://decoriva.web.app/]
🔗 **Server:** [https://decoriva-sever.vercel.app/]

Server Repo : [https://github.com/Samiul-Alam-Shanto/Decoriva-sever.git]

---

## ✨ Highlights

- Luxury, editorial-inspired UI
- Secure authentication and role-based access
- Real-time booking and workflow tracking
- Scalable backend architecture
- Production-grade payment handling

---

## 👥 User Roles & Features

### Client

- Browse and filter decoration services
- Add services to a shortlist (cart drawer)
- Book services with date and address selection
- Secure Stripe checkout
- Track order progress through a visual timeline

### Admin

- Analytics dashboard for users, bookings, and revenue
- Manage services (create, update, delete)
- Assign decorators to bookings
- Promote users to Admin or Decorator roles

### Decorator

- View assigned projects
- Update workflow status

---

## 🛠️ Technology Stack

### Frontend

- React with Vite
- Tailwind CSS and DaisyUI
- Framer Motion for animations
- TanStack Query and Context API
- React Hook Form
- React Leaflet

### Backend

- Node.js
- Express
- MongoDB (Native Driver)
- Firebase Admin SDK
- Stripe Checkout

---

## 🔐 Security

- Firebase token verification on protected routes
- Role-based access control (RBAC)
- Backend-only payment calculations
- Axios interceptors

---

## ⚙️ Local Setup

### Prerequisites

- Node.js
- MongoDB Atlas
- Firebase project
- Stripe account

### Clone Repository

```bash
git clone https://github.com/Samiul-Alam-Shanto/Decoriva-sever.git
cd decoriva-server
```

### Backend

```bash
cd server
npm install
npm start
```

Create a `.env` file in `server`:

```env
PORT=5000
DB_USER=your_db_user
DB_PASS=your_db_password
STRIPE_SECRET_KEY=sk_test_...
ACCESS_TOKEN_SECRET=
CLIENT_URL=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account"}'
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Create `.env.local` in `client`:

```env
VITE_apiKey
VITE_authDomain
VITE_projectId
VITE_storageBucket
VITE_messagingSenderId
VITE_appId
VITE_STRIPE_PK
VITE_API_URL
VITE_image_host
```

## 🧪 Demo Accounts

| Role      | Email               | Password  |
| --------- | ------------------- | --------- |
| Admin     | admin@gmail.com     | 123456Aa! |
| Decorator | decorator@gmail.com | 123456Aa! |
| User      | user@gmail.com      | 123456Aa! |

---

## 📄 License

MIT License

---

<p align="center">
  <strong>Designed & Developed By Shanto ⚜️</strong>
</p>
```
