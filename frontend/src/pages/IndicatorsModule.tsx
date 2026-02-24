import { Link } from '@tanstack/react-router';
import { ArrowLeft, BarChart2, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import IndicatorChart from '../components/IndicatorChart';
import CompleteButton from '../components/CompleteButton';

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-sm bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="font-display text-sm font-bold text-purple-400">{number}</span>
      </div>
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">{title}</h2>
        <p className="text-sm text-purple-400">{subtitle}</p>
      </div>
    </div>
  );
}

interface TipItem {
  type: 'buy' | 'sell' | 'neutral';
  text: string;
}

interface IndicatorSectionProps {
  number: string;
  title: string;
  subtitle: string;
  chartType: 'ma' | 'rsi' | 'macd' | 'bollinger' | 'volume';
  chartTitle: string;
  description: string;
  howToRead: string[];
  tips: TipItem[];
}

function IndicatorSection({
  number,
  title,
  subtitle,
  chartType,
  chartTitle,
  description,
  howToRead,
  tips,
}: IndicatorSectionProps) {
  return (
    <section className="mb-14">
      <SectionHeader number={number} title={title} subtitle={subtitle} />
      <div className="glass rounded-lg p-5 border border-purple-500/20 mb-5">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <IndicatorChart type={chartType} title={chartTitle} height={180} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        {/* How to Read */}
        <div className="glass rounded-lg p-5 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-semibold text-foreground">How to Read</h4>
          </div>
          <ul className="space-y-2">
            {howToRead.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Practical Tips */}
        <div className="glass rounded-lg p-5 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-gold" />
            <h4 className="text-sm font-semibold text-foreground">Practical Tips</h4>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, i) => {
              const Icon =
                tip.type === 'buy'
                  ? CheckCircle
                  : tip.type === 'sell'
                  ? AlertCircle
                  : Lightbulb;
              const color =
                tip.type === 'buy'
                  ? 'text-trade-green'
                  : tip.type === 'sell'
                  ? 'text-trade-red'
                  : 'text-gold';
              return (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${color}`} />
                  {tip.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function IndicatorsModule() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">
              Module 04
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-purple-400 mb-3">
            Indicators
          </h1>
          <p className="text-xl text-foreground font-medium mb-4">
            Technical Analysis Tools
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Technical indicators are mathematical calculations based on price, volume, or open
            interest that help traders identify trends, momentum, volatility, and potential reversal
            points. Use them as confluence — never in isolation.
          </p>
        </div>

        {/* MA */}
        <IndicatorSection
          number="01"
          title="Moving Averages"
          subtitle="SMA & EMA — Trend Direction"
          chartType="ma"
          chartTitle="Moving Averages — SMA vs EMA"
          description="A Moving Average (MA) smooths out price data by creating a constantly updated average price. The Simple Moving Average (SMA) gives equal weight to all periods, while the Exponential Moving Average (EMA) gives more weight to recent prices, making it more responsive to new information."
          howToRead={[
            'Price above MA = bullish bias; price below MA = bearish bias',
            'EMA crossover above SMA = bullish signal (Golden Cross)',
            'EMA crossover below SMA = bearish signal (Death Cross)',
            'MA slope indicates trend strength — steeper = stronger trend',
            'Common periods: 20 (short), 50 (medium), 200 (long-term)',
          ]}
          tips={[
            { type: 'buy', text: 'Buy when price pulls back to the 20 EMA in an uptrend' },
            { type: 'buy', text: 'Golden Cross (50 MA crosses above 200 MA) = strong bull signal' },
            { type: 'sell', text: 'Death Cross (50 MA crosses below 200 MA) = strong bear signal' },
            { type: 'neutral', text: 'Use multiple MAs to identify dynamic support/resistance zones' },
          ]}
        />

        {/* RSI */}
        <IndicatorSection
          number="02"
          title="RSI"
          subtitle="Relative Strength Index — Momentum"
          chartType="rsi"
          chartTitle="RSI — Overbought & Oversold Zones"
          description="The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and magnitude of price changes. It oscillates between 0 and 100. Developed by J. Welles Wilder, it is one of the most widely used technical indicators for identifying overbought and oversold conditions."
          howToRead={[
            'RSI above 70 = overbought (potential sell signal)',
            'RSI below 30 = oversold (potential buy signal)',
            'RSI crossing 50 upward = bullish momentum shift',
            'RSI divergence with price = powerful reversal signal',
            'Default period: 14 (can be adjusted for sensitivity)',
          ]}
          tips={[
            { type: 'buy', text: 'Buy when RSI exits oversold zone (crosses back above 30)' },
            { type: 'sell', text: 'Sell when RSI exits overbought zone (crosses back below 70)' },
            { type: 'neutral', text: 'Bullish divergence: price makes lower low but RSI makes higher low' },
            { type: 'neutral', text: 'In strong trends, RSI can stay overbought/oversold for extended periods' },
          ]}
        />

        {/* MACD */}
        <IndicatorSection
          number="03"
          title="MACD"
          subtitle="Moving Average Convergence Divergence"
          chartType="macd"
          chartTitle="MACD — Line, Signal & Histogram"
          description="MACD (Moving Average Convergence Divergence) is a trend-following momentum indicator that shows the relationship between two EMAs of price. It consists of the MACD line (12 EMA minus 26 EMA), a Signal line (9 EMA of MACD), and a Histogram showing the difference between them."
          howToRead={[
            'MACD line crossing above signal line = bullish signal',
            'MACD line crossing below signal line = bearish signal',
            'Histogram above zero = bullish momentum; below zero = bearish',
            'MACD crossing zero line = trend change confirmation',
            'Divergence between MACD and price = potential reversal',
          ]}
          tips={[
            { type: 'buy', text: 'Buy when MACD crosses above signal line below the zero line' },
            { type: 'sell', text: 'Sell when MACD crosses below signal line above the zero line' },
            { type: 'neutral', text: 'Histogram shrinking = momentum weakening, potential reversal ahead' },
            { type: 'neutral', text: 'Best used on daily/4H charts; noisy on lower timeframes' },
          ]}
        />

        {/* Bollinger Bands */}
        <IndicatorSection
          number="04"
          title="Bollinger Bands"
          subtitle="Volatility & Price Channels"
          chartType="bollinger"
          chartTitle="Bollinger Bands — Volatility Envelope"
          description="Bollinger Bands consist of a middle band (20-period SMA) and two outer bands set 2 standard deviations above and below. They dynamically adjust to market volatility — widening during volatile periods and contracting during quiet periods. Developed by John Bollinger."
          howToRead={[
            'Price touching upper band = overbought in current context',
            'Price touching lower band = oversold in current context',
            'Band squeeze (narrow bands) = low volatility, breakout imminent',
            'Band expansion = high volatility, strong trend in progress',
            'Price walking the upper/lower band = strong trend continuation',
          ]}
          tips={[
            { type: 'buy', text: 'Buy when price bounces off lower band with bullish candle confirmation' },
            { type: 'sell', text: 'Sell when price bounces off upper band with bearish candle confirmation' },
            { type: 'neutral', text: 'Bollinger Band squeeze followed by breakout = high-probability trade' },
            { type: 'neutral', text: 'Middle band (SMA 20) acts as dynamic support/resistance' },
          ]}
        />

        {/* Volume */}
        <IndicatorSection
          number="05"
          title="Volume"
          subtitle="The Fuel Behind Price Moves"
          chartType="volume"
          chartTitle="Volume — Buying vs Selling Pressure"
          description="Volume measures the total number of shares, contracts, or units traded during a given period. It is the most fundamental indicator because it shows the conviction behind price moves. High volume confirms trends and breakouts; low volume suggests weak moves that may reverse."
          howToRead={[
            'Green bars = buying volume (price closed higher than open)',
            'Red bars = selling volume (price closed lower than open)',
            'Rising price + rising volume = strong uptrend confirmation',
            'Rising price + falling volume = weak move, potential reversal',
            'Volume MA helps identify above/below average activity',
          ]}
          tips={[
            { type: 'buy', text: 'Buy breakouts confirmed by volume 1.5x or more above average' },
            { type: 'sell', text: 'Be cautious of breakouts on low volume — high failure rate' },
            { type: 'neutral', text: 'Volume climax (extreme spike) often marks trend exhaustion' },
            { type: 'neutral', text: 'Accumulation: price flat but volume rising = institutional buying' },
          ]}
        />

        {/* Summary */}
        <section className="mb-14">
          <SectionHeader number="06" title="Key Takeaways" subtitle="Indicator Best Practices" />
          <div className="glass rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-gold" />
              <h3 className="font-semibold text-foreground">Golden Rules for Using Indicators</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Never rely on a single indicator — use 2-3 for confluence',
                'Indicators are lagging by nature; price action always leads',
                'Divergence signals (price vs indicator) are among the most powerful setups',
                'Adjust indicator settings to match your trading timeframe',
                'Volume is the only leading indicator — always check it first',
                'Indicators work best in trending markets; oscillators work best in ranges',
                'Combine indicators from different categories (trend + momentum + volume)',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-divider pt-8">
          <CompleteButton moduleId="indicators" />
        </div>
      </div>
    </div>
  );
}
