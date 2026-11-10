import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  CalendarOff, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  IndianRupee,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RebatePage() {
  const { currentUser } = useAuth();
  const [rebates, setRebates] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveCategory, setLeaveCategory] = useState('Academic / Official Duty');
  const [reason, setReason] = useState('');
  const [proofDocName, setProofDocName] = useState('Outpass_Permit.pdf');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRebates = async () => {
    if (!currentUser?.id) return;
    try {
      const res = await fetch(`/api/rebates?studentId=${currentUser.id}`);
      const data = await res.json();
      if (Array.isArray(data)) setRebates(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRebates();
  }, [currentUser]);

  // Live calculation of leave days and estimated rebate amount
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (e < s) return 0;
    const diffTime = e.getTime() - s.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalDays = calculateDays();
  const estimatedSavings = totalDays * 130;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (totalDays < 3) {
      setErrorMsg('IIIT-BH Rebate Policy requires a minimum of 3 consecutive leave days.');
      return;
    }

    if (!reason.trim()) {
      setErrorMsg('Please state the reason for leave.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/rebates/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser.id,
          startDate,
          endDate,
          reason,
          leaveCategory,
          proofDocName
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Rebate request for ${totalDays} days (₹${estimatedSavings}) submitted successfully!`);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
        setReason('');
        setStartDate('');
        setEndDate('');
        fetchRebates();
      } else {
        setErrorMsg(data.error || 'Failed to submit rebate');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Policy Summary Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
            <CalendarOff className="w-3.5 h-3.5 text-amber-400" />
            <span>IIIT Bhubaneswar Hostel Rebate Rules</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Mess Rebate & Leave Application Desk
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            Save on monthly hostel mess charges when traveling home, participating in official hackathons, sports meets, or approved academic leave.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs space-y-1">
          <p className="text-amber-300 font-bold flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Credit Rate: ₹130 / Day</span>
          </p>
          <p className="text-slate-300">Min. Leave Period: 3 Consecutive Days</p>
          <p className="text-slate-300">Prior Notice: At least 24 Hours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Application Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-1 flex items-center space-x-2">
            <span>Apply For New Rebate</span>
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Fill in your departure and return dates to calculate savings and submit for warden approval.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Date Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leave Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leave End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Live Calculation Pill */}
            {totalDays > 0 && (
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                totalDays >= 3 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div>
                  <span className="font-bold text-xs">
                    {totalDays} Day{totalDays > 1 ? 's' : ''} Selected
                  </span>
                  <p className="text-[11px] opacity-80">
                    {totalDays >= 3 ? 'Eligible for mess fee deduction' : 'Needs minimum 3 days for rebate'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold">₹{estimatedSavings}</span>
                  <p className="text-[10px] font-semibold">Credited to Bill</p>
                </div>
              </div>
            )}

            {/* Leave Category */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Leave Category</label>
              <select
                value={leaveCategory}
                onChange={(e) => setLeaveCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Academic / Official Duty">Academic / Official Duty (OD)</option>
                <option value="Personal / Home Visit">Personal / Home Visit</option>
                <option value="Sports / Fest Representative">Sports / Fest Representative</option>
                <option value="Medical Leave">Medical Leave (Doctor Certificate)</option>
                <option value="Internship / Training">Internship / Placement Drive</option>
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Reason & Destination</label>
              <textarea
                rows={3}
                placeholder="e.g. Attending Grand Finale of Smart India Hackathon at IIT Roorkee with college team."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Proof Attachment */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Supporting Document Proof</label>
              <div className="flex items-center space-x-2 p-2 border border-dashed border-slate-300 rounded-xl bg-slate-50">
                <Upload className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-slate-600 font-mono text-[11px] truncate flex-1">{proofDocName}</span>
                <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Attached</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Rebate Request'}
            </button>

          </form>
        </div>

        {/* Status Table & History */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Your Application History
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Track approval status and remarks from the Mess Warden.
            </p>

            {rebates.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No rebate applications found.</p>
            ) : (
              <div className="space-y-3">
                {rebates.map((reb) => (
                  <div key={reb.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {reb.startDate} to {reb.endDate}
                          </span>
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            {reb.totalDays} Days
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{reb.reason}</p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        reb.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : reb.status === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {reb.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500 font-medium">
                        Rebate Amount: <strong className="text-slate-800">₹{reb.totalRebateAmount}</strong>
                      </span>

                      {reb.reviewRemarks && (
                        <span className="text-[11px] text-slate-600 italic">
                          "{reb.reviewRemarks}"
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
