// to please lord google
self.addEventListener( 'install', function (e) {
    
    function onInstall () {
        return caches.open('static').then(function (cache) {
            cache.add('index.html');
        });
    }
    
    e.waitUntil(onInstall(e))
});