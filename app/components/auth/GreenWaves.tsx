import React from 'react';

interface GreenWavesProps {
  className?: string;
}

export const GreenWaves: React.FC<GreenWavesProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 900 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute bottom-0 left-0 w-full h-[240px] pointer-events-none rounded-b-xl object-cover ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="grad-layer-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#96bd7d" />
          <stop offset="100%" stopColor="#689350" />
        </linearGradient>

        <linearGradient
          id="grad-layer-mid-dark"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#b2d49b" />
          <stop offset="100%" stopColor="#87b06d" />
        </linearGradient>

        <linearGradient
          id="grad-layer-mid-light"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#d2e8c4" />
          <stop offset="100%" stopColor="#b4d89e" />
        </linearGradient>

        <linearGradient id="grad-layer-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f4f8ec" />
          <stop offset="100%" stopColor="#dcebc8" />
        </linearGradient>

        <filter id="bush-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="8"
            floodColor="#1d3810"
            floodOpacity="0.32"
          />
        </filter>
      </defs>

      <g filter="url(#bush-shadow)" fill="url(#grad-layer-dark)">
        <circle cx="20" cy="220" r="135" />
        <circle cx="150" cy="185" r="150" />
        <circle cx="280" cy="225" r="125" />
        <circle cx="410" cy="180" r="155" />
        <circle cx="550" cy="210" r="135" />
        <circle cx="690" cy="170" r="160" />
        <circle cx="830" cy="205" r="140" />
      </g>

      <g filter="url(#bush-shadow)" fill="url(#grad-layer-mid-dark)">
        <circle cx="-10" cy="250" r="140" />
        <circle cx="110" cy="225" r="145" />
        <circle cx="230" cy="260" r="130" />
        <circle cx="360" cy="215" r="160" />
        <circle cx="490" cy="245" r="140" />
        <circle cx="630" cy="215" r="165" />
        <circle cx="770" cy="240" r="150" />
        <circle cx="900" cy="255" r="135" />
      </g>

      <g filter="url(#bush-shadow)" fill="url(#grad-layer-mid-light)">
        <circle cx="30" cy="285" r="150" />
        <circle cx="170" cy="265" r="155" />
        <circle cx="300" cy="290" r="140" />
        <circle cx="440" cy="255" r="165" />
        <circle cx="580" cy="280" r="150" />
        <circle cx="720" cy="255" r="170" />
        <circle cx="860" cy="285" r="145" />
      </g>

      <g filter="url(#bush-shadow)" fill="url(#grad-layer-light)">
        <circle cx="-20" cy="335" r="170" />
        <circle cx="130" cy="315" r="175" />
        <circle cx="280" cy="335" r="160" />
        <circle cx="440" cy="305" r="185" />
        <circle cx="600" cy="330" r="165" />
        <circle cx="760" cy="305" r="180" />
        <circle cx="900" cy="330" r="160" />
      </g>
    </svg>
  );
};
