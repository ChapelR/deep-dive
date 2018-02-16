var CACHE = 'deep-dive-precache';
var precacheFiles = [
        // main app
        './',
        'index.html',
        // menu and ui icons
        'assets/images/icons/about.svg',
        'assets/images/icons/cash.svg',
        'assets/images/icons/data.svg',
        'assets/images/icons/loot.svg',
        'assets/images/icons/mute.svg',
        'assets/images/icons/restart.svg',
        'assets/images/icons/settings.svg',
        'assets/images/icons/tanks.svg',
        'assets/images/icons/unmute.svg',
        'assets/images/icons/upgrades.svg',
        'assets/images/icons/hub/buy.svg',
        'assets/images/icons/hub/cafe.svg',
        'assets/images/icons/hub/donations.svg',
        'assets/images/icons/hub/protectors.svg',
        'assets/images/icons/hub/sell.svg',
        'assets/images/icons/hub/workers.svg',
        // fonts 
        'assets/fonts/base.ttf',
        'assets/fonts/rob.ttf',
        'assets/fonts/rob-m.ttf'
        /* no audio */
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
    // console.log('The service worker is being installed.');
    evt.waitUntil(precache().then(function() {
        // console.log('[ServiceWorker] Skip waiting on install');
        return self.skipWaiting();
    })
    );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
    // console.log('[ServiceWorker] Claiming clients for current page');
    return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
    // console.log('The service worker is serving the asset.'+ evt.request.url);
    evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}


function fromCache(request) {
    //we pull files from the cache first thing so we can show them fast
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match').then( cache.add(request.url) ).catch();
        });
    });
}


function update(request) {
    // this is where we call the server to get the newest version of the 
    // file to use the next time we show view
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request){
    //this is the fallback if it is not in the cahche to go to the server and get it
    return fetch(request).then(function(response){ return response})
}


// to please lord google
/*self.addEventListener('install', function(event) {});
self.addEventListener('fetch', function(event) {});*/