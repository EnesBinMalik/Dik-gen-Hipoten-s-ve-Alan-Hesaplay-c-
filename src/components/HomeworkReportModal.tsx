import React from 'react';
import { X, Printer, CheckCircle2, Award, Calendar, User, FileText } from 'lucide-react';

interface HomeworkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeworkReportModal: React.FC<HomeworkReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="no-print bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Resmi Ödev Teslim Belgesi & Raporu
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Body */}
        <div className="p-8 sm:p-10 bg-white text-slate-900 font-sans space-y-6">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-indigo-700 mb-1">
                JAVA 101 TEMEL KAVRAMLAR VE DEĞİŞKENLER DERSİ
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                DİK ÜÇGENDE HİPOTENÜS & ALAN HESABI ÖDEV RAPORU
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Konu: Pisagor Bağıntısı & Üç Kenarı Verilen Üçgende Heron Formülü
              </p>
            </div>

            <div className="text-right text-xs space-y-1">
              <div className="flex items-center justify-end gap-1 font-semibold text-slate-700">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>Hazırlayan:</span>
                <span className="font-bold text-slate-900">Enes Öztürk</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Teslim Tarihi: {new Date().toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                Tamamlandı & Doğrulandı
              </div>
            </div>
          </div>

          {/* Section 1: Dik Üçgende Hipotenüs */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              Dik Üçgende Hipotenüs Bulan Program (Pisagor Bağıntısı)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kullanıcıdan iki dik kenar (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">a</code> ve{' '}
              <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">b</code>) alınarak Pisagor bağıntısı yardımıyla
              hipotenüs (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">c</code>) hesaplanmıştır.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 space-y-1">
              <div>• Formül: c² = a² + b² → c = √(a² + b²)</div>
              <div>• Java Kodu: <span className="text-indigo-600">double hipotenus = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));</span></div>
              <div>• Test Örneği: a = 3, b = 4 → Hipotenüs = 5.00, Alan = 6.00 birim²</div>
            </div>
          </div>

          {/* Section 2: Heron Formülü ile Üçgen Alanı (Ödev) */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
                2
              </span>
              Üç Kenar Uzunluğu Verilen Üçgenin Alanı (Heron Formülü - Ödev)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ödev metninde belirtilen yarı çevre (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">u</code>) ve
              alan formülü adımları eksiksiz şekilde Java programına uyarlanmıştır:
            </p>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 space-y-1.5">
              <div>1. Üçgenin Çevresi = 2u = a + b + c</div>
              <div>2. u = (a + b + c) / 2</div>
              <div>3. Alan * Alan = u * (u − a) * (u − b) * (u − c)</div>
              <div>4. Alan = √(u * (u − a) * (u − b) * (u − c))</div>
              <div className="pt-1 text-slate-500">• Test Örneği: a = 13, b = 14, c = 15 → Çevre = 42, u = 21, Alan = 84.00 birim²</div>
            </div>
          </div>

          {/* Section 3: Güvenlik ve Eşitsizlik Kontrolü */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Uygulanan Kalite & Hata Yakalama Önlemleri:
            </h3>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-5">
              <li>
                <strong>Pozitif Değer Doğrulaması:</strong> Girilen kenar uzunluklarının 0 veya negatif olması engellendi.
              </li>
              <li>
                <strong>Üçgen Eşitsizliği (Triangle Inequality Theorem):</strong> |a-b| &lt; c &lt; a+b kuralı kontrol
                edilerek imkansız üçgen girişleri ve NaN kök hataları engellendi.
              </li>
              <li>
                <strong>Kaynak Yönetimi:</strong> Bellek sızıntısını önlemek için program sonunda Scanner nesnesi kapatıldı.
              </li>
            </ul>
          </div>

          {/* Signature Box */}
          <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              <p>Geometri ve Java 101 Ödevi</p>
              <p className="text-[10px] text-slate-400">Tüm formüller ve test sonuçları doğrulanmıştır.</p>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">Öğrenci / Geliştirici İmzası</div>
              <div className="font-serif italic text-xl font-bold text-indigo-700 my-1">
                Enes Öztürk
              </div>
              <div className="text-[10px] text-slate-500">Dijital İmzalı & Onaylı</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="no-print bg-slate-900 px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
