const CACHE_NAME = 'YaTodo-v1';
const ASSETS_TO_CACHE = [
  '/code_final/index.html',
  '/code_final/styles.css',
  '/code_final/script.js',
  '/code_final/icons/icon-192x192.png',
  '/code_final/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});