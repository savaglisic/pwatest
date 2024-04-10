const CACHE_NAME = 'v1';
const basePath = '/pwatest';

const urlsToCache = [
  basePath + '/',
  basePath + '/index.html',
  basePath + '/static/js/bundle.js',
  basePath + '/static/js/0.chunk.js',
  basePath + '/static/js/main.chunk.js',
  // Add other resources that you want to cache
  // Note: Use basePath before each resource path
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = ['v1'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
