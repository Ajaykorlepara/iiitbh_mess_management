import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import MenuPage from './pages/MenuPage';
import TokenPage from './pages/TokenPage';
import RebatePage from './pages/RebatePage';
import BillingPage from './pages/BillingPage';
import FeedbackPage from './pages/FeedbackPage';
import PollsPage from './pages/PollsPage';
import NoticesPage from './pages/NoticesPage';
import AdminDashboard from './pages/AdminDashboard';
import PresentationTour from './components/PresentationTour';
import { Utensils, Heart, Shield, Code, Sparkles } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('menu');
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      
      <div>
        {/* Top Navigation */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {activeTab === 'menu' && <MenuPage />}
          {activeTab === 'tokens' && <TokenPage />}
          {activeTab === 'rebates' && <RebatePage />}
          {activeTab === 'billing' && <BillingPage />}
          {activeTab === 'feedback' && <FeedbackPage />}
          {activeTab === 'polls' && <PollsPage />}
          {activeTab === 'notices' && <NoticesPage />}
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'presentation' && <PresentationTour onJumpToTab={(tab) => setActiveTab(tab)} />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 sm:px-6 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-amber-300 font-extrabold flex items-center justify-center text-xs">
              IIIT
            </div>
            <div>
              <p className="font-bold text-slate-200">
                IIIT Bhubaneswar Hostel Mess Management System
              </p>
              <p className="text-[11px] text-slate-500">
                Internet & Web Technology (IWT) Course Project • Academic Evaluation Ready
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={() => setActiveTab('presentation')}
              className="hover:text-amber-300 transition-colors flex items-center space-x-1 text-slate-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>10-Min Video Guide</span>
            </button>
            <span>•</span>
            <span className="text-slate-400">Node.js + Express + React 18 + Tailwind</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Zero-Config Portability</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
