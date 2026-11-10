import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  AlertTriangle,
  User,
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TokenPage() {
  const { currentUser } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState('Lunch');
  const [token, setToken] = useState(null);
  const [tokensHistory, setTokensHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const fetchTokens = async () => {
    if (!currentUser?.id) return;
    try {
      const res = await fetch(`/api/tokens/student/${currentUser.id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTokensHistory(data);
        const match = data.find(t => t.mealType.toLowerCase() === selectedMeal.toLowerCase());
        if (match) setToken(match);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [currentUser, selectedMeal]);

  const handleGenerateToken = async () => {
    if (!currentUser?.id) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/tokens/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser.id,
          mealType: selectedMeal,
          date: new Date().toISOString().split('T')[0]
        })
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        fetchTokens();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateScan = async () => {
    if (!token?.tokenCode) return;
    try {
      const res = await fetch('/api/tokens/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenCode: token.tokenCode,
          scannerName: "Central Mess 1 - Gate Turnstile A"
        })
      });
      const data = await res.json();
      setScanResult(data);

      if (data.success) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
        fetchTokens();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const meals = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title & Explainer */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
            <QrCode className="w-4 h-4" />
            <span>Digital Gate Entry Pass</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Anti-Proxy Meal Token Pass
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Present this dynamic QR code at the mess counter scanner for automated headcount and contactless check-in.
          </p>
        </div>

        {/* Meal Selector Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl space-x-1">
          {meals.map((m) => (
            <button
              key={m}
              onClick={() => {
                setSelectedMeal(m);
                setScanResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedMeal === m
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Digital Pass Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* The Digital Card */}
        <div className="md:col-span-7 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-800/50 relative overflow-hidden flex flex-col justify-between">
          
          {/* Subtle watermark / glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Card Top: Institute header */}
          <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-amber-300 text-sm shadow-md">
                IIIT
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white tracking-wide">
                  IIIT BHUBANESWAR
                </h4>
                <p className="text-[10px] text-slate-300 font-mono">HOSTEL DINING PASS • 2026</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase border ${
                token?.status === 'USED'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : token?.status === 'REBATED'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {token?.status || 'READY'}
              </span>
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="relative z-10 py-5 flex items-center space-x-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-400/40 shadow-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-extrabold text-white">{currentUser?.name}</h3>
              <p className="text-xs font-mono font-bold text-amber-300">{currentUser?.rollNumber}</p>
              <p className="text-xs text-slate-300 mt-0.5">{currentUser?.hostel} ({currentUser?.room})</p>
              <p className="text-[11px] text-blue-300 font-medium">{currentUser?.messWing}</p>
            </div>
          </div>

          {/* Dynamic QR Code Area */}
          <div className="relative z-10 bg-white rounded-2xl p-4 sm:p-5 text-slate-900 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex-shrink-0">
              {token?.tokenCode ? (
                <QRCodeSVG
                  value={token.tokenCode}
                  size={120}
                  level="H"
                  includeMargin={true}
                />
              ) : (
                <div className="w-[120px] h-[120px] flex items-center justify-center bg-slate-100 rounded-lg text-slate-400 text-xs text-center p-2">
                  Click 'Generate Pass' to create QR
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-xs font-bold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Meal Slot: {selectedMeal}</span>
              </div>
              
              <div className="text-[11px] font-mono text-slate-600 break-all bg-slate-100 p-2 rounded-lg border border-slate-200">
                {token?.tokenCode || 'TOKEN PENDING GENERATION'}
              </div>

              <p className="text-[10px] text-slate-400">
                Valid for {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Card Footer */}
          <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] text-slate-400">
            <span>Powered by SmartMess ID</span>
            <span className="font-mono text-amber-300/80">Secured Token #8941</span>
          </div>

        </div>

        {/* Right Action Panel: Simulator & Info */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Action Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Interactive Controls</span>
            </h4>

            <button
              onClick={handleGenerateToken}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{token ? 'Regenerate Dynamic Token' : 'Generate Meal Pass'}</span>
            </button>

            {token && token.status === 'ACTIVE' && (
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 mb-2">
                  For demonstration & evaluation: simulate scanning this pass at the mess gate turnstile:
                </p>
                <button
                  onClick={handleSimulateScan}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulate Gate Turnstile Scan</span>
                </button>
              </div>
            )}

            {scanResult && (
              <div className={`p-3 rounded-xl text-xs border ${
                scanResult.success 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                <div className="flex items-center space-x-1.5 font-bold mb-1">
                  {scanResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                  <span>{scanResult.code}</span>
                </div>
                <p className="text-[11px] leading-relaxed">{scanResult.message}</p>
              </div>
            )}
          </div>

          {/* Security Features Info Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h5 className="font-bold text-slate-800 text-xs flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Anti-Proxy Protection</span>
            </h5>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Each pass is bound to the student's unique Roll Number and encrypted with single-use nonce. Once scanned at the counter, it transitions immediately to <strong className="text-slate-800">USED</strong> status. If a student is on approved leave, the pass locks to <strong className="text-rose-600">REBATED</strong>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
