const CACHE_NAME = 'wisdom-v1';
const urlsToCache = [
  '/citation/',
  '/citation/index.html',
  '/citation/celebrities.html',
  '/citation/gallery.html',
  '/citation/style.css',
  '/citation/script.js',
  '/citation/data.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
