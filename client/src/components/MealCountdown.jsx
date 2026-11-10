import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, Utensils, Flame, Sparkles } from 'lucide-react';

export default function MealCountdown({ todayMenu, currentMealName = 'lunch' }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isServingNow, setIsServingNow] = useState(true);

  const mealWindows = {
    breakfast: { name: 'Breakfast', start: '07:30', end: '09:30', startH: 7.5, endH: 9.5 },
    lunch: { name: 'Lunch', start: '12:30', end: '14:30', startH: 12.5, endH: 14.5 },
    snacks: { name: 'Evening Snacks', start: '17:00', end: '18:15', startH: 17, endH: 18.25 },
    dinner: { name: 'Dinner', start: '19:45', end: '21:45', startH: 19.75, endH: 21.75 }
  };

  const currentWindow = mealWindows[currentMealName.toLowerCase()] || mealWindows.lunch;
  const mealData = todayMenu ? todayMenu[currentMealName.toLowerCase()] : null;

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentHours = now.getHours() + now.getMinutes() / 60;

      if (currentHours >= currentWindow.startH && currentHours <= currentWindow.endH) {
        setIsServingNow(true);
        const endMinutes = currentWindow.endH * 60;
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const diff = endMinutes - nowMinutes;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        setTimeRemaining(`${hours > 0 ? `${hours}h ` : ''}${mins}m remaining`);
      } else {
        setIsServingNow(false);
        setTimeRemaining(`Serving Window: ${currentWindow.start} - ${currentWindow.end}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [currentMealName]);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden border border-blue-800/60">
      {/* Background ambient decorative glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left side: Meal status badge & title */}
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isServingNow 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isServingNow ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
              <span>{isServingNow ? 'CURRENTLY SERVING' : 'NEXT UPCOMING MEAL'}</span>
            </span>

            <span className="text-xs text-slate-300 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentWindow.start} - {currentWindow.end}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>Today's {currentWindow.name}</span>
            <span className="text-amber-400 text-lg">⚡</span>
          </h2>

          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            {mealData?.highlight || "Chef's curated fresh meal with balanced nutrition for hostelites."}
          </p>
        </div>

        {/* Right side: Countdown and Nutrition pill */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {mealData?.calories && (
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-300 uppercase font-semibold">Energy</p>
                <p className="text-sm font-bold text-white">{mealData.calories} kcal</p>
              </div>
            </div>
          )}

          <div className="bg-amber-500/15 border border-amber-400/30 px-4 py-2 rounded-xl backdrop-blur-md">
            <p className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Gate Window</p>
            <p className="text-sm font-extrabold text-white flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{timeRemaining}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
