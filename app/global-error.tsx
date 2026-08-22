"use client";

/**
 * Last-resort boundary: renders when even the locale layout crashes, so it
 * cannot rely on next-intl or the theme classes — it owns its own <html> and
 * <body>. Deliberately plain and bilingual-inline.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#fff7ec", color: "#2a1d4e", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Something went wrong · حدث خطأ ما</h1>
          <p style={{ marginTop: "0.75rem", opacity: 0.75 }}>
            Please reload the page. · يرجى تحديث الصفحة والمحاولة من جديد.
          </p>
          {error.digest ? (
            <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", opacity: 0.5 }}>Error ID: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "1.5rem", padding: "0.6rem 1.25rem", borderRadius: "999px", border: "none", background: "#ffb22e", color: "#2a1d4e", fontWeight: 800, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
