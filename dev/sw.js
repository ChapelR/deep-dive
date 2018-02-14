// service workers
function cacheFonts () {
    var mainDir = '/assets/';
    // cache font assets
    var fontDir = 'fonts/',
        fontList = [
            'base.ttf', 
            'rod.ttf', 
            'rob-m.ttf'
        ];
    fontList = fontList.map( function (font) { return mainDir + fontDir + font; });
    return fontList;
}

function cacheImages () {
    var mainDir = '/assets/';
    // cache image assets
    var imgDir = ['images/'],
        imgList = [
            'about.svg', 
            'cash.svg', 
            'data.svg', 
            'loot.svg', 
            'mute.svg', 
            'restart.svg', 
            'settings.svg', 
            'tanks.svg', 
            'unmute.svg', 
            'upgrades.svg', 
            'hub/buy.svg', 
            'hub/cafe.svg', 
            'hub/donations.svg', 
            'hub/protectors.svg', 
            'hub/sell.svg', 
            'hub/workers.svg' 
        ];
    imgList = imgList.map( function (img) { return mainDir + imgDir + img; });
    return imgList;
}

function cacheAudio () {
    var mainDir = '/assets/';
    // cache effect assets
    var effectsDir = ['audio/effects/'],
        effectList = [
            'dive.mp3', 
            'dive.ogg', 
            'underwater1.mp3', 
            'underwater1.ogg', 
            'underwater2.mp3', 
            'underwater2.ogg', 
            'underwater3.mp3', 
            'underwater3.ogg', 
            'underwater4.mp3', 
            'underwater4.ogg', 
            'underwater5.mp3', 
            'underwater5.ogg', 
            'underwater6.mp3', 
            'underwater6.ogg', 
            'links/beep.mp3', 
            'links/beep.ogg', 
            'links/cocking.mp3', 
            'links/cocking.ogg', 
            'links/dice.mp3', 
            'links/dice.ogg', 
            'links/next.mp3', 
            'links/next.ogg', 
            'links/no.mp3', 
            'links/no.ogg', 
            'links/page.mp3', 
            'links/page.ogg', 
            'links/switch.mp3', 
            'links/switch.ogg' 
        ];
    effectList = effectList.map( function (effect) { return mainDir + effectsDir + effect; });
    
    // cache music
    var musicDir = ['audio/music/'],
    musicList = [
        '51oh.mp3', 
        '510h.ogg', 
        'cibelle.mp3', 
        'cibelle.ogg', 
        'cidade-sol.mp3', 
        'cidade-sol.ogg', 
        'milan.mp3', 
        'milan.ogg', 
        'que-pena.mp3', 
        'que-pena.ogg', 
        'raindrops.mp3', 
        'raindrops.ogg', 
        'untitled.mp3', 
        'untitled.ogg' 
    ];
    musicList = musicList.map( function (song) { return mainDir + musicDir + song; });
    return musicList.concat(effectList);
}

function cacheIcons () {
    // cache image assets
    var icnDir = ['/app/icon/'],
        icnList = [
            'home48.png', 
            'home72.png', 
            'home96.png', 
            'home144.png', 
            'home168.png', 
            'home192.png' 
        ];
    icnList = icnList.map( function (icon) { return icnDir + icon; });
    return icnList;
} 

function createCacheArray () {
    return cacheFonts().concat(cacheImages(), cacheAudio(), cacheIcons(), ['index.html', '.']);
}

var CACHE_NAME = 'deep-dive-cache',
    urlsToCache = createCacheArray();

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log(urlsToCache);
            return cache.addAll(urlsToCache);
        })
    );
});