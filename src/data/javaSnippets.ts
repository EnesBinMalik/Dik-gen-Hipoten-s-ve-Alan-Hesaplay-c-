export interface JavaSnippet {
  id: string;
  title: string;
  fileName: string;
  description: string;
  code: string;
}

export const JAVA_SNIPPETS: JavaSnippet[] = [
  {
    id: 'hipotenus',
    title: '1. Dik Üçgende Hipotenüs Bulan Program',
    fileName: 'HipotenusHesaplama.java',
    description: 'Kullanıcıdan iki dik kenar uzunluğunu alarak Pisagor bağıntısı (c = √(a² + b²)) ile hipotenüsü hesaplar.',
    code: `import java.util.Scanner;

/**
 * Dik Üçgende Hipotenüs Bulan Program
 * 
 * Formül: c² = a² + b² -> c = √(a² + b²)
 * @author Enes Öztürk
 */
public class HipotenusHesaplama {
    public static void main(String[] args) {
        // Kullanıcıdan veri almak için Scanner nesnesi oluşturuyoruz
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("      DİK ÜÇGENDE HİPOTENÜS HESAPLAMA PROGRAMI    ");
        System.out.println("              Hazırlayan: Enes Öztürk             ");
        System.out.println("==================================================");

        // Dik kenar uzunluklarını kullanıcıdan alıyoruz
        System.out.print("1. Dik kenar uzunluğunu (a) giriniz: ");
        double a = scanner.nextDouble();

        System.out.print("2. Dik kenar uzunluğunu (b) giriniz: ");
        double b = scanner.nextDouble();

        // Kenar uzunluklarının pozitif olduğunu kontrol ediyoruz
        if (a <= 0 || b <= 0) {
            System.out.println("Hata: Kenar uzunlukları sıfırdan büyük olmalıdır!");
            scanner.close();
            return;
        }

        // Pisagor Teoremi: c² = a² + b² => c = Math.sqrt((a * a) + (b * b))
        double hipotenus = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        double cevre = a + b + hipotenus;
        double alan = (a * b) / 2.0;

        // Sonuçları ekrana yazdırıyoruz
        System.out.println("\n----------------- HESAPLAMA SONUÇLARI -----------------");
        System.out.printf("1. Dik Kenar (a)       : %.2f\\n", a);
        System.out.printf("2. Dik Kenar (b)       : %.2f\\n", b);
        System.out.printf("Hesaplanan Hipotenüs (c): %.4f\\n", hipotenus);
        System.out.printf("Üçgenin Çevresi        : %.2f\\n", cevre);
        System.out.printf("Üçgenin Alanı          : %.2f\\n", alan);
        System.out.println("-------------------------------------------------------");
        System.out.println("Programı hazırlayan: Enes Öztürk | Başarılar!");

        // Scanner kaynağını kapatıyoruz
        scanner.close();
    }
}`
  },
  {
    id: 'heron-alan',
    title: '2. Üç Kenarı Verilen Üçgenin Alanı (Ödev)',
    fileName: 'UcgenAlanHesaplama.java',
    description: 'Kullanıcıdan alınan üç kenar (a, b, c) ile çevre = 2u, u = (a+b+c)/2 ve Alan² = u*(u-a)*(u-b)*(u-c) formülü ile alan hesabı.',
    code: `import java.util.Scanner;

/**
 * Üç Kenar Uzunluğu Verilen Üçgenin Alanını ve Çevresini Hesaplayan Program
 * 
 * Formüller:
 *   Üçgenin Çevresi = 2u
 *   u = (a + b + c) / 2
 *   Alan * Alan = u * (u - a) * (u - b) * (u - c)
 *   Alan = √(u * (u - a) * (u - b) * (u - c))
 * 
 * @author Enes Öztürk
 */
public class UcgenAlanHesaplama {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("     ÜÇGENİN ALANINI HESAPLAYAN PROGRAM (ÖDEV)    ");
        System.out.println("              Hazırlayan: Enes Öztürk             ");
        System.out.println("==================================================");

        // Kullanıcıdan 3 kenar uzunluğunu alıyoruz
        System.out.print("a kenarının uzunluğunu giriniz: ");
        double a = input.nextDouble();

        System.out.print("b kenarının uzunluğunu giriniz: ");
        double b = input.nextDouble();

        System.out.print("c kenarının uzunluğunu giriniz: ");
        double c = input.nextDouble();

        // 1. Kontrol: Pozitif kenar uzunluğu
        if (a <= 0 || b <= 0 || c <= 0) {
            System.out.println("\\nHATA: Üçgenin kenar uzunlukları daima sıfırdan büyük olmalıdır!");
            input.close();
            return;
        }

        // 2. Kontrol: Üçgen Eşitsizliği (Triangle Inequality Theorem)
        // Her kenar, diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçük olmalıdır.
        boolean ucgenMi = (a + b > c) && (a + c > b) && (b + c > a);

        if (!ucgenMi) {
            System.out.println("\\nHATA: Girilen kenar uzunlukları bir üçgen oluşturmaz!");
            System.out.println("Üçgen Eşitsizliği Kuralı: İki kenarın toplamı üçüncü kenardan büyük olmalıdır.");
            input.close();
            return;
        }

        // --- FORMÜL UYGULAMASI ---
        // Üçgenin çevresi = 2u
        double cevre = a + b + c;

        // u = (a + b + c) / 2
        double u = cevre / 2.0;

        // Alan * Alan = u * (u - a) * (u - b) * (u - c)
        double alanKare = u * (u - a) * (u - b) * (u - c);

        // Alan = Math.sqrt(Alan * Alan)
        double alan = Math.sqrt(alanKare);

        // Sonuç ekranı
        System.out.println("\\n---------------- HESAPLAMA ADIMLARI ----------------");
        System.out.printf("1. Kenarlar (a, b, c)  : %.2f, %.2f, %.2f\\n", a, b, c);
        System.out.printf("2. Çevre (2u)          : %.2f birim\\n", cevre);
        System.out.printf("3. Yarı Çevre (u)      : %.2f birim\\n", u);
        System.out.printf("4. (u - a)             : %.2f\\n", (u - a));
        System.out.printf("   (u - b)             : %.2f\\n", (u - b));
        System.out.printf("   (u - c)             : %.2f\\n", (u - c));
        System.out.printf("5. Alan² (u*(u-a)*...) : %.4f\\n", alanKare);
        System.out.printf("6. Üçgenin Alanı       : %.4f birimkare\\n", alan);
        System.out.println("-----------------------------------------------------");
        System.out.println("İmza: Enes Öztürk - Başarıyla tamamlandı.");

        input.close();
    }
}`
  },
  {
    id: 'tam-odev',
    title: '3. Tek Sınıfta Menülü Tam Ödev Çözümü',
    fileName: 'GeometriOdeviEnesOzturk.java',
    description: 'Hem hipotenüs bulmayı hem de 3 kenardan Heron formülüyle alan hesaplamayı içeren menülü interaktif konsol programı.',
    code: `import java.util.Scanner;

/**
 * Java 101 - Temel Geometri ve Üçgen Ödevi
 * 
 * Bu program:
 * 1) Dik üçgende hipotenüs ve alan hesabı yapar.
 * 2) Üç kenarı bilinen üçgenin Heron formülü ile alanını hesaplar.
 * 
 * @author Enes Öztürk
 */
public class GeometriOdeviEnesOzturk {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        boolean devam = true;

        while (devam) {
            System.out.println("\\n=======================================================");
            System.out.println("       GEOMETRİ HESAPLAMA SİSTEMİ - ENES ÖZTÜRK       ");
            System.out.println("=======================================================");
            System.out.println("1 - Dik Üçgende Hipotenüs Hesapla");
            System.out.println("2 - Üç Kenarı Verilen Üçgenin Alanını Hesapla (Ödev)");
            System.out.println("0 - Çıkış Yap");
            System.out.print("Lütfen yapmak istediğiniz işlemi seçiniz (0/1/2): ");

            int secim = scan.nextInt();

            switch (secim) {
                case 1:
                    hipotenusHesapla(scan);
                    break;
                case 2:
                    heronAlanHesapla(scan);
                    break;
                case 0:
                    System.out.println("\\nProgramdan çıkılıyor. İyi günler dilerim! - Enes Öztürk");
                    devam = false;
                    break;
                default:
                    System.out.println("Geçersiz seçim yaptınız! Lütfen 0, 1 veya 2 yazınız.");
            }
        }

        scan.close();
    }

    /**
     * 1. Madde: Dik üçgen hipotenüs hesabı
     */
    public static void hipotenusHesapla(Scanner sc) {
        System.out.println("\\n>>> DİK ÜÇGENDE HİPOTENÜS HESABI <<<");
        System.out.print("1. Dik Kenar (a): ");
        double a = sc.nextDouble();

        System.out.print("2. Dik Kenar (b): ");
        double b = sc.nextDouble();

        if (a <= 0 || b <= 0) {
            System.out.println("Hata: Kenar uzunlukları pozitif olmalıdır.");
            return;
        }

        double c = Math.hypot(a, b); // Math.hypot(a, b) = √(a² + b²)
        double alan = (a * b) / 2.0;
        double cevre = a + b + c;

        System.out.println("\\n[SONUÇ]");
        System.out.printf("Hipotenüs (c) : %.4f\\n", c);
        System.out.printf("Üçgen Alanı   : %.4f\\n", alan);
        System.out.printf("Çevre         : %.4f\\n", cevre);
    }

    /**
     * 2. Madde (Ödev): Üç kenarı bilinen üçgende Heron formülü
     */
    public static void heronAlanHesapla(Scanner sc) {
        System.out.println("\\n>>> HERON FORMÜLÜ İLE ÜÇGEN ALANI HESABI <<<");
        System.out.print("a kenarı: ");
        double a = sc.nextDouble();

        System.out.print("b kenarı: ");
        double b = sc.nextDouble();

        System.out.print("c kenarı: ");
        double c = sc.nextDouble();

        // Üçgen eşitsizliği kontrolü
        if (a <= 0 || b <= 0 || c <= 0 || (a + b <= c) || (a + c <= b) || (b + c <= a)) {
            System.out.println("Hata: Bu kenar uzunlukları ile geçerli bir üçgen oluşturulamaz!");
            return;
        }

        // Formül:
        // Üçgenin Çevresi = 2u
        double cevre = a + b + c;
        // u = (a + b + c) / 2
        double u = cevre / 2.0;
        // Alan * Alan = u * (u - a) * (u - b) * (u - c)
        double alanKare = u * (u - a) * (u - b) * (u - c);
        double alan = Math.sqrt(alanKare);

        System.out.println("\\n[SONUÇ]");
        System.out.printf("Çevre (2u)       : %.4f\\n", cevre);
        System.out.printf("Yarı Çevre (u)   : %.4f\\n", u);
        System.out.printf("Alan * Alan (u²) : %.4f\\n", alanKare);
        System.out.printf("Hesaplanan Alan  : %.4f\\n", alan);
    }
}`
  }
];
