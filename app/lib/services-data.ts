export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  overview: string[];
  highlights?: string[];
};

export type ServiceGroup = {
  slug: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

const serviceCopy = {
  website: [
    "Hər layihədə məqsəd yalnız gözəl görünən səhifə yaratmaq deyil, real biznes nəticəsi verən rəqəmsal sistem qurmaqdır.",
    "Struktur, istifadəçi yolu və texniki əsaslar auditoriyanın davranışına uyğun planlanır. Bu yanaşma ziyarətçilərin daha tez qərar verməsinə və müraciətə keçməsinə imkan yaradır.",
    "Sürət, mobil uyğunluq və SEO əsasları ilə saytınız uzunmüddətli böyüməyə hazır, idarə olunan və etibarlı platformaya çevrilir.",
  ],
  design: [
    "Dizayn brendin ilk təəssüratını formalaşdırır və mesajın yadda qalmasına birbaşa təsir edir.",
    "Vizual sistem brendin mövqelənməsi, auditoriyası və istifadə olunacağı platformalar nəzərə alınaraq hazırlanır.",
    "Nəticədə həm estetik, həm də funksional baxımdan ardıcıl, fərqlənən və peşəkar görünüş əldə olunur.",
  ],
  marketing: [
    "Rəqəmsal marketinq brendin düzgün auditoriyaya çatması və real nəticələr yaratması üçün sistemli plan tələb edir.",
    "Kampaniyalar data, kontent, platforma seçimi və dönüşüm yolu birlikdə düşünülərək qurulur.",
    "Davamlı ölçmə və optimizasiya sayəsində reklam və kontent fəaliyyəti daha effektiv satış kanalına çevrilir.",
  ],
  software: [
    "Proqram təminatı biznes proseslərini sadələşdirmək, sürətləndirmək və daha idarə olunan hala gətirmək üçün hazırlanır.",
    "Funksionallıq real ehtiyaclara uyğun planlanır, istifadəçi təcrübəsi və performans əsas prioritet kimi saxlanılır.",
    "Genişlənə bilən arxitektura ilə sistem yalnız bugünkü tapşırıqları deyil, gələcək böyüməni də dəstəkləyir.",
  ],
  support: [
    "Texniki dəstək rəqəmsal məhsulların stabil, təhlükəsiz və fasiləsiz işləməsi üçün vacibdir.",
    "Monitorinq, yenilənmə, performans optimizasiyası və operativ müdaxilə prosesləri sistemli şəkildə idarə olunur.",
    "Bu yanaşma riskləri azaldır, istifadəçi təcrübəsini qoruyur və platformanın uzunmüddətli etibarlılığını artırır.",
  ],
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "saytlarin-hazirlanmasi",
    title: "Saytların Hazırlanması",
    description:
      "Biznesinizin ehtiyaclarına uyğunlaşdırılmış, sürətli və nəticəyönümlü rəqəmsal həllər.",
    items: [
      {
        slug: "turizm-saytlarinin-hazirlanmasi",
        title: "Turizm Saytları",
        description:
          "Turizm xidmətlərinizi cəlbedici şəkildə nümayiş etdirən və rezervasiya axınını artıran veb saytlar.",
        overview: [
          "Turizm saytları istifadəçilərin qərar vermə prosesində böyük rol oynayır və düzgün qurulduqda rezervasiyalara birbaşa təsir edir. Xidmətlərin vizual və informativ təqdimatı istifadəçidə etibar formalaşdırır.",
          "Struktur tur paketləri, xidmətlər və rezervasiya prosesini sadə və aydın şəkildə çatdıracaq formada qurulur. Bu yanaşma istifadəçilərin daha tez qərar verməsinə və rezervasiyaya keçməsinə imkan yaradır.",
          "Optimizasiya olunmuş performans və istifadə rahatlığı ilə sayt məlumat verməklə kifayətlənmir, nəticədə davamlı müştəri axını yaradan güclü satış kanalına çevrilir.",
        ],
      },
      {
        slug: "elan-saytlarinin-yigilmasi",
        title: "Elan Saytları",
        description:
          "Elanların rahat yerləşdirilməsi və axtarışı üçün funksional, sürətli və istifadəçi yönümlü platformalar yaradırıq.",
        overview: [
          "Elan saytları istifadəçilərin məhsul və xidmətləri asanlıqla yerləşdirə və tapa bildiyi dinamik platformalardır. Biz istifadəçi davranışına uyğun qurulan, rahat və intuitiv interfeysə malik elan sistemləri təqdim edirik.",
          "Struktur elan yerləşdirmə, kateqoriyalaşdırma və filtr-axtarış funksiyalarını maksimum sadə və effektiv şəkildə birləşdirir. Bu yanaşma istifadəçilərin platformada daha uzun qalmasına və aktiv istifadəyə keçməsinə imkan yaradır.",
          "Yüksək sürət və stabil işləmə sayəsində elan saytınız sadəcə platforma deyil, istifadəçi axını və davamlı aktivlik yaradan canlı rəqəmsal mühitə çevrilir.",
        ],
      },
      {
        slug: "sexsi-saytlarin-hazirlanmasi",
        title: "Şəxsi Saytların Hazırlanması",
        description:
          "Şəxsi brendinizi və fəaliyyətinizi peşəkar şəkildə təqdim edən fərdi veb saytlar.",
        overview: [
          "Şəxsi sayt fərdi brendin təqdimatı və peşəkar imicin formalaşdırılması üçün vacib alətdir. Düzgün qurulmuş struktur və vizual yanaşma sizi rəqəmsal mühitdə fərqləndirir.",
          "Məlumatların təqdimatı sadə və anlaşılan şəkildə təşkil olunur, fəaliyyət sahəniz və üstünlükləriniz ön plana çıxarılır. Bu yanaşma ziyarətçilərin sizi daha yaxşı tanımasına və etibar formalaşdırmasına kömək edir.",
          "Fərqli cihazlarda problemsiz və sürətli işləyən şəxsi saytınız sizi yalnız təqdim etmir, paralel olaraq yeni imkanlar və əlaqələr yaradan dinamik platforma rolunu oynayır.",
        ],
      },
      {
        slug: "xidmet-saytlarinin-yaradilmasi",
        title: "Xidmət Saytları",
        description:
          "Xidmətlərinizi aydın təqdim edən və müştəri müraciətlərini artırmağa yönəlmiş veb saytların yaradılması.",
        overview: serviceCopy.website,
      },
      {
        slug: "online-magazalarin-hazirlanmasi",
        title: "Online Mağaza",
        description:
          "Satışa fokuslanan, sürətli və istifadəçi dostu online mağaza həlləri ilə rəqəmsal ticarətinizi gücləndiririk.",
        overview: [
          "Online mağaza yalnız məhsul satmaq üçün deyil, satış yaradan düzgün qurulmuş sistem olmalıdır. Webline olaraq biznesinizə uyğun, satışa yönəlmiş e-commerce həlləri təqdim edirik.",
          "İstifadəçi davranışlarına uyğun qurulan struktur və sadələşdirilmiş alış prosesi müştərilərin daha rahat qərar verməsinə və alışa keçməsinə imkan yaradır.",
          "Məhsul idarəetməsi, ödəniş və çatdırılma inteqrasiyaları ilə qurulan funksional sistem satış proseslərini sadələşdirir və nəticələrin artmasına kömək edir.",
        ],
      },
      {
        slug: "korporativ-saytlarin-hazirlanmasi",
        title: "Korporativ Saytlar",
        description:
          "Brendinizi düzgün təqdim edən, etibar yaradan və peşəkar rəqəmsal imic formalaşdıran korporativ sayt həlləri.",
        overview: [
          "Korporativ sayt şirkətinizin rəqəmsal vizit kartıdır və ilk təəssüratı formalaşdırır. Webline olaraq brendinizin dəyərlərini düzgün əks etdirən və etibar yaradan veb platformalar təqdim edirik.",
          "Struktur və dizayn istifadəçi təcrübəsinə əsaslanaraq qurulur, məlumatların aydın və effektiv çatdırılması təmin olunur. Bu yanaşma ziyarətçilərlə daha güclü kommunikasiya qurmağa kömək edir.",
          "Sürət, mobil uyğunluq və SEO optimizasiyası ilə korporativ saytınız sadəcə təqdimat vasitəsi deyil, əlavə dəyər yaradan və etibar formalaşdıran aktiv platformaya çevrilir.",
        ],
      },
    ],
  },
  {
    slug: "dizayn-xidmetleri",
    title: "Dizayn Xidmətləri",
    description:
      "Brendinizi vizual olaraq fərqləndirən, estetik və funksional kreativ dizayn həlləri.",
    items: [
      {
        slug: "brandbook-dizayninin-hazirlanmasi",
        title: "Brandbook Dizaynı",
        description:
          "Brendinizin vizual və kommunikasiya qaydalarını sistemləşdirən brandbook həlləri.",
        overview: [
          "Brandbook brendin vahid və düzgün istifadə olunmasını təmin edən əsas qaydalar toplusudur. Vizual kimliyin standartlaşdırılması brendin hər platformada eyni şəkildə qəbul olunmasına kömək edir.",
          "Rəng palitrası, tipografiya, logo istifadəsi və dizayn elementləri aydın şəkildə müəyyən edilir. Bu yanaşma müxtəlif kanallarda ardıcıl və peşəkar görünüş yaradır.",
          "Düzgün hazırlanmış brandbook brendin tanınmasını gücləndirir, kommunikasiya proseslərini sadələşdirir və bütün dizayn işlərində vahid istiqamət təmin edir.",
        ],
      },
      {
        slug: "kataloq-dizayninin-hazirlanmasi",
        title: "Kataloq Dizaynı",
        description:
          "Məhsul və xidmətlərinizi sistemli və cəlbedici şəkildə təqdim edən kataloq dizaynları.",
        overview: [
          "Kataloq məhsul və xidmətlərin təqdimatında vacib rol oynayır və müştərinin qərar vermə prosesinə təsir edir. Məlumatların düzgün strukturlaşdırılması və vizual balans effektiv təqdimat yaradır.",
          "Səhifə quruluşu, tipografiya və vizual elementlər istifadəçi rahatlığı nəzərə alınaraq hazırlanır. Bu yanaşma məlumatların asan qavranılmasına və diqqətin düzgün istiqamətləndirilməsinə kömək edir.",
          "Peşəkar dizayn yanaşması ilə hazırlanmış kataloq brendin imicini gücləndirir və həm çap, həm də rəqəmsal mühitdə effektiv istifadə imkanı yaradır.",
        ],
      },
      {
        slug: "logo-dizayni-hazirlanmasi",
        title: "Logo Dizaynı",
        description:
          "Brendinizi tanıdan və yadda qalan vizual kimlik yaradan logo dizaynının yaradılması.",
        overview: [
          "Logo brendin vizual əsasını təşkil edir və ilk baxışdan yadda qalma təsiri yaradır. Düzgün qurulmuş logo brendin xarakterini və dəyərlərini aydın şəkildə ifadə edir.",
          "Dizayn prosesi brendin fəaliyyət sahəsi, hədəf auditoriyası və mövqelənməsi nəzərə alınaraq formalaşdırılır. Bu yanaşma fərqlənən və uzunmüddətli istifadə üçün uyğun vizual nəticə yaradır.",
          "Sadəlik, balans və uyğun tipografiya ilə hazırlanmış logo brendin tanınmasını artırır və bütün rəqəmsal və fiziki platformalarda vahid görünüş təmin edir.",
        ],
      },
      {
        slug: "ai-videolarinin-hazirlanmasi",
        title: "Ai və Motion Videolar",
        description:
          "Süni intellekt və animasiya ilə hazırlanmış, diqqət çəkən və effektiv video həlləri.",
        overview: [
          "AI və motion videolar kontentin daha qısa vaxt və daha az xərclə hazırlanmasına imkan yaradır. Süni intellekt alətləri eyni resursla daha çox və daha effektiv nəticə əldə etməyə şərait yaradır.",
          "Ssenari, vizual elementlər və hərəkət dinamikası daha sürətli və optimallaşdırılmış şəkildə formalaşdırılır, əsas mesaj aydın və təsirli təqdim olunur. Bu yanaşma videonun izlənmə və yadda qalma səviyyəsini artırır.",
          "Sosial media və reklam platformaları üçün uyğunlaşdırılan videolar brendin daha çox diqqət çəkməsinə kömək edir və geniş auditoriyaya çatmağa imkan yaradır.",
        ],
      },
      {
        slug: "3d-dizayn-xidmeti",
        title: "3D Dizayn",
        description:
          "Məhsul və ideyalarınızı realistik və diqqət çəkən vizuallarla təqdim edən 3D dizayn həlləri.",
        overview: [
          "3D dizayn məhsul və konseptlərin daha real və təsirli təqdimatı üçün güclü vizual vasitədir. Həcm, işıq və materialların düzgün istifadəsi vizuallara dərinlik və realizm qatır.",
          "Modeling və vizuallaşdırma prosesi layihənin məqsədinə uyğun qurulur, detallara xüsusi diqqət yetirilir. Bu yanaşma məhsulun xüsusiyyətlərini daha aydın göstərməyə və diqqəti cəlb etməyə kömək edir.",
          "Reklam, təqdimat və rəqəmsal platformalar üçün hazırlanan 3D vizuallar brendin fərqlənməsini artırır və mesajın daha effektiv çatdırılmasını təmin edir.",
        ],
      },
      {
        slug: "sosial-media-dizaynlari",
        title: "Sosial Media Dizaynları",
        description:
          "Sosial mediada diqqət çəkən və brendinizi fərqləndirən vizual dizaynlar.",
        overview: [
          "Sosial media dizaynları brendin gündəlik kommunikasiya üslubunu formalaşdırır və istifadəçinin diqqətini ilk saniyədə cəlb edir. Vizual yanaşma mesajın daha təsirli çatdırılmasına kömək edir.",
          "Post və story dizaynları platforma tələblərinə və auditoriya davranışına uyğun hazırlanır. Bu yanaşma kontentin daha çox diqqət çəkməsinə və qarşılıqlı əlaqənin artmasına imkan yaradır.",
          "Vahid vizual üslub və kreativ yanaşma ilə hazırlanan dizaynlar brendin tanınmasını gücləndirir və sosial mediada daha effektiv nəticələr əldə etməyə şərait yaradır.",
        ],
      },
    ],
  },
  {
    slug: "reqemsal-marketinq-xidmetleri",
    title: "Rəqəmsal Marketinq",
    description:
      "Brendinizin görünürlüğünü artıran və satışa yönələn nəticə əsaslı rəqəmsal marketinq strategiyaları.",
    items: [
      {
        slug: "seo-xidmeti",
        title: "SEO Xidməti",
        description:
          "Axtarış sistemlərində görünürlüğünüzü artıran və davamlı trafik qazandıran SEO yanaşması.",
        overview: [
          "SEO sayta gələn orqanik trafikin artması və axtarış nəticələrində daha üst mövqelər qazanmaq üçün əsas vasitədir. Düzgün qurulmuş yanaşma uzunmüddətli və stabil nəticələr yaradır.",
          "Texniki optimizasiya, açar söz seçimi və kontent strukturu birlikdə işləyərək saytın axtarış sistemləri tərəfindən daha yaxşı anlaşılmasına kömək edir. Bu isə daha doğru auditoriyanın cəlb olunmasına şərait yaradır.",
          "Davamlı analiz və optimizasiya ilə SEO fəaliyyəti yalnız trafik artırmır, eyni zamanda keyfiyyətli ziyarətçi axını və daha yüksək dönüşüm imkanı yaradır.",
        ],
        highlights: ["Standart SEO", "Premium SEO", "Platinum SEO"],
      },
      {
        slug: "marketinq-xidmetleri",
        title: "Marketinq Xidmətləri",
        description:
          "Meta, Google, LinkedIn və TikTok kampaniyalarını real satışa bağlayan marketinq strategiyası.",
        overview: [
          "Biz Meta, Google, LinkedIn və TikTok platformalarında reklam kampaniyalarınızı idarə edirik və müştəriləri reklamdan real satışa aparan tam strategiya qururuq.",
          "Fintech, elektron ticarət, daşınmaz əmlak, təhsil, səhiyyə, B2B SaaS, səyahət, avtomobil və yerli xidmətlər kimi sahələr üçün fərqli satış yolları planlanır.",
          "Reklam büdcəsinin geri dönüşü, müraciət keyfiyyəti və satışa çevrilmə göstəriciləri davamlı izlənilir və optimallaşdırılır.",
        ],
        highlights: [
          "Fintech",
          "Elektron ticarət",
          "Daşınmaz əmlak",
          "Təhsil",
          "Səhiyyə / Klinika",
          "B2B SaaS",
        ],
      },
      {
        slug: "kopiraytinq-kontent-xidmeti",
        title: "Kopiraytinq & Kontent",
        description:
          "Mesajınızı doğru çatdıran və auditoriyanı hərəkətə keçirən kontent və kopiraytinq.",
        overview: [
          "Kopiraytinq və kontent brendin səsini formalaşdırır və auditoriya ilə əlaqənin əsasını təşkil edir. Düzgün qurulan mətnlər istifadəçinin diqqətini cəlb edir və qərar vermə prosesinə təsir göstərir.",
          "Kontent planı və mətnlər platformaya və hədəf auditoriyaya uyğun hazırlanır, mesajlar aydın və məqsədyönlü şəkildə qurulur. Bu yanaşma daha yüksək qarşılıqlı əlaqə və effektiv kommunikasiya yaradır.",
          "Davamlı optimizasiya və kreativ yanaşma ilə kontent yalnız məlumat vermir, eyni zamanda satışa və brend dəyərinin artmasına təsir edir.",
        ],
      },
      {
        slug: "foto-video-cekilis-xidmeti",
        title: "Foto & video çəkiliş",
        description:
          "Brendinizi real və təsirli vizuallarla təqdim edən peşəkar foto və video çəkilişlər.",
        overview: serviceCopy.marketing,
      },
      {
        slug: "smm-xidmeti",
        title: "Sosial Media Marketing",
        description:
          "Sosial mediada aktivlik və əlaqəni artıran, brendinizi düzgün təqdim edən SMM fəaliyyəti.",
        overview: [
          "Sosial media brendin auditoriya ilə birbaşa əlaqə qurduğu əsas kanallardan biridir. Düzgün planlanmış fəaliyyət brendin tanınmasını artırır və istifadəçi ilə davamlı ünsiyyət yaradır.",
          "Kontent planı, vizual üslub və paylaşım strategiyası auditoriyanın maraqlarına uyğun qurulur. Bu yanaşma paylaşımların daha çox diqqət çəkməsinə və qarşılıqlı əlaqənin artmasına imkan yaradır.",
          "Davamlı analiz və optimizasiya ilə sosial media fəaliyyəti yalnız aktivlik yaratmır, eyni zamanda real müştəri axını və brend dəyərinin artmasına töhfə verir.",
        ],
        highlights: ["Standart", "Premium", "Professional"],
      },
    ],
  },
  {
    slug: "proqramlarin-hazirlanmasi",
    title: "Proqramların Hazırlanması",
    description:
      "İstifadəçi təcrübəsinə və performansa fokuslanan mobil və veb tətbiqlər hazırlayırıq.",
    items: [
      {
        slug: "b2b-proqramlar-hazirlanmasi",
        title: "B2B Proqramlar",
        description:
          "Şirkətlərarası prosesləri optimallaşdıran və idarəetməni asanlaşdıran B2B proqramlar.",
        overview: serviceCopy.software,
      },
      {
        slug: "b2c-proqramlar-hazirlanmasi",
        title: "B2C Proqramlar",
        description:
          "Müştərilər üçün istifadəsi asan və rahat interfeys təqdim edən B2C proqramlar.",
        overview: serviceCopy.software,
      },
      {
        slug: "desktop-proqramlar-hazirlanmasi",
        title: "Desktop Proqramlar",
        description:
          "Güclü performans və stabil işləmə ilə biznes proseslərini effektiv idarə edən desktop proqramlar.",
        overview: serviceCopy.software,
      },
      {
        slug: "satis-ve-anbar-proqramlari",
        title: "Satış və Anbar Proqramları",
        description:
          "Satış və stok proseslərini nəzarətdə saxlayan və idarəetməni asanlaşdıran proqramlar.",
        overview: serviceCopy.software,
      },
      {
        slug: "mobile-app-ios-android-xidmeti",
        title: "Mobile App (Ios & Android)",
        description:
          "İstifadəçi təcrübəsini ön plana çıxaran və stabil işləyən mobil tətbiqlər.",
        overview: serviceCopy.software,
      },
    ],
  },
  {
    slug: "saytkara-texniki-destek",
    title: "Texniki Dəstək",
    description:
      "Veb saytlarınıza stabil və fasiləsiz işləməsini təmin edən davamlı texniki dəstək.",
    items: [
      {
        slug: "saytlara-texniki-destek-xidmeti",
        title: "Saytlara Texniki Dəstək",
        description:
          "Saytların stabil, təhlükəsiz və fasiləsiz işləməsini təmin edən texniki dəstək.",
        overview: serviceCopy.support,
      },
      {
        slug: "saytlarin-idare-olunmasi",
        title: "Saytların İdarə Olunması",
        description:
          "Saytın gündəlik idarəetməsini sadələşdirən və davamlı işləməsini təmin edən xidmət.",
        overview: serviceCopy.support,
      },
      {
        slug: "server-xidmetleri",
        title: "Server Xidmətləri",
        description:
          "Rəqəmsal sistemlər üçün stabil, təhlükəsiz və yüksək performanslı server infrastrukturu.",
        overview: serviceCopy.support,
      },
      {
        slug: "hostinq-xidmetleri",
        title: "Hostinq Xidmətləri",
        description:
          "Saytların sürətli, stabil və fasiləsiz işləməsi üçün etibarlı hostinq xidməti.",
        overview: serviceCopy.support,
      },
    ],
  },
  {
    slug: "idman-marketinq",
    title: "İdman marketinq",
    description:
      "İdman sahəsində brend görünürlüğünü artıran və auditoriya ilə güclü əlaqə yaradan marketinq fəaliyyəti.",
    items: [
      {
        slug: "event-match-marketing",
        title: "Event & Match Marketing",
        description:
          "Oyun günlərində aktivliyi artıran və stadion doluluğunu yüksəldən marketinq fəaliyyəti.",
        overview: serviceCopy.marketing,
      },
      {
        slug: "sponsorluq-ve-brend",
        title: "Sponsorluq və Brend Partnyorluqları",
        description:
          "Brendlərlə doğru əməkdaşlıqlar quraraq dəyər yaradan və görünürlüğü artıran sponsorluq fəaliyyəti.",
        overview: serviceCopy.marketing,
      },
      {
        slug: "merchandise-e-commerce-marketing",
        title: "Merchandise & E-commerce Marketing",
        description:
          "Məhsul satışını artıran və fan bazanı aktivləşdirən e-commerce və merchandise fəaliyyəti.",
        overview: serviceCopy.marketing,
      },
    ],
  },
  {
    slug: "veb-xidmetler",
    title: "İşinizə Faydalı",
    description:
      "Rəqəmsal fəaliyyətinizi optimallaşdıran data analiz, konsultasiya və infrastruktur həlləri.",
    items: [
      {
        slug: "korporativ-email",
        title: "Korporativ Email",
        description:
          "Şirkətiniz üçün peşəkar və etibarlı kommunikasiya təmin edən korporativ email sistemi.",
        overview: serviceCopy.support,
      },
      {
        slug: "konsultasiya-xidmeti",
        title: "Konsultasiya",
        description:
          "Rəqəmsal inkişaf üçün doğru qərarlar verməyə yönəldən konsultasiya xidməti.",
        overview: serviceCopy.marketing,
      },
      {
        slug: "google-business-qeydiyyati-xidmeti",
        title: "Google Business Qeydiyyatı",
        description:
          "Google üzərində biznesinizin görünməsini təmin edən düzgün qurulmuş profil qeydiyyatı.",
        overview: serviceCopy.marketing,
      },
      {
        slug: "data-analizi-xidmeti",
        title: "Data Analizi",
        description:
          "Məlumatlara əsaslanan qərarlar qəbul etməyə imkan verən data analizi.",
        overview: [
          "Data analytics bizneslərə daha məlumatlı strateji qərarlar qəbul etmək imkanı verməkdə çox vacibdir.",
          "Bizneslər öz datalarından istifadə edərək daha effektiv stratejik qərarlar əldə edə bilərlər. Müştərilərin kim olduğunu, nə istədiklərini və necə davrandıqlarını anlamaq satışları artırmağa kömək edir.",
          "Məlumatların analizi nəticəsində müştəri təcrübəsini yaxşılaşdırmaq, satışları artırmaq və müştəriləri saxlamaq üçün istifadə oluna bilən real nəticələr əldə edilir.",
        ],
        highlights: ["Strateji qərarlar", "Müştəri davranışı", "Satış artımı", "Müştəri analitikası"],
      },
    ],
  },
];

export function getServiceGroup(groupSlug: string) {
  return serviceGroups.find((group) => group.slug === groupSlug);
}

export function getServiceItem(groupSlug: string, itemSlug: string) {
  const group = getServiceGroup(groupSlug);
  const item = group?.items.find((service) => service.slug === itemSlug);

  return group && item ? { group, item } : null;
}

export function getServicePaths() {
  return serviceGroups.flatMap((group) =>
    group.items.map((item) => ({
      group: group.slug,
      slug: item.slug,
    })),
  );
}
