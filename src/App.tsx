import React, { useState } from 'react';
import { ActiveTab } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { RightTriangleCalculator } from './components/RightTriangleCalculator.tsx';
import { HeronTriangleCalculator } from './components/HeronTriangleCalculator.tsx';
import { JavaCodeViewer } from './components/JavaCodeViewer.tsx';
import { FormulaGuide } from './components/FormulaGuide.tsx';
import { HomeworkReportModal } from './components/HomeworkReportModal.tsx';
import { Award, Code2, Sparkles, Heart, FileCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('hipotenus');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Hero Sub-Banner with Enes Öztürk Signature Recognition */}
      <div className="border-b border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Java ile Dik Üçgende Hipotenüs ve Heron Formülü ile Alan Hesaplayıcı</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Geliştirici İmzası: <strong className="text-white">Enes Öztürk</strong></span>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
            >
              Ödev Teslim Metnini Gör
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'hipotenus' && (
          <RightTriangleCalculator
            onOpenJavaWithValues={() => setActiveTab('java')}
          />
        )}

        {activeTab === 'heron' && (
          <HeronTriangleCalculator
            onOpenJavaWithValues={() => setActiveTab('java')}
          />
        )}

        {activeTab === 'java' && <JavaCodeViewer />}

        {activeTab === 'rehber' && <FormulaGuide />}
      </main>

      {/* Homework Report Modal */}
      <HomeworkReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-semibold text-slate-200">
              <span>Dik Üçgende Hipotenüs ve Üçgen Alanı Hesaplama Sistemi</span>
              <span className="text-indigo-400">•</span>
              <span className="text-amber-400 font-bold">Enes Öztürk İmzalı</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Formüller: c² = a² + b² | 2u = a + b + c | Alan² = u * (u - a) * (u - b) * (u - c)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ödev Raporu</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-500 text-[11px]">Java 101 Eğitimi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
