export type ActiveTab = 'hipotenus' | 'heron' | 'java' | 'rehber';

export interface RightTriangleResult {
  a: number;
  b: number;
  c: number; // hypotenuse
  area: number;
  perimeter: number;
  angleA: number; // degrees
  angleB: number; // degrees
  angleC: number; // 90
  steps: {
    title: string;
    formula: string;
    calculation: string;
    result: string;
  }[];
}

export interface HeronTriangleResult {
  a: number;
  b: number;
  c: number;
  isValid: boolean;
  invalidReason?: string;
  perimeter: number; // 2u
  u: number; // semi-perimeter
  diffA: number; // u - a
  diffB: number; // u - b
  diffC: number; // u - c
  areaSquared: number; // u * (u-a) * (u-b) * (u-c)
  area: number;
  triangleSideType: 'Eşkenar Üçgen' | 'İkizkenar Üçgen' | 'Çeşitkenar Üçgen';
  triangleAngleType: 'Dar Açılı Üçgen' | 'Dik Açılı Üçgen' | 'Geniş Açılı Üçgen';
  angleA: number; // opposite side a
  angleB: number; // opposite side b
  angleC: number; // opposite side c
  steps: {
    title: string;
    formula: string;
    calculation: string;
    result: string;
  }[];
}

export interface TrianglePreset {
  name: string;
  description: string;
  sides: [number, number, number] | [number, number];
}
