import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.arabfingers.site";

/**
 * Canonical-origin guard.
 *
 * Google had indexed `http://www.arabfingers.site/` as a separate page from the
 * https copy, because plain HTTP was answering 200 instead of redirecting. That
 * produced "Duplicate without user-selected canonical" in Search Console and an
 * insecure copy of every URL.
 *
 * The primary fix is Cloudflare's "Always Use HTTPS" toggle, which handles this
 * at the edge without waking the Worker. This is the belt-and-braces copy so the
 * site is never reachable over HTTP even if that setting is lost, plus the HSTS
 * header that stops browsers trying HTTP again.
 */
/**
 * Security headers applied to every page response. The site loads Google
 * AdSense (non-personalized, paused on the toddler stages), so the CSP must
 * allow its script/iframe/beacon origins; everything else is locked to
 * same-origin. frame-ancestors 'none' matters here specifically: an embedded
 * copy of a tap-anywhere toy would collect mistimed taps as ad clicks.
 *
 * These live in middleware rather than public/_headers because prerendered
 * HTML is served through the Worker, not the static-asset pipeline that
 * _headers governs.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net",
  "font-src 'self' data:",
  "connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com https://cloudflareinsights.com",
  "frame-src https://googleads.g.doubleclick.net https://*.googlesyndication.com https://www.google.com",
  "media-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  // XFO for older browsers that ignore frame-ancestors.
  "X-Frame-Options": "DENY",
  // No feature this site needs; deny by default except what first-party code uses.
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  // Cloudflare terminates TLS, so the original scheme arrives in the header —
  // url.protocol reflects the internal hop, not what the visitor used.
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = (request.headers.get("host") ?? url.host).toLowerCase();
  const hostname = host.split(":")[0];

  // Only the real production hostnames are policed. localhost and any preview
  // deployment must pass through untouched, or `next dev` redirects itself to
  // production on every request.
  const isProductionHost = hostname === "arabfingers.site" || hostname === CANONICAL_HOST;

  if (isProductionHost && (proto !== "https" || hostname !== CANONICAL_HOST)) {
    return NextResponse.redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 308);
  }

  const response = NextResponse.next();
  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(header, value);
  }
  if (isProductionHost) {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  return response;
}

export const config = {
  // Static assets and the generated PDFs are served straight from the CDN and
  // never need this check; keeping them out avoids a Worker hop per asset.
  matcher: ["/((?!_next/static|_next/image|printables/|sounds/|audio/|images/|pins/|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|mp3|pdf|txt|xml|json|js)$).*)"],
};
