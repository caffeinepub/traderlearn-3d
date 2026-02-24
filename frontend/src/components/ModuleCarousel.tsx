import { useAllModuleProgress } from '../hooks/useQueries';
import ModuleCard3D from './ModuleCard3D';
import { TrendingUp, BarChart2, Activity, Layers } from 'lucide-react';

const modules = [
  {
    id: 'smt',
    title: 'SMT',
    tagline: 'Smart Money Technique',
    description: 'Understand how institutional traders move markets. Learn liquidity sweeps, order flow, and displacement patterns.',
    path: '/smt',
    icon: <TrendingUp className="w-7 h-7" />,
    accentColor: '#c8a84b',
  },
  {
    id: 'ict',
    title: 'ICT',
    tagline: 'Inner Circle Trader',
    description: 'Master order blocks, fair value gaps, market structure, and kill zones used by professional traders.',
    path: '/ict',
    icon: <Layers className="w-7 h-7" />,
    accentColor: '#60a5fa',
  },
  {
    id: 'priceAction',
    title: 'Price Action',
    tagline: 'Read the Market Naked',
    description: 'Decode candlestick patterns, support & resistance, trend identification, and breakout strategies.',
    path: '/price-action',
    icon: <Activity className="w-7 h-7" />,
    accentColor: '#34d399',
  },
  {
    id: 'indicators',
    title: 'Indicators',
    tagline: 'Technical Analysis Tools',
    description: 'Learn Moving Averages, RSI, MACD, Bollinger Bands, and Volume analysis for smarter entries.',
    path: '/indicators',
    icon: <BarChart2 className="w-7 h-7" />,
    accentColor: '#a78bfa',
  },
];

export default function ModuleCarousel() {
  const { data: progressData } = useAllModuleProgress();

  const getIsComplete = (moduleId: string): boolean => {
    if (!progressData) return false;
    const entry = progressData.find(([id]) => id === moduleId);
    return entry ? entry[1] : false;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-3">
          Learning Modules
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Choose Your Path
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Four comprehensive modules covering the most powerful trading methodologies used by professional traders worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((mod, index) => (
          <ModuleCard3D
            key={mod.id}
            title={mod.title}
            tagline={mod.tagline}
            description={mod.description}
            path={mod.path}
            icon={mod.icon}
            accentColor={mod.accentColor}
            isComplete={getIsComplete(mod.id)}
            index={index}
          />
        ))}
      </div>

      {/* Progress summary */}
      {progressData && progressData.length > 0 && (
        <div className="mt-10 flex justify-center">
          <div className="glass rounded-lg px-6 py-3 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <div className="flex gap-2">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: getIsComplete(mod.id)
                      ? mod.accentColor
                      : 'oklch(0.25 0.015 260)',
                    boxShadow: getIsComplete(mod.id) ? `0 0 8px ${mod.accentColor}` : 'none',
                  }}
                  title={mod.title}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gold">
              {modules.filter((m) => getIsComplete(m.id)).length}/{modules.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
