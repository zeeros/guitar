const CACHE_NAME = "fretboard-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./org.css",
  "./custom.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff",
  "./et-book/et-book-bold-line-figures/et-book-bold-line-figures.woff",
  "./et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.woff",
  "./img/P1-P8-intervals.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
