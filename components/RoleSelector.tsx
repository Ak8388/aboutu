
import React from 'react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center animate-fadeIn">
      <div className="bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-xl border border-rose-100 max-w-md w-full">
        <i className="fas fa-heart text-rose-400 text-5xl mb-6 animate-pulse"></i>
        <h1 className="text-4xl font-romantic font-bold text-rose-600 mb-2">Selalu Bersamamu</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">Dekat di hati, meski jauh di mata. Pilih peranmu untuk memulai koneksi.</p>
        
        <div className="grid grid-cols-1 gap-4 w-full">
          <button
            onClick={() => onSelect(UserRole.SUAMI)}
            className="group relative overflow-hidden bg-rose-400 hover:bg-rose-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95 flex items-center justify-between"
          >
            <span className="text-lg">Aku Suami</span>
            <i className="fas fa-male text-2xl group-hover:translate-x-1 transition-transform"></i>
          </button>
          
          <button
            onClick={() => onSelect(UserRole.ISTRI)}
            className="group relative overflow-hidden bg-white hover:bg-rose-50 border-2 border-rose-200 text-rose-500 font-semibold py-4 px-6 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-between"
          >
            <span className="text-lg">Aku Istri</span>
            <i className="fas fa-female text-2xl group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
        
        <p className="mt-8 text-xs text-slate-400 italic">
          "Jarak tidak memisahkan dua hati yang saling mencinta."
        </p>
      </div>
    </div>
  );
};

export default RoleSelector;
