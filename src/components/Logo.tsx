import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  textColor?: string;
}

export default function Logo({ className, size = 40, textColor = 'text-brand-dark' }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand-gold"
      >
        {/* Outer Circle Ring */}
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2.5" />
        
        {/* Internal Letters A & M stylization based on logo */}
        <path d="M22 50 C 22 25, 78 25, 78 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M22 50 L 22 72 M 78 50 L 78 72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        
        {/* Horizontal Dividers in circle */}
        <path d="M20 50 L 12 50 M 80 50 L 88 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Central Diamond Structure */}
        <g transform="translate(50, 52) scale(0.7) translate(-50, -50)">
          {/* Diamond top segments */}
          <path d="M50 20 L 75 40 L 25 40 Z" fill="currentColor" opacity="0.8" />
          <path d="M50 20 L 62.5 40 M 50 20 L 37.5 40" stroke="white" strokeWidth="0.8" />
          
          {/* Diamond bottom segments */}
          <path d="M25 40 L 75 40 L 50 85 Z" fill="currentColor" />
          <path d="M50 85 L 35 40 M 50 85 L 65 40" stroke="white" strokeWidth="0.8" opacity="0.5" />
          <path d="M50 40 L 50 85" stroke="white" strokeWidth="0.8" opacity="0.3" />
        </g>
      </svg>
      
      <div className={cn("mt-4 text-center leading-tight tracking-wide font-arabic font-bold", textColor)} style={{ fontSize: size * 0.45 }}>
        الماسة
      </div>
      <div className="text-center font-arabic font-medium text-brand-gold uppercase tracking-wider" style={{ fontSize: size * 0.22 }}>
        مركز طبي
      </div>
    </div>
  );
}
