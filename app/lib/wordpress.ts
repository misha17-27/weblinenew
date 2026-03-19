import {
  fallbackInsights,
  fallbackSiteContent,
  type InsightItem,
  type SiteContent,
} from "./site-data";

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

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(buildApiUrl(path), {
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

export async function getSiteContent(): Promise<SiteContent> {
  const data = await safeFetch<Partial<SiteContent>>("/runok/v1/settings");

  if (!data) {
    return fallbackSiteContent;
  }

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
      items: data.services?.items ?? fallbackSiteContent.services.items,
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
    pageIntros: {
      ...fallbackSiteContent.pageIntros,
      ...data.pageIntros,
    },
  };
}

export async function getInsights(): Promise<InsightItem[]> {
  const portfolio = await safeFetch<InsightItem[]>("/runok/v1/portfolio");

  if (portfolio?.length) {
    return portfolio.map((item, index) => ({
      ...fallbackInsights[index % fallbackInsights.length],
      ...item,
      image: item.image || fallbackInsights[index % fallbackInsights.length].image,
      alt: item.alt || fallbackInsights[index % fallbackInsights.length].alt,
    }));
  }

  const posts = await safeFetch<WpPost[]>(
    "/wp/v2/posts?_embed&per_page=3&orderby=date&order=desc"
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
