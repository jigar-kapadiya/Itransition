# 💊 Drug Launch Dashboard

A full-stack TypeScript project for managing and visualizing drug launch data.  
Includes an Express + Prisma + SQLite backend and a React + MUI frontend.

---

## 🧠 Overview

### **Backend**
- Built with **Express.js** and **Prisma ORM**
- Uses **SQLite** for simplicity
- Provides REST APIs for:
  - Listing drugs with pagination
  - Filtering by company
  - Fetching table configuration and company list

### **Frontend**
- Built with **Vite + React + TypeScript**
- Uses **MUI DataGrid** for tabular display
- Implements server-side pagination and filtering
- Communicates with backend via Axios

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

- **Node.js** (v18+ recommended)
- **npm** (comes with Node)

---

## 🚀 Project Setup

Clone the repository and move into the project folder:

```bash
git clone https://github.com/jigar-kapadiya/Itransition.git
```

## 🧩 Initialize the Project (first time setup)

The following command installs dependencies, generates Prisma client,
runs migrations, and seeds the database.

```bash
./init.sh
```

## ▶️ Run the Project

After initialization, start both backend and frontend servers:

```bash
./start.sh
```
