import { Link } from '@tanstack/react-router';
import { ArrowLeft, Activity, Lightbulb } from 'lucide-react';
import AnimatedCandlestickChart from '../components/AnimatedCandlestickChart';
import ConceptDiagram from '../components/ConceptDiagram';
import CompleteButton from '../components/CompleteButton';

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-sm bg-trade-green/20 border border-trade-green/40 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="font-display text-sm font-bold text-trade-green">{number}</span>
      </div>
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">{title}</h2>
        <p className="text-sm text-trade-green">{subtitle}</p>
      </div>
    </div>
  );
}

interface PatternData {
  name: string;
  description: string;
  signal: string;
  signalColor: string;
  candles: Array<{ open: number; high: number; low: number; close: number; label?: string }>;
  highlightIndex: number;
  patternLabel: string;
}

const candlePatterns: PatternData[] = [
  {
    name: 'Pin Bar (Hammer)',
    description:
      'A candle with a small body and a long lower wick (at least 2x the body). Signals rejection of lower prices and a potential bullish reversal when found at support.',
    signal: 'Bullish Reversal',
    signalColor: '#22c55e',
    patternLabel: 'Pin Bar — Rejection of lows',
    candles: [
      { open: 0.7, high: 0.72, low: 0.55, close: 0.68 },
      { open: 0.68, high: 0.7, low: 0.52, close: 0.66 },
      { open: 0.66, high: 0.68, low: 0.38, close: 0.64, label: 'Pin Bar' },
      { open: 0.64, high: 0.72, low: 0.62, close: 0.71 },
      { open: 0.71, high: 0.78, low: 0.69, close: 0.76 },
    ],
    highlightIndex: 2,
  },
  {
    name: 'Bullish Engulfing',
    description:
      'A large bullish candle that completely engulfs the body of the previous bearish candle. A strong reversal signal when appearing at key support levels after a downtrend.',
    signal: 'Bullish Reversal',
    signalColor: '#22c55e',
    patternLabel: 'Bullish Engulfing — Buyers take control',
    candles: [
      { open: 0.4, high: 0.42, low: 0.36, close: 0.38 },
      { open: 0.38, high: 0.4, low: 0.33, close: 0.35 },
      { open: 0.35, high: 0.37, low: 0.29, close: 0.31 },
      { open: 0.28, high: 0.5, low: 0.26, close: 0.48, label: 'Engulfing' },
      { open: 0.48, high: 0.56, low: 0.46, close: 0.54 },
    ],
    highlightIndex: 3,
  },
  {
    name: 'Doji',
    description:
      'A candle where the open and close are nearly equal, forming a cross or plus shape. Signals market indecision and a potential reversal, especially after a prolonged trend.',
    signal: 'Indecision / Reversal',
    signalColor: '#c8a84b',
    patternLabel: 'Doji — Market indecision',
    candles: [
      { open: 0.3, high: 0.33, low: 0.27, close: 0.33 },
      { open: 0.33, high: 0.36, low: 0.3, close: 0.36 },
      { open: 0.36, high: 0.5, low: 0.22, close: 0.36, label: 'Doji' },
      { open: 0.36, high: 0.38, low: 0.28, close: 0.3 },
      { open: 0.3, high: 0.32, low: 0.2, close: 0.23 },
    ],
    highlightIndex: 2,
  },
  {
    name: 'Bearish Engulfing',
    description:
      'A large bearish candle that completely engulfs the body of the previous bullish candle. A strong reversal signal when appearing at key resistance levels after an uptrend.',
    signal: 'Bearish Reversal',
    signalColor: '#ef4444',
    patternLabel: 'Bearish Engulfing — Sellers take control',
    candles: [
      { open: 0.55, high: 0.58, low: 0.52, close: 0.57 },
      { open: 0.57, high: 0.62, low: 0.55, close: 0.61 },
      { open: 0.61, high: 0.66, low: 0.59, close: 0.65 },
      { open: 0.68, high: 0.7, low: 0.48, close: 0.5, label: 'Engulfing' },
      { open: 0.5, high: 0.52, low: 0.4, close: 0.43 },
    ],
    highlightIndex: 3,
  },
  {
    name: 'Morning Star',
    description:
      'A three-candle bullish reversal pattern: a large bearish candle, followed by a small indecision candle (the "star"), then a large bullish candle. Very reliable at key support.',
    signal: 'Strong Bullish Reversal',
    signalColor: '#22c55e',
    patternLabel: 'Morning Star — Three-candle reversal',
    candles: [
      { open: 0.42, high: 0.44, low: 0.38, close: 0.42 },
      { open: 0.42, high: 0.44, low: 0.36, close: 0.38 },
      { open: 0.36, high: 0.38, low: 0.28, close: 0.3, label: 'Star' },
      { open: 0.3, high: 0.52, low: 0.28, close: 0.5 },
      { open: 0.5, high: 0.58, low: 0.48, close: 0.56 },
    ],
    highlightIndex: 2,
  },
];

function PatternCard({ pattern }: { pattern: PatternData }) {
  return (
    <div className="glass rounded-lg overflow-hidden border border-trade-green/20 hover:border-trade-green/40 transition-colors">
      <div className="p-4 border-b border-trade-green/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm">{pattern.name}</h3>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: pattern.signalColor,
              background: `${pattern.signalColor}18`,
              border: `1px solid ${pattern.signalColor}44`,
            }}
          >
            {pattern.signal}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{pattern.description}</p>
      </div>
      <AnimatedCandlestickChart
        candles={pattern.candles}
        height={160}
        highlightIndex={pattern.highlightIndex}
        patternLabel={pattern.patternLabel}
      />
    </div>
  );
}

export default function PriceActionModule() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-trade-green transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trade-green/10 border border-trade-green/30 mb-4">
            <Activity className="w-3.5 h-3.5 text-trade-green" />
            <span className="text-xs font-semibold text-trade-green tracking-widest uppercase">
              Module 03
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-trade-green mb-3">
            Price Action
          </h1>
          <p className="text-xl text-foreground font-medium mb-4">
            Read the Market Without Indicators
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Price action trading is the art of reading raw candlestick data to understand market
            sentiment and predict future price movement. It requires no indicators — just a clean
            chart and a trained eye.
          </p>
        </div>

        {/* Section 1: Candlestick Patterns */}
        <section className="mb-14">
          <SectionHeader
            number="01"
            title="Candlestick Patterns"
            subtitle="The Language of Price"
          />
          <div className="glass rounded-lg p-5 border border-trade-green/20 mb-6">
            <p className="text-muted-foreground leading-relaxed">
              Candlestick patterns are visual representations of price movement within a specific
              time period. Each candle shows the open, high, low, and close (OHLC). Patterns formed
              by one or more candles signal potential reversals or continuations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {candlePatterns.map((pattern) => (
              <PatternCard key={pattern.name} pattern={pattern} />
            ))}
          </div>
        </section>

        {/* Section 2: Support & Resistance */}
        <section className="mb-14">
          <SectionHeader
            number="02"
            title="Support & Resistance"
            subtitle="The Foundation of Price Action"
          />
          <div className="glass rounded-lg p-5 border border-trade-green/20 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Support and resistance are horizontal price levels where buying or selling pressure
              has historically been strong enough to halt or reverse price movement. These levels
              act as psychological barriers in the market.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-trade-green/10 border border-trade-green/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-trade-green mb-2">Support Level</h4>
                <p className="text-xs text-muted-foreground">
                  A price floor where demand exceeds supply. Buyers step in aggressively, preventing
                  price from falling further. The more times a level is tested, the stronger it
                  becomes.
                </p>
              </div>
              <div className="bg-trade-red/10 border border-trade-red/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-trade-red mb-2">Resistance Level</h4>
                <p className="text-xs text-muted-foreground">
                  A price ceiling where supply exceeds demand. Sellers dominate, preventing price
                  from rising further. Broken resistance often becomes new support (role reversal).
                </p>
              </div>
            </div>
          </div>
          <ConceptDiagram
            data={{
              type: 'support-resistance',
              title: 'Support & Resistance — Price Bouncing Between Levels',
            }}
            height={200}
          />
        </section>

        {/* Section 3: Trend Identification */}
        <section className="mb-14">
          <SectionHeader
            number="03"
            title="Trend Identification"
            subtitle="Trading With the Flow"
          />
          <ConceptDiagram
            data={{
              type: 'market-structure',
              title: 'Uptrend — Higher Highs & Higher Lows',
            }}
            height={200}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              {
                title: 'Uptrend',
                desc: 'Series of Higher Highs (HH) and Higher Lows (HL). Buy on pullbacks to previous highs or swing lows.',
                color: '#22c55e',
                icon: '↗',
              },
              {
                title: 'Downtrend',
                desc: 'Series of Lower Lows (LL) and Lower Highs (LH). Sell on rallies to previous lows or swing highs.',
                color: '#ef4444',
                icon: '↘',
              },
              {
                title: 'Sideways / Range',
                desc: 'Price oscillates between defined support and resistance. Buy at support, sell at resistance.',
                color: '#c8a84b',
                icon: '→',
              },
            ].map((trend) => (
              <div
                key={trend.title}
                className="glass rounded-lg p-5 border transition-colors"
                style={{ borderColor: `${trend.color}33` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl" style={{ color: trend.color }}>
                    {trend.icon}
                  </span>
                  <h4 className="font-semibold text-foreground text-sm">{trend.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{trend.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Breakout Patterns */}
        <section className="mb-14">
          <SectionHeader
            number="04"
            title="Breakout Patterns"
            subtitle="Catching Explosive Moves"
          />
          <div className="glass rounded-lg p-5 border border-trade-green/20 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Breakouts occur when price moves beyond a defined support or resistance level with
              increased momentum. They signal the beginning of a new trend or the continuation of
              an existing one.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                name: 'Bull Flag',
                desc: 'A strong upward move (flagpole) followed by a brief consolidation (flag) before continuing higher. Enter on the breakout above the flag.',
                steps: ['Strong impulse move up (flagpole)', 'Tight consolidation / slight pullback', 'Break above consolidation high', 'Target: flagpole height added to breakout'],
                color: '#22c55e',
              },
              {
                name: 'Bear Flag',
                desc: 'A strong downward move followed by a brief consolidation before continuing lower. Enter on the breakdown below the flag.',
                steps: ['Strong impulse move down (flagpole)', 'Tight consolidation / slight bounce', 'Break below consolidation low', 'Target: flagpole height subtracted from breakdown'],
                color: '#ef4444',
              },
              {
                name: 'Triangle Breakout',
                desc: 'Price forms converging highs and lows creating a triangle. The breakout direction determines the trade. Volume should increase on the breakout.',
                steps: ['Identify converging trendlines', 'Wait for price to approach apex', 'Enter on confirmed breakout with volume', 'Stop below/above the triangle'],
                color: '#c8a84b',
              },
              {
                name: 'Range Breakout',
                desc: 'Price breaks out of a defined horizontal range. The longer the range, the more powerful the breakout. Look for a retest of the broken level.',
                steps: ['Define the range (support & resistance)', 'Wait for a decisive close outside range', 'Look for retest of broken level', 'Target: range height projected from breakout'],
                color: '#60a5fa',
              },
            ].map((pattern) => (
              <div
                key={pattern.name}
                className="glass rounded-lg p-5 border transition-colors"
                style={{ borderColor: `${pattern.color}33` }}
              >
                <h4 className="font-semibold text-foreground text-sm mb-2" style={{ color: pattern.color }}>
                  {pattern.name}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{pattern.desc}</p>
                <ul className="space-y-1">
                  {pattern.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="font-bold mt-0.5" style={{ color: pattern.color }}>
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Key Takeaways */}
        <section className="mb-14">
          <SectionHeader number="05" title="Key Takeaways" subtitle="Price Action Trading Rules" />
          <div className="glass rounded-lg p-6 border border-trade-green/20">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-trade-green" />
              <h3 className="font-semibold text-foreground">Essential Rules</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Always identify the higher timeframe trend before looking for entries',
                'Candlestick patterns are most reliable at key support/resistance levels',
                'A pattern without context (location) is meaningless — location is everything',
                'Wait for candle close confirmation before entering a trade',
                'Volume confirms breakouts — low volume breakouts often fail',
                'Support becomes resistance and resistance becomes support after a breakout',
                'The best trades are obvious — if you have to force it, skip it',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-trade-green mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-divider pt-8">
          <CompleteButton moduleId="priceAction" />
        </div>
      </div>
    </div>
  );
}
