import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  Video, 
  Award, 
  Sparkles,
  ExternalLink,
  Layers,
  Shield,
  QrCode,
  Calendar,
  CreditCard
} from 'lucide-react';

export default function PresentationTour({ onJumpToTab }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const slides = [
    {
      title: "Slide 1: Project Title & Team Introduction",
      timeSlot: "0:00 - 1:00 (60 secs)",
      topic: "Introduction & Motivation",
      tabTarget: "menu",
      summary: "Welcome the evaluators, introduce your Roll Number and project topic: Dynamic Web Application for IIIT Bhubaneswar Mess Management System.",
      talkingPoints: [
        "Good morning/afternoon respected faculty and evaluators.",
        "My name is [Your Name], Roll Number [Your ID] from IIIT Bhubaneswar.",
        "This is my Internet & Web Technology (IWT) course project: A Full-Stack Dynamic Mess Management & Food Wastage Minimization Portal.",
        "Problem Statement: Traditional hostel mess operations rely on manual paper coupons, inaccurate meal estimations resulting in massive food wastage, delayed leave/rebate accounting, and lack of transparency in billing.",
        "Our Solution: A modern, real-time responsive web application designed specifically for the IIIT Bhubaneswar hostel community."
      ]
    },
    {
      title: "Slide 2: System Architecture & Technology Stack",
      timeSlot: "1:00 - 2:15 (75 secs)",
      topic: "Technical Architecture",
      tabTarget: "menu",
      summary: "Explain the client-server architecture, database design, and key libraries used in this project.",
      talkingPoints: [
        "Frontend: Built using React 18, Vite build tool, Tailwind CSS for collegiate UI styling, and Lucide React icons.",
        "Backend: Node.js with Express.js REST API providing scalable endpoints for authentication, menu, QR tokens, rebates, billing, and inventory.",
        "Data Persistence: Structured JSON database with relational schema integrity, atomic file persistence, and automatic seed migrations.",
        "Dynamic Features: Real-time QR Code token generation, camera-based gate scanner, instant rebate rebate calculation (₹130/day), printable digital invoice generation with verification hashes, and live meal opt-out wastage prediction.",
        "Deployment: Self-contained full-stack application deployable on Render, Vercel, or local server with a single start command."
      ]
    },
    {
      title: "Slide 3: Weekly & Daily Menu Module",
      timeSlot: "2:15 - 3:30 (75 secs)",
      topic: "Menu & Nutritional Information",
      tabTarget: "menu",
      summary: "Demonstrate the interactive daily menu, active meal countdown timer, nutritional info, and Odia campus specials.",
      talkingPoints: [
        "Dynamic Meal Window: The system automatically detects the current time and highlights the active meal (Breakfast, Lunch, Snacks, or Dinner).",
        "Weekly Day Switcher: Students can browse all 7 days of the week, switching between Odia specialties (Dalma, Puri Aloo Dum), South Indian breakfasts, and Sunday Biryani feasts.",
        "Dietary & Nutritional Breakdown: Highlights calories (kcal), Veg/Non-Veg flags, and chef's daily specials.",
        "Waste Reduction Opt-In: Students can toggle their meal attendance in advance. This gives the catering staff an exact forecasted headcount to avoid surplus cooking."
      ]
    },
    {
      title: "Slide 4: Digital Meal QR Pass & Token Verification",
      timeSlot: "3:30 - 4:45 (75 secs)",
      topic: "Anti-Proxy QR Meal Pass",
      tabTarget: "tokens",
      summary: "Showcase the dynamic QR pass generated per student with verification codes and anti-proxy security.",
      talkingPoints: [
        "Digital Meal Token: Replaces physical paper coupons with an encrypted dynamic QR code linked to the student's Roll Number and meal slot.",
        "Security & Expiry: Tokens are generated with unique serials (e.g. IIIT-MESS-20261110-L-B122045-8941) and live timestamps to prevent tampering or sharing screenshots.",
        "Rebate Guard: If a student has an approved rebate leave for today, the token automatically locks with a 'REBATED' status to prevent double-claiming meals.",
        "Live Gate Counter Feed: Demonstrates attendance marking in real time."
      ]
    },
    {
      title: "Slide 5: Automated Mess Rebate / Leave Desk",
      timeSlot: "4:45 - 6:00 (75 secs)",
      topic: "Rebate Calculation & Workflow",
      tabTarget: "rebates",
      summary: "Demonstrate leave date selection, live savings calculation, proof upload, and approval state tracking.",
      talkingPoints: [
        "Policy Compliance: IIIT Bhubaneswar mess rules mandate a minimum 3-day leave period at ₹130 per day deduction.",
        "Real-Time Calculator: As soon as the student picks the start and end dates, the app instantly calculates the total days and estimated rebate amount credited.",
        "Document Attachment: Allows attaching OD letters, hackathon approval forms, or home leave outpasses.",
        "Status Tracking: Real-time progress through PENDING, APPROVED, and REJECTED states with warden feedback."
      ]
    },
    {
      title: "Slide 6: Transparent Mess Billing & Digital Receipts",
      timeSlot: "6:00 - 7:15 (75 secs)",
      topic: "Fee Breakup & Payment Flow",
      tabTarget: "billing",
      summary: "Showcase the transparent monthly invoice, rebate adjustments, mock UPI payment, confetti celebration, and printable PDF receipt.",
      talkingPoints: [
        "Itemized Statement: Displays base mess fee, maintenance charge, extra purchases, and automatically deducts approved rebate amounts.",
        "Simulated Payment Gateway: Supports 1-click mock payment via UPI, NetBanking, or Debit Card with transaction reference generation.",
        "Digital Receipt Generator: Generates an official institute mess invoice with institution header, QR verification code, and print/PDF export capability."
      ]
    },
    {
      title: "Slide 7: Student Feedback & Menu Polls",
      timeSlot: "7:15 - 8:15 (60 secs)",
      topic: "Student Democracy & Quality Assurance",
      tabTarget: "feedback",
      summary: "Highlight student voice: multi-metric rating (Taste, Hygiene, Service), anonymous grievance submission, and democratic menu voting.",
      talkingPoints: [
        "Multi-Metric Feedback: Students rate food taste, sanitation, and staff responsiveness out of 5 stars.",
        "Two-Way Communication: Caterers can post direct responses and corrective actions taken in the mess hall.",
        "Weekend Menu Poll: Democratic voting on Sunday feast choices with real-time percentage distribution bars."
      ]
    },
    {
      title: "Slide 8: Admin & Caterer Management Console",
      timeSlot: "8:15 - 9:15 (60 secs)",
      topic: "Manager Dashboard & Live Scanner",
      tabTarget: "admin",
      summary: "Switch to Admin mode to demonstrate the camera/code QR scanner, headcount forecasts, rebate approvals, and grocery inventory tracking.",
      talkingPoints: [
        "Real-Time Analytics: Live headcount forecast, meals served today, and food waste reduction percentage.",
        "Gate QR Scanner: Mess counter staff scans student QR codes or enters tokens; prevents duplicate entries with audio/visual feedback.",
        "One-Click Rebate Processing: Wardens can review pending student leaves and approve or reject them with custom remarks.",
        "Grocery Inventory Tracker: Monitors stock levels of rice, dal, milk, and oil with automatic low-stock threshold warnings."
      ]
    },
    {
      title: "Slide 9: Conclusion, Learning Outcomes & Wrap-up",
      timeSlot: "9:15 - 10:00 (45 secs)",
      topic: "Course Rubric & Impact",
      tabTarget: "presentation",
      summary: "Conclude the presentation, highlight key IWT web concepts demonstrated, and thank the evaluators.",
      talkingPoints: [
        "Summary of Learning Outcomes: Full-stack asynchronous REST APIs, single-page reactive user interfaces, client-side state management, and real-time data synchronization.",
        "Practical Impact: Saves catering costs, reduces hostel food wastage, eliminates proxy meal claims, and provides 100% transparency for IIIT Bhubaneswar students.",
        "Thank you respected faculty and evaluators for your time! I am ready for questions."
      ]
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="space-y-6">
      
      {/* Presentation Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-blue-900/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>10-Minute Video Recording & Evaluation Assistant</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              IWT Project Presentation Walkthrough
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Use this interactive slide deck directly on screen while recording your 10-minute submission video. Follow the cue cards, timestamps, and live jump buttons below!
            </p>
          </div>

          {/* Presentation Timer */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Presentation Timer</p>
              <div className="text-xl font-mono font-extrabold text-amber-300 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(seconds)} / 10:00</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-2 rounded-lg text-white font-bold transition-colors ${
                  isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
                title={isRunning ? "Pause Timer" : "Start Timer"}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => { setIsRunning(false); setSeconds(0); }}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        
        {/* Slide Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Slide Controls & Header */}
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
              Slide {currentSlide + 1} of {slides.length} • {current.timeSlot}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {current.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onJumpToTab(current.tabTarget)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Show Live Feature on Tab</span>
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              Slide Objective & Demonstration Goal:
            </p>
            <p className="text-sm text-blue-950 font-medium">{current.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Script & Spoken Talking Points (Read clearly in your video):</span>
            </h4>
            <div className="space-y-3">
              {current.talkingPoints.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Navigation Footnotes */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: You can use OBS Studio, Loom, or Windows Xbox Game Bar (Win + Alt + R) to record.</span>
          <div className="flex space-x-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-6 h-6 rounded-md text-[11px] font-bold ${
                  currentSlide === i ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Submission Checklist Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>IWT Submission Requirements Checklist:</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Full-stack Dynamic Web Application source code</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>10-Minute Video file placed in zip folder</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Folder zipped and named by your Student ID (e.g. B122045.zip)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Uploaded to Google Drive & link shared on Google Classroom</span>
          </div>
        </div>
      </div>

    </div>
  );
}
