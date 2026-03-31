import {
  fallbackInsights,
  fallbackSiteContent,
  type InsightItem,
  type PartnerItem,
  type SiteContent,
} from "./site-data";
import type { LocaleCode } from "./locale";

type WpRendered = {
  rendered: string;
};

type WpMedia = {
  source_url?: string;
  alt_text?: string;
};

type WpPost = {
  id: number;
  date: string;
  title: WpRendered;
  excerpt: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: Array<Array<{ name: string }>>;
  };
};

const apiBase =
  process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ??
  "http://localhost:8090/wp-json";

function appendLang(path: string, locale?: LocaleCode) {
  if (!locale) {
    return path;
  }

  return `${path}${path.includes("?") ? "&" : "?"}lang=${locale}`;
}

function buildApiUrl(path: string) {
  if (apiBase.includes("rest_route=")) {
    const [route, query = ""] = path.split("?");
    const normalizedBase = apiBase.endsWith("=") ? apiBase : `${apiBase}=`;
    return `${normalizedBase}${route}${query ? `&${query}` : ""}`;
  }

  return `${apiBase}${path}`;
}

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

async function safeFetch<T>(path: string, locale?: LocaleCode): Promise<T | null> {
  try {
    const response = await fetch(buildApiUrl(appendLang(path, locale)), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getSiteContent(locale?: LocaleCode): Promise<SiteContent> {
  const data = await safeFetch<Partial<SiteContent>>("/runok/v1/settings", locale);

  if (!data) {
    return fallbackSiteContent;
  }

  const cmsServiceItems =
    data.services?.items && data.services.items.length >= 6
      ? data.services.items
      : fallbackSiteContent.services.items;

  return {
    ...fallbackSiteContent,
    ...data,
    homeHero: {
      ...fallbackSiteContent.homeHero,
      ...data.homeHero,
    },
    services: {
      ...fallbackSiteContent.services,
      ...data.services,
      items: cmsServiceItems,
    },
    about: {
      ...fallbackSiteContent.about,
      ...data.about,
      bullets: data.about?.bullets ?? fallbackSiteContent.about.bullets,
    },
    process: {
      ...fallbackSiteContent.process,
      ...data.process,
      items: data.process?.items ?? fallbackSiteContent.process.items,
    },
    faq: {
      ...fallbackSiteContent.faq,
      ...data.faq,
      items: data.faq?.items ?? fallbackSiteContent.faq.items,
    },
    contact: {
      ...fallbackSiteContent.contact,
      ...data.contact,
    },
    offices: data.offices?.length ? data.offices : fallbackSiteContent.offices,
    pageIntros: {
      ...fallbackSiteContent.pageIntros,
      ...data.pageIntros,
    },
  };
}

export async function getInsights(locale?: LocaleCode): Promise<InsightItem[]> {
  const portfolio = await safeFetch<InsightItem[]>("/runok/v1/portfolio", locale);

  if (portfolio?.length) {
    return portfolio.map((item, index) => ({
      ...fallbackInsights[index % fallbackInsights.length],
      ...item,
      image: item.image || fallbackInsights[index % fallbackInsights.length].image,
      alt: item.alt || fallbackInsights[index % fallbackInsights.length].alt,
    }));
  }

  const posts = await safeFetch<WpPost[]>(
    "/wp/v2/posts?_embed&per_page=3&orderby=date&order=desc",
    locale
  );

  if (!posts?.length) {
    return fallbackInsights;
  }

  return posts.map((post, index) => {
    const fallback = fallbackInsights[index % fallbackInsights.length];
    const category =
      post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? fallback.category;
    const image =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? fallback.image;
    const alt =
      post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || fallback.alt;

    return {
      category,
      date: new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      title: stripHtml(post.title.rendered) || fallback.title,
      description: stripHtml(post.excerpt.rendered) || fallback.description,
      image,
      alt,
    };
  });
}

export async function getPartners(locale?: LocaleCode): Promise<PartnerItem[]> {
  const partners = await safeFetch<PartnerItem[]>("/runok/v1/partners", locale);

  if (partners?.length) {
    return partners.filter((item) => item.image);
  }

  return [
    { title: "Part 01", image: "https://webline.az/wp-content/uploads/2024/02/Part-01.jpg" },
    { title: "Part 02", image: "https://webline.az/wp-content/uploads/2024/02/Part-02.jpg" },
    { title: "Part 03", image: "https://webline.az/wp-content/uploads/2024/02/Part-03.jpg" },
    { title: "Part 04", image: "https://webline.az/wp-content/uploads/2024/02/Part-04.jpg" },
    { title: "Part 05", image: "https://webline.az/wp-content/uploads/2024/02/Part-05.jpg" },
    { title: "Part 06", image: "https://webline.az/wp-content/uploads/2024/02/Part-06.jpg" },
  ];
}
