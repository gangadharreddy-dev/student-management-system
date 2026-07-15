# 🎓 Student Manager

<img width="1470" height="835" alt="Screenshot 2026-07-15 at 9 28 16 AM" src="https://github.com/user-attachments/assets/783141bc-f650-4533-9298-57fc7679b997" />


A premium, modern Student Management System built with **Next.js**, **Prisma**, and **Neon Serverless Postgres**. This application allows educators and administrators to manage student records, visualize status distributions, and export comprehensive reports.

🔗 **Live Application:** [https://student-management-system-eta-indol.vercel.app/](https://student-management-system-eta-indol.vercel.app/)

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

<img width="1470" height="835" alt="Screenshot 2026-07-15 at 9 28 16 AM" src="https://github.com/user-attachments/assets/8dcda08a-f469-4041-ae18-bd778853466c" />


### 🌓 Dark/Light Mode Theme

<img width="1470" height="835" alt="Screenshot 2026-07-15 at 9 28 16 AM" src="https://github.com/user-attachments/assets/c1fa9cb9-ee7f-423a-a21f-c983595afba3" />

<img width="1470" height="835" alt="Screenshot 2026-07-15 at 9 32 26 AM" src="https://github.com/user-attachments/assets/97a17ec0-57a2-425c-a590-8dd3a872a30b" />

### Add Student

<img width="1470" height="834" alt="Screenshot 2026-07-15 at 9 28 44 AM" src="https://github.com/user-attachments/assets/fc63f641-e9f6-4317-b6c5-fcb6c507a06d" />



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
