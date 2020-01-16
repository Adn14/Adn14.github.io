importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);

} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/pages/klasemen.html', revision: '1' },
    { url: '/pages/myteam.html', revision: '1' },
    { url: '/pages/team.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)
// const CACHE_NAME = "football-app";
// var urlsToCache = [
//     "/",
//     "manifest.json",
//     "nav.html",
//     "index.html",
//     "/pages/klasemen.html",
//     "/pages/myteam.html",
//     "/pages/team.html",
//     "/css/materialize.min.css",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/api.js",
//     "/js/idb.js",
//     "/js/db.js",
//     "/icon.png",
// ];


// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// //use asset from cache
// self.addEventListener("fetch", function (event) {
//     var base_url = "https://api.football-data.org/";
//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function (cache) {
//                 return fetch(event.request).then(function (response) {
//                     cache.put(event.request.url, response.clone());
//                     console.log(response);
//                     return response;
//                 })
//             })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request).then(function (response) {
//                 console.log(response);
//                 return response || fetch(event.request);
//             })
//         )
//     }
// });
// //delete cache
// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + "dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});