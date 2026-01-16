
import React, { useState, useEffect } from 'react';
import { getRomanticMessage } from '../services/geminiService';

interface RomanticNoteProps {
  role: string;
}

const RomanticNote: React.FC<RomanticNoteProps> = ({ role }) => {
  const [note, setNote] = useState<string>("Sedang menulis pesan cinta...");
  const [loading, setLoading] = useState(true);

  const fetchNote = async () => {
    setLoading(true);
    const message = await getRomanticMessage(role);
    setNote(message);
    setLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, [role]);

  return (
    <div className="relative overflow-hidden bg-white/80 p-8 rounded-[2.5rem] border border-rose-100 shadow-sm group">
      {/* Decorative Hearts */}
      <div className="absolute -top-4 -right-4 text-rose-100 text-6xl opacity-50 group-hover:scale-110 transition-transform">
        <i className="fas fa-quote-right"></i>
      </div>
      
      <div className="relative z-10 text-center">
        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-[0.2em] mb-4 block">Kata Sayang Hari Ini</span>
        <p className={`text-xl font-romantic text-rose-700 leading-relaxed transition-opacity duration-700 ${loading ? 'opacity-30' : 'opacity-100'}`}>
          "{note}"
        </p>
        <button 
          onClick={fetchNote}
          className="mt-6 text-rose-300 hover:text-rose-500 text-xs transition-colors flex items-center gap-2 mx-auto"
          disabled={loading}
        >
          <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
          Ganti Pesan
        </button>
      </div>
    </div>
  );
};

export default RomanticNote;
