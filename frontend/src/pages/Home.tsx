import { Suspense } from 'react';
import { Link } from '@tanstack/react-router';
import Hero3D from '../components/Hero3D';
import ModuleCarousel from '../components/ModuleCarousel';
import { TrendingUp, BookOpen, Award, Zap } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-background" />}>
          <Hero3D />
        </Suspense>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass gold-border mb-6">
          <Zap className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-semibold text-gold tracking-widest uppercase">
            Professional Trading Education
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
          <span className="gradient-gold-text gold-glow-text">MASTER</span>
          <br />
          <span className="text-foreground">THE MARKETS</span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Learn institutional trading concepts — SMT, ICT methodology, price action, and technical indicators — through immersive 3D education.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/smt"
            className="px-8 py-3 rounded-sm font-semibold text-background gradient-gold gold-glow transition-all duration-200 hover:opacity-90 text-sm tracking-wide"
          >
            Start Learning
          </Link>
          <a
            href="#modules"
            className="px-8 py-3 rounded-sm font-semibold text-foreground glass gold-border transition-all duration-200 hover:bg-gold/10 text-sm tracking-wide"
          >
            View Modules
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { label: 'Concepts Covered', value: '20+', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Learning Modules', value: '4', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Trading Strategies', value: '15+', icon: <Zap className="w-4 h-4" /> },
    { label: 'Visual Diagrams', value: '12+', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <section className="py-8 px-4 section-divider">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 py-4">
            <div className="text-gold mb-1">{stat.icon}</div>
            <div className="font-display text-2xl font-bold gradient-gold-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground text-center">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown-app';
  const appId = encodeURIComponent(hostname);

  return (
    <footer className="py-8 px-4 section-divider mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gold" />
          <span className="font-display text-sm font-bold gradient-gold-text">TRADERVERSE</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} TraderVerse Academy. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with{' '}
          <span className="text-gold">♥</span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-bright transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <div id="modules">
        <ModuleCarousel />
      </div>
      <Footer />
    </main>
  );
}
