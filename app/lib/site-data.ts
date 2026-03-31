export type NavItem = {
  label: string;
  href: string;
};

export type SectionItem = {
  icon?: string;
  number?: string;
  title: string;
  description: string;
  highlighted?: boolean;
  items?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
  open?: boolean;
};

export type InsightItem = {
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type PartnerItem = {
  title: string;
  image: string;
};

export type ContactOffice = {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  embedUrl: string;
};

export type PageIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type SiteContent = {
  homeHero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
  };
  services: {
    heading: string;
    intro: string;
    items: SectionItem[];
  };
  about: {
    title: string;
    description: string;
    bullets: string[];
  };
  process: {
    heading: string;
    items: SectionItem[];
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  contact: {
    email: string;
    phone: string;
    office: string;
    mapUrl: string;
    embedUrl: string;
    panelTitle: string;
    panelDescription: string;
    responseTitle: string;
    responseText: string;
    mapHeading: string;
  };
  offices: ContactOffice[];
  pageIntros: Record<string, PageIntroContent>;
};

export const navItems: NavItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Partnyorlar", href: "/process" },
  { label: "Xidmətlər", href: "/services" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Əlaqə", href: "/contact" },
];

export const fallbackInsights: InsightItem[] = [
  {
    category: "Design",
    date: "May 12, 2024",
    title: "The Future of Editorial Design in Web 3.0",
    description:
      "Exploring how bold typography and asymmetry are returning to the digital mainstream.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAg2mmqoKVS-sql3ijHU_BfxguLLgfNhPGOKiAjbOOaYtZdQFsSQ1d_9pYFUhKhCUT2XzRYayIEr10cpNe5YJhlKsisvOAuLZNHs-EoIrVvfvK4rMFyfwZj4bmaTMBGsBfiUl0GnbyAcPZhBQfyD4YKOKQKaHzzl8Av_VWZPQW10_GFN387okOyeb_KOa_I2D2y9mh8vTcG9NOvpHMmrN2YvK8hiLKThQN_WIZg6e3k1euU9FEHpWcigpq194r_h9ggCamND-7SD_E",
    alt: "Office collaboration during a design sprint",
  },
  {
    category: "Tech",
    date: "April 28, 2024",
    title: "Optimizing Performance for High-End Visuals",
    description:
      "How to maintain ultra-fast load times while delivering high-resolution art assets.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANU7lN_fMjIOvWssDUmO_NuCruUxWhd5G309XEfQ2U544AVqHcCWEyj-1usVdVFCIvRXKoUdxIoMrBe56OQo2lY2Zmj5msTiWx1a7fC7-J9pwci_wcC6-t1bARym4-DpFq46uzm1AwB9DzdW8Adxicb3cBcUIoLxWkle34d99SWWnHcqE5lSwDMwGIVwTkcWrD03q0xfYW5C-TZh96Rz7yWV8xjyZUG1sNGKLzLlIPjmLjB7QP7QXWqKMG-7sf3EBQXycrH6gWw9Q",
    alt: "Data visualization on a large screen",
  },
  {
    category: "Business",
    date: "March 15, 2024",
    title: "Digital Transformation for Luxury Brands",
    description:
      "Case studies on how elite brands adapted their physical heritage to the screen.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_7JouxEcMwGTfnKw0B0ow5FtPod58NGv6H1jjQZJVEL8qVqtSEaEdkxdjhsThi4lBaDHrWRPLhBbovpWEs55FSdJTh8qG0oy-fhzEYDmZS4GucfycPzV6DLUqg1qhRXdzkg2WGBiGVPkDDRjSRjmnuxTMlJiFc844OhxMkYzDkosUHjHG07xvdvqxLquPnBv8720JZOEHSSNme2ijXaQOFUUz1ipbCZwsZcBsQOORYPGGOkY2Hsj5UyOyJ97pztK94ZBnFvBaWY0",
    alt: "Modern tech workspace with multiple monitors",
  },
];

export const fallbackSiteContent: SiteContent = {
  homeHero: {
    eyebrow: "Premium Web Agency",
    title: "Transforming Visions into",
    highlight: "Digital Reality",
    description:
      "We create high-end editorial digital experiences that redefine how brands connect with their audience. Precise, bold, and unapologetically modern.",
  },
  services: {
    heading: "Xidmətlər",
    intro:
      "Saytların hazırlanması, proqram təminatı və rəqəmsal dəstək xidmətləri bir sistem kimi planlanır və həyata keçirilir.",
    items: [
      {
        icon: "01",
        title: "Saytların hazırlanması",
        description:
          "Biz internetdə biznesinizi düzgün təmsil edən və sizə qazanc gətirən vebsaytlar yaradırıq.",
        items: [
          "Online mağaza",
          "Korporativ saytlar",
          "Xidmət saytları",
          "Elan saytları",
          "Turizm saytları və s.",
        ],
      },
      {
        icon: "02",
        title: "Proqramların hazırlanması",
        description:
          "Biznesinizin və müştərilərinizin rahatlığı üçün proqramlar və həllər təklif edirik.",
        items: [
          "Mobile app (iOS & Android)",
          "B2B proqramlar",
          "B2C proqramlar",
          "Desktop proqramlar",
          "Satış və anbar proqramları",
        ],
      },
      {
        icon: "03",
        title: "Rəqəmsal marketinq",
        description:
          "Sosial şəbəkələrdə və axtarış sistemlərində ön sıralarda olmaq üçün strateji rəqəmsal marketinq həlləri təqdim edirik.",
        items: [
          "SEO & Google Ads",
          "Facebook & Instagram (SMM)",
          "TikTok",
          "Kopiraytinq & kontent",
          "Foto & video çəkiliş",
        ],
      },
      {
        icon: "04",
        title: "Dizayn xidmətləri",
        description:
          "Yaratdığımız dizaynların estetik və funksional baxımdan güclü görünməsi üçün işləyirik.",
        items: [
          "Logo dizaynı",
          "Brandbook dizaynı",
          "Kataloq dizaynı",
          "Qrafik videolar",
          "3D dizayn",
        ],
      },
      {
        icon: "05",
        title: "Texniki dəstək",
        description:
          "Hazırladığımız saytların inkişafı və davamlı işləməsi üçün texniki dəstək göstəririk.",
        items: [
          "Saytlara texniki dəstək",
          "Saytların idarə olunması",
          "Server xidmətləri",
          "Hostinq xidmətləri",
        ],
      },
      {
        icon: "06",
        title: "İşinizə faydalı",
        description:
          "Biznesinizi düzgün təhlil edir, satışlarınızı və xidmət keyfiyyətini gücləndirməyə kömək edirik.",
        items: [
          "Data analizi",
          "Konsultasiya",
          "Korporativ email",
          "Google Business qeydiyyatı",
          "Avtobusda reklam",
        ],
      },
    ],
  },
  about: {
    title: "We are a team of curators, designers, and developers.",
    description:
      "Founded on the principle of editorial excellence, Runok helps visionary companies create digital assets that stand the test of time. We do not just build websites; we curate digital ecosystems.",
    bullets: [
      "Strategic Digital Consulting",
      "Award-winning Visual Design",
      "Scalable Enterprise Development",
    ],
  },
  process: {
    heading: "How We Work",
    items: [
      {
        number: "01",
        title: "Project Processing",
        description: "Initial research and deep dive into your brand architecture.",
      },
      {
        number: "02",
        title: "High Quality Products",
        description: "Iteration-driven design and rapid prototyping phase.",
      },
      {
        number: "03",
        title: "Huge Choice Products",
        description:
          "Exploration of multiple creative directions and refinements.",
      },
      {
        number: "04",
        title: "Quality Finished",
        description: "Final deployment with rigorous QA and performance checks.",
        highlighted: true,
      },
    ],
  },
  faq: {
    heading: "Common Questions",
    items: [
      {
        question: "What is your typical project timeline?",
        answer:
          "Most bespoke projects take between 8 to 12 weeks from discovery to launch, depending on complexity and scope of technical integrations.",
        open: true,
      },
      {
        question: "Do you offer post-launch support?",
        answer:
          "Yes. We provide structured post-launch support retainers that cover iteration, monitoring, and optimization.",
      },
      {
        question: "How do you handle branding vs. development?",
        answer:
          "Brand strategy, design systems, and engineering are handled as one workflow so the final product stays coherent.",
      },
    ],
  },
  contact: {
    email: "hello@runok.agency",
    phone: "+994 50 555 12 12",
    office: "Baku, Azerbaijan",
    mapUrl: "https://maps.google.com/?q=Baku,Azerbaijan",
    embedUrl: "https://www.google.com/maps?q=Baku,Azerbaijan&z=13&output=embed",
    panelTitle: "Direct lines for project inquiries and planning.",
    panelDescription:
      "If the scope is still rough, that is fine. Send the business goal, timeline, and what needs to change. We can structure the project from there.",
    responseTitle: "Response window",
    responseText: "Most inquiries get a reply within one business day.",
    mapHeading: "Find the studio in Baku.",
  },
  offices: [
    {
      city: "Bakı",
      country: "Azərbaycan",
      address: "Heydər Əliyev prospekti 5",
      phone: "+994 55 728 48 48",
      email: "info@thewebline.com",
      mapUrl: "https://maps.google.com/?q=Heydar+Aliyev+prospekti+5,+Baku",
      embedUrl:
        "https://www.google.com/maps?q=Heydar+Aliyev+prospekti+5,+Baku&z=13&output=embed",
    },
    {
      city: "Berlin",
      country: "Almaniya",
      address: "Naugarder Strasse 46, 10409",
      phone: "+49 176 75552813",
      email: "info@thewebline.com",
      mapUrl: "https://maps.google.com/?q=Naugarder+Strasse+46,+10409+Berlin",
      embedUrl:
        "https://www.google.com/maps?q=Naugarder+Strasse+46,+10409+Berlin&z=13&output=embed",
    },
    {
      city: "Vyana",
      country: "Avstriya",
      address: "A-1110, Simmeringer Hauptstr.26IB",
      phone: "+43 660 8600035",
      email: "info@thewebline.com",
      mapUrl: "https://maps.google.com/?q=Simmeringer+Hauptstrasse+26,+1110+Vienna",
      embedUrl:
        "https://www.google.com/maps?q=Simmeringer+Hauptstrasse+26,+1110+Vienna&z=13&output=embed",
    },
    {
      city: "Budapeşt",
      country: "Macarıstan",
      address: "1051, Széchenyi István tér 7-8",
      phone: "+36 30 336 6884",
      email: "info@thewebline.com",
      mapUrl: "https://maps.google.com/?q=Szechenyi+Istvan+ter+7-8,+1051+Budapest",
      embedUrl:
        "https://www.google.com/maps?q=Szechenyi+Istvan+ter+7-8,+1051+Budapest&z=13&output=embed",
    },
  ],
  pageIntros: {
    services: {
      eyebrow: "Services",
      title: "Specialized services for brands that want a sharper digital presence.",
      description:
        "Design, engineering, and UX are handled as one system so the final product stays visually bold and operationally reliable.",
    },
    process: {
      eyebrow: "Process",
      title:
        "A production workflow designed to keep strategy, design, and delivery aligned.",
      description:
        "Every stage reduces ambiguity: discovery, iteration, refinement, and launch are treated as one continuous system.",
    },
    about: {
      eyebrow: "About",
      title:
        "RUNOK is built for companies that care about design precision and technical execution.",
      description:
        "We combine brand thinking, product design, and modern frontend engineering into a single editorial-grade delivery process.",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title:
        "Selected insights and case-study style content for a premium agency presentation.",
      description:
        "This page can later be replaced with CMS-backed projects, but it is already split into its own route and ready for expansion.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions, project expectations, and delivery details.",
      description:
        "The FAQ now lives on its own route, which makes it easier to expand into a full support or pre-sales knowledge base.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let us discuss the next digital system your brand actually needs.",
      description:
        "Use the contact page for project requests, partnerships, and strategic conversations. The form is ready for backend wiring when you decide where submissions should go.",
    },
  },
};

export const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAD8iKMi7z_oenBDR6oXzPz-LalVCo0TITLEtjUyXLhsqlqO78BCgcxKNqgzZDM-9fxTPvdFpMNvIjC1sUXdpPJYksxK3J-B6DuNUbsu0cdO25keNFzQBRK3H19f13nL7WDJe-BIBZNnPUwIyPXB4sdbQK-t52-jHIurlgmVFfgJVadd-k3zGJMAAAszp4ck52MatKusut7nUT0oaScPUc4SoP2XpeOyjct3CVZ1zuHjaDdmKvnLWQWA62A5Fe_XUhF7etd6pa0kok";

export const aboutImageOne =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAPMqP284Qhq23lzHhiEP97RYWH1008qsoyiIsD6XmE8DEDZ3KIBatbvFDldV2_H44c7oenrG7vf14Tapds-rAmV5JX0Eor9GZVtKGVr-avHu62xJfO4kMR7C4-G7DpKKUYb7HI6HMRZHic7blh9Cif_HE7FZ5MTutAJYlVzTlO-9nxPo9oPpFwk2Vc_gSx6Z0yUALjubS1f3UlXdfmwYWOBdela_asACrx6pOHOA_Eu-tYbR6mxZ7PUscVGqRIavjVUZGlt_spkDA";

export const aboutImageTwo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuArGq3d-NQkwiLWznZzvhzcCFNU80bWUJPyoClTxz13OpvroZfxQ0040sydYrf_tEVU8opNYrmTqbYdDQ4nCX-VIS2liNMcySCRXgc3A_o1tSt1jD_G0MGjzVuxFj9_Ar5v5_zBtD08ORoThMbHTPY0PZ7cBz_HQCNKFCr6h8EA9grj97C8j0uRYuZvQ_y4p2nNLmxNd_1vB0CNrb53dI0YB-GKJ1IUbAaMEO71FeswuO46lo7KU29FZFi3HoXCTsOF6rUjXcg8o_U";
