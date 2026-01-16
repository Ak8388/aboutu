
import React, { useState, useRef } from 'react';

interface VideoCallProps {
  partnerName: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ partnerName }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      setIsCalling(true);
      setError(null);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Izin kamera/mikrofon ditolak. Mohon izinkan untuk memanggil.");
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCalling(false);
  };

  return (
    <div className="h-full space-y-4">
      <div className="relative aspect-[3/4] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
        {isCalling ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Simulation of partner view */}
            <div className="absolute top-6 right-6 w-32 aspect-[3/4] bg-rose-200 rounded-2xl border-2 border-white/50 overflow-hidden shadow-xl flex items-center justify-center">
               <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mx-auto mb-1">
                    <i className="fas fa-user text-rose-300 text-xs"></i>
                  </div>
                  <span className="text-[8px] font-bold text-rose-500 uppercase tracking-tighter">Waiting...</span>
               </div>
            </div>
            
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6">
              <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center">
                <i className="fas fa-microphone"></i>
              </button>
              <button 
                onClick={endCall}
                className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg animate-pulse"
              >
                <i className="fas fa-phone-slash text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center">
                <i className="fas fa-video"></i>
              </button>
            </div>

            <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                 <span className="text-[10px] text-white font-bold uppercase tracking-widest">On Call</span>
               </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center text-rose-400">
               <i className="fas fa-video text-4xl"></i>
            </div>
            <div>
              <h4 className="text-white text-lg font-bold mb-2">Panggil {partnerName}</h4>
              <p className="text-slate-400 text-sm">Lihat senyum manisnya sekarang juga.</p>
            </div>
            
            <button
              onClick={startCall}
              className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold shadow-lg shadow-rose-900/50 hover:bg-rose-400 transition-all active:scale-95"
            >
              Mulai Panggilan
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <div className="p-4 bg-rose-900/80 backdrop-blur-md text-white text-xs rounded-2xl border border-rose-700">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      )}
      
      <div className="bg-white/50 p-4 rounded-3xl text-center text-[10px] text-slate-400 leading-relaxed italic border border-rose-100">
        "Kamera dan mikrofon hanya diakses saat kamu menekan tombol panggil. Transparansi adalah kunci kenyamanan kita bersama."
      </div>
    </div>
  );
};

export default VideoCall;
