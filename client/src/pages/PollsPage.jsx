import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Vote, CheckCircle2, Clock, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PollsPage() {
  const { currentUser } = useAuth();
  const [polls, setPolls] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPolls = async () => {
    try {
      const res = await fetch('/api/polls');
      const data = await res.json();
      if (Array.isArray(data)) setPolls(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionId) => {
    if (!currentUser?.id) return;
    setErrorMsg('');
    try {
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          optionId,
          userId: currentUser.id
        })
      });
      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        fetchPolls();
      } else {
        setErrorMsg(data.error || 'Vote failed');
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Vote className="w-4 h-4" />
            <span>Student Mess Democracy</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Special Feast & Menu Voting Polls
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Democratic decision-making for Sunday gala dinners, festival feasts, and monthly menu revisions.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Poll Cards */}
      <div className="space-y-6">
        {polls.map((poll) => {
          const hasVoted = poll.hasVotedUserIds.includes(currentUser?.id);

          return (
            <div key={poll.id} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Active Poll
                    </span>
                    <span className="text-xs text-slate-400">Total Votes: {poll.totalVotes}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {poll.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{poll.description}</p>
                </div>

                {hasVoted && (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Vote Recorded</span>
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {poll.options.map((opt) => {
                  const percentage = poll.totalVotes > 0
                    ? Math.round((opt.votes / poll.totalVotes) * 100)
                    : 0;

                  return (
                    <div 
                      key={opt.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors relative overflow-hidden"
                    >
                      {/* Vote percentage fill */}
                      <div 
                        className="absolute top-0 bottom-0 left-0 bg-blue-100/60 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>

                      <div className="relative z-10 flex items-center justify-between gap-3 text-xs">
                        <div className="flex-1">
                          <span className="font-bold text-slate-900">{opt.text}</span>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {opt.votes} votes ({percentage}%)
                          </div>
                        </div>

                        <button
                          onClick={() => handleVote(poll.id, opt.id)}
                          disabled={hasVoted}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            hasVoted
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                          }`}
                        >
                          {hasVoted ? 'Voted' : 'Vote'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                <span>Ends on Friday midnight</span>
                <span>SAC Mess Committee</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
