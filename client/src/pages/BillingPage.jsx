import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BillReceiptModal from '../components/BillReceiptModal';
import { 
  ReceiptIndianRupee, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Download, 
  QrCode, 
  ShieldCheck, 
  Wallet,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BillingPage() {
  const { currentUser } = useAuth();
  const [bills, setBills] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [payingBill, setPayingBill] = useState(null);
  const [payMethod, setPayMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successNote, setSuccessNote] = useState('');

  const fetchBills = async () => {
    if (!currentUser?.id) return;
    try {
      const res = await fetch(`/api/bills?studentId=${currentUser.id}`);
      const data = await res.json();
      if (Array.isArray(data)) setBills(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [currentUser]);

  const handlePay = async (bill) => {
    setPayingBill(bill);
  };

  const executePayment = async (e) => {
    e.preventDefault();
    if (!payingBill) return;

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/bills/${payingBill.id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: payMethod === 'UPI' ? 'UPI / GooglePay' : payMethod === 'CARD' ? 'Debit Card' : 'SBI NetBanking'
        })
      });
      const data = await res.json();

      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setSuccessNote(`Payment of ₹${payingBill.netAmount} successfully cleared!`);
        setTimeout(() => {
          setPayingBill(null);
          setSuccessNote('');
          fetchBills();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const activeBill = bills.find(b => b.status === 'DUE') || bills[0];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
            <ReceiptIndianRupee className="w-4 h-4" />
            <span>Hostel Accounts & Dining Dues</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Monthly Mess Billing & Invoices
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Transparent fee itemization, approved rebate deductions, instant online payment, and downloadable tax receipts.
          </p>
        </div>

        {/* Student Dining Wallet */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-5 py-3 rounded-2xl shadow-md border border-blue-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <p className="text-[10px] text-blue-200 uppercase font-semibold">Mess Caution Wallet</p>
            <p className="text-lg font-extrabold text-white">₹{currentUser?.walletBalance || 450}</p>
          </div>
        </div>
      </div>

      {/* Main Billing Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Month Bill Statement */}
        {activeBill && (
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                    Invoice #{activeBill.id.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {activeBill.month}
                  </h3>
                  <p className="text-xs text-slate-400">Period: {activeBill.billingPeriod}</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                  activeBill.status === 'PAID'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {activeBill.status === 'PAID' ? '● PAID' : '● DUE'}
                </span>
              </div>

              {/* Detailed Breakdown */}
              <div className="py-4 space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between py-1">
                  <span>Base Monthly Mess Fee (Fixed)</span>
                  <span className="font-semibold">₹{activeBill.baseFee}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Mess Sanitation & Maintenance Charges</span>
                  <span className="font-semibold">₹{activeBill.maintenanceCharge || 150}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Extra Items / Special Feast Coupons</span>
                  <span className="font-semibold">₹{activeBill.extraItemsCharges || 0}</span>
                </div>

                {activeBill.rebateDeduction > 0 && (
                  <div className="flex justify-between py-1.5 px-3 bg-emerald-50 rounded-xl text-emerald-800 font-semibold border border-emerald-200">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Approved Rebate Savings ({activeBill.rebateDays} days @ ₹130/day)</span>
                    </span>
                    <span className="text-emerald-700 font-extrabold">- ₹{activeBill.rebateDeduction}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total and Actions */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Net Amount</p>
                  <p className="text-2xl font-extrabold text-blue-950">₹{activeBill.netAmount}</p>
                </div>
                {activeBill.dueDate && activeBill.status === 'DUE' && (
                  <p className="text-xs text-amber-600 font-semibold">Due by: {activeBill.dueDate}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {activeBill.status === 'DUE' ? (
                  <button
                    onClick={() => handlePay(activeBill)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Now (Simulated Gateway)</span>
                  </button>
                ) : (
                  <div className="flex-1 flex items-center space-x-2 text-xs text-emerald-700 font-bold bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Payment Cleared on {new Date(activeBill.paidAt).toLocaleDateString()}</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedReceipt(activeBill)}
                  className="flex items-center space-x-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Official Receipt</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Previous Months Billing History */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Billing Ledger & History
            </h3>
            <p className="text-xs text-slate-500 mb-4">Past statements with official download receipts.</p>

            <div className="space-y-3">
              {bills.map((b) => (
                <div 
                  key={b.id} 
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-bold text-slate-800">{b.month}</h5>
                    <p className="text-[11px] text-slate-400">Total: ₹{b.netAmount}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status}
                    </span>
                    <button
                      onClick={() => setSelectedReceipt(b)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200">
            For billing queries, visit Central Mess Finance Office or email <span className="font-mono text-slate-700">mess.accounts@iiit-bh.ac.in</span>.
          </div>
        </div>

      </div>

      {/* Payment Gateway Modal */}
      {payingBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              IIIT-BH Digital Fee Gateway
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Paying for: <strong className="text-slate-800">{payingBill.month}</strong> • Net: <strong className="text-blue-700 font-extrabold">₹{payingBill.netAmount}</strong>
            </p>

            <form onSubmit={executePayment} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR' },
                  { id: 'CARD', label: 'Debit Card' },
                  { id: 'NETBANK', label: 'SBI NetBank' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPayMethod(opt.id)}
                    className={`p-2.5 rounded-xl border text-center font-bold ${
                      payMethod === opt.id
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {payMethod === 'UPI' && (
                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="w-24 h-24 mx-auto bg-white p-2 border rounded-lg flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-slate-800" />
                  </div>
                  <p className="text-[11px] text-slate-600 font-mono">iiit.mess@sbi (Verified Merchant)</p>
                  <p className="text-[10px] text-slate-400">Scan using PhonePe, GPay, Paytm, or BHIM</p>
                </div>
              )}

              {successNote && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold text-center">
                  {successNote}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPayingBill(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Transaction...' : `Confirm Payment (₹${payingBill.netAmount})`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <BillReceiptModal bill={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}

    </div>
  );
}
