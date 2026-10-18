import { HeronTriangleResult, RightTriangleResult } from '../types.ts';

export function calculateRightTriangle(a: number, b: number): RightTriangleResult {
  const safeA = Math.max(0.1, a);
  const safeB = Math.max(0.1, b);
  const c = Math.sqrt(safeA * safeA + safeB * safeB);
  const area = (safeA * safeB) / 2;
  const perimeter = safeA + safeB + c;

  const angleRadA = Math.atan(safeA / safeB);
  const angleA = (angleRadA * 180) / Math.PI;
  const angleB = 90 - angleA;

  const steps = [
    {
      title: 'Pisagor Bağıntısı Kurulumu',
      formula: 'c² = a² + b²',
      calculation: `c² = ${safeA}² + ${safeB}² = ${(safeA * safeA).toFixed(2)} + ${(safeB * safeB).toFixed(2)}`,
      result: `c² = ${(safeA * safeA + safeB * safeB).toFixed(2)}`,
    },
    {
      title: 'Hipotenüs (c) Değerinin Bulunması',
      formula: 'c = √(a² + b²)',
      calculation: `c = √(${(safeA * safeA + safeB * safeB).toFixed(2)})`,
      result: `c ≈ ${c.toFixed(4)}`,
    },
    {
      title: 'Üçgenin Çevresi',
      formula: 'Çevre = a + b + c',
      calculation: `${safeA} + ${safeB} + ${c.toFixed(2)}`,
      result: `${perimeter.toFixed(4)} birim`,
    },
    {
      title: 'Dik Üçgenin Alanı',
      formula: 'Alan = (a * b) / 2',
      calculation: `(${safeA} * ${safeB}) / 2 = ${(safeA * safeB).toFixed(2)} / 2`,
      result: `${area.toFixed(4)} birim²`,
    },
  ];

  return {
    a: safeA,
    b: safeB,
    c,
    area,
    perimeter,
    angleA,
    angleB,
    angleC: 90,
    steps,
  };
}

export function calculateHeronTriangle(a: number, b: number, c: number): HeronTriangleResult {
  // Negative or zero check
  if (a <= 0 || b <= 0 || c <= 0 || isNaN(a) || isNaN(b) || isNaN(c)) {
    return {
      a,
      b,
      c,
      isValid: false,
      invalidReason: 'Kenar uzunlukları 0 veya negatif olamaz. Lütfen pozitif sayılar giriniz.',
      perimeter: 0,
      u: 0,
      diffA: 0,
      diffB: 0,
      diffC: 0,
      areaSquared: 0,
      area: 0,
      triangleSideType: 'Çeşitkenar Üçgen',
      triangleAngleType: 'Dar Açılı Üçgen',
      angleA: 0,
      angleB: 0,
      angleC: 0,
      steps: [],
    };
  }

  // Triangle inequality check
  const ineq1 = a + b > c;
  const ineq2 = a + c > b;
  const ineq3 = b + c > a;

  if (!ineq1 || !ineq2 || !ineq3) {
    let reason = '';
    if (!ineq1) reason = `a + b (${(a + b).toFixed(2)}) ≤ c (${c.toFixed(2)}) olduğu için üçgen kapanamaz.`;
    else if (!ineq2) reason = `a + c (${(a + c).toFixed(2)}) ≤ b (${b.toFixed(2)}) olduğu için üçgen kapanamaz.`;
    else reason = `b + c (${(b + c).toFixed(2)}) ≤ a (${a.toFixed(2)}) olduğu için üçgen kapanamaz.`;

    return {
      a,
      b,
      c,
      isValid: false,
      invalidReason: `Üçgen Eşitsizliği İhlali: ${reason} (Bir kenar diğer iki kenarın toplamından küçük, farkından büyük olmalıdır).`,
      perimeter: a + b + c,
      u: (a + b + c) / 2,
      diffA: (a + b + c) / 2 - a,
      diffB: (a + b + c) / 2 - b,
      diffC: (a + b + c) / 2 - c,
      areaSquared: 0,
      area: 0,
      triangleSideType: 'Çeşitkenar Üçgen',
      triangleAngleType: 'Dar Açılı Üçgen',
      angleA: 0,
      angleB: 0,
      angleC: 0,
      steps: [],
    };
  }

  // Heron computations
  const perimeter = a + b + c; // 2u
  const u = perimeter / 2; // u = (a+b+c)/2
  const diffA = u - a;
  const diffB = u - b;
  const diffC = u - c;

  const areaSquared = u * diffA * diffB * diffC;
  const area = Math.sqrt(Math.max(0, areaSquared));

  // Angles using Law of Cosines
  // cos(A) = (b^2 + c^2 - a^2) / (2bc)
  const cosA = Math.min(1, Math.max(-1, (b * b + c * c - a * a) / (2 * b * c)));
  const cosB = Math.min(1, Math.max(-1, (a * a + c * c - b * b) / (2 * a * c)));
  const cosC = Math.min(1, Math.max(-1, (a * a + b * b - c * c) / (2 * a * b)));

  const angleA = (Math.acos(cosA) * 180) / Math.PI;
  const angleB = (Math.acos(cosB) * 180) / Math.PI;
  const angleC = (Math.acos(cosC) * 180) / Math.PI;

  // Side classification
  const eps = 0.0001;
  const eqAB = Math.abs(a - b) < eps;
  const eqBC = Math.abs(b - c) < eps;
  const eqAC = Math.abs(a - c) < eps;

  let triangleSideType: 'Eşkenar Üçgen' | 'İkizkenar Üçgen' | 'Çeşitkenar Üçgen' = 'Çeşitkenar Üçgen';
  if (eqAB && eqBC) {
    triangleSideType = 'Eşkenar Üçgen';
  } else if (eqAB || eqBC || eqAC) {
    triangleSideType = 'İkizkenar Üçgen';
  }

  // Angle classification
  const maxAngle = Math.max(angleA, angleB, angleC);
  let triangleAngleType: 'Dar Açılı Üçgen' | 'Dik Açılı Üçgen' | 'Geniş Açılı Üçgen' = 'Dar Açılı Üçgen';
  if (Math.abs(maxAngle - 90) < 0.1) {
    triangleAngleType = 'Dik Açılı Üçgen';
  } else if (maxAngle > 90.1) {
    triangleAngleType = 'Geniş Açılı Üçgen';
  }

  const steps = [
    {
      title: '1. Adım: Çevre Hesabı (2u)',
      formula: 'Çevre = 2u = a + b + c',
      calculation: `${a} + ${b} + ${c}`,
      result: `2u = ${perimeter.toFixed(2)} birim`,
    },
    {
      title: '2. Adım: Yarı Çevre (u)',
      formula: 'u = (a + b + c) / 2',
      calculation: `${perimeter.toFixed(2)} / 2`,
      result: `u = ${u.toFixed(2)} birim`,
    },
    {
      title: '3. Adım: Kenar Farkları',
      formula: '(u - a), (u - b), (u - c)',
      calculation: `(${u.toFixed(2)} - ${a}) = ${diffA.toFixed(2)} | (${u.toFixed(2)} - ${b}) = ${diffB.toFixed(2)} | (${u.toFixed(2)} - ${c}) = ${diffC.toFixed(2)}`,
      result: `Δa=${diffA.toFixed(2)}, Δb=${diffB.toFixed(2)}, Δc=${diffC.toFixed(2)}`,
    },
    {
      title: '4. Adım: Alanın Karesi Formülü',
      formula: 'Alan² = u * (u - a) * (u - b) * (u - c)',
      calculation: `${u.toFixed(2)} * ${diffA.toFixed(2)} * ${diffB.toFixed(2)} * ${diffC.toFixed(2)}`,
      result: `Alan² = ${areaSquared.toFixed(4)}`,
    },
    {
      title: '5. Adım: Karekök ile Nihai Alan',
      formula: 'Alan = √(Alan²)',
      calculation: `√(${areaSquared.toFixed(4)})`,
      result: `Alan = ${area.toFixed(4)} birim²`,
    },
  ];

  return {
    a,
    b,
    c,
    isValid: true,
    perimeter,
    u,
    diffA,
    diffB,
    diffC,
    areaSquared,
    area,
    triangleSideType,
    triangleAngleType,
    angleA,
    angleB,
    angleC,
    steps,
  };
}
