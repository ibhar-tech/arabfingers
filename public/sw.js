const CACHE_NAME = "arabfingers-v2";
const PRECACHE_URLS = [
  "/",
  "/en",
  "/ar",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/sounds/smash.mp3",
  "/sounds/chime.mp3",
  "/sounds/confetti.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Don't cache-intercept navigation requests or the manifest
  // Let the browser handle these directly for PWA install to work
  const url = new URL(event.request.url);
  if (event.request.mode === "navigate" || url.pathname === "/manifest.json") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
      return cached || fetched;
    })
  );
});
