import React from 'react';
import { HeronTriangleResult, RightTriangleResult } from '../types.ts';

interface TriangleCanvasProps {
  mode: 'right' | 'heron';
  rightData?: RightTriangleResult;
  heronData?: HeronTriangleResult;
}

export const TriangleCanvas: React.FC<TriangleCanvasProps> = ({ mode, rightData, heronData }) => {
  const width = 480;
  const height = 340;
  const padding = 55;

  if (mode === 'right' && rightData) {
    const { a, b, c, angleA, angleB } = rightData;
    // Scale triangle so it fits neatly into (width - 2*padding, height - 2*padding)
    const availW = width - 2 * padding;
    const availH = height - 2 * padding;
    const scale = Math.min(availW / Math.max(b, 1), availH / Math.max(a, 1));

    const drawB = b * scale;
    const drawA = a * scale;

    // Origin of right angle at bottom-left: (x0, y0)
    const x0 = padding;
    const y0 = height - padding;

    // Vertex 1: Right angle corner (C)
    const pC = { x: x0, y: y0 };
    // Vertex 2: Horizontal end along base (B)
    const pB = { x: x0 + drawB, y: y0 };
    // Vertex 3: Top vertical end along height (A)
    const pA = { x: x0, y: y0 - drawA };

    // Right angle square marker size
    const sq = Math.min(20, Math.min(drawA, drawB) * 0.25);

    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-950/60 p-4 shadow-xl shadow-indigo-950/20 backdrop-blur-sm">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Dinamik Geometrik Çizim & Pisagor Bağıntısı
            </h4>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
            C = 90°
          </span>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[340px] select-none"
        >
          <defs>
            <linearGradient id="rightTriangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(148, 163, 184, 0.07)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width={width} height={height} fill="url(#gridPattern)" rx="12" />

          {/* Triangle Shape */}
          <polygon
            points={`${pC.x},${pC.y} ${pB.x},${pB.y} ${pA.x},${pA.y}`}
            fill="url(#rightTriangleGrad)"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Right Angle Marker (square at corner C) */}
          <polyline
            points={`${pC.x},${pC.y - sq} ${pC.x + sq},${pC.y - sq} ${pC.x + sq},${pC.y}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <circle cx={pC.x + sq / 2} cy={pC.y - sq / 2} r="2" fill="#38bdf8" />

          {/* Side Labels */}
          {/* Vertical side: a */}
          <g>
            <rect
              x={pC.x - 48}
              y={(pC.y + pA.y) / 2 - 14}
              width="44"
              height="28"
              rx="6"
              fill="#0f172a"
              stroke="#64748b"
              strokeWidth="1"
            />
            <text
              x={pC.x - 26}
              y={(pC.y + pA.y) / 2 + 5}
              fill="#94a3b8"
              fontSize="12"
              fontWeight="600"
              fontFamily="Fira Code"
              textAnchor="middle"
            >
              a={a}
            </text>
          </g>

          {/* Horizontal side: b */}
          <g>
            <rect
              x={(pC.x + pB.x) / 2 - 24}
              y={pC.y + 12}
              width="48"
              height="28"
              rx="6"
              fill="#0f172a"
              stroke="#64748b"
              strokeWidth="1"
            />
            <text
              x={(pC.x + pB.x) / 2}
              y={pC.y + 31}
              fill="#94a3b8"
              fontSize="12"
              fontWeight="600"
              fontFamily="Fira Code"
              textAnchor="middle"
            >
              b={b}
            </text>
          </g>

          {/* Hypotenuse side: c */}
          <g>
            <rect
              x={(pA.x + pB.x) / 2 + 10}
              y={(pA.y + pB.y) / 2 - 20}
              width="90"
              height="30"
              rx="6"
              fill="#1e1b4b"
              stroke="#818cf8"
              strokeWidth="1.5"
            />
            <text
              x={(pA.x + pB.x) / 2 + 55}
              y={(pA.y + pB.y) / 2}
              fill="#c7d2fe"
              fontSize="12"
              fontWeight="700"
              fontFamily="Fira Code"
              textAnchor="middle"
            >
              c={c.toFixed(2)}
            </text>
          </g>

          {/* Vertices Dots & Labels */}
          <circle cx={pC.x} cy={pC.y} r="5" fill="#38bdf8" />
          <text x={pC.x - 14} y={pC.y + 18} fill="#38bdf8" fontSize="13" fontWeight="bold">C</text>

          <circle cx={pB.x} cy={pB.y} r="5" fill="#818cf8" />
          <text x={pB.x + 10} y={pB.y + 16} fill="#818cf8" fontSize="13" fontWeight="bold">B (β={angleB.toFixed(1)}°)</text>

          <circle cx={pA.x} cy={pA.y} r="5" fill="#a78bfa" />
          <text x={pA.x - 4} y={pA.y - 12} fill="#a78bfa" fontSize="13" fontWeight="bold">A (α={angleA.toFixed(1)}°)</text>

          {/* Center Area Badge */}
          <g transform={`translate(${(pC.x + pB.x + pA.x) / 3 - 35}, ${(pC.y + pB.y + pA.y) / 3 - 12})`}>
            <rect width="70" height="24" rx="4" fill="#090d16" fillOpacity="0.8" stroke="#312e81" strokeWidth="1" />
            <text x="35" y="16" fill="#a5b4fc" fontSize="10" fontFamily="Fira Code" textAnchor="middle">
              Alan={rightData.area.toFixed(2)}
            </text>
          </g>
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-mono px-2">
          <span>Hipotenüs (c) = √(a² + b²) = {c.toFixed(4)}</span>
          <span className="text-emerald-400">c² = {Math.round(c * c * 100) / 100}</span>
        </div>
      </div>
    );
  }

  // Heron Mode
  if (mode === 'heron' && heronData) {
    if (!heronData.isValid) {
      return (
        <div className="w-full rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-950 border border-rose-900/40 p-6 text-center shadow-xl">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-rose-900/40 border border-rose-700/60 flex items-center justify-center text-rose-400 text-2xl">
            ⚠️
          </div>
          <h4 className="text-base font-semibold text-rose-300 mb-2">Üçgen Oluşturulamıyor</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-4">
            {heronData.invalidReason}
          </p>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 max-w-sm mx-auto text-left space-y-1">
            <p>• a = {heronData.a}, b = {heronData.b}, c = {heronData.c}</p>
            <p>• Üçgen Eşitsizliği Şartı:</p>
            <p className="pl-3 text-slate-400">|a - b| &lt; c &lt; a + b</p>
          </div>
        </div>
      );
    }

    const { a, b, c, angleA, angleB, angleC, area, triangleSideType, triangleAngleType } = heronData;

    // Use side c along the bottom base from (0,0) to (c,0)
    // Vertex A is at (0,0), Vertex B is at (c, 0)
    // Vertex C (opposite to side c) coordinates:
    // x = (b² + c² - a²) / (2c)
    // y = Math.sqrt(Math.max(0, b² - x²))
    const xC = (b * b + c * c - a * a) / (2 * c);
    const yC = Math.sqrt(Math.max(0, b * b - xC * xC));

    // Points in untransformed coordinates:
    // P_A = (0, 0)
    // P_B = (c, 0)
    // P_C = (xC, yC)
    const minX = Math.min(0, c, xC);
    const maxX = Math.max(0, c, xC);
    const minY = 0;
    const maxY = yC;

    const shapeW = Math.max(0.1, maxX - minX);
    const shapeH = Math.max(0.1, maxY - minY);

    const availW = width - 2 * padding;
    const availH = height - 2 * padding;
    const scale = Math.min(availW / shapeW, availH / Math.max(shapeH, shapeW * 0.25));

    // Flip Y because SVG Y is down
    const pA = {
      x: padding + (0 - minX) * scale,
      y: height - padding - (0 - minY) * scale,
    };
    const pB = {
      x: padding + (c - minX) * scale,
      y: height - padding - (0 - minY) * scale,
    };
    const pC = {
      x: padding + (xC - minX) * scale,
      y: height - padding - (yC - minY) * scale,
    };

    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-950/60 p-4 shadow-xl shadow-emerald-950/20 backdrop-blur-sm">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Heron Üçgeni Geometrik Görünümü
            </h4>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/40">
              {triangleSideType}
            </span>
            <span className="text-xs font-medium text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
              {triangleAngleType}
            </span>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[340px] select-none">
          <defs>
            <linearGradient id="heronTriangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
            <pattern id="gridPatternHeron" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(148, 163, 184, 0.07)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width={width} height={height} fill="url(#gridPatternHeron)" rx="12" />

          {/* Triangle Shape */}
          <polygon
            points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
            fill="url(#heronTriangleGrad)"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Base side c (between A and B) */}
          <g>
            <rect
              x={(pA.x + pB.x) / 2 - 24}
              y={pA.y + 10}
              width="50"
              height="26"
              rx="6"
              fill="#0f172a"
              stroke="#64748b"
              strokeWidth="1"
            />
            <text
              x={(pA.x + pB.x) / 2 + 1}
              y={pA.y + 27}
              fill="#6ee7b7"
              fontSize="12"
              fontWeight="600"
              fontFamily="Fira Code"
              textAnchor="middle"
            >
              c={c}
            </text>
          </g>

          {/* Side b (between A and C) */}
          <g>
            <rect
              x={(pA.x + pC.x) / 2 - 34}
              y={(pA.y + pC.y) / 2 - 14}
              width="48"
              height="26"
              rx="6"
              fill="#0f172a"
              stroke="#64748b"
              strokeWidth="1"
            />
            <text
              x={(pA.x + pC.x) / 2 - 10}
              y={(pA.y + pC.y) / 2 + 3}
              fill="#6ee7b7"
              fontSize="12"
              fontWeight="600"
              fontFamily="Fira Code"
              textAnchor="middle"
            >
              b={b}
            </text>
          </g>

          {/* Side a (between B and C) */}
          <g>
            <rect
              x={(pB.x + pC.x) / 2 + 6}
              y={(pB.y + pC.y) / 2 - 14}
              width="48"
              height="26"
              rx="6"
              fill="#0f172a"
              stroke="#64748b"
              strokeWidth="1"
            />
            <text
              x={(pB.x + pC.x) / 2 + 30}
              y={(pB.y + pC.y) / 2 + 3}
              fill="#6ee7b7"
              fontSize="12"
              fontWeight="600"
              fontFamily="Fira Code"
              textAnchor="middle"
            >
              a={a}
            </text>
          </g>

          {/* Vertices */}
          <circle cx={pA.x} cy={pA.y} r="5" fill="#10b981" />
          <text x={pA.x - 12} y={pA.y + 18} fill="#10b981" fontSize="13" fontWeight="bold">A</text>

          <circle cx={pB.x} cy={pB.y} r="5" fill="#06b6d4" />
          <text x={pB.x + 8} y={pB.y + 18} fill="#06b6d4" fontSize="13" fontWeight="bold">B</text>

          <circle cx={pC.x} cy={pC.y} r="5" fill="#38bdf8" />
          <text x={pC.x} y={pC.y - 12} fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">C</text>

          {/* Center Area Badge */}
          <g transform={`translate(${(pA.x + pB.x + pC.x) / 3 - 42}, ${(pA.y + pB.y + pC.y) / 3 - 12})`}>
            <rect width="84" height="26" rx="6" fill="#064e3b" fillOpacity="0.85" stroke="#059669" strokeWidth="1" />
            <text x="42" y="17" fill="#a7f3d0" fontSize="11" fontWeight="600" fontFamily="Fira Code" textAnchor="middle">
              Alan={area.toFixed(2)}
            </text>
          </g>
        </svg>

        <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono px-2 gap-2">
          <span>Açılar: A={angleA.toFixed(1)}° | B={angleB.toFixed(1)}° | C={angleC.toFixed(1)}°</span>
          <span className="text-emerald-400">Çevre (2u) = {heronData.perimeter.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  return null;
};
