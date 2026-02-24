import { Link } from '@tanstack/react-router';
import { ArrowLeft, Lightbulb, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import ConceptDiagram from '../components/ConceptDiagram';
import CompleteButton from '../components/CompleteButton';

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-sm gradient-gold flex items-center justify-center flex-shrink-0 mt-1">
        <span className="font-display text-sm font-bold text-background">{number}</span>
      </div>
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">{title}</h2>
        <p className="text-sm text-gold">{subtitle}</p>
      </div>
    </div>
  );
}

function ConceptCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass rounded-lg p-5 gold-border hover:border-gold/60 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-gold">{icon}</div>
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default function SMTModule() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back nav */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 gold-border mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold text-gold tracking-widest uppercase">Module 01</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black gradient-gold-text mb-3">
            SMT
          </h1>
          <p className="text-xl text-foreground font-medium mb-4">Smart Money Technique</p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            SMT (Smart Money Technique) is a methodology that focuses on understanding how institutional traders — banks, hedge funds, and market makers — manipulate price to accumulate and distribute positions before major moves.
          </p>
        </div>

        {/* Section 1: Definition */}
        <section className="mb-14">
          <SectionHeader number="01" title="What is SMT?" subtitle="Definition & Origin" />
          <div className="glass rounded-lg p-6 gold-border mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Smart Money refers to the capital controlled by institutional investors — central banks, commercial banks, hedge funds, and large financial institutions. These entities move enormous volumes that leave distinctive footprints in price action.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              SMT Divergence specifically refers to when two correlated assets (e.g., EUR/USD and GBP/USD, or ES and NQ futures) fail to confirm each other's highs or lows. This divergence signals that smart money is positioning against the retail crowd.
            </p>
          </div>
          <ConceptDiagram
            data={{ type: 'smt-divergence', title: 'SMT Divergence — Correlated Asset Failure' }}
            height={200}
          />
        </section>

        {/* Section 2: Core Principles */}
        <section className="mb-14">
          <SectionHeader number="02" title="Core Principles" subtitle="The Three Pillars of SMT" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <ConceptCard
              icon={<Target className="w-5 h-5" />}
              title="Liquidity Sweeps"
              description="Smart money targets areas where retail stop-losses cluster — above swing highs and below swing lows — to accumulate positions at better prices before reversing."
            />
            <ConceptCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Institutional Order Flow"
              description="Large institutions cannot enter positions all at once. They use algorithms to accumulate over time, creating recognizable patterns in price structure and volume."
            />
            <ConceptCard
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Displacement"
              description="After sweeping liquidity, smart money creates a strong, impulsive move (displacement) away from the manipulation zone, leaving behind fair value gaps and order blocks."
            />
          </div>
        </section>

        {/* Section 3: How to Identify */}
        <section className="mb-14">
          <SectionHeader number="03" title="Identifying SMT Setups" subtitle="Step-by-Step Process" />
          <div className="space-y-4 mb-6">
            {[
              { step: '1', title: 'Find Correlated Pairs', desc: 'Identify two assets that typically move together (EUR/USD & GBP/USD, ES & NQ, Gold & Silver).' },
              { step: '2', title: 'Mark Key Swing Points', desc: 'Identify the most recent significant swing highs and lows on both assets.' },
              { step: '3', title: 'Look for Divergence', desc: 'When Asset A makes a new high but Asset B fails to confirm — this is SMT divergence. The weaker asset signals the true direction.' },
              { step: '4', title: 'Wait for Confirmation', desc: 'Look for a market structure shift (MSS) or break of structure (BOS) on the lower timeframe to confirm the reversal.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 glass rounded-lg p-4 gold-border">
                <div className="w-8 h-8 rounded-sm bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-gold">{item.step}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Key Takeaways */}
        <section className="mb-14">
          <SectionHeader number="04" title="Key Takeaways" subtitle="Summary & Trading Rules" />
          <div className="glass rounded-lg p-6 gold-border">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-gold" />
              <h3 className="font-semibold text-foreground">Essential Rules</h3>
            </div>
            <ul className="space-y-3">
              {[
                'SMT divergence is most powerful at key liquidity levels (previous highs/lows)',
                'Always trade in the direction of the stronger correlated asset',
                'Combine SMT with ICT concepts (order blocks, FVGs) for high-probability setups',
                'Higher timeframe SMT divergence carries more weight than lower timeframe',
                'Volume confirmation strengthens the SMT signal significantly',
                'Never trade SMT in isolation — use it as confluence with other factors',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Complete button */}
        <div className="section-divider pt-8">
          <CompleteButton moduleId="smt" />
        </div>
      </div>
    </div>
  );
}
