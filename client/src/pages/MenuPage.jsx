import React, { useState, useEffect } from 'react';
import MealCountdown from '../components/MealCountdown';
import { useAuth } from '../context/AuthContext';
import { 
  Utensils, 
  Clock, 
  Flame, 
  Sparkles, 
  Leaf, 
  Drumstick, 
  Check, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';

export default function MenuPage() {
  const { currentUser, isAdmin } = useAuth();
  const [menuData, setMenuData] = useState(null);
  const [todayInfo, setTodayInfo] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dietFilter, setDietFilter] = useState('ALL');
  const [optOutStatus, setOptOutStatus] = useState({});
  const [editingMeal, setEditingMeal] = useState(null);
  const [editForm, setEditForm] = useState({ items: '', highlight: '', calories: 0 });
  const [saveMsg, setSaveMsg] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    // Fetch today's meal info
    fetch('/api/menu/today')
      .then(res => res.json())
      .then(data => {
        setTodayInfo(data);
        if (data.day) setSelectedDay(data.day);
      })
      .catch(err => console.error(err));

    // Fetch weekly menu
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuData(data))
      .catch(err => console.error(err));
  }, []);

  const handleToggleOptOut = (mealKey) => {
    setOptOutStatus(prev => ({
      ...prev,
      [mealKey]: !prev[mealKey]
    }));
  };

  const handleOpenEdit = (mealKey, mealDetails) => {
    setEditingMeal({ day: selectedDay, mealKey });
    setEditForm({
      items: mealDetails.items.join(', '),
      highlight: mealDetails.highlight || '',
      calories: mealDetails.calories || 600,
      timings: mealDetails.timings || ''
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingMeal) return;

    const payload = {
      items: editForm.items.split(',').map(s => s.trim()).filter(Boolean),
      highlight: editForm.highlight,
      calories: Number(editForm.calories),
      timings: editForm.timings
    };

    try {
      const res = await fetch(`/api/menu/${editingMeal.day}/${editingMeal.mealKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setMenuData(prev => ({
          ...prev,
          [editingMeal.day]: {
            ...prev[editingMeal.day],
            [editingMeal.mealKey]: data.menu
          }
        }));
        setSaveMsg('Menu updated in real-time!');
        setTimeout(() => {
          setEditingMeal(null);
          setSaveMsg('');
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeDayMenu = menuData ? menuData[selectedDay] : null;

  const mealSlots = [
    { key: 'breakfast', title: 'Breakfast', icon: '🌅', color: 'border-amber-200 bg-amber-50/30' },
    { key: 'lunch', title: 'Lunch', icon: '☀️', color: 'border-blue-200 bg-blue-50/30' },
    { key: 'snacks', title: 'Evening Snacks', icon: '☕', color: 'border-orange-200 bg-orange-50/30' },
    { key: 'dinner', title: 'Dinner', icon: '🌙', color: 'border-indigo-200 bg-indigo-50/30' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Live Meal Banner */}
      <MealCountdown 
        todayMenu={todayInfo?.menu} 
        currentMealName={todayInfo?.currentMeal || 'lunch'} 
      />

      {/* Day Selector & Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Days of Week */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {days.map((day) => {
            const isToday = todayInfo?.day === day;
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : isToday
                    ? 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{day.substring(0, 3)}</span>
                {isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-blue-600'}`}></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dietary Filter */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">Filter:</span>
          {['ALL', 'VEG', 'SPECIAL'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDietFilter(filter)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                dietFilter === filter
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mealSlots.map((slot) => {
          const meal = activeDayMenu ? activeDayMenu[slot.key] : null;
          if (!meal) return null;

          // Dietary filtering check
          if (dietFilter === 'VEG' && meal.type === 'Non-Veg') return null;
          if (dietFilter === 'SPECIAL' && !meal.highlight) return null;

          const isOptedOut = optOutStatus[`${selectedDay}_${slot.key}`];

          return (
            <div 
              key={slot.key}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md relative overflow-hidden flex flex-col justify-between ${slot.color}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{slot.icon}</span>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                        <span>{slot.title}</span>
                        {meal.type === 'Veg' ? (
                          <span className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                            <Leaf className="w-3 h-3 mr-0.5" /> Pure Veg
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-300">
                            <Drumstick className="w-3 h-3 mr-0.5" /> Non-Veg / Mixed
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{meal.timings}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {meal.calories && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center space-x-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span>{meal.calories} kcal</span>
                      </span>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => handleOpenEdit(slot.key, meal)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-white"
                        title="Edit this meal (Admin)"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Highlight Ribbon */}
                {meal.highlight && (
                  <div className="mb-3 px-3 py-1 rounded-lg bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-semibold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Special: {meal.highlight}</span>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-1.5 py-2">
                  {meal.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                      <span className="leading-relaxed font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Waste Prevention Opt-Out */}
              <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-500">
                  {isOptedOut ? (
                    <span className="text-amber-700 font-semibold flex items-center space-x-1">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Marked: Skipping meal (Saved Food!)</span>
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Attending normally</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleToggleOptOut(`${selectedDay}_${slot.key}`)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isOptedOut
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isOptedOut ? 'Undo Opt-Out' : 'Skip Meal'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Admin Edit Modal */}
      {editingMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Edit Menu: {editingMeal.day} {editingMeal.mealKey.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Update dishes, special highlight, and timings in real-time.</p>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dishes (Comma separated)</label>
                <textarea
                  rows={3}
                  value={editForm.items}
                  onChange={(e) => setEditForm({ ...editForm, items: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Highlight / Chef's Pick</label>
                <input
                  type="text"
                  value={editForm.highlight}
                  onChange={(e) => setEditForm({ ...editForm, highlight: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Calories</label>
                  <input
                    type="number"
                    value={editForm.calories}
                    onChange={(e) => setEditForm({ ...editForm, calories: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Timings</label>
                  <input
                    type="text"
                    value={editForm.timings}
                    onChange={(e) => setEditForm({ ...editForm, timings: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {saveMsg && (
                <p className="text-emerald-600 font-bold text-center">{saveMsg}</p>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMeal(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
