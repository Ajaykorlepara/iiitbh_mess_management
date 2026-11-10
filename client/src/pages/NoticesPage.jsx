import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BellRing, Pin, Plus, Trash2, Calendar, User, AlertCircle } from 'lucide-react';

export default function NoticesPage() {
  const { isAdmin } = useAuth();
  const [notices, setNotices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General Announcement');
  const [content, setContent] = useState('');
  const [postedBy, setPostedBy] = useState('Chief Mess Warden');

  const fetchNotices = async () => {
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      if (Array.isArray(data)) setNotices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, content, postedBy })
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setContent('');
        setShowAddModal(false);
        fetchNotices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchNotices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
            <BellRing className="w-4 h-4" />
            <span>Official Dining Circulars</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Mess Notice Board & Announcements
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Timings adjustments, festival feast schedules, catering inspection updates, and rebate deadlines.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Circular</span>
          </button>
        )}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div 
            key={notice.id}
            className={`bg-white rounded-2xl p-6 border transition-all ${
              notice.isPinned 
                ? 'border-blue-300 shadow-md bg-gradient-to-r from-blue-50/30 to-white' 
                : 'border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center space-x-2">
                {notice.isPinned && (
                  <span className="p-1 bg-amber-100 text-amber-800 rounded-md" title="Pinned Announcement">
                    <Pin className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {notice.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{notice.date}</span>
                </span>
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                  title="Remove Notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <h3 className="text-base font-extrabold text-slate-900 mb-2">
              {notice.title}
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {notice.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center space-x-1 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Issued by: {notice.postedBy}</span>
              </span>
              <span className="font-mono text-slate-400">IIIT Bhubaneswar Dining Council</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Publish New Campus Circular
            </h3>
            <p className="text-xs text-slate-500 mb-4">Post directly to the hostel student portal.</p>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  placeholder="e.g. Special Mess Timings for Convocation Week"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="General Announcement">General Announcement</option>
                  <option value="Exam Schedule">Exam Schedule</option>
                  <option value="Festival Special">Festival Special</option>
                  <option value="Maintenance Alert">Maintenance Alert</option>
                  <option value="Rebate & Rules">Rebate & Rules</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Content</label>
                <textarea
                  rows={4}
                  placeholder="Detailed announcement description..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
