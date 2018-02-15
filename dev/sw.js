var CACHE = 'deep-dive-precache';
var precacheFiles = [
        'index.html',
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
        'assets/fonts/base.ttf',
        'assets/fonts/rob.ttf',
        'assets/fonts/rob-m.ttf',
        'assets/audio/effects/dive.mp3',
        'assets/audio/effects/underwater1.mp3',
        'assets/audio/effects/underwater2.mp3',
        'assets/audio/effects/underwater3.mp3',
        'assets/audio/effects/underwater4.mp3',
        'assets/audio/effects/underwater5.mp3',
        'assets/audio/effects/underwater6.mp3',
        'assets/audio/effects/links/beep.mp3',
        'assets/audio/effects/links/buy.mp3',
        'assets/audio/effects/links/cocking.mp3',
        'assets/audio/effects/links/dice.mp3',
        'assets/audio/effects/links/next.mp3',
        'assets/audio/effects/links/no.mp3',
        'assets/audio/effects/links/page.mp3',
        'assets/audio/effects/links/steps.mp3',
        'assets/audio/effects/links/switch.mp3',
        'assets/audio/music/51oh.mp3',
        'assets/audio/music/cibelle.mp3',
        'assets/audio/music/cidade-sol.mp3',
        'assets/audio/music/milan.mp3',
        'assets/audio/music/que-pena.mp3',
        'assets/audio/music/raindrops.mp3',
        'assets/audio/music/untitled.mp3'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache().then(function() {
        console.log('[ServiceWorker] Skip waiting on install');
        return self.skipWaiting();
    })
    );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Claiming clients for current page');
    return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.'+ evt.request.url);
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
            return matching || Promise.reject('no-match');
        });
    });
}


function update(request) {
    //this is where we call the server to get the newest version of the 
    //file to use the next time we show view
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