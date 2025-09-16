const CACHE_NAME = "shopping-list-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/icon-192.png",
  "./images/icon-512.png"
];

// 安裝 Service Worker 並快取必要資源
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 啟用階段，清理舊快取
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// 攔截請求，支援離線存取
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
