# 🔬 STEM Pulse

> **A Centralized Hub for University STEM Resource Access & Management**

**STEM Pulse** is a modern web application designed to streamline the management and booking of university laboratory resources. From high-tech physics labs to molecular biology stations, STEM Pulse connects students with the tools they need, ensuring safety compliance and optimizing resource utilization.

Powered by **Next.js**, **Supabase**, and **Google Gemini AI**, this platform offers a seamless experience for browsing, booking, and even generating experiment ideas for available equipment.

---

## ✨ Key Features

### 🔐 **Secure Authentication**
* Robust user registration and login system.
* Protected routes ensuring only authorized students/researchers access the dashboard and booking capabilities.
* Powered by **Supabase Auth**.

### 🧪 **Resource Catalog**
* Browse a comprehensive list of available facilities (Physics Labs, Makerspaces, Computer Labs, etc.).
* View detailed specifications, location, capacity, and equipment lists for each room.
* Real-time availability status.

### 📅 **Smart Booking System**
* **Conflict Detection:** Automatically prevents double-booking of resources.
* **Operating Hours Validation:** Ensures bookings are made only during facility opening hours.
* **Dashboard Management:** View upcoming and active reservations in a personalized user dashboard.

### 🤖 **AI Experiment Assistant**
* Integrated **Google Gemini AI** features.
* Generates unique, educational experiment suggestions based on the specific equipment available in a selected room.
* Provides objectives, steps, and expected outcomes for student projects.

### 🛡️ **Safety & Compliance**
* Displays specific safety guidelines (e.g., "Lab coat required", "High Voltage Safety") for each resource.
* Differentiates between general Lab guidelines and specific Equipment protocols.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL)
* **AI Integration:** [Google Generative AI SDK](https://ai.google.dev/) (Gemini Flash Model)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

---

## 🚀 Getting Started

Follow these instructions to set up the project.

### Instructions

```bash
cd .\mmu-stem-fun-carnival-main\

npm install

npm run dev

open link http://localhost:3000

🔑 Login Details
Use the following credentials to access the system:

Email: user@gg.com

Password: 123456
```

## 📖 Usage Guide

1.  **Landing Page:** Visit the home page to see a grid of all featured rooms and labs.
2.  **Registration:** Click "Register" to create a student account.
3.  **Dashboard:** Once logged in, you will be redirected to the Dashboard. Here you can see:
    * Stats on available resources.
    * Your upcoming reservations.
    * Featured/Popular rooms.
4.  **Booking a Room:**
    * Select a room from the catalog.
    * Read the **Safety Guidelines**.
    * Use the **AI Assistant** to get project ideas.
    * Fill out the **Booking Form** (Date, Start Time, Duration).
    * The system will confirm if the slot is free.
5.  **My Reservations:** Navigate to the "Reservations" tab to view your booking history and details.

---
