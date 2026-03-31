import type { LocaleCode } from "./locale";
import {
  fallbackSiteContent,
  type PortfolioCategoryContent,
} from "./site-data";

export type PortfolioCategorySlug = string;

export type PortfolioCategoryCard = {
  slug: PortfolioCategorySlug;
  title: string;
  description: string;
  shortLabel: string;
  image: string;
  alt: string;
  featuredTitle: string;
};

export type PortfolioProject = {
  slug: string;
  category: PortfolioCategorySlug;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

type PortfolioDictionary = {
  eyebrow: string;
  title: string;
  description: string;
  categoriesLabel: string;
  categoryLinkLabel: string;
  breadcrumbRoot: string;
  emptyTitle: string;
  emptyDescription: string;
  projectCountLabel: string;
  categories: Record<
    string,
    {
      title: string;
      description: string;
      shortLabel: string;
    }
  >;
  projects: PortfolioProject[];
};

const portfolioContent: Record<LocaleCode, PortfolioDictionary> = {
  az: {
    eyebrow: "Portfolio",
    title: "İşlərimiz özü danışır",
    description:
      "Veb, dizayn, sosial media və video istiqamətlərində hazırladığımız işləri kateqoriyalar üzrə kəşf edin.",
    categoriesLabel: "Kateqoriyalar",
    categoryLinkLabel: "Layihələri aç",
    breadcrumbRoot: "Portfolio",
    emptyTitle: "Bu kateqoriya üçün işlər hazırlanır",
    emptyDescription:
      "Bu bölməyə yeni layihələr əlavə olunduqca burada görünəcək.",
    projectCountLabel: "layihə",
    categories: {
      saytlar: {
        title: "Saytlar",
        description: "website haqqında",
        shortLabel: "Sayt həllərimiz",
      },
      dizaynlar: {
        title: "Dizaynlar",
        description: "Dizayn işlərimiz",
        shortLabel: "Brend və vizual dizayn",
      },
      "sosial-media": {
        title: "Sosial media",
        description: "SMM kampaniyaları",
        shortLabel: "Kontent və kampaniyalar",
      },
      "video-reels": {
        title: "Video reels",
        description: "Qısa video işlərimiz",
        shortLabel: "Motion və reels",
      },
    },
    projects: [
      {
        slug: "qarabagh",
        category: "saytlar",
        badge: "QARABAGH",
        title: "Qarabagh",
        description:
          "Korporativ təqdimat və strukturlaşdırılmış məzmun axını ilə hazırlanan veb təcrübə.",
        image: "https://webline.az/wp-content/uploads/2024/02/service-01.jpg",
        alt: "Qarabagh website project preview",
      },
      {
        slug: "xezer-logistics",
        category: "saytlar",
        badge: "LOGISTICS",
        title: "Xəzər Logistics",
        description:
          "Xidmət, komanda və əlaqə axınını sadələşdirən müasir korporativ sayt həlli.",
        image: "https://webline.az/wp-content/uploads/2024/02/service-02.jpg",
        alt: "Corporate logistics website preview",
      },
      {
        slug: "natura-identity",
        category: "dizaynlar",
        badge: "BRAND ID",
        title: "Natura identity",
        description:
          "Rəng sistemi, tipografiya və daşıyıcı materiallar üzərində qurulmuş vizual kimlik işi.",
        image: "https://webline.az/wp-content/uploads/2024/02/part-04.jpg",
        alt: "Brand identity design presentation",
      },
      {
        slug: "atelier-packaging",
        category: "dizaynlar",
        badge: "PACKAGING",
        title: "Atelier packaging",
        description:
          "Premium məhsul xətti üçün hazırlanmış qablaşdırma və rəf görünüşü konsepti.",
        image: "https://webline.az/wp-content/uploads/2024/02/part-05.jpg",
        alt: "Packaging design layout",
      },
      {
        slug: "urban-campaign",
        category: "sosial-media",
        badge: "CAMPAIGN",
        title: "Urban campaign",
        description:
          "Aylıq kampaniya planı, post seriyaları və performans yönümlü məzmun sistemi.",
        image: "https://webline.az/wp-content/uploads/2024/02/part-02.jpg",
        alt: "Social media campaign visuals",
      },
      {
        slug: "food-launch",
        category: "sosial-media",
        badge: "SMM",
        title: "Food launch",
        description:
          "Yeni məhsul buraxılışı üçün reels, post və story formatlarında hazırlanan SMM paketi.",
        image: "https://webline.az/wp-content/uploads/2024/02/part-03.jpg",
        alt: "Food brand social media visuals",
      },
      {
        slug: "motion-reel",
        category: "video-reels",
        badge: "REEL",
        title: "Motion reel",
        description:
          "Brend ritmini və məhsul mesajını qısa formatda çatdıran dinamik video reels layihəsi.",
        image: "https://webline.az/wp-content/uploads/2024/02/part-01.jpg",
        alt: "Motion reel project frame",
      },
      {
        slug: "studio-short",
        category: "video-reels",
        badge: "SHORT VIDEO",
        title: "Studio short",
        description:
          "Kulis, məkan və komanda atmosferini göstərən qısa tanıtım video paketi.",
        image: "https://webline.az/wp-content/uploads/2024/02/part-06.jpg",
        alt: "Short studio reel frame",
      },
    ],
  },
  en: {
    eyebrow: "Portfolio",
    title: "Our work speaks for itself",
    description:
      "Explore our work across web, design, social media, and video categories.",
    categoriesLabel: "Categories",
    categoryLinkLabel: "Open projects",
    breadcrumbRoot: "Portfolio",
    emptyTitle: "Projects for this category are on the way",
    emptyDescription:
      "New work will appear here as soon as it is added to the portfolio.",
    projectCountLabel: "projects",
    categories: {
      saytlar: {
        title: "Websites",
        description: "About websites",
        shortLabel: "Website solutions",
      },
      dizaynlar: {
        title: "Designs",
        description: "Our design work",
        shortLabel: "Brand and visual design",
      },
      "sosial-media": {
        title: "Social media",
        description: "SMM campaigns",
        shortLabel: "Content and campaigns",
      },
      "video-reels": {
        title: "Video reels",
        description: "Short-form video work",
        shortLabel: "Motion and reels",
      },
    },
    projects: [
      {
        slug: "qarabagh",
        category: "saytlar",
        badge: "QARABAGH",
        title: "Qarabagh",
        description:
          "A web experience built with a clear corporate presentation and structured content flow.",
        image: "https://webline.az/wp-content/uploads/2024/02/service-01.jpg",
        alt: "Qarabagh website project preview",
      },
      {
        slug: "xezer-logistics",
        category: "saytlar",
        badge: "LOGISTICS",
        title: "Khazar Logistics",
        description:
          "A modern corporate website that simplifies services, team, and contact flows.",
        image: "https://webline.az/wp-content/uploads/2024/02/service-02.jpg",
        alt: "Corporate logistics website preview",
      },
      {
        slug: "natura-identity",
        category: "dizaynlar",
        badge: "BRAND ID",
        title: "Natura identity",
        description:
          "A visual identity system shaped through color, typography, and branded touchpoints.",
        image: "https://webline.az/wp-content/uploads/2024/02/Part-04.jpg",
        alt: "Brand identity design presentation",
      },
      {
        slug: "atelier-packaging",
        category: "dizaynlar",
        badge: "PACKAGING",
        title: "Atelier packaging",
        description:
          "A premium packaging concept built for product presentation and shelf impact.",
        image: "https://webline.az/wp-content/uploads/2024/02/Part-05.jpg",
        alt: "Packaging design layout",
      },
      {
        slug: "urban-campaign",
        category: "sosial-media",
        badge: "CAMPAIGN",
        title: "Urban campaign",
        description:
          "A monthly campaign plan with post series and performance-oriented content direction.",
        image: "https://webline.az/wp-content/uploads/2024/02/Part-02.jpg",
        alt: "Social media campaign visuals",
      },
      {
        slug: "food-launch",
        category: "sosial-media",
        badge: "SMM",
        title: "Food launch",
        description:
          "A launch package with reels, posts, and story formats for a new product campaign.",
        image: "https://webline.az/wp-content/uploads/2024/02/Part-03.jpg",
        alt: "Food brand social media visuals",
      },
      {
        slug: "motion-reel",
        category: "video-reels",
        badge: "REEL",
        title: "Motion reel",
        description:
          "A short-form video piece built to communicate brand rhythm and product messaging.",
        image: "https://webline.az/wp-content/uploads/2024/02/Part-01.jpg",
        alt: "Motion reel project frame",
      },
      {
        slug: "studio-short",
        category: "video-reels",
        badge: "SHORT VIDEO",
        title: "Studio short",
        description:
          "A compact promo video package showing behind-the-scenes atmosphere and team presence.",
        image: "https://webline.az/wp-content/uploads/2024/02/Part-06.jpg",
        alt: "Short studio reel frame",
      },
    ],
  },
  ru: {
    eyebrow: "Портфолио",
    title: "Наши работы говорят сами за себя",
    description:
      "Изучайте наши проекты по направлениям: сайты, дизайн, social media и видео.",
    categoriesLabel: "Категории",
    categoryLinkLabel: "Открыть проекты",
    breadcrumbRoot: "Портфолио",
    emptyTitle: "Проекты для этой категории готовятся",
    emptyDescription:
      "Новые работы появятся здесь сразу после добавления в портфолио.",
    projectCountLabel: "проектов",
    categories: {
      saytlar: {
        title: "Сайты",
        description: "О веб-сайтах",
        shortLabel: "Веб-решения",
      },
      dizaynlar: {
        title: "Дизайн",
        description: "Наши дизайн-работы",
        shortLabel: "Бренд и визуальный стиль",
      },
      "sosial-media": {
        title: "Соцсети",
        description: "SMM-кампании",
        shortLabel: "Контент и кампании",
      },
      "video-reels": {
        title: "Видео reels",
        description: "Короткие видео",
        shortLabel: "Motion и reels",
      },
    },
    projects: [],
  },
  de: {
    eyebrow: "Portfolio",
    title: "Unsere Arbeiten sprechen für sich",
    description:
      "Entdecken Sie unsere Arbeiten in den Bereichen Web, Design, Social Media und Video.",
    categoriesLabel: "Kategorien",
    categoryLinkLabel: "Projekte öffnen",
    breadcrumbRoot: "Portfolio",
    emptyTitle: "Projekte für diese Kategorie folgen",
    emptyDescription:
      "Sobald neue Arbeiten hinzugefügt werden, erscheinen sie hier.",
    projectCountLabel: "projekte",
    categories: {
      saytlar: {
        title: "Websites",
        description: "Über Websites",
        shortLabel: "Web-Lösungen",
      },
      dizaynlar: {
        title: "Designs",
        description: "Unsere Designarbeiten",
        shortLabel: "Marke und visuelles Design",
      },
      "sosial-media": {
        title: "Social Media",
        description: "SMM-Kampagnen",
        shortLabel: "Content und Kampagnen",
      },
      "video-reels": {
        title: "Video Reels",
        description: "Kurzvideo-Arbeiten",
        shortLabel: "Motion und Reels",
      },
    },
    projects: [],
  },
  tr: {
    eyebrow: "Portföy",
    title: "İşlerimiz kendini anlatır",
    description:
      "Web, tasarım, sosyal medya ve video kategorilerindeki işlerimizi keşfedin.",
    categoriesLabel: "Kategoriler",
    categoryLinkLabel: "Projeleri aç",
    breadcrumbRoot: "Portföy",
    emptyTitle: "Bu kategori için projeler hazırlanıyor",
    emptyDescription:
      "Yeni işler eklendikçe burada görünmeye başlayacak.",
    projectCountLabel: "proje",
    categories: {
      saytlar: {
        title: "Web siteleri",
        description: "Web siteleri hakkında",
        shortLabel: "Web çözümleri",
      },
      dizaynlar: {
        title: "Tasarımlar",
        description: "Tasarım işlerimiz",
        shortLabel: "Marka ve görsel tasarım",
      },
      "sosial-media": {
        title: "Sosyal medya",
        description: "SMM kampanyaları",
        shortLabel: "İçerik ve kampanyalar",
      },
      "video-reels": {
        title: "Video reels",
        description: "Kısa video işlerimiz",
        shortLabel: "Motion ve reels",
      },
    },
    projects: [],
  },
};

export const fallbackPortfolioProjects: PortfolioProject[] =
  portfolioContent.az.projects;

function getCategoryContent(
  locale: LocaleCode,
  categories?: PortfolioCategoryContent[]
): PortfolioCategoryContent[] {
  const dictionary = portfolioContent[locale] ?? portfolioContent.az;
  const source =
    categories?.length ? categories : fallbackSiteContent.portfolioCategories;

  return source.map((item) => {
    const fallbackCategory = dictionary.categories[item.slug];

    return {
      slug: item.slug,
      title: item.title || fallbackCategory?.title || item.slug,
      description:
        item.description || fallbackCategory?.description || "",
      shortLabel:
        item.shortLabel ||
        fallbackCategory?.shortLabel ||
        (fallbackCategory?.title ?? item.title ?? item.slug),
    };
  });
}

export function getPortfolioCategories(
  locale: LocaleCode,
  categories?: PortfolioCategoryContent[],
  projectsInput?: PortfolioProject[]
): PortfolioCategoryCard[] {
  const dictionary = portfolioContent[locale] ?? portfolioContent.az;
  const categoryContent = getCategoryContent(locale, categories);
  const projects = projectsInput?.length ? projectsInput : getPortfolioProjects(locale);
  const projectCountByCategory = projects.reduce<Record<string, number>>(
    (accumulator, project) => {
      accumulator[project.category] = (accumulator[project.category] ?? 0) + 1;
      return accumulator;
    },
    {}
  );

  return categoryContent.map((category, index) => {
    const previewProject =
      projects.find((project) => project.category === category.slug) ?? projects[index] ?? projects[0];
    const fallbackCategory = dictionary.categories[category.slug];
    const count = projectCountByCategory[category.slug] ?? 0;

    return {
      slug: category.slug,
      title: category.title || fallbackCategory?.title || category.slug,
      description:
        category.description || fallbackCategory?.description || "",
      shortLabel: `${count} ${dictionary.projectCountLabel}`,
      image:
        previewProject?.image ||
        fallbackPortfolioProjects[0]?.image ||
        "https://webline.az/wp-content/uploads/2024/02/service-01.jpg",
      alt:
        previewProject?.alt ||
        fallbackPortfolioProjects[0]?.alt ||
        "Portfolio category preview",
      featuredTitle:
        previewProject?.title ||
        category.shortLabel ||
        fallbackCategory?.shortLabel ||
        category.title,
    };
  });
}

export function getPortfolioProjects(locale: LocaleCode) {
  const dictionary = portfolioContent[locale] ?? portfolioContent.az;

  if (dictionary.projects.length) {
    return dictionary.projects;
  }

  return portfolioContent.az.projects;
}

export function getPortfolioCategory(
  locale: LocaleCode,
  slug: PortfolioCategorySlug,
  categories?: PortfolioCategoryContent[]
) {
  const dictionary = portfolioContent[locale] ?? portfolioContent.az;
  const fallbackCategory = dictionary.categories[slug];
  const category = getCategoryContent(locale, categories).find(
    (item) => item.slug === slug
  ) ?? {
    slug,
    title: fallbackCategory?.title ?? slug,
    description: fallbackCategory?.description ?? "",
    shortLabel: fallbackCategory?.shortLabel ?? slug,
  };

  return {
    slug,
    eyebrow: dictionary.eyebrow,
    title: category.title,
    description: category.description,
    shortLabel: category.shortLabel || fallbackCategory?.shortLabel || category.title,
  };
}

export function getPortfolioPageCopy(locale: LocaleCode) {
  const dictionary = portfolioContent[locale] ?? portfolioContent.az;

  return {
    eyebrow: dictionary.eyebrow,
    title: dictionary.title,
    description: dictionary.description,
    categoriesLabel: dictionary.categoriesLabel,
    categoryLinkLabel: dictionary.categoryLinkLabel,
    breadcrumbRoot: dictionary.breadcrumbRoot,
    emptyTitle: dictionary.emptyTitle,
    emptyDescription: dictionary.emptyDescription,
  };
}
