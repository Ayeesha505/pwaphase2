self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sample').then(function(cache) {
      return cache.addAll([

      ]);
    }));
    console.log("sef");
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('sample').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }));
});
