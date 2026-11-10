import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data with authentic IIIT Bhubaneswar context
const initialSeedData = {
  users: [
    {
      id: "usr_student_1",
      rollNumber: "B423032",
      name: "Ajay Korlepara",
      email: "b423032@iiit-bh.ac.in",
      role: "student",
      phone: "+91 98765 43210",
      hostel: "Kharavela Hostel (KHR-A)",
      room: "A-204",
      messWing: "Central Mess 1",
      dietaryPreference: "Non-Veg",
      walletBalance: 450,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "usr_student_2",
      rollNumber: "B122012",
      name: "Priya Sharma",
      email: "b122012@iiit-bh.ac.in",
      role: "student",
      phone: "+91 98111 22334",
      hostel: "Saraswati Hostel (SR-B)",
      room: "B-108",
      messWing: "Central Mess 2",
      dietaryPreference: "Veg",
      walletBalance: 820,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "usr_student_3",
      rollNumber: "B122088",
      name: "Rohan Das",
      email: "b122088@iiit-bh.ac.in",
      role: "student",
      phone: "+91 97000 88991",
      hostel: "Brahmaputra Hostel (BR-C)",
      room: "C-312",
      messWing: "Central Mess 1",
      dietaryPreference: "Non-Veg",
      walletBalance: 150,
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "usr_admin_1",
      rollNumber: "ADMIN01",
      name: "Mr. Ramesh Mohanty",
      email: "mess.manager@iiit-bh.ac.in",
      role: "admin",
      phone: "+91 94370 12345",
      hostel: "Staff Quarters Q-4",
      room: "HQ-01",
      messWing: "All Mess Wings",
      dietaryPreference: "N/A",
      designation: "Chief Mess Warden & Caterer Head (Annapurna Caterers)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "usr_committee_1",
      rollNumber: "B121005",
      name: "Sneha Patel",
      email: "mess.secy@iiit-bh.ac.in",
      role: "committee",
      phone: "+91 93300 44556",
      hostel: "Kalpana Chawla Hostel (KC-A)",
      room: "A-402",
      messWing: "Central Mess 2",
      dietaryPreference: "Veg",
      designation: "Student Mess Secretary (SAC IIIT-BH)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ],
  weeklyMenu: {
    Monday: {
      breakfast: {
        items: ["Masala Idli & Crispy Vada", "Coconut Chutney", "Hot Sambhar", "Bread-Butter-Jam", "Tea / Coffee"],
        timings: "07:30 AM - 09:30 AM",
        calories: 420,
        type: "Veg",
        highlight: "Fresh South Indian Breakfast"
      },
      lunch: {
        items: ["Steamed Rice & Jeera Rice", "Yellow Dal Tadka", "Aloo Gobi Matar", "Dahi / Boondi Raita", "Papad & Fresh Green Salad", "Special: Paneer Butter Masala (Veg) / Egg Curry (Non-Veg)"],
        timings: "12:30 PM - 02:30 PM",
        calories: 780,
        type: "Mixed",
        highlight: "Paneer / Egg Curry Special"
      },
      snacks: {
        items: ["Crispy Veg Cutlet (2 pcs)", "Green Mint Chutney & Tomato Sauce", "Ginger Kadak Chai", "Coffee"],
        timings: "05:00 PM - 06:15 PM",
        calories: 260,
        type: "Veg",
        highlight: "Hot Chai & Cutlet"
      },
      dinner: {
        items: ["Phulka Roti / Tawa Paratha", "Mix Veg Subzi", "Dal Makhani", "Steamed Basmati Rice", "Sev Tamatar Ki Subzi", "Dessert: Hot Gulab Jamun (2 pcs)"],
        timings: "07:45 PM - 09:45 PM",
        calories: 710,
        type: "Veg",
        highlight: "Gulab Jamun Sweet Night"
      }
    },
    Tuesday: {
      breakfast: {
        items: ["Puri & Aloo Dum (Odia Style)", "Sprouted Moong Salad", "Banana / Boiled Egg", "Chai / Milk"],
        timings: "07:30 AM - 09:30 AM",
        calories: 480,
        type: "Mixed",
        highlight: "Authentic Puri & Aloo Dum"
      },
      lunch: {
        items: ["Basmati Rice", "Odisha Style Dalma", "Bhindi Do Pyaza", "Dahi Baigana", "Roti", "Roasted Papad & Salad"],
        timings: "12:30 PM - 02:30 PM",
        calories: 720,
        type: "Veg",
        highlight: "Traditional Odia Dalma Feast"
      },
      snacks: {
        items: ["Poha with Roasted Peanuts & Sev", "Green Chilli Pickle", "Tea / Black Coffee"],
        timings: "05:00 PM - 06:15 PM",
        calories: 230,
        type: "Veg",
        highlight: "Light Healthy Indori Poha"
      },
      dinner: {
        items: ["Butter Naan / Tandoori Roti", "Paneer Kadhai (Veg)", "Chicken Kassa (Non-Veg)", "Jeera Rice", "Moong Dal", "Sweet: Suji Ka Halwa"],
        timings: "07:45 PM - 09:45 PM",
        calories: 820,
        type: "Mixed",
        highlight: "Tuesday Non-Veg / Paneer Special"
      }
    },
    Wednesday: {
      breakfast: {
        items: ["Uttapam with Onion & Tomato", "Sambar & Podi Chutney", "Boiled Egg (2) / Fresh Fruit", "Tea / Coffee"],
        timings: "07:30 AM - 09:30 AM",
        calories: 410,
        type: "Mixed",
        highlight: "Fluffy Uttapam"
      },
      lunch: {
        items: ["Lemon Rice / Plain Rice", "Chana Dal Fry", "Aloo Baingan Bhaja", "Curd / Buttermilk", "Papad & Pickle"],
        timings: "12:30 PM - 02:30 PM",
        calories: 690,
        type: "Veg",
        highlight: "Tangy Lemon Rice & Buttermilk"
      },
      snacks: {
        items: ["Samosa with Sweet Tamarind & Green Chutney", "Hot Masala Chai"],
        timings: "05:00 PM - 06:15 PM",
        calories: 290,
        type: "Veg",
        highlight: "IIIT Campus Hot Samosas"
      },
      dinner: {
        items: ["Chapati / Roti", "Rajma Masala (Punjabi Style)", "Jeera Rice", "Karela Crispy Fry", "Kheer / Payasam"],
        timings: "07:45 PM - 09:45 PM",
        calories: 750,
        type: "Veg",
        highlight: "Classic Rajma Chawal & Kheer"
      }
    },
    Thursday: {
      breakfast: {
        items: ["Aloo Paratha with Curd & Pickle", "Cornflakes with Warm Milk", "Tea / Coffee"],
        timings: "07:30 AM - 09:30 AM",
        calories: 510,
        type: "Veg",
        highlight: "Desi Ghee Aloo Paratha"
      },
      lunch: {
        items: ["Steamed Rice", "Kadhi Pakora", "Aloo Beans Poriyal", "Plain Dal", "Cucumber Salad & Fryums"],
        timings: "12:30 PM - 02:30 PM",
        calories: 700,
        type: "Veg",
        highlight: "Dahi Kadhi Pakora"
      },
      snacks: {
        items: ["Veg Grilled Sandwich", "Potato Wafers", "Tea / Lemon Iced Tea"],
        timings: "05:00 PM - 06:15 PM",
        calories: 280,
        type: "Veg",
        highlight: "Club Grilled Sandwich"
      },
      dinner: {
        items: ["Tawa Roti", "Matar Paneer", "Dal Tadka", "Fried Rice", "Ice Cream Cup (Amul Vanilla/Butterscotch)"],
        timings: "07:45 PM - 09:45 PM",
        calories: 760,
        type: "Veg",
        highlight: "Thursday Ice Cream Special"
      }
    },
    Friday: {
      breakfast: {
        items: ["Medu Vada & Upma", "Coconut & Tomato Chutney", "Boiled Egg / Banana", "Filter Coffee / Tea"],
        timings: "07:30 AM - 09:30 AM",
        calories: 440,
        type: "Mixed",
        highlight: "South Indian Medu Vada"
      },
      lunch: {
        items: ["Steamed Rice", "Sambhar & Rasam", "Fish Curry (Rohu / Katla - Non Veg)", "Paneer Do Pyaza (Veg)", "Mix Veg Kurma", "Papad"],
        timings: "12:30 PM - 02:30 PM",
        calories: 810,
        type: "Mixed",
        highlight: "Coastal Odisha Fish Curry Special"
      },
      snacks: {
        items: ["Sweet Corn Chaat & Masala Peanuts", "Tea / Green Tea"],
        timings: "05:00 PM - 06:15 PM",
        calories: 210,
        type: "Veg",
        highlight: "Healthy Corn Chaat"
      },
      dinner: {
        items: ["Phulka Roti", "Dal Makhani", "Egg Bhurji / Soya Chaap Masala", "Jeera Pulao", "Rasgulla (2 pcs)"],
        timings: "07:45 PM - 09:45 PM",
        calories: 770,
        type: "Mixed",
        highlight: "Odia Spongy Rasgulla"
      }
    },
    Saturday: {
      breakfast: {
        items: ["Chole Bhature / Bhatura", "Pickled Onion & Green Chillies", "Lassi / Sweet Tea"],
        timings: "07:30 AM - 09:30 AM",
        calories: 590,
        type: "Veg",
        highlight: "Weekend Chole Bhature Feast"
      },
      lunch: {
        items: ["Kashmiri Pulao / Plain Rice", "Rajma", "Aloo Palak", "Raita", "Roti", "Salad & Pickle"],
        timings: "12:30 PM - 02:30 PM",
        calories: 740,
        type: "Veg",
        highlight: "Kashmiri Pulao Lunch"
      },
      snacks: {
        items: ["Chowmein / Veg Hakka Noodles", "Chilli Garlic Sauce", "Tea / Coffee"],
        timings: "05:00 PM - 06:15 PM",
        calories: 310,
        type: "Veg",
        highlight: "Desi Chinese Evening"
      },
      dinner: {
        items: ["Rumali Roti / Tawa Roti", "Butter Chicken (Non-Veg) / Shahi Paneer (Veg)", "Jeera Rice", "Dal Fry", "Custard Fruit Salad"],
        timings: "07:45 PM - 09:45 PM",
        calories: 840,
        type: "Mixed",
        highlight: "Saturday Night Royal Feast"
      }
    },
    Sunday: {
      breakfast: {
        items: ["Masala Dosa with Sambar & Two Chutneys", "Boiled Eggs (2) / Fruits", "Special Filter Coffee / Tea"],
        timings: "08:00 AM - 10:00 AM",
        calories: 460,
        type: "Mixed",
        highlight: "Crispy Golden Masala Dosa"
      },
      lunch: {
        items: ["Special Hyderabadi Dum Biryani (Chicken Biryani for Non-Veg / Veg Paneer Biryani for Veg)", "Mirchi Ka Salan", "Burani Raita", "Salad & Papad", "Dessert: Shahi Tukda"],
        timings: "12:30 PM - 02:45 PM",
        calories: 920,
        type: "Mixed",
        highlight: "Grand Sunday Biryani Feast"
      },
      snacks: {
        items: ["Biscuit & Hot Tea / Coffee", "Campus Evening Snacks"],
        timings: "05:00 PM - 06:15 PM",
        calories: 180,
        type: "Veg",
        highlight: "Sunday Evening Chill"
      },
      dinner: {
        items: ["Khichdi & Roasted Papad", "Tomato Chutney", "Aloo Chokha / Baingan Bharta", "Mixed Veg Fry", "Light Warm Milk with Turmeric"],
        timings: "07:45 PM - 09:30 PM",
        calories: 550,
        type: "Veg",
        highlight: "Light Sunday Comfort Dinner"
      }
    }
  },
  mealTokens: [
    {
      id: "tok_101",
      tokenCode: "IIIT-MESS-20261110-L-B423032-8941",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      hostel: "Kharavela Hostel (KHR-A)",
      mealType: "Lunch",
      date: "2026-11-10",
      status: "ACTIVE",
      generatedAt: "2026-11-10T11:45:00.000Z",
      scannedAt: null,
      scannedBy: null
    },
    {
      id: "tok_102",
      tokenCode: "IIIT-MESS-20261110-B-B423032-3129",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      hostel: "Kharavela Hostel (KHR-A)",
      mealType: "Breakfast",
      date: "2026-11-10",
      status: "USED",
      generatedAt: "2026-11-10T07:40:00.000Z",
      scannedAt: "2026-11-10T08:15:22.000Z",
      scannedBy: "Counter 2 - Central Mess 1"
    },
    {
      id: "tok_103",
      tokenCode: "IIIT-MESS-20261110-L-B122012-4411",
      studentId: "usr_student_2",
      rollNumber: "B122012",
      studentName: "Priya Sharma",
      hostel: "Saraswati Hostel (SR-B)",
      mealType: "Lunch",
      date: "2026-11-10",
      status: "ACTIVE",
      generatedAt: "2026-11-10T12:05:00.000Z",
      scannedAt: null,
      scannedBy: null
    }
  ],
  rebateRequests: [
    {
      id: "reb_201",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      hostel: "Kharavela Hostel (KHR-A)",
      roomNumber: "A-204",
      startDate: "2026-11-15",
      endDate: "2026-11-19",
      totalDays: 5,
      ratePerDay: 130,
      totalRebateAmount: 650,
      reason: "Attending Smart India Hackathon Grand Finale at IIT Roorkee",
      leaveCategory: "Academic / Official Duty",
      proofDocName: "SIH_Finalist_Letter.pdf",
      status: "APPROVED",
      appliedAt: "2026-11-05T10:30:00.000Z",
      reviewedAt: "2026-11-06T14:20:00.000Z",
      reviewedBy: "Chief Mess Warden Mr. Ramesh Mohanty",
      reviewRemarks: "Approved with OD letter. ₹650 adjusted in next mess invoice."
    },
    {
      id: "reb_202",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      hostel: "Kharavela Hostel (KHR-A)",
      roomNumber: "A-204",
      startDate: "2026-11-26",
      endDate: "2026-11-29",
      totalDays: 4,
      ratePerDay: 130,
      totalRebateAmount: 520,
      reason: "Family wedding at hometown (Bhubaneswar to Rourkela)",
      leaveCategory: "Personal / Home Visit",
      proofDocName: "Hostel_Outpass_Slip.pdf",
      status: "PENDING",
      appliedAt: "2026-11-09T18:10:00.000Z",
      reviewedAt: null,
      reviewedBy: null,
      reviewRemarks: null
    },
    {
      id: "reb_203",
      studentId: "usr_student_3",
      rollNumber: "B122088",
      studentName: "Rohan Das",
      hostel: "Brahmaputra Hostel (BR-C)",
      roomNumber: "C-312",
      startDate: "2026-11-12",
      endDate: "2026-11-16",
      totalDays: 5,
      ratePerDay: 130,
      totalRebateAmount: 650,
      reason: "Inter-IIIT Sports Meet at IIIT Allahabad (Basketball Team)",
      leaveCategory: "Sports / Official Duty",
      proofDocName: "Sports_OD_Letter.pdf",
      status: "APPROVED",
      appliedAt: "2026-11-07T09:15:00.000Z",
      reviewedAt: "2026-11-08T11:00:00.000Z",
      reviewedBy: "Chief Mess Warden Mr. Ramesh Mohanty",
      reviewRemarks: "Verified by Sports Officer. Approved."
    }
  ],
  feedback: [
    {
      id: "fb_301",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      mealType: "Lunch",
      date: "2026-11-09",
      ratingFood: 5,
      ratingHygiene: 4,
      ratingService: 5,
      overallRating: 4.7,
      category: "Food Quality",
      comment: "The Paneer Butter Masala was rich and tasty! Portion size was very generous. Keep up the standard.",
      isAnonymous: false,
      status: "RESOLVED",
      adminReply: "Thank you Ajay! Our head chef was notified. We will maintain this quality across all shifts.",
      createdAt: "2026-11-09T14:10:00.000Z"
    },
    {
      id: "fb_302",
      studentId: "usr_student_2",
      rollNumber: "B122012",
      studentName: "Priya Sharma",
      mealType: "Breakfast",
      date: "2026-11-10",
      ratingFood: 4,
      ratingHygiene: 5,
      ratingService: 4,
      overallRating: 4.3,
      category: "Hygiene",
      comment: "Dining tables and cutlery were properly sanitized. Would love if sambar had slightly less spice.",
      isAnonymous: false,
      status: "RESOLVED",
      adminReply: "Noted Priya. Spices in Sambar have been recalibrated for mild South Indian profile.",
      createdAt: "2026-11-10T09:20:00.000Z"
    },
    {
      id: "fb_303",
      studentId: "usr_student_3",
      rollNumber: "B122088",
      studentName: "Anonymous Hostelite",
      mealType: "Dinner",
      date: "2026-11-08",
      ratingFood: 3,
      ratingHygiene: 4,
      ratingService: 3,
      overallRating: 3.3,
      category: "Speed & Queue",
      comment: "Chapati counter had a long queue around 8:30 PM. Please add an extra serving tray during peak hour.",
      isAnonymous: true,
      status: "INVESTIGATING",
      adminReply: "Mess committee has added a 2nd automatic chapati warmer at Counter 3 starting today.",
      createdAt: "2026-11-08T21:15:00.000Z"
    }
  ],
  bills: [
    {
      id: "bill_oct_01",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      month: "October 2026",
      billingPeriod: "01 Oct 2026 - 31 Oct 2026",
      baseFee: 3900,
      daysAttended: 27,
      rebateDays: 4,
      rebateDeduction: 520,
      extraItemsCharges: 210,
      maintenanceCharge: 150,
      netAmount: 3740,
      status: "PAID",
      paidAt: "2026-11-02T16:45:00.000Z",
      transactionId: "TXN_IIIT_9982481023",
      paymentMethod: "UPI / PhonePe"
    },
    {
      id: "bill_nov_01",
      studentId: "usr_student_1",
      rollNumber: "B423032",
      studentName: "Ajay Korlepara",
      month: "November 2026 (Current Dues)",
      billingPeriod: "01 Nov 2026 - 30 Nov 2026",
      baseFee: 3900,
      daysAttended: 10,
      rebateDays: 5,
      rebateDeduction: 650,
      extraItemsCharges: 140,
      maintenanceCharge: 150,
      netAmount: 3540,
      status: "DUE",
      dueDate: "2026-11-20",
      paidAt: null,
      transactionId: null,
      paymentMethod: null
    },
    {
      id: "bill_nov_02",
      studentId: "usr_student_2",
      rollNumber: "B122012",
      studentName: "Priya Sharma",
      month: "November 2026 (Current Dues)",
      billingPeriod: "01 Nov 2026 - 30 Nov 2026",
      baseFee: 3900,
      daysAttended: 10,
      rebateDays: 0,
      rebateDeduction: 0,
      extraItemsCharges: 80,
      maintenanceCharge: 150,
      netAmount: 4130,
      status: "PAID",
      paidAt: "2026-11-05T10:11:00.000Z",
      transactionId: "TXN_IIIT_8847120931",
      paymentMethod: "SBI NetBanking"
    }
  ],
  notices: [
    {
      id: "not_401",
      title: "Notice: Revision in Mess Timings for End-Semester Examinations",
      category: "Exam Schedule",
      content: "In view of End-Semester Examinations starting next week, Mess 1 and Mess 2 will start Breakfast early at 07:00 AM instead of 07:30 AM. Dinner will be served up to 10:15 PM to accommodate late night revision slots.",
      date: "2026-11-09",
      postedBy: "Chief Mess Warden",
      isPinned: true
    },
    {
      id: "not_402",
      title: "Diwali Special Gala Feast on 13th November",
      category: "Festival Special",
      content: "Annual Diwali Mega Feast will be hosted at Central Lawn & Mess Courtyard on Friday evening. Menu includes Special Mutton/Chicken Biryani, Paneer Lababdar, Jalebi with Rabdi, Gulab Jamun, and Mocktails. Hostelites are requested to RSVP.",
      date: "2026-11-08",
      postedBy: "Mess Committee (SAC)",
      isPinned: true
    },
    {
      id: "not_403",
      title: "Guidelines for Online Rebate Application",
      category: "Rules & Policy",
      content: "All students are reminded that rebate applications must be submitted at least 24 hours prior to departure date. Minimum leave period eligible for rebate deduction is 3 consecutive days (₹130/day credited).",
      date: "2026-11-01",
      postedBy: "Mess Administration",
      isPinned: false
    }
  ],
  inventory: [
    { id: "inv_501", name: "Basmati Rice (Superfine Grade)", category: "Grains", quantity: 1850, unit: "kg", minThreshold: 500, status: "Sufficient", lastRestocked: "2026-11-08" },
    { id: "inv_502", name: "Toor & Moong Dal", category: "Pulses", quantity: 640, unit: "kg", minThreshold: 300, status: "Sufficient", lastRestocked: "2026-11-06" },
    { id: "inv_503", name: "Amul Taaza Milk", category: "Dairy", quantity: 280, unit: "Liters", minThreshold: 150, status: "Sufficient", lastRestocked: "2026-11-10" },
    { id: "inv_504", name: "Fresh Malai Paneer", category: "Dairy", quantity: 85, unit: "kg", minThreshold: 50, status: "Sufficient", lastRestocked: "2026-11-10" },
    { id: "inv_505", name: "Fortune Refined Mustard & Soy Oil", category: "Oils", quantity: 320, unit: "Liters", minThreshold: 120, status: "Sufficient", lastRestocked: "2026-11-04" },
    { id: "inv_506", name: "Chakki Fresh Atta (Wheat Flour)", category: "Grains", quantity: 1200, unit: "kg", minThreshold: 400, status: "Sufficient", lastRestocked: "2026-11-07" },
    { id: "inv_507", name: "Onions & Potatoes", category: "Vegetables", quantity: 950, unit: "kg", minThreshold: 350, status: "Sufficient", lastRestocked: "2026-11-09" },
    { id: "inv_508", name: "Broiler Fresh Chicken", category: "Poultry", quantity: 160, unit: "kg", minThreshold: 60, status: "Sufficient", lastRestocked: "2026-11-10" }
  ],
  polls: [
    {
      id: "poll_601",
      title: "Vote: Special Sunday Dinner Choice (15th Nov)",
      description: "Cast your vote for this weekend's special dessert & main course!",
      options: [
        { id: "opt_1", text: "Hyderabadi Dum Biryani with Malai Kulfi", votes: 342 },
        { id: "opt_2", text: "Kadhai Paneer / Butter Chicken with Tandoori Butter Naan & Gulab Jamun", votes: 298 },
        { id: "opt_3", text: "South Indian Special Thali (Appam with Stew & Payasam)", votes: 94 }
      ],
      totalVotes: 734,
      expiresAt: "2026-11-13T23:59:59.000Z",
      hasVotedUserIds: ["usr_student_1"]
    }
  ],
  dailyOptIns: {
    "2026-11-10": {
      breakfast: { count: 810, optOuts: 42 },
      lunch: { count: 890, optOuts: 18 },
      snacks: { count: 760, optOuts: 94 },
      dinner: { count: 912, optOuts: 12 }
    }
  }
};

class Database {
  constructor() {
    this.filePath = DB_FILE;
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileContent);
      } else {
        this.saveData(initialSeedData);
        return JSON.parse(JSON.stringify(initialSeedData));
      }
    } catch (err) {
      console.error('Error loading database, resetting to seed data:', err);
      this.saveData(initialSeedData);
      return JSON.parse(JSON.stringify(initialSeedData));
    }
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error saving database:', err);
      return false;
    }
  }

  // Getters for collections
  get users() { return this.data.users; }
  get weeklyMenu() { return this.data.weeklyMenu; }
  get mealTokens() { return this.data.mealTokens; }
  get rebateRequests() { return this.data.rebateRequests; }
  get feedback() { return this.data.feedback; }
  get bills() { return this.data.bills; }
  get notices() { return this.data.notices; }
  get inventory() { return this.data.inventory; }
  get polls() { return this.data.polls; }
  get dailyOptIns() { return this.data.dailyOptIns; }

  // Helpers
  findUserByRollOrEmail(identifier) {
    const clean = identifier.trim().toLowerCase();
    return this.users.find(u => 
      u.rollNumber.toLowerCase() === clean || 
      u.email.toLowerCase() === clean ||
      u.id.toLowerCase() === clean
    );
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  // Tokens
  getOrCreateMealToken(studentId, mealType, date) {
    const user = this.findUserById(studentId);
    if (!user) return null;

    let existing = this.mealTokens.find(
      t => t.studentId === studentId && t.mealType.toLowerCase() === mealType.toLowerCase() && t.date === date
    );

    if (existing) {
      return existing;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = date.replace(/-/g, '');
    const tokenCode = `IIIT-MESS-${dateStr}-${mealType.charAt(0).toUpperCase()}-${user.rollNumber}-${randomSuffix}`;

    // Check if student has an active approved rebate covering this date
    const isRebated = this.rebateRequests.some(r => 
      r.studentId === studentId && 
      r.status === 'APPROVED' &&
      date >= r.startDate && 
      date <= r.endDate
    );

    const newToken = {
      id: `tok_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      tokenCode,
      studentId: user.id,
      rollNumber: user.rollNumber,
      studentName: user.name,
      hostel: user.hostel,
      mealType,
      date,
      status: isRebated ? "REBATED" : "ACTIVE",
      generatedAt: new Date().toISOString(),
      scannedAt: null,
      scannedBy: null
    };

    this.mealTokens.unshift(newToken);
    this.saveData();
    return newToken;
  }

  scanMealToken(tokenCode, scannerName = "Mess Gate Scanner 1") {
    const token = this.mealTokens.find(t => t.tokenCode.trim() === tokenCode.trim());
    if (!token) {
      return { success: false, code: "NOT_FOUND", message: "Invalid or unrecognized Token Code." };
    }

    if (token.status === "USED") {
      return { 
        success: false, 
        code: "ALREADY_USED", 
        message: `Token ALREADY CONSUMED on ${new Date(token.scannedAt).toLocaleTimeString()} by ${token.scannedBy}`,
        token 
      };
    }

    if (token.status === "REBATED") {
      return { 
        success: false, 
        code: "REBATED", 
        message: `Student has an APPROVED REBATE LEAVE for this period. Meal access restricted.`,
        token 
      };
    }

    token.status = "USED";
    token.scannedAt = new Date().toISOString();
    token.scannedBy = scannerName;
    this.saveData();

    return { 
      success: true, 
      code: "SUCCESS", 
      message: `Meal Token verified successfully! Meal Approved for ${token.studentName} (${token.rollNumber}).`,
      token 
    };
  }

  // Rebates
  createRebate(rebateData) {
    const newRebate = {
      id: `reb_${Date.now()}`,
      status: "PENDING",
      appliedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      reviewRemarks: null,
      ratePerDay: 130,
      totalRebateAmount: rebateData.totalDays * 130,
      ...rebateData
    };
    this.rebateRequests.unshift(newRebate);
    this.saveData();
    return newRebate;
  }

  updateRebateStatus(rebateId, status, reviewerName, remarks) {
    const rebate = this.rebateRequests.find(r => r.id === rebateId);
    if (!rebate) return null;
    rebate.status = status;
    rebate.reviewedAt = new Date().toISOString();
    rebate.reviewedBy = reviewerName || "Chief Mess Warden";
    rebate.reviewRemarks = remarks || (status === "APPROVED" ? "Approved and adjusted in mess dues." : "Rejected by authority.");
    this.saveData();
    return rebate;
  }

  // Feedback
  addFeedback(feedbackData) {
    const newFeedback = {
      id: `fb_${Date.now()}`,
      status: "NEW",
      createdAt: new Date().toISOString(),
      adminReply: null,
      ...feedbackData
    };
    this.feedback.unshift(newFeedback);
    this.saveData();
    return newFeedback;
  }

  replyFeedback(feedbackId, adminReply) {
    const item = this.feedback.find(f => f.id === feedbackId);
    if (!item) return null;
    item.adminReply = adminReply;
    item.status = "RESOLVED";
    this.saveData();
    return item;
  }

  // Bills
  payBill(billId, paymentMethod, transactionId) {
    const bill = this.bills.find(b => b.id === billId);
    if (!bill) return null;
    bill.status = "PAID";
    bill.paidAt = new Date().toISOString();
    bill.paymentMethod = paymentMethod || "UPI Transfer";
    bill.transactionId = transactionId || `TXN_IIIT_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    this.saveData();
    return bill;
  }

  // Menu
  updateMealItem(day, mealType, updatedFields) {
    if (!this.weeklyMenu[day] || !this.weeklyMenu[day][mealType]) {
      return null;
    }
    this.weeklyMenu[day][mealType] = {
      ...this.weeklyMenu[day][mealType],
      ...updatedFields
    };
    this.saveData();
    return this.weeklyMenu[day][mealType];
  }

  // Polls
  castVote(pollId, optionId, userId) {
    const poll = this.polls.find(p => p.id === pollId);
    if (!poll) return null;
    if (poll.hasVotedUserIds.includes(userId)) {
      return { error: "Already voted in this poll!" };
    }
    const option = poll.options.find(o => o.id === optionId);
    if (!option) return null;
    option.votes += 1;
    poll.totalVotes += 1;
    poll.hasVotedUserIds.push(userId);
    this.saveData();
    return poll;
  }

  // Notices
  addNotice(noticeData) {
    const newNotice = {
      id: `not_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
      ...noticeData
    };
    this.notices.unshift(newNotice);
    this.saveData();
    return newNotice;
  }

  deleteNotice(noticeId) {
    const idx = this.notices.findIndex(n => n.id === noticeId);
    if (idx !== -1) {
      const removed = this.notices.splice(idx, 1);
      this.saveData();
      return removed[0];
    }
    return null;
  }

  // Inventory
  updateStock(itemId, quantityChange, remarks) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return null;
    item.quantity = Math.max(0, item.quantity + quantityChange);
    item.status = item.quantity <= item.minThreshold ? "Low Stock" : "Sufficient";
    item.lastRestocked = new Date().toISOString().split('T')[0];
    this.saveData();
    return item;
  }
}

export const db = new Database();
