import { useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2 } from 'lucide-react';

interface ModuleCard3DProps {
  title: string;
  tagline: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  accentColor: string;
  isComplete?: boolean;
  index: number;
}

export default function ModuleCard3D({
  title,
  tagline,
  description,
  path,
  icon,
  accentColor,
  isComplete = false,
  index,
}: ModuleCard3DProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 12, y: x * -12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer select-none"
      style={{
        perspective: '1000px',
        animationDelay: `${index * 0.15}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate({ to: path })}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0px)'}`,
          transformStyle: 'preserve-3d',
          background: 'oklch(0.14 0.008 260 / 0.9)',
          border: isComplete
            ? `1px solid oklch(0.78 0.18 75 / 0.8)`
            : `1px solid oklch(0.78 0.18 75 / 0.2)`,
          boxShadow: isHovered
            ? `0 20px 60px oklch(0.78 0.18 75 / 0.2), 0 0 30px ${accentColor}33`
            : isComplete
            ? `0 0 20px oklch(0.78 0.18 75 / 0.3)`
            : '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Shimmer overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 animate-shimmer pointer-events-none z-10" />
        )}

        {/* Complete badge */}
        {isComplete && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-gold/20 gold-border">
            <CheckCircle2 className="w-3 h-3 text-gold" />
            <span className="text-xs font-medium text-gold">Complete</span>
          </div>
        )}

        {/* Card content */}
        <div className="p-6">
          {/* Icon area */}
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
            style={{
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}44`,
              boxShadow: isHovered ? `0 0 20px ${accentColor}44` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div style={{ color: accentColor }}>{icon}</div>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-foreground mb-1 tracking-wide">
            {title}
          </h3>

          {/* Tagline */}
          <p className="text-xs font-medium mb-3" style={{ color: accentColor }}>
            {tagline}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* CTA */}
          <div className="mt-5 flex items-center gap-2">
            <div
              className="h-px flex-1 transition-all duration-300"
              style={{
                background: isHovered
                  ? `linear-gradient(90deg, ${accentColor}, transparent)`
                  : 'oklch(0.25 0.015 260)',
              }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: isHovered ? accentColor : 'oklch(0.55 0.01 260)' }}
            >
              {isComplete ? 'Review' : 'Learn'}
            </span>
            <span style={{ color: isHovered ? accentColor : 'oklch(0.55 0.01 260)' }}>→</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-0.5 w-full transition-all duration-300"
          style={{
            background: isHovered || isComplete
              ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
              : 'transparent',
          }}
        />
      </div>
    </div>
  );
}
