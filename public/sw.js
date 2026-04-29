const CACHE_NAME = "arabfingers-v3";
const PRECACHE_URLS = [
  "/en",
  "/ar",
  "/icon-192.png",
  "/icon-512.png",
  "/sounds/smash.mp3",
  "/sounds/chime.mp3",
  "/sounds/confetti.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {
        // Don't block install if precaching fails
      })
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
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  if (request.url.startsWith("chrome-extension")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            // Fallback to precached /en if offline and not in cache
            return caches.match("/en").then((enCached) => {
              if (enCached) return enCached;
              // Provide a synthetic 200 response to pass PWA offline checks
              return new Response(
                '<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title>ArabFingers</title></head><body style="background:#050816;color:white;text-align:center;padding:50px;font-family:sans-serif;"><h1>ArabFingers</h1><p>Please connect to the internet to play.</p><button onclick="window.location.reload()">Retry</button></body></html>',
                { headers: { "Content-Type": "text/html" } }
              );
            });
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && request.method === "GET") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
