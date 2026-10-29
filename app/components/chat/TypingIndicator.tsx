import React from "react";

export const TypingIndicator = () => (
  <div className="self-start flex items-center justify-start ml-1 mb-2">
    <style>{`
      @keyframes tgWave {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
      .animate-tg-wave { animation: tgWave 1.3s ease-in-out infinite; }
    `}</style>
    <div className="bg-white px-4 py-2.5 rounded-full shadow-sm flex items-center gap-1.5 border border-gray-100/60">
      <span className="w-2 h-2 rounded-full animate-tg-wave" style={{ backgroundColor: "#A4C476", animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full animate-tg-wave" style={{ backgroundColor: "#688A43", animationDelay: "160ms" }} />
      <span className="w-2 h-2 rounded-full animate-tg-wave" style={{ backgroundColor: "#3B5222", animationDelay: "320ms" }} />
    </div>
  </div>
);