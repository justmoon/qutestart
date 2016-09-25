var CACHE_NAME = 'dependencies-cache';

// Files required to make this app work offline
var REQUIRED_FILES = [
  'fonts/Open-Sans-Condensed-300/Open-Sans-Condensed-300.eot',
  'fonts/Open-Sans-Condensed-300/Open-Sans-Condensed-300.woff',
  'fonts/Open-Sans-Condensed-300/Open-Sans-Condensed-300.woff2',
  'fonts/Open-Sans-Condensed-300/Open-Sans-Condensed-300.ttf',
  'fonts/Open-Sans-Condensed-300/Open-Sans-Condensed-300.svg',
  'moment.min.js',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'style.css',
  'index.html',
  '/' // Separate URL than index.html!
]

self.addEventListener('install', function(event) {
  // Perform install step: loading each required file into cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Add all offline dependencies to the cache
        return cache.addAll(REQUIRED_FILES)
      })
      .then(function() {
      	// At this point everything has been cached
        return self.skipWaiting()
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          return response
        }

        // Not in cache - return the result from the live server
        // `fetch` is essentially a "fallback"
        return fetch(event.request)
      }
    )
  )
})

self.addEventListener('activate', function(event) {
  // Calling claim() to force a "controllerchange" event on navigator.serviceWorker
  event.waitUntil(self.clients.claim())
})
