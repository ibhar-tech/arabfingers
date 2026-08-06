// Bump this whenever a file is REPLACED at a path it already occupied. The
// activate handler deletes every cache that is not this name, so a bump is what
// forces returning visitors off stale copies. It was still "v4" when all 158
// audio clips were regenerated in place, which left earlier visitors hearing the
// old recordings with no way to ever get the new ones.
const CACHE_NAME = "arabfingers-v5";
// Every URL here must exist. cache.addAll is atomic — one 404 rejects the whole
// call and nothing gets precached at all. This listed /icon-192.png and
// /icon-512.png, which have never been in public/ (the manifest uses the single
// /icon.svg), so the precache silently did nothing and the offline promise in
// the privacy policy was not being kept.
const PRECACHE_URLS = [
  "/en",
  "/ar",
  "/icon.svg",
  "/sounds/smash.mp3",
  "/sounds/chime.mp3",
  "/sounds/confetti.mp3",
];

const OFFLINE_HTML =
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ArabFingers</title><style>body{background:#050816;color:white;text-align:center;padding:50px;font-family:sans-serif}h1{font-size:2rem}p{margin-top:1rem;color:rgba(255,255,255,.7)}button{margin-top:2rem;padding:12px 24px;border:none;border-radius:8px;background:#7f77dd;color:white;font-size:1rem;cursor:pointer}</style></head><body><h1>ArabFingers</h1><p>Please connect to the internet to play.</p><button onclick="location.reload()">Retry</button></body></html>';

// Install: activate immediately without waiting for precache.
// This is critical — blocking install on network fetches delays SW
// activation, which delays Chrome's PWA installability check and
// prevents beforeinstallprompt from firing on the first page load.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      ),
    ])
  );

  // Precache in the background — fire and forget, does NOT block activation
  caches
    .open(CACHE_NAME)
    .then((cache) => cache.addAll(PRECACHE_URLS))
    .catch(() => {});
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  if (request.url.startsWith("chrome-extension")) return;

  // Navigation requests: network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match("/en").then((enCached) => {
              if (enCached) return enCached;
              // Synthetic 200 fallback — guarantees Chrome's offline
              // installability check always passes, even before precache
              // populates.
              return new Response(OFFLINE_HTML, {
                headers: { "Content-Type": "text/html" },
              });
            });
          })
        )
    );
    return;
  }

  // Sub-resources: stale-while-revalidate. Serving the cached copy keeps the
  // instant feel that cache-first gave us, but the background refetch means a
  // file replaced at the same path (an mp3 re-recorded with a new voice) reaches
  // the child on their next visit instead of never.
  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached || new Response("", { status: 408 }));
      return cached || fresh;
    })
  );
});
