import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, CheckCircle, ShieldCheck, Download } from 'lucide-react';

export default function BillReceiptModal({ bill, onClose }) {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Mess Fee Invoice</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-sm print:p-4">
          
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-200">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold text-xl mb-2">
              IIIT
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              IIIT BHUBANESWAR CENTRAL MESS
            </h3>
            <p className="text-xs text-slate-500">Gothapatna, PO: Malipada, Bhubaneswar, Odisha 751003</p>
            <div className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              Receipt No: {bill.id.toUpperCase()}
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <div>
              <p className="text-slate-400 font-semibold uppercase text-[10px]">Student Name</p>
              <p className="font-bold text-slate-900">{bill.studentName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase text-[10px]">Roll Number</p>
              <p className="font-mono font-bold text-slate-900">{bill.rollNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase text-[10px]">Billing Month</p>
              <p className="font-bold text-slate-900">{bill.month}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase text-[10px]">Payment Status</p>
              <span className={`inline-flex items-center space-x-1 font-bold ${
                bill.status === 'PAID' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {bill.status === 'PAID' ? '● PAID IN FULL' : '● PAYMENT DUE'}
              </span>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 text-left">Description</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-3 text-slate-700">Monthly Base Mess Charges (Fixed)</td>
                  <td className="py-2 px-3 text-right font-medium">₹{bill.baseFee || 3900}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-700">Hostel Mess Maintenance & Sanitation</td>
                  <td className="py-2 px-3 text-right font-medium">₹{bill.maintenanceCharge || 150}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-700">Special Feast Add-ons / Extras</td>
                  <td className="py-2 px-3 text-right font-medium">₹{bill.extraItemsCharges || 0}</td>
                </tr>
                {bill.rebateDeduction > 0 && (
                  <tr className="bg-emerald-50 text-emerald-800">
                    <td className="py-2 px-3 font-semibold">
                      Approved Rebate Deduction ({bill.rebateDays} days @ ₹130/day)
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-700">
                      - ₹{bill.rebateDeduction}
                    </td>
                  </tr>
                )}
                <tr className="bg-slate-50 font-bold text-slate-900 text-sm">
                  <td className="py-2.5 px-3">Net Total Payable</td>
                  <td className="py-2.5 px-3 text-right text-blue-900">₹{bill.netAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Details & QR Verification */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {bill.status === 'PAID' ? (
                <div className="space-y-1">
                  <p className="text-[11px] text-slate-500">Transaction Ref:</p>
                  <p className="text-xs font-mono font-bold text-slate-800">{bill.transactionId || 'TXN_IIIT_9982481023'}</p>
                  <p className="text-[11px] text-slate-500">Paid Via: {bill.paymentMethod || 'UPI'}</p>
                  <div className="flex items-center space-x-1 text-emerald-600 text-xs font-bold pt-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Digitally Verified & Cleared</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-amber-600 font-semibold">Payment pending clearance before 20th.</p>
              )}
            </div>

            <div className="text-center p-2 bg-slate-50 rounded-xl border border-slate-200">
              <QRCodeSVG 
                value={`https://iiit-bh-mess.ac.in/verify-invoice?id=${bill.id}&roll=${bill.rollNumber}&amount=${bill.netAmount}`}
                size={70}
              />
              <p className="text-[9px] text-slate-400 mt-1 font-mono">Scan to Verify</p>
            </div>
          </div>

          {/* Footer Seal */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">Warden / Caterer Committee</p>
              <p>IIIT Bhubaneswar Hostel Mess</p>
            </div>
            <div className="text-right italic">
              <p>Generated electronically</p>
              <p>No physical signature required</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
