/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { setDefaultHandler, registerRoute } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails } from 'workbox-core';

setCacheNameDetails({ prefix: '__APP_NAME__', suffix: '__APP_VERSION__' });

// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST || []);
cleanupOutdatedCaches();

registerRoute(
    ({ request }: any) => request.destination === 'script' || request.destination === 'style',
    new StaleWhileRevalidate({
        plugins: [new BackgroundSyncPlugin('script-queue', {})],
    }),
);

registerRoute(
    ({ request }: any) =>
        request.destination === 'image' ||
        request.destination === 'audio' ||
        request.destination === 'video' ||
        request.destination === 'font',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 12 * 60 * 60,
                purgeOnQuotaError: true,
            }),
        ],
    }),
);

setDefaultHandler(new StaleWhileRevalidate({}));

addEventListener('message', (event) => {
    // @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
    if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
