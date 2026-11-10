# 🍛 IIIT Bhubaneswar — Mess Management System (SmartMess Portal)
### Internet & Web Technology (IWT) Course Project

[![IIIT Bhubaneswar](https://img.shields.io/badge/Institute-IIIT%20Bhubaneswar-0d2b45.svg)](https://www.iiit-bh.ac.in)
[![Course](https://img.shields.io/badge/Course-Internet%20%26%20Web%20Technology%20(IWT)-1e3a8a.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%2B%20Node.js%20%2B%20Tailwind-38bdf8.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](#)

---

## 📌 Executive Overview

The **IIIT Bhubaneswar Mess Management System** is a dynamic, full-stack web application developed as an academic project for the **Internet & Web Technology (IWT)** course. It modernizes campus dining operations across **Kharavela**, **Brahmaputra**, and **Saraswati** hostels by digitizing coupon issuance, predicting daily headcount to eliminate food wastage, automating leave rebate deductions, and providing transparent itemized monthly billing with downloadable institutional receipts.

---

## 🌟 Core Modules & Key Features

### 1. 🍽️ Dynamic Daily & Weekly Menu Desk
- **Active Meal Window Detection:** Automatically identifies whether Breakfast, Lunch, Snacks, or Dinner is currently serving based on system time.
- **7-Day Menu Schedule:** Highlights Odia heritage specialties (Dalma, Puri Aloo Dum), South Indian breakfasts, and Sunday Dum Biryani feasts.
- **Caloric & Dietary Flags:** Displays estimated energy (`kcal`), Pure Veg, and Non-Veg indicators.
- **Waste Reduction Opt-In Toggle:** Students can flag `Skip Meal` in advance, feeding into live kitchen headcount forecasts to avoid surplus cooking.

### 2. 🎟️ Anti-Proxy Digital QR Meal Pass
- **Encrypted Dynamic Token Generation:** Replaces paper coupons with a time-stamped QR code bound to the student's Roll Number and assigned mess wing.
- **Rebate Guard:** Automatically locks pass to `REBATED` if the student has an approved leave active for today.
- **Instant Gate Turnstile Simulator:** Allows one-click testing of gate scanner authentication and status transition to `USED`.

### 3. 🏖️ Automated Mess Rebate Desk
- **Policy Compliance:** Built according to official institute regulations (minimum 3 consecutive leave days, ₹130/day credited).
- **Real-Time Savings Calculator:** Instantly calculates total leave days and credited monetary amount when dates are selected.
- **Supporting Document Attachment:** Allows uploading academic official duty (OD) letters or festival outpasses.
- **Status Ledger:** Real-time tracking of `PENDING`, `APPROVED`, and `REJECTED` states with warden remarks.

### 4. 💳 Monthly Billing & Digital Receipts
- **Itemized Statement:** Breakup of base dining charge (₹3,900), maintenance fees, extra coupons, and automated subtraction of approved rebate savings.
- **Simulated Payment Gateway:** Supports multi-channel clearance (UPI QR code, Debit Cards, and NetBanking) with confetti celebration.
- **Official Print/PDF Receipt:** Generates formatted institutional receipts with QR validation signatures and warden authority seals.

### 5. ⭐ Voice of Hostelites (Feedback & Grievances)
- **Multi-Metric Star Ratings:** Rates food taste, cleanliness, and service speed out of 5 stars.
- **Anonymous Grievance Mode:** Option to conceal Roll Number and identity for candid feedback.
- **Two-Way Dialogue:** Caterer and SAC Mess Committee can post direct responses and actions taken.

### 6. 🗳️ Democratic Menu Polls
- **Sunday Feast Voting:** Democratic voting for weekend desserts and festive gala dinners.
- **Live Percentage Distribution:** Visual progress bars displaying student community preferences.

### 7. 🛡️ Chief Warden & Caterer Administration Console
- **Live Operations Dashboard:** Displays campus hostelite count, meals served today, and food waste reduction percentages.
- **Mess Gate Counter QR Scanner:** Validates student tokens with audio/visual clearance feedback.
- **One-Click Rebate Processing:** Wardens can review pending student leaves and approve credits directly.
- **Pantry & Grocery Stock Tracker:** Real-time stock monitor for staples (Rice, Dal, Milk, Oil, Atta) with `Low Stock` threshold alerts.

### 8. 🎬 In-App 10-Minute Presentation Assistant
- **Built-In Presentation Mode:** Interactive slide deck with exact cues, timestamps (0:00 - 10:00), and live jump buttons to record your evaluation video directly on screen!

---

## 🏗️ Technical Architecture

```
                    ┌───────────────────────────────────┐
                    │      React 18 Single Page App     │
                    │   Vite + Tailwind CSS + Lucide    │
                    │   Canvas Confetti + QRCode.react  │
                    └─────────────────┬─────────────────┘
                                      │ REST API Calls (fetch)
                                      ▼
                    ┌───────────────────────────────────┐
                    │      Node.js + Express API        │
                    │   CORS + Static Assets Server     │
                    └─────────────────┬─────────────────┘
                                      │ Atomic Read/Write
                                      ▼
                    ┌───────────────────────────────────┐
                    │     Portable JSON Database        │
                    │   Schema Validation & Seeding     │
                    │       (server/data/db.json)       │
                    └───────────────────────────────────┘
```

---

## 🚀 Quick Start (Run Locally in 2 Minutes)

### Prerequisites
- Node.js (v18 or higher) and npm installed.

### 1. Install All Dependencies
From the repository root:
```bash
npm run install:all
```

### 2. Start Both Server & Client
```bash
npm run dev
```
- **Frontend Web UI:** `http://localhost:3000`
- **Backend API Server:** `http://localhost:5000`

### 3. Unified Production Mode (Single Port 5000)
```bash
npm run build
npm start
```
Open **`http://localhost:5000`** in your browser to test the full production build!

---

## 👥 Demo Evaluation Accounts

Switch profiles with **1-click** from the top navigation dropdown:

| Role | Name | Roll Number / ID | Hostel & Room | Highlights |
|---|---|---|---|---|
| **Student (Demo 1)** | Ajay Kumar | `B122045` | Kharavela A-204 | Non-Veg, active token, pending & approved rebates |
| **Student (Demo 2)** | Priya Sharma | `B122012` | Saraswati B-108 | Pure Veg, paid bill record |
| **Student (Demo 3)** | Rohan Das | `B122088` | Brahmaputra C-312 | Non-Veg, Inter-IIIT sports meet leave |
| **Mess Warden / Caterer** | Mr. Ramesh Mohanty | `ADMIN01` | Staff Quarters Q-4 | Full access to Gate QR Scanner, Rebate Desk & Stock |
| **Mess Secretary (SAC)** | Sneha Patel | `B121005` | Kalpana Chawla A-402 | Committee member, polls & notices editor |

> **Custom Login:** You can also enter any student ID in the dropdown (e.g. your own roll number `B122099`) to dynamically generate an account!

---

## ☁️ 1-Click Deployment Guide (Render / Railway / Vercel)

The application is structured as a self-contained full-stack project where Express automatically serves the compiled React frontend from `client/dist`.

### Deploying to Render (Recommended - Free Web Service)
1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "IIIT Bhubaneswar Mess Management System"
   git remote add origin https://github.com/Ajaykorlepara/iiitbh_mess_management.git
   git push -u origin main
   ```
2. Log into [Render.com](https://render.com) and click **"New Web Service"**.
3. Connect your GitHub repository.
4. Set the following build settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm --prefix server install && npm --prefix client install && npm --prefix client run build`
   - **Start Command:** `node server/index.js`
5. Click **"Deploy Web Service"**.
6. Render will generate a public URL (e.g. `https://iiit-bh-mess.onrender.com`). Share this URL in your Google Classroom submission!

---

## 📦 Submission Packaging Script

To generate the exact submission zip file required by your professor:

Run the PowerShell packaging script from your project root:
```bash
node package-project.js YOUR_STUDENT_ID
```
*(Example: `node package-project.js B423032`)*

This script automatically:
1. Creates a clean directory named after your ID.
2. Copies all source code (excluding heavy `node_modules` and build caches).
3. Creates a dedicated `Video/` folder for your presentation recording.
4. Compresses everything into `<YOUR_STUDENT_ID>.zip`.

---

## 📋 Course Submission Checklist

- [x] **Dynamic Full-Stack Web Application:** React + Express + JSON Database.
- [x] **Zero-Config Portability:** Runs on any machine with standard Node.js.
- [x] **10-Minute Video Script:** Complete script with timestamps in [`PRESENTATION_SCRIPT.md`](./PRESENTATION_SCRIPT.md) and in-app slide deck.
- [x] **Submission Packaging Script:** Automated PowerShell script (`package-project.ps1`).
- [ ] **Record 10-Min Video:** Record your screen following the script and place MP4 in `Video/`.
- [ ] **Upload to Google Drive:** Upload the `<ID>.zip` to Google Drive with "Anyone with link can view".
- [ ] **Submit on Google Classroom:** Paste both the Google Drive link and deployed application URL.
