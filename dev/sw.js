/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/images/icons/about.svg","59f45e373cbe3415a04f53cd990b12be"],["/assets/images/icons/cash.svg","12b9d259a1ef29b1fd637e7a45e29734"],["/assets/images/icons/data.svg","8627141202357a587c2c35c027c19786"],["/assets/images/icons/hub/buy.svg","7f334dfeee21aab9683447f8bc8caf82"],["/assets/images/icons/hub/cafe.svg","e8b043ad5dec9d2a88b51449c63e9d84"],["/assets/images/icons/hub/donations.svg","2c0d19125d262ff7efe613c74704d70f"],["/assets/images/icons/hub/protectors.svg","3fd24baeccbfb50b5c00dda51c941f27"],["/assets/images/icons/hub/sell.svg","3a6f3fea1d83809def6c70357f9d8abf"],["/assets/images/icons/hub/workers.svg","97e22dbbb42c80a42642da3a3110ebd2"],["/assets/images/icons/loot.svg","0cd7645ade7190fc8ef32b4b5fd77fca"],["/assets/images/icons/mute.svg","49281000239fa72fa213837da9282d38"],["/assets/images/icons/restart.svg","b698249bfb76d2d866361d75fd8b9374"],["/assets/images/icons/settings.svg","28f3f73140ab2378fccb98e71bdb2701"],["/assets/images/icons/tanks.svg","1c7e011eb286341f43451ce285406155"],["/assets/images/icons/unmute.svg","d2bfdadcf718b4ee64318e95b3ff51d1"],["/assets/images/icons/upgrades.svg","f7ef524da88f5ebc362fa626d5748c9d"],["/assets/images/layers/layer-1.png","f9266d967d71b156aa499573490fe36c"],["/assets/images/layers/layer-2.png","660c1bc4e099bbc4c778077f7a7294ec"],["/assets/images/layers/layer-3.png","bdf35494903780a47cb49b0ba21aca9c"],["/assets/images/layers/layer-4.png","f3748562c60e5d1d0e7a90bb39df28c2"],["/assets/images/portraits/diver-f1.jpg","48c48f36a1c10126a1162ea08067da73"],["/assets/images/portraits/diver-f2.jpg","56d0f7011d99349bb998bc09b7f96213"],["/assets/images/portraits/diver-f3.jpg","c2529a33e5c64cb4448a3b04308f2d54"],["/assets/images/portraits/diver-m1.jpg","a9d4067f3e651e9ade2df04e184fd3c9"],["/assets/images/portraits/diver-m2.jpg","41420e7d2788567ace65abd17facafe6"],["/assets/images/portraits/diver-m3.jpg","de596fd00e21865f194c09f7577f9294"],["/assets/images/portraits/noble-f1.jpg","24ed51dd563953a0529f184d83c64d39"],["/assets/images/portraits/noble-f2.jpg","d8815d661eddda94dab1fa6634fab15b"],["/assets/images/portraits/noble-f3.jpg","c6fdfc7123fc896d7f549a9740373e99"],["/assets/images/portraits/noble-m1.jpg","8b1d09570c4dfa0e6f92e2705932ca8e"],["/assets/images/portraits/noble-m2.jpg","daf4aa5b113110deca15ea71a5f96c52"],["/assets/images/portraits/noble-m3.jpg","a5c67413c9000f8e36b9eaae29ce4440"],["/assets/images/portraits/princess.jpg","ab85fb5f9b22a00a80437fe47de83bfb"],["/assets/images/portraits/protector-leader.jpg","dc250f74844ad409caac84898049a978"],["/assets/images/portraits/protector.jpg","05e7063f3aefb58b8d3113f7cdb6747a"],["/assets/images/portraits/vendor-jack.jpg","7b3c91fdd67cb51add6d9fe7700048c8"],["/assets/images/portraits/vendor-kim.jpg","89a571394571d857e66d96d1f0623551"],["/assets/images/portraits/worker-f1.jpg","05ed5befc6a19b8cc9e0617f7131101f"],["/assets/images/portraits/worker-f2.jpg","de600a6c47cc14f681f3f626194142a9"],["/assets/images/portraits/worker-f3.jpg","8f5b87f97c518cc96b912a94bc84857f"],["/assets/images/portraits/worker-m1.jpg","79ba6e7b33e4cded0a6506723164b179"],["/assets/images/portraits/worker-m2.jpg","ea74758daba65c9630234549884d8959"],["/assets/images/portraits/worker-m3.jpg","59fb073b3a64587c2ca2425f9fb308ac"],["/favicon.ico","1402a9eba53e8cce1afff8b6fccf3006"],["/icon/home144.png","593ac3c6db30241fdc15745dc77533f6"],["/icon/home168.png","f9c36066fb8c98fd06e1142d363025c0"],["/icon/home192.png","49969f0364e5dfcdec3327886507b492"],["/icon/home48.png","b395449a42cfce19ed4cb275a604d782"],["/icon/home72.png","cfb1dc7f49e681ce91ade478d069f672"],["/icon/home96.png","751fa94836d586af1b7bfe6737c0ab48"],["/icon/splash.png","4a1c97de6382ae550d01eb87a863737a"],["/index.html","4fed886fcb55be6a6610e80c3f1005f8"],["/manifest.json","21d25b57b055fd30b2b4b3cd5e2a8f9b"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







