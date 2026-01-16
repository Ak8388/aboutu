
import React, { useState } from 'react';

const SafetyStatusToggle: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [status, setStatus] = useState<boolean>(true);

  const handleImOk = () => {
    setLastUpdate(new Date());
    setStatus(true);
    // In a real app, this would send a push notification/update a database
  };

  return (
    <div className="bg-white/80 p-6 rounded-3xl border border-rose-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
          <i className="fas fa-heart-pulse text-rose-400"></i>
          Status Keselamatan
        </h3>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${status ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
          {status ? 'Aman' : 'Perlu Kabar'}
        </span>
      </div>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={handleImOk}
          className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-2xl font-bold shadow-md shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <i className="fas fa-check-circle"></i>
          Aku Baik-baik Saja ❤️
        </button>
        
        <p className="text-[11px] text-slate-500 text-center">
          {lastUpdate 
            ? `Terakhir dikirim: ${lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
            : "Kirim kabar hari ini agar ia tenang."}
        </p>
      </div>
    </div>
  );
};

export default SafetyStatusToggle;
