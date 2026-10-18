import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

interface JavaTerminalSimulatorProps {
  initialProgram?: 'hipotenus' | 'heron';
  initialValues?: { a?: number; b?: number; c?: number };
}

type ProgramType = 'hipotenus' | 'heron';

export const JavaTerminalSimulator: React.FC<JavaTerminalSimulatorProps> = ({
  initialProgram = 'hipotenus',
  initialValues,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramType>(initialProgram);
  const [step, setStep] = useState<number>(0);
  const [inputs, setInputs] = useState<{ a: string; b: string; c: string }>({
    a: initialValues?.a?.toString() || '3',
    b: initialValues?.b?.toString() || '4',
    c: initialValues?.c?.toString() || '5',
  });
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Sync if props change
  useEffect(() => {
    if (initialProgram) {
      setSelectedProgram(initialProgram);
    }
  }, [initialProgram]);

  useEffect(() => {
    if (initialValues) {
      setInputs({
        a: initialValues.a !== undefined ? initialValues.a.toString() : '3',
        b: initialValues.b !== undefined ? initialValues.b.toString() : '4',
        c: initialValues.c !== undefined ? initialValues.c.toString() : '5',
      });
    }
  }, [initialValues]);

  // Scroll terminal to bottom
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const startProgram = (prog = selectedProgram) => {
    setIsRunning(true);
    setStep(1);
    setCurrentInputValue('');

    if (prog === 'hipotenus') {
      setTerminalLines([
        `$ javac HipotenusHesaplama.java && java HipotenusHesaplama`,
        `==================================================`,
        `      DİK ÜÇGENDE HİPOTENÜS HESAPLAMA PROGRAMI    `,
        `              Hazırlayan: Enes Öztürk             `,
        `==================================================`,
        `1. Dik kenar uzunluğunu (a) giriniz: `,
      ]);
    } else {
      setTerminalLines([
        `$ javac UcgenAlanHesaplama.java && java UcgenAlanHesaplama`,
        `==================================================`,
        `     ÜÇGENİN ALANINI HESAPLAYAN PROGRAM (ÖDEV)    `,
        `              Hazırlayan: Enes Öztürk             `,
        `==================================================`,
        `a kenarının uzunluğunu giriniz: `,
      ]);
    }
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isRunning) return;

    const val = currentInputValue.trim();
    if (!val) return;

    const num = parseFloat(val);
    if (isNaN(num)) {
      setTerminalLines((prev) => [...prev, `> ${val}`, `Hata: Lütfen geçerli bir sayı giriniz!`]);
      setCurrentInputValue('');
      return;
    }

    if (selectedProgram === 'hipotenus') {
      if (step === 1) {
        setInputs((prev) => ({ ...prev, a: val }));
        setTerminalLines((prev) => [
          ...prev.slice(0, -1),
          `1. Dik kenar uzunluğunu (a) giriniz: ${val}`,
          `2. Dik kenar uzunluğunu (b) giriniz: `,
        ]);
        setStep(2);
        setCurrentInputValue('');
      } else if (step === 2) {
        const a = parseFloat(inputs.a);
        const b = num;
        setInputs((prev) => ({ ...prev, b: val }));

        if (a <= 0 || b <= 0) {
          setTerminalLines((prev) => [
            ...prev.slice(0, -1),
            `2. Dik kenar uzunluğunu (b) giriniz: ${val}`,
            `\nHata: Kenar uzunlukları sıfırdan büyük olmalıdır!`,
            `İşlem sonlandırıldı.`,
          ]);
          setIsRunning(false);
          setStep(0);
          return;
        }

        const hipotenus = Math.sqrt(a * a + b * b);
        const cevre = a + b + hipotenus;
        const alan = (a * b) / 2.0;

        setTerminalLines((prev) => [
          ...prev.slice(0, -1),
          `2. Dik kenar uzunluğunu (b) giriniz: ${val}`,
          `\n----------------- HESAPLAMA SONUÇLARI -----------------`,
          `1. Dik Kenar (a)       : ${a.toFixed(2)}`,
          `2. Dik Kenar (b)       : ${b.toFixed(2)}`,
          `Hesaplanan Hipotenüs (c): ${hipotenus.toFixed(4)}`,
          `Üçgenin Çevresi        : ${cevre.toFixed(2)}`,
          `Üçgenin Alanı          : ${alan.toFixed(2)}`,
          `-------------------------------------------------------`,
          `Programı hazırlayan: Enes Öztürk | Başarılar!`,
          `[Program başarıyla tamamlandı (Çıkış kodu: 0)]`,
        ]);
        setIsRunning(false);
        setStep(0);
        setCurrentInputValue('');
      }
    } else {
      // Heron Alan
      if (step === 1) {
        setInputs((prev) => ({ ...prev, a: val }));
        setTerminalLines((prev) => [
          ...prev.slice(0, -1),
          `a kenarının uzunluğunu giriniz: ${val}`,
          `b kenarının uzunluğunu giriniz: `,
        ]);
        setStep(2);
        setCurrentInputValue('');
      } else if (step === 2) {
        setInputs((prev) => ({ ...prev, b: val }));
        setTerminalLines((prev) => [
          ...prev.slice(0, -1),
          `b kenarının uzunluğunu giriniz: ${val}`,
          `c kenarının uzunluğunu giriniz: `,
        ]);
        setStep(3);
        setCurrentInputValue('');
      } else if (step === 3) {
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        const c = num;
        setInputs((prev) => ({ ...prev, c: val }));

        if (a <= 0 || b <= 0 || c <= 0) {
          setTerminalLines((prev) => [
            ...prev.slice(0, -1),
            `c kenarının uzunluğunu giriniz: ${val}`,
            `\nHATA: Üçgenin kenar uzunlukları daima sıfırdan büyük olmalıdır!`,
            `İşlem sonlandırıldı.`,
          ]);
          setIsRunning(false);
          setStep(0);
          return;
        }

        const ucgenMi = a + b > c && a + c > b && b + c > a;
        if (!ucgenMi) {
          setTerminalLines((prev) => [
            ...prev.slice(0, -1),
            `c kenarının uzunluğunu giriniz: ${val}`,
            `\nHATA: Girilen kenar uzunlukları bir üçgen oluşturmaz!`,
            `Üçgen Eşitsizliği Kuralı: İki kenarın toplamı üçüncü kenardan büyük olmalıdır.`,
            `İşlem sonlandırıldı.`,
          ]);
          setIsRunning(false);
          setStep(0);
          return;
        }

        const cevre = a + b + c;
        const u = cevre / 2.0;
        const alanKare = u * (u - a) * (u - b) * (u - c);
        const alan = Math.sqrt(alanKare);

        setTerminalLines((prev) => [
          ...prev.slice(0, -1),
          `c kenarının uzunluğunu giriniz: ${val}`,
          `\n---------------- HESAPLAMA ADIMLARI ----------------`,
          `1. Kenarlar (a, b, c)  : ${a.toFixed(2)}, ${b.toFixed(2)}, ${c.toFixed(2)}`,
          `2. Çevre (2u)          : ${cevre.toFixed(2)} birim`,
          `3. Yarı Çevre (u)      : ${u.toFixed(2)} birim`,
          `4. (u - a)             : ${(u - a).toFixed(2)}`,
          `   (u - b)             : ${(u - b).toFixed(2)}`,
          `   (u - c)             : ${(u - c).toFixed(2)}`,
          `5. Alan² (u*(u-a)*...) : ${alanKare.toFixed(4)}`,
          `6. Üçgenin Alanı       : ${alan.toFixed(4)} birimkare`,
          `-----------------------------------------------------`,
          `İmza: Enes Öztürk - Başarıyla tamamlandı.`,
          `[Program başarıyla tamamlandı (Çıkış kodu: 0)]`,
        ]);
        setIsRunning(false);
        setStep(0);
        setCurrentInputValue('');
      }
    }
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(terminalLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Auto-start first simulation
  useEffect(() => {
    startProgram(selectedProgram);
  }, [selectedProgram]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>OpenJDK 21 - JVM Terminal Simülatörü</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Program Switcher */}
          <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
            <button
              onClick={() => {
                setSelectedProgram('hipotenus');
                startProgram('hipotenus');
              }}
              className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                selectedProgram === 'hipotenus'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hipotenüs
            </button>
            <button
              onClick={() => {
                setSelectedProgram('heron');
                startProgram('heron');
              }}
              className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                selectedProgram === 'heron'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Heron Alanı (Ödev)
            </button>
          </div>

          <button
            onClick={() => startProgram(selectedProgram)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
            title="Yeniden Başlat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Yeniden</span>
          </button>

          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
            title="Terminal Çıktısını Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 bg-slate-950/95 font-mono text-xs sm:text-sm text-slate-200 min-h-[300px] max-h-[420px] overflow-y-auto space-y-1.5 selection:bg-indigo-500 selection:text-white">
        {terminalLines.map((line, i) => {
          const isCommand = line.startsWith('$');
          const isBanner = line.includes('===');
          const isEnes = line.includes('Enes Öztürk');
          const isHeader = line.includes('---');
          const isSuccess = line.includes('[Program başarıyla');
          const isError = line.includes('Hata') || line.includes('HATA');

          let colorClass = 'text-slate-300';
          if (isCommand) colorClass = 'text-amber-400 font-bold';
          else if (isBanner) colorClass = 'text-indigo-400';
          else if (isEnes) colorClass = 'text-cyan-300 font-bold';
          else if (isHeader) colorClass = 'text-slate-500';
          else if (isSuccess) colorClass = 'text-emerald-400 font-bold';
          else if (isError) colorClass = 'text-rose-400 font-bold';

          return (
            <div key={i} className={`${colorClass} whitespace-pre-wrap leading-relaxed`}>
              {line}
            </div>
          );
        })}

        {/* Input prompt if running */}
        {isRunning && (
          <form onSubmit={handleInputSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold">&gt;&gt;</span>
            <input
              type="text"
              autoFocus
              value={currentInputValue}
              onChange={(e) => setCurrentInputValue(e.target.value)}
              placeholder="Değer girip Enter'a basınız (Örn: 3, 4, 5)..."
              className="flex-1 bg-transparent border-b border-indigo-500/60 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-indigo-400 py-0.5 placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded transition font-semibold"
            >
              Gönder (Enter)
            </button>
          </form>
        )}

        <div ref={terminalBottomRef} />
      </div>

      {/* Terminal Quick Input Bar */}
      {isRunning && (
        <div className="bg-slate-900 border-t border-slate-800 p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Hızlı Değer Doldur:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {selectedProgram === 'hipotenus' ? (
              <>
                <button
                  onClick={() => setCurrentInputValue('3')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  3
                </button>
                <button
                  onClick={() => setCurrentInputValue('4')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  4
                </button>
                <button
                  onClick={() => setCurrentInputValue('5')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  5
                </button>
                <button
                  onClick={() => setCurrentInputValue('12')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  12
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentInputValue('13')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  13
                </button>
                <button
                  onClick={() => setCurrentInputValue('14')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  14
                </button>
                <button
                  onClick={() => setCurrentInputValue('15')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  15
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
