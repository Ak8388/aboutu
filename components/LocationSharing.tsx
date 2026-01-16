
import React, { useState, useEffect, useRef } from 'react';

interface LocationSharingProps {
  partnerName: string;
}

const LocationSharing: React.FC<LocationSharingProps> = ({ partnerName }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);

  const startSharing = () => {
    if (!navigator.geolocation) {
      setError("Browser kamu tidak mendukung berbagi lokasi.");
      return;
    }

    setIsSharing(true);
    setError(null);

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
      },
      (err) => {
        setError("Gagal mendapatkan lokasi. Pastikan izin lokasi diberikan.");
        setIsSharing(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const stopSharing = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
    }
    setIsSharing(false);
    setLocation(null);
  };

  useEffect(() => {
    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  return (
    <div className="bg-white/80 p-6 rounded-3xl border border-rose-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-romantic font-bold text-rose-600">Posisi Kita</h3>
        <i className="fas fa-map-location-dot text-rose-300 text-2xl"></i>
      </div>

      <div className="relative h-48 bg-rose-50 rounded-2xl overflow-hidden flex items-center justify-center border border-dashed border-rose-200">
        {isSharing && location ? (
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-200 animate-bounce">
              <i className="fas fa-location-pin"></i>
            </div>
            <p className="text-xs font-medium text-rose-800 uppercase tracking-widest">Kamu di Sini</p>
            <p className="text-[10px] text-slate-500 mt-1">
              Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
            </p>
          </div>
        ) : (
          <div className="text-center px-6">
            <p className="text-sm text-slate-400 italic">Klik tombol di bawah untuk mulai berbagi lokasimu secara real-time dengan {partnerName}.</p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2 border border-red-100">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      <button
        onClick={isSharing ? stopSharing : startSharing}
        className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-md flex items-center justify-center gap-3 ${
          isSharing 
            ? 'bg-rose-50 text-rose-500 border-2 border-rose-200' 
            : 'bg-rose-400 text-white hover:bg-rose-500'
        }`}
      >
        <i className={`fas ${isSharing ? 'fa-stop-circle' : 'fa-play-circle'}`}></i>
        {isSharing ? 'Berhenti Berbagi' : 'Bagikan Lokasiku'}
      </button>

      <div className="text-[10px] text-slate-400 text-center leading-relaxed">
        <i className="fas fa-shield-halved mr-1"></i>
        Kami menghargai privasimu. Akses lokasi hanya aktif jika kamu menyetujui dan menekan tombol di atas.
      </div>
    </div>
  );
};

export default LocationSharing;
