const CACHE_NAME = 'app-v1';

const BLOCKED_ORIGINS = [
  'instagram.', 'fbcdn.net', 'facebook.com',
  'chrome-extension://', 'accounts.google.',
];

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/admin.html',
  '/admin.css',
  '/admin.js',
  '/app.js',
  '/style.css',
  '/supabaseClient.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(ASSETS_TO_CACHE.map(url => cache.add(url).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const shouldSkip = BLOCKED_ORIGINS.some(d => url.includes(d));
  if (shouldSkip) return;
  if (event.request.method !== 'GET') return;
  if (url.includes('supabase.co') || url.includes('supabase.io')) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'opaque') return response;
          const toCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, toCache));
          return response;
        })
        .catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});
