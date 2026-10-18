import React, { useState, useMemo } from 'react';
import { calculateRightTriangle } from '../utils/geometry.ts';
import { TriangleCanvas } from './TriangleCanvas.tsx';
import { Calculator, Sparkles, BookOpen, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface RightTriangleCalculatorProps {
  onOpenJavaWithValues?: (a: number, b: number) => void;
}

const PRESETS = [
  { name: '3 - 4 - 5', a: 3, b: 4, desc: 'En meşhur temel dik üçgen' },
  { name: '5 - 12 - 13', a: 5, b: 12, desc: 'Pisagor özel üçgeni' },
  { name: '8 - 15 - 17', a: 8, b: 15, desc: 'Klasik özel üçgen' },
  { name: '7 - 24 - 25', a: 7, b: 24, desc: 'Büyük kenarlı özel üçgen' },
  { name: '6 - 8 - 10', a: 6, b: 8, desc: '3-4-5 üçgeninin 2 katı' },
  { name: '9 - 12 - 15', a: 9, b: 12, desc: '3-4-5 üçgeninin 3 katı' },
];

export const RightTriangleCalculator: React.FC<RightTriangleCalculatorProps> = ({ onOpenJavaWithValues }) => {
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);

  const result = useMemo(() => {
    return calculateRightTriangle(sideA, sideB);
  }, [sideA, sideB]);

  const handlePreset = (a: number, b: number) => {
    setSideA(a);
    setSideB(b);
  };

  const handleReset = () => {
    setSideA(3);
    setSideB(4);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-800/40 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              1. Bölüm: Pisagor Bağıntısı
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Dik Üçgende Hipotenüs Bulan Program
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Kullanıcıdan iki dik kenarın (<span className="text-indigo-300 font-mono font-semibold">a</span> ve{' '}
              <span className="text-indigo-300 font-mono font-semibold">b</span>) uzunluğunu alarak hipotenüsü{' '}
              (<span className="text-indigo-300 font-mono font-semibold">c = √(a² + b²)</span>), alanı ve çevreyi hesaplar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              title="Varsayılana sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Sıfırla
            </button>
            {onOpenJavaWithValues && (
              <button
                onClick={() => onOpenJavaWithValues(sideA, sideB)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <span>☕ Java Konsolunda Çalıştır</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-4 border-t border-indigo-800/30">
          <div className="text-xs font-semibold text-slate-400 mb-2">Popüler Özel Dik Üçgen Örnekleri:</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const isSelected = sideA === p.a && sideB === p.b;
              return (
                <button
                  key={p.name}
                  onClick={() => handlePreset(p.a, p.b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30 border border-indigo-400'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                  }`}
                  title={p.desc}
                >
                  <span className="font-mono font-semibold">{p.name}</span>
                  <span className="text-[10px] opacity-70">({p.desc})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs & Result + Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" />
              Dik Kenar Girişleri
            </h3>

            <div className="space-y-4">
              {/* Input A */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    1. Dik Kenar (a uzunluğu):
                  </label>
                  <span className="text-xs font-mono font-bold text-indigo-400">{sideA} birim</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={sideA}
                    onChange={(e) => setSideA(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    placeholder="Örn: 3"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSideA((v) => Math.max(0.5, v - 1))}
                      className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setSideA((v) => v + 1)}
                      className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={sideA}
                  onChange={(e) => setSideA(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Input B */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    2. Dik Kenar (b uzunluğu):
                  </label>
                  <span className="text-xs font-mono font-bold text-purple-400">{sideB} birim</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={sideB}
                    onChange={(e) => setSideB(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    placeholder="Örn: 4"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSideB((v) => Math.max(0.5, v - 1))}
                      className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setSideB((v) => v + 1)}
                      className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={sideB}
                  onChange={(e) => setSideB(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Quick Computed Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-800/50 rounded-2xl p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                Hesaplanan Hipotenüs (c)
              </span>
              <div className="text-2xl font-extrabold text-white font-mono mt-1">
                {result.c.toFixed(result.c % 1 === 0 ? 0 : 4)}
              </div>
              <div className="text-[11px] text-indigo-400 font-mono mt-0.5">
                c = √({(sideA * sideA + sideB * sideB).toFixed(2)})
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-800/50 rounded-2xl p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                Dik Üçgen Alanı
              </span>
              <div className="text-2xl font-extrabold text-white font-mono mt-1">
                {result.area.toFixed(result.area % 1 === 0 ? 0 : 2)}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                (a * b) / 2
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/80 to-slate-900 border border-cyan-800/50 rounded-2xl p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                Toplam Çevre
              </span>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {result.perimeter.toFixed(2)}
              </div>
              <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                a + b + c
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-950/80 to-slate-900 border border-amber-800/50 rounded-2xl p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                İç Açılar
              </span>
              <div className="text-sm font-bold text-white font-mono mt-1">
                α: {result.angleA.toFixed(1)}° | β: {result.angleB.toFixed(1)}°
              </div>
              <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                + Dik Açı (90°)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualizer & Step-by-Step (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TriangleCanvas mode="right" rightData={result} />

          {/* Step-by-Step Mathematical Solution */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Adım Adım Çözüm ve Matematiksel İşlemler
            </h3>

            <div className="space-y-3">
              {result.steps.map((st, i) => (
                <div
                  key={i}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-300">{st.title}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-1 pl-6">
                      <span className="text-indigo-300 font-semibold">{st.formula}</span>
                      <span className="mx-2 text-slate-600">→</span>
                      <span>{st.calculation}</span>
                    </div>
                  </div>

                  <div className="md:text-right pl-6 md:pl-0">
                    <span className="inline-block px-2.5 py-1 rounded bg-indigo-950 border border-indigo-800/40 text-indigo-300 font-mono text-xs font-bold">
                      {st.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
