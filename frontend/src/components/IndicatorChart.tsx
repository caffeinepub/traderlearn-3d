import { useRef, useEffect } from 'react';

type IndicatorType = 'ma' | 'rsi' | 'macd' | 'bollinger' | 'volume';

interface IndicatorChartProps {
  type: IndicatorType;
  title: string;
  height?: number;
}

function drawMA(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 6) * i);
    ctx.lineTo(w, (h / 6) * i);
    ctx.stroke();
  }

  // Price line
  const price = [0.7, 0.65, 0.72, 0.6, 0.55, 0.62, 0.5, 0.45, 0.52, 0.4, 0.35, 0.42, 0.3, 0.25, 0.32, 0.2];
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  price.forEach((y, i) => {
    const x = (i / (price.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  // SMA (slower)
  const sma = [0.7, 0.67, 0.69, 0.65, 0.63, 0.62, 0.57, 0.53, 0.52, 0.47, 0.43, 0.42, 0.37, 0.32, 0.3, 0.26];
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  sma.forEach((y, i) => {
    const x = (i / (sma.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  // EMA (faster)
  const ema = [0.7, 0.66, 0.7, 0.62, 0.57, 0.6, 0.52, 0.47, 0.5, 0.42, 0.37, 0.4, 0.32, 0.27, 0.3, 0.22];
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ema.forEach((y, i) => {
    const x = (i / (ema.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('Price', 5, 15);
  ctx.fillStyle = '#c8a84b';
  ctx.fillText('SMA', 40, 15);
  ctx.fillStyle = '#60a5fa';
  ctx.fillText('EMA', 70, 15);
}

function drawRSI(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  // Overbought/oversold zones
  ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
  ctx.fillRect(0, 0, w, h * 0.3);
  ctx.fillStyle = 'rgba(34, 197, 94, 0.08)';
  ctx.fillRect(0, h * 0.7, w, h * 0.3);

  // Lines
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(0, h * 0.3);
  ctx.lineTo(w, h * 0.3);
  ctx.stroke();
  ctx.strokeStyle = '#22c55e';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.7);
  ctx.lineTo(w, h * 0.7);
  ctx.stroke();
  ctx.setLineDash([]);

  // RSI line
  const rsi = [0.5, 0.35, 0.25, 0.3, 0.45, 0.55, 0.65, 0.75, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.35, 0.5, 0.6];
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  rsi.forEach((y, i) => {
    const x = (i / (rsi.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('Overbought (70)', 5, h * 0.28);
  ctx.fillStyle = '#22c55e';
  ctx.fillText('Oversold (30)', 5, h * 0.68);
  ctx.fillStyle = '#a78bfa';
  ctx.fillText('RSI', 5, h - 8);
}

function drawMACD(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  const mid = h / 2;

  // Zero line
  ctx.strokeStyle = '#2a3040';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, mid);
  ctx.lineTo(w, mid);
  ctx.stroke();

  // Histogram
  const hist = [-0.1, -0.15, -0.08, 0.05, 0.12, 0.18, 0.1, 0.05, -0.05, -0.12, -0.08, 0.03, 0.1, 0.15, 0.08, 0.02];
  const barW = w / hist.length * 0.7;
  hist.forEach((v, i) => {
    const x = (i / hist.length) * w + barW * 0.2;
    const barH = Math.abs(v) * h * 1.5;
    ctx.fillStyle = v >= 0 ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.7)';
    if (v >= 0) ctx.fillRect(x, mid - barH, barW, barH);
    else ctx.fillRect(x, mid, barW, barH);
  });

  // MACD line
  const macd = [0.55, 0.52, 0.48, 0.5, 0.53, 0.57, 0.55, 0.52, 0.48, 0.44, 0.46, 0.49, 0.52, 0.56, 0.54, 0.51];
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  macd.forEach((y, i) => {
    const x = (i / (macd.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  // Signal line
  const signal = [0.54, 0.53, 0.51, 0.51, 0.52, 0.54, 0.54, 0.53, 0.51, 0.48, 0.47, 0.48, 0.5, 0.52, 0.53, 0.52];
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  signal.forEach((y, i) => {
    const x = (i / (signal.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  ctx.fillStyle = '#60a5fa';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('MACD', 5, 15);
  ctx.fillStyle = '#f97316';
  ctx.fillText('Signal', 50, 15);
}

function drawBollinger(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 6) * i);
    ctx.lineTo(w, (h / 6) * i);
    ctx.stroke();
  }

  const upper = [0.2, 0.18, 0.22, 0.2, 0.18, 0.22, 0.2, 0.18, 0.22, 0.2, 0.18, 0.22, 0.2, 0.18, 0.22, 0.2];
  const mid = [0.5, 0.48, 0.52, 0.5, 0.48, 0.52, 0.5, 0.48, 0.52, 0.5, 0.48, 0.52, 0.5, 0.48, 0.52, 0.5];
  const lower = [0.8, 0.78, 0.82, 0.8, 0.78, 0.82, 0.8, 0.78, 0.82, 0.8, 0.78, 0.82, 0.8, 0.78, 0.82, 0.8];
  const price = [0.5, 0.4, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.7, 0.6, 0.5, 0.4, 0.35, 0.45, 0.55, 0.5];

  // Fill between bands
  ctx.fillStyle = 'rgba(96, 165, 250, 0.05)';
  ctx.beginPath();
  upper.forEach((y, i) => {
    const x = (i / (upper.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  lower.slice().reverse().forEach((y, i) => {
    const x = ((lower.length - 1 - i) / (lower.length - 1)) * w;
    ctx.lineTo(x, y * h);
  });
  ctx.closePath();
  ctx.fill();

  // Upper band
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  upper.forEach((y, i) => {
    const x = (i / (upper.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  // Lower band
  ctx.beginPath();
  lower.forEach((y, i) => {
    const x = (i / (lower.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // Middle (SMA)
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  mid.forEach((y, i) => {
    const x = (i / (mid.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  // Price
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  price.forEach((y, i) => {
    const x = (i / (price.length - 1)) * w;
    if (i === 0) ctx.moveTo(x, y * h);
    else ctx.lineTo(x, y * h);
  });
  ctx.stroke();

  ctx.fillStyle = '#60a5fa';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('Upper Band', 5, 15);
  ctx.fillStyle = '#c8a84b';
  ctx.fillText('SMA', 90, 15);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('Price', 120, 15);
}

function drawVolume(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  const volumes = [0.4, 0.6, 0.3, 0.8, 0.5, 0.9, 0.4, 0.7, 0.3, 0.6, 0.8, 0.5, 0.4, 0.7, 0.9, 0.6];
  const isGreen = [true, false, true, true, false, true, false, true, false, true, false, true, true, false, true, false];

  const barW = (w / volumes.length) * 0.7;
  volumes.forEach((v, i) => {
    const x = (i / volumes.length) * w + barW * 0.2;
    const barH = v * (h - 20);
    ctx.fillStyle = isGreen[i] ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.7)';
    ctx.fillRect(x, h - barH - 10, barW, barH);
  });

  // Volume MA
  const vma = [0.45, 0.5, 0.45, 0.55, 0.55, 0.65, 0.6, 0.6, 0.55, 0.55, 0.6, 0.6, 0.55, 0.55, 0.65, 0.65];
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  vma.forEach((v, i) => {
    const x = (i / (vma.length - 1)) * w;
    const y = h - v * (h - 20) - 10;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = '#22c55e';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('Buy Volume', 5, 15);
  ctx.fillStyle = '#ef4444';
  ctx.fillText('Sell Volume', 80, 15);
  ctx.fillStyle = '#c8a84b';
  ctx.fillText('Vol MA', 160, 15);
}

export default function IndicatorChart({ type, title, height = 180 }: IndicatorChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    switch (type) {
      case 'ma': drawMA(ctx, w, h); break;
      case 'rsi': drawRSI(ctx, w, h); break;
      case 'macd': drawMACD(ctx, w, h); break;
      case 'bollinger': drawBollinger(ctx, w, h); break;
      case 'volume': drawVolume(ctx, w, h); break;
    }
  }, [type]);

  return (
    <div className="rounded-lg overflow-hidden gold-border">
      <div className="px-3 py-2 bg-surface-2 border-b border-gold/10">
        <span className="text-xs font-semibold text-gold tracking-wider uppercase">{title}</span>
      </div>
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
