import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Utensils, 
  QrCode, 
  CalendarOff, 
  ReceiptIndianRupee, 
  MessageSquare, 
  Vote, 
  BellRing, 
  ShieldCheck, 
  Video, 
  UserCheck, 
  ChevronDown, 
  LogOut,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { currentUser, demoUsers, switchUser, loginWithRollNumber, logout, isAdmin } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [customRoll, setCustomRoll] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    if (!customRoll.trim()) return;
    const res = await loginWithRollNumber(customRoll.trim());
    if (res.success) {
      setCustomRoll('');
      setShowUserMenu(false);
      setLoginMsg('');
    } else {
      setLoginMsg(res.error);
    }
  };

  const navItems = [
    { id: 'menu', label: 'Mess Menu', icon: Utensils },
    { id: 'tokens', label: 'Meal QR Pass', icon: QrCode },
    { id: 'rebates', label: 'Rebate Desk', icon: CalendarOff },
    { id: 'billing', label: 'Bills & Dues', icon: ReceiptIndianRupee },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'polls', label: 'Feast Polls', icon: Vote },
    { id: 'notices', label: 'Notices', icon: BellRing },
    ...(isAdmin ? [{ id: 'admin', label: 'Caterer Desk', icon: ShieldCheck, highlight: true }] : []),
    { id: 'presentation', label: '10-Min Video Guide', icon: Video, badge: 'IWT Submission' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Institute Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide text-blue-100">
              International Institute of Information Technology Bhubaneswar
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-amber-300 font-medium">
              Hostel Mess Automation & Food Wastage Prevention Portal
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <div className="flex items-center space-x-1.5 bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-700/50">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-mono text-amber-200">
                {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-800">
              IWT Academic Project
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Institute Branding */}
          <div 
            onClick={() => setActiveTab('menu')}
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">IIIT-BH</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                  MESS MGR
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Hostel Dining Services</p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Demo Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2.5 p-1.5 pl-2.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 transition-all text-left"
            >
              <div className="relative">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/30"
                />
                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  isAdmin ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser?.name || "Select User"}
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase">
                  {currentUser?.rollNumber} • {currentUser?.role}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="pb-3 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Current Active Session
                  </div>
                  <div className="flex items-center space-x-3 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{currentUser?.name}</h4>
                      <p className="text-xs text-blue-700 font-mono font-semibold">{currentUser?.rollNumber}</p>
                      <p className="text-[11px] text-slate-500">{currentUser?.hostel} ({currentUser?.room})</p>
                    </div>
                  </div>
                </div>

                {/* 1-Click Role Switcher */}
                <div className="py-2.5 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Switch Demo Profile
                    </span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium">
                      One-Click
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {demoUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u);
                          setShowUserMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                          currentUser?.id === u.id
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <UserCheck className={`w-3.5 h-3.5 ${currentUser?.id === u.id ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate max-w-[150px]">{u.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          currentUser?.id === u.id ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.role === 'admin' ? 'Caterer' : u.rollNumber}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Roll Number Login */}
                <div className="pt-2.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Enter Any Roll Number
                  </div>
                  <form onSubmit={handleCustomLogin} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. B122045 or ADMIN"
                      value={customRoll}
                      onChange={(e) => setCustomRoll(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg"
                    >
                      Login
                    </button>
                  </form>
                  {loginMsg && <p className="text-[11px] text-red-500 mt-1">{loginMsg}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50/90 overflow-x-auto py-2 px-3 flex space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : item.highlight
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
