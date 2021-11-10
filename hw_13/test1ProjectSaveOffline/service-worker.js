const cacheName = "v1";
const cacheAssets = [
  "signIn.html",
  "signUp.html",
  "forgotPassword.html",
  "thankYou.html",
  "script.js",
  "service-worker.js",
  "css/styleForgotPassword.css",
  "css/styleSignIn.css",
  "css/styleSignUp.css",
  "css/styleThankYou.css",
  "fonts/helveticaneuecyr-medium-webfont.woff",
  "fonts/helveticaneuecyr-medium-webfont.woff2",
  "images/background.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.log(err))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) =>
      cache.match(event.request).then(
        (response) =>
          response ||
          fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
      )
    )
  );
});
