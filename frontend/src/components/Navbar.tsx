import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'SMT', path: '/smt' },
  { label: 'ICT', path: '/ict' },
  { label: 'Price Action', path: '/price-action' },
  { label: 'Indicators', path: '/indicators' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm gradient-gold flex items-center justify-center gold-glow">
              <TrendingUp className="w-5 h-5 text-background" />
            </div>
            <span className="font-display text-sm font-bold gradient-gold-text tracking-wider hidden sm:block">
              TRADERVERSE
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-gold bg-gold/10 gold-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface-2'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-gold/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-gold bg-gold/10 gold-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface-2'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
