const cacheName = "CHAT-CACHE-V42";

const urlsToCache = [
   "./"
];



self.addEventListener("install", (event) => {
    // console.log("installed");
});


self.addEventListener("fetch", (event) => {
    // console.log("fetch event:", event);

    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') return response;

                    const responseToCache = response.clone();
                    caches.open(cacheName).then((cache) => {
                        cache.put(event.request, responseToCache);
                    }).catch(err => console.error(err));
                    return response;
                }).catch(err => err);
            }).catch(err => {

            })
        )
    } else {
        event.respondWith(fetch(event.request));
    }
});

self.addEventListener("activate", (event) => {
    console.log("activate event: ", event);

    event.waitUntil(caches.keys().then((cachenames) => {
        return Promise.all(cachenames.map((cachename) => caches.delete(cachename)));
    }));
});

self.addEventListener("push", (event) => {
    console.log("push event", event);
    console.log(event.data.json());
    var data = event.data.json();
    // keep running until the promise pass to waitUntil has settled
	event.waitUntil(
        self.registration.getNotifications().then((notifications) => {
            console.log("notification", notifications);
            let existNotify = null;
            for (let i = 0, len = notifications.length; i < len; i++) {
                const notify = notifications[i];
                if (notify.tag === data.tag) {
                    existNotify = notify;
                    break;
                }
            }

            const option = {
                icon:data.icon,
                tag:data.tag,
                data:data.data,
                badge: '/static/app_icon.jpg',
                renotify: true,
            }

            if (existNotify) {
                let count = existNotify.data.count + 1;
                option.body = `Send you ${count} messages`;
                option.data.count = count;
                existNotify.close();
            } else {
                option.body = data.body;
                option.data.count = 1;
            }

            return self.registration.showNotification(data.title, option);
        })
	);
});


self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    const path = event.notification.data.url;
    const url = new URL(path, self.location.origin).href;
    event.notification.close();

    // keep service work alive
    event.waitUntil(
    //   clients.openWindow(event.notification.data.url)
        clients.matchAll({
            type: "window",
            includeUncontrolled: true,
        }).then((windowClients) => {
            let isTotMatch = false;
            let matchClient = (windowClients && windowClients[0]) || null;
            for (let i = 0, len = windowClients.length; i < len; i++) {
                const wc = windowClients[i];
                if (wc.url === url) {
                    mactchClient = wc;
                    isTotMatch = true;
                    break;
                }
            }

            if (!matchClient) {
                return clients.openWindow(event.notification.data.url);
            } else {
                if (!isTotMatch) {
                    matchClient.postMessage({
                        type: "NOTIFY_ROUTE",
                        path
                    });
                }
                return matchClient.focus();
            }
        })
    );
});