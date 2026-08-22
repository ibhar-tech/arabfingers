import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a valid locale. Without it, a dead link
 * like /en/no-such-page falls through to the root 404 and loses the localized
 * UI; rendering notFound() here routes it to app/[locale]/not-found.tsx inside
 * the correct lang/dir shell.
 */
export default function CatchAllPage() {
  notFound();
}
