
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import LocationSharing from './LocationSharing';
import VideoCall from './VideoCall';
import SafetyStatusToggle from './SafetyStatusToggle';
import RomanticNote from './RomanticNote';

interface DashboardProps {
  role: UserRole;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, onReset }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'video' | 'map'>('home');
  const partnerRole = role === UserRole.SUAMI ? UserRole.ISTRI : UserRole.SUAMI;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-rose-50/50 pb-24 flex flex-col">
      {/* Header */}
      <header className="p-6 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-rose-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
             <i className={`fas ${role === UserRole.SUAMI ? 'fa-user' : 'fa-user-nurse'}`}></i>
          </div>
          <div>
            <h2 className="font-semibold text-rose-900 leading-none">{role}</h2>
            <span className="text-xs text-rose-400">Terhubung dengan {partnerRole}</span>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="p-2 text-rose-300 hover:text-rose-500 transition-colors"
          title="Ganti Peran"
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="space-y-4 animate-fadeIn">
            <RomanticNote role={role} />
            <SafetyStatusToggle />
            <div className="bg-white/80 p-6 rounded-3xl border border-rose-100 shadow-sm">
              <h3 className="text-sm font-bold text-rose-900 mb-4 flex items-center gap-2">
                <i className="fas fa-info-circle text-rose-400"></i>
                Pesan Hubungan
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gunakan tab di bawah untuk berbagi lokasi secara real-time atau memulai panggilan video dengan {partnerRole} kesayanganmu.
              </p>
            </div>
            {/* Quick Stats/Feelings */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-rose-100/50 p-4 rounded-3xl text-center">
                  <span className="block text-2xl mb-1">🌤️</span>
                  <span className="text-xs font-medium text-rose-700">Cuaca Hati: Cerah</span>
               </div>
               <div className="bg-rose-200/30 p-4 rounded-3xl text-center">
                  <span className="block text-2xl mb-1">☕</span>
                  <span className="text-xs font-medium text-rose-700">Rindu: 100%</span>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="h-full animate-fadeIn">
             <LocationSharing partnerName={partnerRole} />
          </div>
        )}

        {activeTab === 'video' && (
          <div className="h-full animate-fadeIn">
             <VideoCall partnerName={partnerRole} />
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-rose-50 px-6 py-3 flex justify-around items-center shadow-[0_-4px_10px_rgba(244,63,94,0.05)] z-50">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon="fa-house" 
          label="Beranda" 
        />
        <NavButton 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
          icon="fa-location-dot" 
          label="Lokasi" 
        />
        <NavButton 
          active={activeTab === 'video'} 
          onClick={() => setActiveTab('video')} 
          icon="fa-video" 
          label="Video" 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: string, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-rose-500 scale-110' : 'text-slate-300 hover:text-rose-300'}`}
  >
    <i className={`fas ${icon} text-lg`}></i>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default Dashboard;
