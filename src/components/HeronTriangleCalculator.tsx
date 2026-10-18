import React, { useState, useMemo } from 'react';
import { calculateHeronTriangle } from '../utils/geometry.ts';
import { TriangleCanvas } from './TriangleCanvas.tsx';
import { Award, BookOpen, AlertCircle, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface HeronTriangleCalculatorProps {
  onOpenJavaWithValues?: (a: number, b: number, c: number) => void;
}

const HERON_PRESETS = [
  { name: '13 - 14 - 15', a: 13, b: 14, c: 15, desc: 'Tam sayılı alan = 84' },
  { name: '5 - 5 - 6', a: 5, b: 5, c: 6, desc: 'İkizkenar üçgen (Alan = 12)' },
  { name: '3 - 4 - 5', a: 3, b: 4, c: 5, desc: 'Dik üçgen sağlama (Alan = 6)' },
  { name: '6 - 6 - 6', a: 6, b: 6, c: 6, desc: 'Eşkenar üçgen' },
  { name: '7 - 8 - 9', a: 7, b: 8, c: 9, desc: 'Çeşitkenar üçgen' },
  { name: '2 - 3 - 10', a: 2, b: 3, c: 10, desc: 'Eşitsizlik ihlali (Test)' },
];

export const HeronTriangleCalculator: React.FC<HeronTriangleCalculatorProps> = ({ onOpenJavaWithValues }) => {
  const [sideA, setSideA] = useState<number>(13);
  const [sideB, setSideB] = useState<number>(14);
  const [sideC, setSideC] = useState<number>(15);

  const result = useMemo(() => {
    return calculateHeronTriangle(sideA, sideB, sideC);
  }, [sideA, sideB, sideC]);

  const handlePreset = (a: number, b: number, c: number) => {
    setSideA(a);
    setSideB(b);
    setSideC(c);
  };

  const handleReset = () => {
    setSideA(13);
    setSideB(14);
    setSideC(15);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900/60 border border-emerald-800/40 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              2. Bölüm: Ödev Çözümü (Heron Formülü)
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Üç Kenarı Verilen Üçgenin Alanını Hesaplayan Program
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Kullanıcıdan alınan <span className="font-mono text-emerald-300 font-semibold">a, b, c</span> kenar uzunlukları ile{' '}
              <span className="font-mono text-emerald-300 font-semibold">Çevre = 2u</span>,{' '}
              <span className="font-mono text-emerald-300 font-semibold">u = (a+b+c)/2</span> ve{' '}
              <span className="font-mono text-emerald-300 font-semibold">Alan² = u*(u-a)*(u-b)*(u-c)</span> formülüyle alanı hesaplar.
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
            {onOpenJavaWithValues && result.isValid && (
              <button
                onClick={() => onOpenJavaWithValues(sideA, sideB, sideC)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition cursor-pointer"
              >
                <span>☕ Java Konsolunda Test Et</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-4 border-t border-emerald-800/30">
          <div className="text-xs font-semibold text-slate-400 mb-2">Popüler Test Değerleri ve Özel Durumlar:</div>
          <div className="flex flex-wrap gap-2">
            {HERON_PRESETS.map((p) => {
              const isSelected = sideA === p.a && sideB === p.b && sideC === p.c;
              return (
                <button
                  key={p.name}
                  onClick={() => handlePreset(p.a, p.b, p.c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 border border-emerald-400'
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: 3 Inputs & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Üç Kenar Uzunluğu Girişi
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {result.isValid ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Geçerli Üçgen
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Geçersiz
                  </span>
                )}
              </span>
            </div>

            <div className="space-y-4">
              {/* Kenar A */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-300">a Kenarı Uzunluğu:</label>
                  <span className="text-xs font-mono font-bold text-emerald-400">{sideA} birim</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={sideA}
                    onChange={(e) => setSideA(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSideA((v) => Math.max(1, v - 1))}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setSideA((v) => v + 1)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={sideA}
                  onChange={(e) => setSideA(parseFloat(e.target.value))}
                  className="w-full mt-1.5 accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Kenar B */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-300">b Kenarı Uzunluğu:</label>
                  <span className="text-xs font-mono font-bold text-teal-400">{sideB} birim</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={sideB}
                    onChange={(e) => setSideB(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSideB((v) => Math.max(1, v - 1))}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setSideB((v) => v + 1)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={sideB}
                  onChange={(e) => setSideB(parseFloat(e.target.value))}
                  className="w-full mt-1.5 accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Kenar C */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-300">c Kenarı Uzunluğu:</label>
                  <span className="text-xs font-mono font-bold text-cyan-400">{sideC} birim</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={sideC}
                    onChange={(e) => setSideC(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSideC((v) => Math.max(1, v - 1))}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setSideC((v) => v + 1)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={sideC}
                  onChange={(e) => setSideC(parseFloat(e.target.value))}
                  className="w-full mt-1.5 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Triangle Inequality Status Helper */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>a + b &gt; c : {sideA} + {sideB} = {sideA + sideB} &gt; {sideC}</span>
                <span className={sideA + sideB > sideC ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                  {sideA + sideB > sideC ? '✓ Sağlar' : '✗ Bozar'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>a + c &gt; b : {sideA} + {sideC} = {sideA + sideC} &gt; {sideB}</span>
                <span className={sideA + sideC > sideB ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                  {sideA + sideC > sideB ? '✓ Sağlar' : '✗ Bozar'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>b + c &gt; a : {sideB} + {sideC} = {sideB + sideC} &gt; {sideA}</span>
                <span className={sideB + sideC > sideA ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                  {sideB + sideC > sideA ? '✓ Sağlar' : '✗ Bozar'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          {result.isValid && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-800/50 rounded-2xl p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  Hesaplanan Alan
                </span>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  {result.area.toFixed(result.area % 1 === 0 ? 0 : 4)}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  √(Alan²) birim²
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-950/80 to-slate-900 border border-teal-800/50 rounded-2xl p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
                  Alanın Karesi (Alan²)
                </span>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  {result.areaSquared.toFixed(2)}
                </div>
                <div className="text-[11px] text-teal-400 font-mono mt-0.5">
                  u*(u-a)*(u-b)*(u-c)
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-950/80 to-slate-900 border border-cyan-800/50 rounded-2xl p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                  Çevre (2u)
                </span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {result.perimeter.toFixed(2)}
                </div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                  a + b + c
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-800/50 rounded-2xl p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                  Yarı Çevre (u)
                </span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {result.u.toFixed(2)}
                </div>
                <div className="text-[11px] text-indigo-400 font-mono mt-0.5">
                  (a + b + c) / 2
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Visualizer & Step-by-Step Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TriangleCanvas mode="heron" heronData={result} />

          {result.isValid && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Ödev Formülü Adım Adım İşlem Çizelgesi
              </h3>

              <div className="space-y-2.5">
                {result.steps.map((st, i) => (
                  <div
                    key={i}
                    className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-semibold text-slate-300">{st.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-1 pl-6">
                        <span className="text-emerald-300 font-semibold">{st.formula}</span>
                        <span className="mx-2 text-slate-600">→</span>
                        <span>{st.calculation}</span>
                      </div>
                    </div>

                    <div className="md:text-right pl-6 md:pl-0">
                      <span className="inline-block px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800/40 text-emerald-300 font-mono text-xs font-bold">
                        {st.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mathematical Formula Reminder Box */}
              <div className="mt-4 p-3.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs space-y-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Ödevde Verilen Kesin Formül Eşleşmesi:
                </span>
                <p className="font-mono text-emerald-300">
                  Üçgenin Çevresi = 2u = {result.perimeter.toFixed(2)}
                </p>
                <p className="font-mono text-emerald-300">
                  u = (a+b+c) / 2 = {result.u.toFixed(2)}
                </p>
                <p className="font-mono text-emerald-300">
                  Alan * Alan = {result.u.toFixed(2)} * {(result.diffA).toFixed(2)} * {(result.diffB).toFixed(2)} * {(result.diffC).toFixed(2)} = {result.areaSquared.toFixed(4)}
                </p>
                <p className="font-mono text-emerald-300 font-bold">
                  Alan = √({result.areaSquared.toFixed(4)}) = {result.area.toFixed(4)} birimkare
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
