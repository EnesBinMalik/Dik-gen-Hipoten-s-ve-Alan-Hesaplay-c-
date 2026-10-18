import React, { useState } from 'react';
import { JAVA_SNIPPETS, JavaSnippet } from '../data/javaSnippets.ts';
import { JavaTerminalSimulator } from './JavaTerminalSimulator.tsx';
import { Copy, Check, Download, Code2, Terminal, Info, CheckCircle2 } from 'lucide-react';

export const JavaCodeViewer: React.FC = () => {
  const [activeSnippetId, setActiveSnippetId] = useState<string>('heron-alan');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = JAVA_SNIPPETS.find((s) => s.id === activeSnippetId) || JAVA_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeSnippet.code], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeSnippet.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-2">
              <Code2 className="w-3.5 h-3.5" />
              Java 101 Ödev Kaynak Kodları & Çözümleri
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Java ile Dik Üçgen & Heron Alan Hesaplama Kodları
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Ödev gereksinimlerine %100 uygun, Scanner girdi kontrolleri ve üçgen eşitsizliği doğrulaması içeren,{' '}
              <span className="text-amber-300 font-semibold">Enes Öztürk imzalı</span> temiz ve çalıştırılabilir Java kodları.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Snippet Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {JAVA_SNIPPETS.map((snippet) => {
            const isActive = snippet.id === activeSnippetId;
            return (
              <button
                key={snippet.id}
                onClick={() => setActiveSnippetId(snippet.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                <span className="font-mono">{snippet.fileName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Code Editor View & Terminal Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Window Top Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 font-semibold">
                  src/{activeSnippet.fileName}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">UTF-8 • Java 11/17/21</span>
            </div>

            {/* Code Body with line numbers */}
            <div className="p-4 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto max-h-[520px] overflow-y-auto leading-relaxed selection:bg-amber-500 selection:text-slate-950">
              <pre className="grid grid-cols-[auto_1fr] gap-x-4">
                {activeSnippet.code.split('\n').map((line, idx) => {
                  // Syntax color helper
                  let lineEl = <span className="text-slate-300">{line}</span>;
                  const trimmed = line.trim();

                  if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
                    lineEl = <span className="text-slate-500 italic">{line}</span>;
                  } else if (trimmed.startsWith('import ') || trimmed.startsWith('package ')) {
                    lineEl = (
                      <span>
                        <span className="text-rose-400 font-semibold">{line.split(' ')[0]}</span>{' '}
                        <span className="text-amber-300">{line.slice(line.indexOf(' ') + 1)}</span>
                      </span>
                    );
                  } else if (trimmed.includes('public class ') || trimmed.includes('public static void ')) {
                    lineEl = <span className="text-indigo-400 font-bold">{line}</span>;
                  } else if (trimmed.includes('System.out.print')) {
                    lineEl = <span className="text-emerald-300">{line}</span>;
                  } else if (trimmed.includes('Math.sqrt') || trimmed.includes('Math.pow') || trimmed.includes('Math.hypot')) {
                    lineEl = <span className="text-cyan-300 font-medium">{line}</span>;
                  } else if (trimmed.includes('double ') || trimmed.includes('boolean ') || trimmed.includes('int ')) {
                    lineEl = <span className="text-purple-300">{line}</span>;
                  }

                  return (
                    <React.Fragment key={idx}>
                      <span className="text-slate-600 select-none text-right pr-2 font-mono text-xs">
                        {idx + 1}
                      </span>
                      <span>{lineEl}</span>
                    </React.Fragment>
                  );
                })}
              </pre>
            </div>

            {/* Footer with Author Badge */}
            <div className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{activeSnippet.description}</span>
              <span className="text-amber-400 font-semibold font-mono">✍️ Enes Öztürk İmzalı</span>
            </div>
          </div>
        </div>

        {/* Right: Terminal Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <JavaTerminalSimulator
            initialProgram={activeSnippetId === 'hipotenus' ? 'hipotenus' : 'heron'}
          />

          {/* Technical Explanations Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg text-xs space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <Info className="w-4 h-4 text-amber-400" />
              Java Kodunda Kullanılan Temel Kavramlar
            </h4>

            <div className="space-y-2">
              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="font-mono text-amber-300 font-bold block mb-0.5">
                  java.util.Scanner
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Konsol üzerinden kullanıcıdan <code className="text-indigo-300">nextDouble()</code> ile dik kenarları
                  ve üçgen kenarlarını okumak için kullanılır. İşlem bitiminde <code className="text-indigo-300">scanner.close()</code> ile kaynak serbest bırakılır.
                </p>
              </div>

              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="font-mono text-cyan-300 font-bold block mb-0.5">
                  Math.sqrt() & Math.pow()
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  <code className="text-cyan-300">Math.pow(a, 2)</code> ile karesi alınır, <code className="text-cyan-300">Math.sqrt(...)</code> ile karekök hesaplanır. Hipotenüs için alternatif olarak doğrudan <code className="text-cyan-300">Math.hypot(a, b)</code> de tercih edilebilir.
                </p>
              </div>

              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="font-mono text-emerald-300 font-bold block mb-0.5">
                  Üçgen Eşitsizliği & Hata Kontrolü
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Üçgenin çizilebilmesi için <code className="text-emerald-300">(a+b &gt; c) && (a+c &gt; b) && (b+c &gt; a)</code> koşulu şarttır. Aksi takdirde program hata mesajı vererek erken sonlanır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
