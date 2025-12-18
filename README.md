# GDE Portal – Frontend Technical Assessment

A modern admin dashboard built using **Next.js**, **Material-UI (MUI)**, **Zustand**, and **NextAuth**, integrating public APIs from **DummyJSON**.

This project was developed as part of the **Help Study Abroad – Frontend Technical Assessment**.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** Material-UI (MUI)
- **State Management:** Zustand
- **Authentication:** NextAuth (Credentials Provider)
- **API Source:** https://dummyjson.com/
- **Language:** TypeScript

---

## 📌 Features

### 🔐 Authentication

- Admin login using DummyJSON authentication API
- Secure authentication with NextAuth
- Token stored in Zustand (session-based)
- Protected routes for dashboard, users, and products
- Automatic redirection:
  - Authenticated users → Dashboard
  - Unauthenticated users → Login

---

### 📊 Dashboard

- Clean admin landing page
- Entry point to Users and Products sections
- Fully responsive layout using MUI

---

### 👤 Users Management

- Users list with:
  - API-side pagination
  - Search functionality
  - Responsive MUI table
- Displays:
  - Name, Email, Gender, Phone, Company
- Single user detail page with clean, structured layout
- Back navigation to users list

---

### 📦 Products Management

- Products list with:
  - API-side pagination
  - Search bar
  - Category filter dropdown
  - Responsive grid layout
- Displays:
  - Product image, title, price, category, rating
- Single product detail page with:
  - Main image and thumbnails
  - Description, price, stock, brand, rating
  - Back navigation to products list

---

## 🗂️ State Management (Zustand)

Zustand is used to manage:

- Authentication state
- Users data
- Products data

### Why Zustand?

- Lightweight with minimal boilerplate
- Built-in support for async actions
- Ideal for small to medium-sized applications
- Simpler and more concise than Redux

Zustand stores also act as a **lightweight client-side cache**, preventing unnecessary API calls when navigating between pages.

---

## ⚡ Performance Optimizations

- API-side pagination to avoid loading large datasets
- `React.memo` used for layout components (e.g., Navbar)
- `useCallback` used for event handlers (pagination, logout)
- `useMemo` used for derived values (pagination count)
- Zustand retains fetched data during navigation

These optimizations improve performance without over-engineering.

---

## 🎨 UI / UX

- Entire UI built using Material-UI components
- Consistent custom theme and typography
- Responsive layouts across:
  - Login page
  - Dashboard
  - Users list & details
  - Products list & details
- Clean, minimal, admin-focused design

---

### Why Zustand?

Zustand was chosen for state management because it provides a simple and lightweight API with minimal boilerplate. It allows defining global state and async actions in a straightforward manner without the complexity of reducers or extensive configuration.

For this project, Zustand fits well because:

- The application is small to medium in scale
- State requirements are limited to authentication, users, and products
- Async API calls can be handled directly inside the store
- It avoids the overhead and verbosity of Redux while remaining scalable

Zustand also works well alongside Next.js and NextAuth, making it easy to share state across pages while keeping the codebase clean and maintainable.

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

````bash
git clone <your-github-repo-url>
cd gde-portal

### 2️⃣ Install Dependencies

```bash
npm install

### 3️⃣ Environment Variables
- Create a .env.local file in the root directory:
```bash
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

- Generate a secure secret using:

```bash
openssl rand -base64 32

### 4️⃣ Run the Development Server
```bash
npm run dev
- Open the application in your browser:

http://localhost:3000

### 🔑 Test Login Credentials
- DummyJSON test credentials:

Username: emilys
Password: emilyspass
📂 Project Structure (High Level)
text
Copy code
src/
 ├─ app/
 │   ├─ login/
 │   ├─ dashboard/
 │   ├─ users/
 │   ├─ products/
 │   └─ page.tsx
 ├─ components/
 │   ├─ Navbar.tsx
 │   └─ ProtectedRoute.tsx
 ├─ store/
 │   ├─ usersStore.ts
 │   └─ productsStore.ts
 ---
### ⚠️ Notes / Limitations
 - This project focuses on frontend functionality as per assessment requirements.

 - No custom backend services were implemented.

 - The analytics section is intentionally minimal as it was outside the scope of the assessment.
---
### ✅ Conclusion
 - This project demonstrates:

 - Modern frontend architecture with Next.js

 - Clean state management using Zustand

 - Secure authentication with NextAuth

 - Responsive UI using Material-UI

 - Efficient API integration and performance considerations
 ---
````
