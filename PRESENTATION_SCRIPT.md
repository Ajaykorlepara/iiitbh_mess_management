# 🎬 10-Minute Video Presentation Script & Evaluation Guide
## IIIT Bhubaneswar Mess Management System — Internet & Web Technology (IWT) Project

This document provides a word-for-word talking script, slide cues, screen recording suggestions, and rubric alignment for your **10-minute project demonstration video**.

> [!TIP]
> **Built-in Presentation Mode:** You can also open the **"10-Min Video Guide"** tab right inside the running web application (`http://localhost:5000` or deployed URL) which displays an interactive timer, live slide switcher, and 1-click feature tabs!

---

## ⏱️ Video Timeline & Screen Breakdown (10 Minutes Total)

| Timestamp | Duration | Section / Feature Demonstrated | User Role Shown |
|---|---|---|---|
| **0:00 - 1:00** | 60 sec | Title, Student Intro, Problem Statement & Motivation | Student |
| **1:00 - 2:15** | 75 sec | Full-Stack Architecture, Technologies & System Flow | Architecture / Code |
| **2:15 - 3:30** | 75 sec | Live Menu, Active Meal Window & Food Waste Opt-Out | Student |
| **3:30 - 4:45** | 75 sec | Dynamic Digital QR Pass, Nonce Security & Gate Scan | Student |
| **4:45 - 6:00** | 75 sec | Automated Rebate Desk, 3-Day Policy & Savings Calculator | Student |
| **6:00 - 7:15** | 75 sec | Monthly Fee Breakdown, Simulated UPI Payment & Official Invoice | Student |
| **7:15 - 8:15** | 60 sec | Multi-Metric Feedback, Anonymous Grievances & Sunday Feast Polls | Student & Committee |
| **8:15 - 9:15** | 60 sec | Caterer Console: QR Gate Scanner, Headcount Forecast & Grocery Stock | Admin (Mr. Ramesh Mohanty) |
| **9:15 - 10:00** | 45 sec | Summary of Learning Outcomes, Deployed URL & Conclusion | Overall |

---

## 🎙️ Spoken Script (Word-for-Word by Section)

### **Part 1: Introduction & Problem Context (0:00 - 1:00)**
- **What to show on screen:** Open the Homepage with the IIIT Bhubaneswar header, current active meal badge, and student profile.
- **What to say:**
  > *"Respected Faculty and Evaluators, good morning. My name is [Your Name], Roll Number [Your ID], from the Department of Computer Science & Engineering / Information Technology at IIIT Bhubaneswar.*
  > 
  > *Today, I am proud to present my Internet & Web Technology (IWT) course project: A Full-Stack Dynamic Mess Management and Food Wastage Minimization Portal.*
  > 
  > *In collegiate institutions like IIIT Bhubaneswar, managing daily dining for over 900 hostelites across Kharavela, Brahmaputra, and Saraswati hostels involves significant challenges: manual paper coupons, proxy meal attendance, unexpected food shortages or massive kitchen wastage, delayed rebate accounting during vacations, and lack of transparency in monthly mess fees.*
  > 
  > *To resolve these issues, I designed and developed this end-to-end dynamic web application."*

---

### **Part 2: Technology Stack & Technical Architecture (1:00 - 2:15)**
- **What to show on screen:** Briefly show the project structure or codebase in VS Code / Architecture diagram.
- **What to say:**
  > *"Let us examine the technical stack behind this platform.*
  > 
  > *On the Frontend, the application is built using React 18 and Vite for fast client-side rendering, styled with Tailwind CSS following modern glassmorphism design principles, Lucide React icons, and Canvas Confetti for user engagement.*
  > 
  > *On the Backend, we have implemented an asynchronous Node.js Express REST API. The backend provides secure endpoints for role-based authentication, dynamic meal token generation, rebate processing workflows, inventory tracking, and billing records.*
  > 
  > *For Data Persistence, we designed a zero-config, portable JSON database engine with atomic read/write synchronization and automated schema migrations, ensuring 100% portability without external database installation bottlenecks.*
  > 
  > *The entire client and server are unified into a single deployable service, ready for cloud production on platforms like Render or Vercel."*

---

### **Part 3: Daily & Weekly Menu Module (2:15 - 3:30)**
- **What to show on screen:** Navigate to **"Mess Menu"** tab. Switch through days (Monday, Tuesday, Sunday), show Veg/Non-Veg filters, and toggle the "Skip Meal" button.
- **What to say:**
  > *"Let us first explore the Mess Menu module.*
  > 
  > *At the top, our dynamic system detects the current clock time and automatically flags the active serving window—for instance, currently serving Lunch between 12:30 PM and 2:30 PM, along with estimated caloric intake.*
  > 
  > *Hostelites can browse the 7-day schedule, featuring authentic local Odisha preparations such as Dalma and Puri Aloo Dum, alongside North and South Indian menus, and Sunday's Dum Biryani feast.*
  > 
  > *A unique feature here is the **Food Waste Prevention Opt-In**: students who plan to dine outside or are fasting can toggle 'Skip Meal' with one click. The kitchen team instantly receives an updated headcount forecast, significantly curtailing cooked food surplus."*

---

### **Part 4: Anti-Proxy Digital Meal Pass (3:30 - 4:45)**
- **What to show on screen:** Navigate to **"Meal QR Pass"** tab. Switch meal slots (Breakfast, Lunch, Dinner). Click **"Regenerate Dynamic Token"**, then click **"Simulate Gate Turnstile Scan"**.
- **What to say:**
  > *"Next is our Anti-Proxy Digital Meal Pass, which replaces easily counterfeited physical paper coupons.*
  > 
  > *Each student has a secure digital identity pass featuring their Roll Number, hostel room, and assigned mess wing. When they select a meal slot, the system generates an encrypted dynamic QR code with a unique timestamped serial code—such as `IIIT-MESS-20261110-L-B122045-8941`.*
  > 
  > *When this pass is presented at the mess gate scanner, the system verifies its authenticity in real time. If the student has an approved rebate leave, the token automatically locks with a 'REBATED' status to restrict unauthorized meals.*
  > 
  > *Watch as I simulate a gate scan: the pass is verified, validated as consumed, and its status immediately transitions to USED."*

---

### **Part 5: Automated Mess Rebate Desk (4:45 - 6:00)**
- **What to show on screen:** Navigate to **"Rebate Desk"** tab. Pick departure and return dates (e.g. 5 days), watch the live savings calculation update to ₹650, select leave category, and click **"Submit Rebate Request"**.
- **What to say:**
  > *"One of the greatest pain points for students is applying for mess rebate during festivals, internships, or hackathons.*
  > 
  > *According to IIIT Bhubaneswar mess regulations, students are eligible for a rebate of ₹130 per day for leaves spanning at least 3 consecutive days.*
  > 
  > *Our live Rebate Calculator dynamically computes the eligible days and financial credit the moment dates are selected. Students can select their leave category—such as Academic Official Duty or Inter-IIIT Sports Meet—attach their approval slip, and submit.*
  > 
  > *Below the form, students can monitor their application history with real-time status badges: Pending, Approved, or Rejected, along with warden remarks."*

---

### **Part 6: Transparent Monthly Billing & Digital Receipts (6:00 - 7:15)**
- **What to show on screen:** Navigate to **"Bills & Dues"** tab. Show the itemized fee statement, click **"Pay Now"**, choose UPI, confirm payment with confetti, and click **"Official Receipt"** to open the printable invoice modal.
- **What to say:**
  > *"Moving to the Billing & Accounts module.*
  > 
  > *The system generates an itemized monthly invoice displaying the base dining charge of ₹3,900, maintenance fee, extra feast add-ons, and automatically subtracts all approved rebate deductions—for example, ₹650 deducted for 5 days of approved leave.*
  > 
  > *Students can pay their dues directly through our simulated multi-channel payment gateway supporting UPI QR codes, Debit Cards, and NetBanking.*
  > 
  > *Once cleared, students can generate and download an official digital tax receipt complete with institutional seals, verified transaction reference, and a scannable verification QR code for institutional recordkeeping."*

---

### **Part 7: Student Feedback & Menu Polls (7:15 - 8:15)**
- **What to show on screen:** Navigate to **"Feedback"** tab, submit a 5-star review, toggle Anonymous mode. Then switch to **"Feast Polls"** tab and cast a vote on the Sunday special menu.
- **What to say:**
  > *"To ensure democratic student participation and continuous catering quality, we built two community-driven modules.*
  > 
  > *In the **Feedback** desk, students rate meals out of 5 stars across Food Quality, Cleanliness, and Service Speed, with the option to post anonymously. Caterers and the Mess Committee can respond directly with corrective actions taken.*
  > 
  > *In the **Feast Polls** section, hostelites democratically vote on Sunday gala menus and festive feasts, with live percentage distribution bars reflecting community consensus."*

---

### **Part 8: Caterer & Chief Warden Management Console (8:15 - 9:15)**
- **What to show on screen:** Open the user menu, click **"Mr. Ramesh Mohanty (Caterer Head / Admin)"**, navigate to **"Caterer Desk"**. Demonstrate the Gate QR Scanner with a token code, approve a pending rebate, and restock an inventory commodity.
- **What to say:**
  > *"Now let us switch to the Administrator / Caterer perspective.*
  > 
  > *The Chief Warden and Catering Management Console provides a 360-degree operational overview: live student headcount, meals served today, and food waste reduction statistics—currently showing a 24.8% drop in food wastage, saving over ₹18,000 this week.*
  > 
  > *At the Gate Scanner, staff can enter or scan tokens to immediately view student identity and grant meal clearance while preventing duplicate entries.*
  > 
  > *In the Rebate Desk, the warden can inspect pending requests and approve them with one click, automatically updating student ledgers.*
  > 
  > *Finally, the Grocery Inventory Tracker monitors staples like Basmati Rice, Milk, and Dal, alerting staff with 'Low Stock' warnings to ensure continuous supply."*

---

### **Part 9: Conclusion & Deployed URL Verification (9:15 - 10:00)**
- **What to show on screen:** Show the live deployed URL running in browser, review the submission package, and conclude.
- **What to say:**
  > *"In conclusion, this project demonstrates key Internet & Web Technology principles: full-stack REST API development, component-driven reactive UI design, client-side state synchronization, real-time data validation, and responsive mobile-first architecture.*
  > 
  > *The application has been deployed live to the cloud and is accessible at the URL provided in our submission for your interactive evaluation.*
  > 
  > *Thank you respected faculty and evaluators for your attention. I am now open to questions."*

---

## 🛠️ Recording Tips (For Best Quality & Full Marks)

1. **Resolution:** Record at `1920x1080` (1080p) 30fps.
2. **Recommended Free Tools:**
   - **Windows Xbox Game Bar:** Press `Win + Alt + R` to instantly start recording screen and microphone without installing software.
   - **OBS Studio:** Free, open-source, allows adding your webcam in the corner.
   - **Loom / Google Meet:** Record a self-meeting and download the MP4.
3. **Audio:** Use earphones or a quiet room so your voice is crisp and clear.
4. **Pacing:** Aim for 9 minutes 30 seconds to 10 minutes total duration.
5. **File Location:** Once recorded, save the MP4 into the `Video/` folder inside your submission zip!
