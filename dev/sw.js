// to please lord google
self.addEventListener( 'install', function (e) {
    
    function onInstall () {
        return caches.open('static').then(function (cache) {
            cache.add('index.html');
        });
    }
    
    e.waitUntil(onInstall(e))
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});