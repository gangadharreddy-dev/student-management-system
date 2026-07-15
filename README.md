# 🎓 Student Manager

A premium, modern Student Management System built with **Next.js**, **Prisma**, and **Neon Serverless Postgres**. This application allows educators and administrators to manage student records, visualize status distributions, and export comprehensive reports.

---

## 🚀 Features

- **Dynamic Dashboard:** Real-time statistics showing total, active, inactive, and graduated student counts.
- **Advanced Data Table:** Search, sort, and filter student records by status or course instantly.
- **Excel/CSV Export:** Download a complete Excel-compatible summary report containing total stats and detailed student records with one click.
- **Theme Toggle:** Smoothly switch between beautiful Light and Dark modes.
- **Complete CRUD:** Easy-to-use forms for adding, viewing, editing, and deleting student details.
- **Modern UI:** Premium design with glassmorphism, responsive grids, and micro-animations.

---

## 📸 Screenshots

*Below are placeholders where you can add your application screenshots:*

### 🖥️ Dashboard & Student List
<!-- Replace the URL below with your actual screenshot path once uploaded -->
![Dashboard Screenshot](https://via.placeholder.com/1200x600/1e293b/ffffff?text=Dashboard+Overview+and+Student+Table)

### 🌓 Dark/Light Mode Theme
<!-- Replace the URL below with your actual screenshot path once uploaded -->
![Theme Toggle Demonstration](https://via.placeholder.com/1200x600/0f172a/ffffff?text=Light+and+Dark+Mode+Comparison)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Database ORM:** Prisma ORM
- **Database Engine:** PostgreSQL (hosted on [Neon](https://neon.tech))
- **Styles:** Custom Vanilla CSS with modern custom properties

---

## ⚙️ Getting Started

Follow these steps to get a local copy of the project up and running:

### 1. Prerequisites

Make sure you have Node.js (v18+) and npm/yarn installed.

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/gangadharreddy-dev/student-management-system.git
cd student-management-system
npm install
```

### 3. Database & Environment Setup

Create a `.env` file in the root directory and add your connection string:

```env
DATABASE_URL="your-postgresql-database-connection-url"
```

Sync your database schema and generate the Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

### 4. Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Deployment

This application is ready to be deployed on **Vercel**:

1. Push your code to your GitHub repository.
2. Import the project into Vercel.
3. Configure the `DATABASE_URL` environment variable in the Vercel project settings.
4. Vercel will automatically build and deploy the app!
