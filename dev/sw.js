// to please lord google
self.addEventListener( 'install', function (e) {
    
    function onInstall () {
        return caches.open('static').then(function (cache) {
            cache.addAll(['/index.html', '.', '/']);
        });
    }
    
    e.waitUntil(onInstall(e))
});