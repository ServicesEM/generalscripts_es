importScripts('https://cdn.pushalert.co/sw-2575.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded ðŸŽ‰`);
} else {
  console.log(`Boo! Workbox didn't load ðŸ˜¬`);
}

workbox.routing.registerRoute(
  // Cache CSS files
  /\.css$/,
  // Use cache but update in the background
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  }),
);

workbox.routing.registerRoute(
  // Cache image files
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available
  new workbox.strategies.CacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for a maximum of a week
        maxAgeSeconds: 2 * 24 * 60 * 60,
      }),
    ],
  }),
);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for a maximum of a week
        maxAgeSeconds: 2 * 24 * 60 * 60,
      }),
    ],
  }),
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [ 0, 200 ],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 2,
      }),
    ],
  }),
);
