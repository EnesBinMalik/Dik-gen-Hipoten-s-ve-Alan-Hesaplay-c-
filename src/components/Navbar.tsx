import React from 'react';
import { ActiveTab } from '../types.ts';
import { Triangle, Code2, BookOpen, Award, FileText, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Triangle className="w-5 h-5 text-indigo-400 rotate-180" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  GeoJava <span className="text-indigo-400 font-medium text-xs sm:text-sm">| Hipotenüs & Alan</span>
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Java 101 Ödevi
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pisagor Bağıntısı & Heron Formülü Hesaplayıcı
              </p>
            </div>
          </div>

          {/* Author Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-900/40 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              EÖ
            </div>
            <div className="text-left text-xs">
              <div className="text-[10px] text-slate-400 leading-tight">Hazırlayan & İmzalı</div>
              <div className="font-bold text-slate-200">Enes Öztürk</div>
            </div>
          </div>

          {/* Action: Open Homework Report Modal */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/20 transition cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">İmzalı Ödev Belgesi</span>
              <span className="sm:hidden">Ödev Belgesi</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar gap-1 sm:gap-2 pb-2.5 pt-1 border-t border-slate-900">
          <button
            onClick={() => setActiveTab('hipotenus')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'hipotenus'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Triangle className="w-4 h-4" />
            <span>1. Dik Üçgende Hipotenüs</span>
          </button>

          <button
            onClick={() => setActiveTab('heron')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'heron'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>2. Heron Üçgen Alanı (Ödev)</span>
          </button>

          <button
            onClick={() => setActiveTab('java')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'java'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>3. Java Kaynak Kodları & Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('rehber')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'rehber'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>4. Formüller ve Konu Anlatımı</span>
          </button>
        </div>
      </div>
    </header>
  );
};
