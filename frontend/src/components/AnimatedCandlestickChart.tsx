import { useRef, useEffect, useState } from 'react';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  label?: string;
  color?: string;
}

interface AnimatedCandlestickChartProps {
  candles: Candle[];
  title?: string;
  height?: number;
  highlightIndex?: number;
  patternLabel?: string;
}

export default function AnimatedCandlestickChart({
  candles,
  title,
  height = 220,
  highlightIndex,
  patternLabel,
}: AnimatedCandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= candles.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [candles.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = { top: 20, bottom: 30, left: 10, right: 10 };
    const chartH = h - padding.top - padding.bottom;
    const chartW = w - padding.left - padding.right;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#1a2030';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    if (candles.length === 0) return;

    const allValues = candles.flatMap(c => [c.high, c.low]);
    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);
    const range = maxVal - minVal || 1;

    const toY = (val: number) => padding.top + chartH - ((val - minVal) / range) * chartH;

    const candleWidth = Math.min(30, (chartW / candles.length) * 0.6);
    const spacing = chartW / candles.length;

    const visible = candles.slice(0, visibleCount);

    visible.forEach((candle, i) => {
      const x = padding.left + spacing * i + spacing / 2;
      const isGreen = candle.close >= candle.open;
      const isHighlighted = highlightIndex !== undefined && i === highlightIndex;

      const baseColor = candle.color || (isGreen ? '#22c55e' : '#ef4444');
      const emitColor = isGreen ? '#16a34a' : '#dc2626';

      // Highlight glow
      if (isHighlighted) {
        ctx.shadowColor = '#c8a84b';
        ctx.shadowBlur = 15;
      } else {
        ctx.shadowBlur = 0;
      }

      // Wick
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = isHighlighted ? 2 : 1.5;
      ctx.beginPath();
      ctx.moveTo(x, toY(candle.high));
      ctx.lineTo(x, toY(candle.low));
      ctx.stroke();

      // Body
      const bodyTop = toY(Math.max(candle.open, candle.close));
      const bodyBottom = toY(Math.min(candle.open, candle.close));
      const bodyH = Math.max(bodyBottom - bodyTop, 2);

      ctx.fillStyle = isHighlighted ? '#c8a84b' : baseColor;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyH);

      ctx.shadowBlur = 0;

      // Label
      if (candle.label) {
        ctx.fillStyle = '#c8a84b';
        ctx.font = 'bold 9px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(candle.label, x, toY(candle.high) - 5);
      }
    });

    // Pattern label
    if (patternLabel && visibleCount >= candles.length) {
      ctx.fillStyle = '#c8a84b';
      ctx.font = 'bold 11px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(patternLabel, w / 2, h - 8);
    }

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(() => {});
  }, [candles, visibleCount, highlightIndex, patternLabel]);

  return (
    <div className="rounded-lg overflow-hidden gold-border">
      {title && (
        <div className="px-3 py-2 bg-surface-2 border-b border-gold/10">
          <span className="text-xs font-semibold text-gold tracking-wider uppercase">{title}</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={500}
        height={height}
        className="w-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
