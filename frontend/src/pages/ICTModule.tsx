import { Link } from '@tanstack/react-router';
import { ArrowLeft, Layers, Clock, BarChart2, Zap, Lightbulb } from 'lucide-react';
import ConceptDiagram from '../components/ConceptDiagram';
import CompleteButton from '../components/CompleteButton';

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-sm bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="font-display text-sm font-bold text-blue-400">{number}</span>
      </div>
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">{title}</h2>
        <p className="text-sm text-blue-400">{subtitle}</p>
      </div>
    </div>
  );
}

function ConceptCard({ icon, title, description, color = '#60a5fa' }: { icon: React.ReactNode; title: string; description: string; color?: string }) {
  return (
    <div className="glass rounded-lg p-5 border border-blue-500/20 hover:border-blue-500/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div style={{ color }}>{icon}</div>
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default function ICTModule() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">Module 02</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-blue-400 mb-3">
            ICT
          </h1>
          <p className="text-xl text-foreground font-medium mb-4">Inner Circle Trader Methodology</p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            ICT (Inner Circle Trader) is a comprehensive trading methodology developed by Michael J. Huddleston. It focuses on understanding how central banks and institutional traders manipulate price to engineer liquidity before making significant moves.
          </p>
        </div>

        {/* Section 1: Order Blocks */}
        <section className="mb-14">
          <SectionHeader number="01" title="Order Blocks" subtitle="Institutional Footprints" />
          <div className="glass rounded-lg p-6 border border-blue-500/20 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              An Order Block (OB) is the last opposing candle before a significant impulsive move. It represents an area where institutional orders were placed. Price often returns to these zones to fill remaining orders before continuing in the original direction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-trade-green/10 border border-trade-green/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-trade-green mb-2">Bullish Order Block</h4>
                <p className="text-xs text-muted-foreground">Last bearish (red) candle before a strong bullish move. Price returns to this zone as support.</p>
              </div>
              <div className="bg-trade-red/10 border border-trade-red/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-trade-red mb-2">Bearish Order Block</h4>
                <p className="text-xs text-muted-foreground">Last bullish (green) candle before a strong bearish move. Price returns to this zone as resistance.</p>
              </div>
            </div>
          </div>
          <ConceptDiagram
            data={{ type: 'order-block', title: 'Bullish Order Block — Price Returns to Zone' }}
            height={200}
          />
        </section>

        {/* Section 2: Fair Value Gaps */}
        <section className="mb-14">
          <SectionHeader number="02" title="Fair Value Gaps (FVG)" subtitle="Price Imbalance Zones" />
          <div className="glass rounded-lg p-6 border border-blue-500/20 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Fair Value Gap (FVG) or Imbalance occurs when price moves so aggressively that it leaves a gap between the wicks of three consecutive candles. The middle candle's body creates an area where no trading occurred — price tends to return to "fill" this gap.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              FVGs are identified by: Candle 1's high (or low) and Candle 3's low (or high) not overlapping, leaving a visible gap. This gap represents an area of price inefficiency.
            </p>
          </div>
          <ConceptDiagram
            data={{ type: 'fvg', title: 'Fair Value Gap — Imbalance Zone' }}
            height={200}
          />
        </section>

        {/* Section 3: Market Structure */}
        <section className="mb-14">
          <SectionHeader number="03" title="Market Structure" subtitle="Reading Price Narrative" />
          <ConceptDiagram
            data={{ type: 'market-structure', title: 'Market Structure — Higher Highs & Higher Lows' }}
            height={200}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <ConceptCard
              icon={<BarChart2 className="w-5 h-5" />}
              title="Break of Structure (BOS)"
              description="When price breaks a previous swing high (in uptrend) or swing low (in downtrend), confirming the continuation of the current trend."
            />
            <ConceptCard
              icon={<Zap className="w-5 h-5" />}
              title="Market Structure Shift (MSS)"
              description="A change in the direction of market structure — a bearish MSS occurs when price breaks below a previous higher low, signaling a potential trend reversal."
            />
          </div>
        </section>

        {/* Section 4: Kill Zones */}
        <section className="mb-14">
          <SectionHeader number="04" title="Kill Zones" subtitle="High-Probability Trading Sessions" />
          <div className="glass rounded-lg p-6 border border-blue-500/20 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kill Zones are specific time windows during the trading day when institutional activity is highest and the most significant price moves occur. Trading during these windows dramatically increases the probability of successful setups.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Asian Kill Zone', time: '20:00–00:00 NY', desc: 'Range formation, liquidity building', color: '#a78bfa' },
              { name: 'London Open', time: '02:00–05:00 NY', desc: 'Major moves begin, London session opens', color: '#60a5fa' },
              { name: 'NY AM Kill Zone', time: '07:00–10:00 NY', desc: 'Highest volume, most reliable setups', color: '#c8a84b' },
              { name: 'NY PM Kill Zone', time: '13:30–16:00 NY', desc: 'Afternoon continuation or reversal', color: '#34d399' },
            ].map((kz) => (
              <div
                key={kz.name}
                className="glass rounded-lg p-4 border transition-colors"
                style={{ borderColor: `${kz.color}33` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" style={{ color: kz.color }} />
                  <h4 className="text-xs font-bold text-foreground">{kz.name}</h4>
                </div>
                <p className="text-xs font-mono mb-2" style={{ color: kz.color }}>{kz.time}</p>
                <p className="text-xs text-muted-foreground">{kz.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: OTE */}
        <section className="mb-14">
          <SectionHeader number="05" title="Optimal Trade Entry (OTE)" subtitle="Fibonacci-Based Entry Model" />
          <div className="glass rounded-lg p-6 border border-blue-500/20">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Optimal Trade Entry (OTE) is ICT's Fibonacci-based entry model. After a displacement move, price retraces to the 62%–79% Fibonacci retracement zone. This zone, combined with an order block or FVG, provides the highest probability entry.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { level: '61.8%', label: 'OTE Start', color: '#c8a84b' },
                { level: '70.5%', label: 'Sweet Spot', color: '#22c55e' },
                { level: '79%', label: 'OTE End', color: '#c8a84b' },
              ].map((fib) => (
                <div key={fib.level} className="text-center p-3 rounded-lg bg-surface-2">
                  <div className="font-display text-lg font-bold" style={{ color: fib.color }}>{fib.level}</div>
                  <div className="text-xs text-muted-foreground mt-1">{fib.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-14">
          <SectionHeader number="06" title="Key Takeaways" subtitle="ICT Trading Rules" />
          <div className="glass rounded-lg p-6 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-foreground">Core ICT Principles</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Always trade in the direction of the higher timeframe trend',
                'Order blocks are most valid when they have not been previously tested',
                'FVGs act as magnets — price is drawn to fill imbalances',
                'Kill zones provide the timing; structure provides the direction',
                'OTE entries offer the best risk-to-reward ratios (often 1:3 or better)',
                'Liquidity is always the target — think in terms of where stops are resting',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-divider pt-8">
          <CompleteButton moduleId="ict" />
        </div>
      </div>
    </div>
  );
}
