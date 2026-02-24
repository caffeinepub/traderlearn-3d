import { useRef, useEffect } from 'react';

interface DiagramData {
  type: 'smt-divergence' | 'order-block' | 'fvg' | 'market-structure' | 'support-resistance';
  title: string;
}

interface ConceptDiagramProps {
  data: DiagramData;
  height?: number;
}

function drawSMTDivergence(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  // Background
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const y = (h / 8) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Asset A line (bullish)
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const pointsA = [
    [0.05, 0.7], [0.15, 0.5], [0.25, 0.65], [0.35, 0.4], [0.45, 0.55],
    [0.55, 0.3], [0.65, 0.45], [0.75, 0.2], [0.85, 0.35], [0.95, 0.15]
  ];
  pointsA.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x * w, y * h);
    else ctx.lineTo(x * w, y * h);
  });
  ctx.stroke();

  // Asset B line (bearish divergence)
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  const pointsB = [
    [0.05, 0.7], [0.15, 0.55], [0.25, 0.65], [0.35, 0.5], [0.45, 0.6],
    [0.55, 0.55], [0.65, 0.65], [0.75, 0.6], [0.85, 0.7], [0.95, 0.65]
  ];
  pointsB.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x * w, y * h);
    else ctx.lineTo(x * w, y * h);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.fillStyle = '#22c55e';
  ctx.font = '11px Space Grotesk, sans-serif';
  ctx.fillText('Asset A (Higher High)', 10, 20);
  ctx.fillStyle = '#ef4444';
  ctx.fillText('Asset B (Lower High) — SMT Divergence', 10, 36);

  // Arrow pointing to divergence
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.75, h * 0.2);
  ctx.lineTo(w * 0.75, h * 0.6);
  ctx.stroke();
  ctx.fillStyle = '#c8a84b';
  ctx.font = 'bold 10px Space Grotesk, sans-serif';
  ctx.fillText('DIVERGENCE', w * 0.77, h * 0.42);
}

function drawOrderBlock(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 8) * i);
    ctx.lineTo(w, (h / 8) * i);
    ctx.stroke();
  }

  // Order block zone
  ctx.fillStyle = 'rgba(200, 168, 75, 0.15)';
  ctx.fillRect(w * 0.1, h * 0.55, w * 0.25, h * 0.15);
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(w * 0.1, h * 0.55, w * 0.25, h * 0.15);

  // Candles before OB
  const candles = [
    { x: 0.12, open: 0.75, close: 0.65, high: 0.62, low: 0.78, green: true },
    { x: 0.18, open: 0.65, close: 0.58, high: 0.55, low: 0.68, green: true },
    { x: 0.24, open: 0.58, close: 0.62, high: 0.56, low: 0.65, green: false },
    { x: 0.30, open: 0.62, close: 0.55, high: 0.52, low: 0.65, green: true },
  ];

  candles.forEach(c => {
    const x = c.x * w;
    const bw = 12;
    ctx.strokeStyle = c.green ? '#22c55e' : '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, c.high * h);
    ctx.lineTo(x, c.low * h);
    ctx.stroke();
    ctx.fillStyle = c.green ? '#22c55e' : '#ef4444';
    const top = Math.min(c.open, c.close) * h;
    const ht = Math.abs(c.open - c.close) * h;
    ctx.fillRect(x - bw / 2, top, bw, ht || 2);
  });

  // Price moves up after OB
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w * 0.38, h * 0.55);
  ctx.lineTo(w * 0.5, h * 0.4);
  ctx.lineTo(w * 0.6, h * 0.3);
  ctx.lineTo(w * 0.7, h * 0.2);
  ctx.lineTo(w * 0.85, h * 0.15);
  ctx.stroke();

  // Labels
  ctx.fillStyle = '#c8a84b';
  ctx.font = 'bold 10px Space Grotesk, sans-serif';
  ctx.fillText('ORDER BLOCK', w * 0.1, h * 0.52);
  ctx.fillStyle = '#22c55e';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('Price respects OB → Bullish move', w * 0.38, h * 0.38);
}

function drawFVG(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 8) * i);
    ctx.lineTo(w, (h / 8) * i);
    ctx.stroke();
  }

  // FVG zone
  ctx.fillStyle = 'rgba(96, 165, 250, 0.15)';
  ctx.fillRect(w * 0.35, h * 0.35, w * 0.15, h * 0.15);
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.strokeRect(w * 0.35, h * 0.35, w * 0.15, h * 0.15);
  ctx.setLineDash([]);

  // Candles
  const cData = [
    { x: 0.15, o: 0.7, c: 0.65, h: 0.62, l: 0.73 },
    { x: 0.25, o: 0.65, c: 0.55, h: 0.52, l: 0.68 },
    { x: 0.35, o: 0.55, c: 0.38, h: 0.35, l: 0.58 },
    { x: 0.55, o: 0.38, c: 0.45, h: 0.36, l: 0.48 },
    { x: 0.65, o: 0.45, c: 0.42, h: 0.4, l: 0.48 },
    { x: 0.75, o: 0.42, c: 0.38, h: 0.36, l: 0.45 },
  ];

  cData.forEach(c => {
    const x = c.x * w;
    const bw = 14;
    const isGreen = c.c < c.o;
    ctx.strokeStyle = isGreen ? '#22c55e' : '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, c.h * h);
    ctx.lineTo(x, c.l * h);
    ctx.stroke();
    ctx.fillStyle = isGreen ? '#22c55e' : '#ef4444';
    const top = Math.min(c.o, c.c) * h;
    const ht = Math.abs(c.o - c.c) * h;
    ctx.fillRect(x - bw / 2, top, bw, ht || 2);
  });

  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 10px Space Grotesk, sans-serif';
  ctx.fillText('FAIR VALUE GAP', w * 0.35, h * 0.32);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('Imbalance zone — price may return to fill', w * 0.05, h * 0.92);
}

function drawMarketStructure(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 8) * i);
    ctx.lineTo(w, (h / 8) * i);
    ctx.stroke();
  }

  // Uptrend structure
  const pts = [
    [0.05, 0.8], [0.15, 0.65], [0.22, 0.72], [0.32, 0.55],
    [0.4, 0.62], [0.5, 0.42], [0.58, 0.5], [0.68, 0.3],
    [0.75, 0.38], [0.85, 0.2], [0.95, 0.28]
  ];

  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x * w, y * h);
    else ctx.lineTo(x * w, y * h);
  });
  ctx.stroke();

  // HH/HL labels
  const labels = [
    { x: 0.15, y: 0.65, label: 'HH', color: '#22c55e' },
    { x: 0.22, y: 0.72, label: 'HL', color: '#60a5fa' },
    { x: 0.32, y: 0.55, label: 'HH', color: '#22c55e' },
    { x: 0.4, y: 0.62, label: 'HL', color: '#60a5fa' },
    { x: 0.5, y: 0.42, label: 'HH', color: '#22c55e' },
    { x: 0.58, y: 0.5, label: 'HL', color: '#60a5fa' },
    { x: 0.68, y: 0.3, label: 'HH', color: '#22c55e' },
  ];

  labels.forEach(({ x, y, label, color }) => {
    ctx.fillStyle = color;
    ctx.font = 'bold 9px Space Grotesk, sans-serif';
    ctx.fillText(label, x * w - 8, y * h - 6);
    ctx.beginPath();
    ctx.arc(x * w, y * h, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Space Grotesk, sans-serif';
  ctx.fillText('HH = Higher High  |  HL = Higher Low  →  Bullish Structure', 10, h - 10);
}

function drawSupportResistance(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#1a2030';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (h / 8) * i);
    ctx.lineTo(w, (h / 8) * i);
    ctx.stroke();
  }

  // Resistance line
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(0, h * 0.3);
  ctx.lineTo(w, h * 0.3);
  ctx.stroke();

  // Support line
  ctx.strokeStyle = '#22c55e';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.7);
  ctx.lineTo(w, h * 0.7);
  ctx.stroke();
  ctx.setLineDash([]);

  // Price bouncing
  const pricePts = [
    [0.05, 0.65], [0.15, 0.5], [0.22, 0.32], [0.3, 0.45],
    [0.38, 0.68], [0.45, 0.72], [0.52, 0.55], [0.6, 0.32],
    [0.68, 0.42], [0.75, 0.65], [0.82, 0.72], [0.9, 0.55], [0.95, 0.35]
  ];

  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  pricePts.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x * w, y * h);
    else ctx.lineTo(x * w, y * h);
  });
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 10px Space Grotesk, sans-serif';
  ctx.fillText('RESISTANCE', w * 0.02, h * 0.27);
  ctx.fillStyle = '#22c55e';
  ctx.fillText('SUPPORT', w * 0.02, h * 0.67);
}

export default function ConceptDiagram({ data, height = 200 }: ConceptDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    switch (data.type) {
      case 'smt-divergence':
        drawSMTDivergence(ctx, w, h);
        break;
      case 'order-block':
        drawOrderBlock(ctx, w, h);
        break;
      case 'fvg':
        drawFVG(ctx, w, h);
        break;
      case 'market-structure':
        drawMarketStructure(ctx, w, h);
        break;
      case 'support-resistance':
        drawSupportResistance(ctx, w, h);
        break;
    }
  }, [data.type]);

  return (
    <div className="rounded-lg overflow-hidden gold-border">
      <div className="px-3 py-2 bg-surface-2 border-b border-gold/10">
        <span className="text-xs font-semibold text-gold tracking-wider uppercase">{data.title}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={height}
        className="w-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
