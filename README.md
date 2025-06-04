# BonfireERP 🔥

**BonfireERP** is a modern, modular ERP system developed by **BonfireSoft**, designed to support the digital transformation of businesses across Panama and Latin America. It’s the foundation of a broader vision that includes national digital identity (Bonfire ID) and sovereign infrastructure like local datacenters.

---

## 🧩 Core Modules (v1)

- 📦 **Inventory**: Product management, movement logs, stock levels, and warehouse tracking.
- 👥 **Employee Management**: Attendance, leave tracking, work calendars, and permissions.
- 🧾 **Invoicing**: Point-of-sale interface and invoice generation from inventory.
- 💸 **Finance**: Income, expenses, receivables, payables, and profitability metrics.

Each module will have its own dedicated dashboard. The **main dashboard** consolidates key data across modules based on user permissions and access.

---

## 🧠 Key Features

- 🌙 Light and Dark Mode with orange-accented visual design  
- 🔐 Flexible permission system based on **tags**, not rigid roles  
- 📍 Multi-branch (Sucursal) support  
- 📡 Offline mode via **SQLite** for desktop/mobile  
- 🔔 Web and mobile notifications  
- 📈 Animated statistics, charts, and modular cards  
- 🤖 Codex-driven AI logic and chatbot assistant (future)  

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript + Vite  
- TailwindCSS  
- Lucide Icons  
- Framer Motion  

### Backend

- Node.js + Express  
- TypeScript  
- PostgreSQL  
- Dotenv + CORS  

> ORM layer (Prisma or Drizzle) will be decided based on final data structure.

---

## 📁 Folder Structure

BonfireERP/  
├── frontend/ # Main user interface  
├── backend/ # API server for business logic and data access  
└── README.md # Project overview and Codex reference

---

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## ✅ Current Status

- Frontend bootstrapped with Vite + Tailwind + TypeScript
- Main dashboard (DashboardPrincipal.tsx) built and modular
- Backend running with Express + TypeScript
- Module dashboards for Inventory, Invoicing, Employees, Finance
- PostgreSQL connection and ORM integration
- Authentication & access control system
- AI chatbot logic via Codex
- National digital ID integration (Bonfire ID)
- Infrastructure deployment (datacenters)

---

## 🤖 Codex Reference

📌 Codex should use `frontend/src/pages/DashboardPrincipal.tsx` as the primary design and logic reference to generate additional modules and logic.  
The file already contains interactive UI, data separation, role-based logic, and full layout structure.

---

## 🌐 Vision

BonfireERP is not just an ERP — it is the first brick in building Panama’s digital sovereignty.  
The broader vision includes:

- Bonfire ID – a national digital ID system (similar to Sweden's BankID)
- Government systems that work with trust, efficiency, and open infrastructure
- Local datacenter operations to replace dependency on foreign infrastructure
- Expansion to other Spanish-speaking nations in Latin America

---

## 👤 Author

**Alexander Gagnemyr**  
Founder of BonfireSoft  
Fullstack developer, infrastructure visionary, and digital reformist.  
Also a proud fan of Dark Souls and Cyberpunk 2077.  

_"If nobody else will fix it, I will."_