import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const defaultPaths = [
  "/",
  "/about",
  "/services",
  "/process",
  "/portfolio",
  "/faq",
  "/contact",
];

type RevalidatePayload = {
  secret?: string;
  path?: string;
  paths?: string[];
  slug?: string;
  type?: string;
  revalidateAll?: boolean;
};

function normalizePath(path: string) {
  if (!path) {
    return null;
  }

  const trimmed = path.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function getPathsFromPayload(payload: RevalidatePayload) {
  const resolvedPaths = new Set<string>();

  if (payload.revalidateAll) {
    defaultPaths.forEach((path) => resolvedPaths.add(path));
  }

  if (Array.isArray(payload.paths)) {
    payload.paths
      .map(normalizePath)
      .filter((path): path is string => Boolean(path))
      .forEach((path) => resolvedPaths.add(path));
  }

  const singlePath = normalizePath(payload.path ?? "");

  if (singlePath) {
    resolvedPaths.add(singlePath);
  }

  if (payload.slug && payload.type === "page") {
    const slugPath = payload.slug === "home" ? "/" : normalizePath(payload.slug);

    if (slugPath) {
      resolvedPaths.add(slugPath);
    }
  }

  if (payload.type === "post") {
    resolvedPaths.add("/portfolio");
    resolvedPaths.add("/");
  }

  if (!resolvedPaths.size) {
    defaultPaths.forEach((path) => resolvedPaths.add(path));
  }

  return Array.from(resolvedPaths);
}

function readSecret(request: NextRequest, payload: RevalidatePayload) {
  return (
    request.nextUrl.searchParams.get("secret") ??
    request.headers.get("x-revalidate-secret") ??
    payload.secret ??
    ""
  );
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not configured." },
      { status: 500 }
    );
  }

  let payload: RevalidatePayload = {};

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    payload = {};
  }

  const providedSecret = readSecret(request, payload);

  if (providedSecret !== configuredSecret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  const paths = getPathsFromPayload(payload);

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    ok: true,
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  });
}
