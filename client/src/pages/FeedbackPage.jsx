import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  EyeOff, 
  CornerDownRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FeedbackPage() {
  const { currentUser, isAdmin } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingFood, setRatingFood] = useState(5);
  const [ratingHygiene, setRatingHygiene] = useState(4);
  const [ratingService, setRatingService] = useState(5);
  const [mealType, setMealType] = useState('Lunch');
  const [category, setCategory] = useState('Food Quality');
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [filterCategory, setFilterCategory] = useState('ALL');

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (Array.isArray(data)) setFeedbacks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser?.id,
          mealType,
          ratingFood,
          ratingHygiene,
          ratingService,
          category,
          comment,
          isAnonymous
        })
      });
      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
        setComment('');
        fetchFeedback();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminReply = async (feedbackId) => {
    const text = replyText[feedbackId];
    if (!text || !text.trim()) return;

    try {
      const res = await fetch(`/api/feedback/${feedbackId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminReply: text.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setReplyText(prev => ({ ...prev, [feedbackId]: '' }));
        fetchFeedback();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const StarRating = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const filteredFeedbacks = filterCategory === 'ALL'
    ? feedbacks
    : feedbacks.filter(f => f.category === filterCategory);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Voice of Hostelites</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Meal Quality & Hygiene Feedback
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Rate dining shifts, voice genuine grievances, and track corrective actions taken by the IIIT-BH Mess Committee.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Rating Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-1">
            Submit Meal Feedback
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Help the caterer continuously improve food standards.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Meal Slot and Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meal Slot</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Evening Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Food Quality">Food Quality & Taste</option>
                  <option value="Hygiene">Hygiene & Cleanliness</option>
                  <option value="Speed & Queue">Serving Speed & Queue</option>
                  <option value="Portion Size">Portion Size</option>
                  <option value="Staff Courtesy">Staff Courtesy</option>
                </select>
              </div>
            </div>

            {/* Star Metrics */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <StarRating label="Taste & Food Quality" value={ratingFood} onChange={setRatingFood} />
              <StarRating label="Hygiene & Sanitation" value={ratingHygiene} onChange={setRatingHygiene} />
              <StarRating label="Staff Service & Speed" value={ratingService} onChange={setRatingService} />
            </div>

            {/* Comment */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Detailed Feedback / Grievance</label>
              <textarea
                rows={3}
                placeholder="What was good? What can be improved?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Anonymous Toggle */}
            <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center space-x-1 font-medium">
                <EyeOff className="w-3.5 h-3.5" />
                <span>Post anonymously (hide my Roll Number & Name)</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Post Feedback'}</span>
            </button>
          </form>
        </div>

        {/* Community Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Community Feedback Stream
              </h3>

              {/* Filter */}
              <div className="flex items-center space-x-1 text-xs">
                {['ALL', 'Food Quality', 'Hygiene', 'Speed & Queue'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${
                      filterCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
              {filteredFeedbacks.map((fb) => (
                <div key={fb.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{fb.studentName}</span>
                        <span className="text-[10px] font-mono text-slate-400">({fb.rollNumber})</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                          {fb.mealType}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{fb.date} • {fb.category}</p>
                    </div>

                    <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{fb.overallRating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    "{fb.comment}"
                  </p>

                  {/* Caterer Reply */}
                  {fb.adminReply && (
                    <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-start space-x-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[11px] text-blue-800">Chief Warden Response:</span>
                        <p className="mt-0.5 text-slate-700 text-[11px]">{fb.adminReply}</p>
                      </div>
                    </div>
                  )}

                  {/* Admin Reply Form */}
                  {isAdmin && !fb.adminReply && (
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type caterer response..."
                        value={replyText[fb.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [fb.id]: e.target.value })}
                        className="flex-1 px-3 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleAdminReply(fb.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
