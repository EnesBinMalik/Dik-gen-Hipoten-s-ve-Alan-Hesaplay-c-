import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

export const FormulaGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-800/40 rounded-2xl p-6 backdrop-blur-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Geometri & Matematik Rehberi
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Pisagor Teoremi ve Heron Formülü Detaylı İncelemesi
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-3xl">
          Ödev kapsamında kullanılan dik üçgende hipotenüs bulma bağıntısı ve üç kenarı verilen üçgenin alanını
          hesaplayan Heron formülünün teorik temelleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Pisagor Bağıntısı */}
        <div className="bg-slate-900/80 border border-indigo-900/50 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              📐
            </div>
            <div>
              <h3 className="text-base font-bold text-white">1. Dik Üçgende Pisagor Teoremi</h3>
              <p className="text-xs text-indigo-300">Hipotenüs ve Dik Kenarlar İlişkisi</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono text-slate-400 block font-semibold">Temel Formül:</span>
            <div className="text-xl font-mono text-indigo-300 font-extrabold text-center py-2 bg-indigo-950/40 rounded-lg border border-indigo-900/40">
              c² = a² + b² &nbsp;⟺&nbsp; c = √(a² + b²)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Bir dik üçgende dik açıya komşu olan dik kenarların karelerinin toplamı, hipotenüsün (en uzun kenarın)
              karesine eşittir.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Ezberlenmesi Kolay Özel Dik Üçgenler:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 font-bold">3 - 4 - 5</span> üçgeni (ve katları: 6-8-10, 9-12-15)
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 font-bold">5 - 12 - 13</span> üçgeni (ve katları: 10-24-26)
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 font-bold">8 - 15 - 17</span> üçgeni
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 font-bold">7 - 24 - 25</span> üçgeni
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Heron Formülü */}
        <div className="bg-slate-900/80 border border-emerald-900/50 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              🔷
            </div>
            <div>
              <h3 className="text-base font-bold text-white">2. Heron Formülü ile Üçgen Alanı</h3>
              <p className="text-xs text-emerald-300">Yükseklik Bilinmeden Alan Hesabı</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono text-slate-400 block font-semibold">Ödevde İstenen Formül Adımları:</span>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="p-1.5 bg-emerald-950/40 rounded border border-emerald-900/40 text-emerald-300">
                Üçgenin Çevresi = 2u = a + b + c
              </div>
              <div className="p-1.5 bg-emerald-950/40 rounded border border-emerald-900/40 text-emerald-300">
                u = (a + b + c) / 2 &nbsp;(Yarı Çevre)
              </div>
              <div className="p-2 bg-emerald-950/60 rounded border border-emerald-800 text-emerald-300 font-bold text-sm text-center">
                Alan² = u * (u − a) * (u − b) * (u − c)
              </div>
              <div className="p-1.5 bg-emerald-950/40 rounded border border-emerald-900/40 text-emerald-300 font-semibold text-center">
                Alan = √( u * (u − a) * (u − b) * (u − c) )
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            İskenderiyeli Heron (Hero of Alexandria) tarafından bulunan bu formül, üçgenin yüksekliğini bulmaya gerek
            kalmadan yalnızca 3 kenar uzunluğu bilindiğinde alan hesabı yapmayı sağlar.
          </p>
        </div>
      </div>

      {/* Triangle Inequality Section */}
      <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Kritik Kural: Üçgen Eşitsizliği Teoremi</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Herhangi 3 uzunluk bir üçgen oluşturamaz! Kenarların birleşip bir üçgen oluşturabilmesi için her kenar, diğer
          iki kenarın toplamından küçük ve farklarının mutlak değerinden büyük olmalıdır:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-center">
          <div className="p-3 bg-slate-950 rounded-xl border border-amber-800/40 text-amber-300">
            |b - c| &lt; a &lt; b + c
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-amber-800/40 text-amber-300">
            |a - c| &lt; b &lt; a + c
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-amber-800/40 text-amber-300">
            |a - b| &lt; c &lt; a + b
          </div>
        </div>

        <div className="p-3.5 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs text-slate-300 space-y-1">
          <span className="font-semibold text-amber-300">Neden Programda Kontrol Edilmeli?</span>
          <p>
            Eğer bu kontrol yapılmazsa, örneğin <code className="text-amber-200">a=2, b=3, c=10</code> girildiğinde{' '}
            <code className="text-amber-200">u=7.5</code> olur ve <code className="text-amber-200">(u - c) = -2.5</code> negatif
            çıkar. Karekök altında negatif sayı oluşacağından program <code className="text-amber-200">NaN (Not a Number)</code> hatası verir! Enes Öztürk ödevinde bu durum güvenli bir şekilde kontrol edilmektedir.
          </p>
        </div>
      </div>
    </div>
  );
};
