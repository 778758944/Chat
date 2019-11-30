const cacheName = "CHAT-CACHE-V35";

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
            return self.registration.showNotification(data.title,{
                body:data.body,
                icon:data.icon,
                tag:data.title,
                data:data.tag,
                badge: '/static/app.jpg',
                renotify: true,
            })
        })

		// self.registration.showNotification(data.title,{
		// 	body:data.body,
		// 	icon:data.icon,
		// 	tag:data.title,
        //     data:data.data,
        //     badge: '/static/app.jpg',
        //     renotify: true,
		// })
	);
});


self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    const path = event.notification.data.url;
    const url = new URL(path, self.location.origin);
    event.notification.close();

    // keep service work alive
    event.waitUntil(
    //   clients.openWindow(event.notification.data.url)
        clients.matchAll({
            type: "window",
            includeUncontrolled: true,
        }).then((windowClients) => {
            const isTotMatch = false;
            let matchClient = (windowClients && windowClients[0]) || null;
            for (let i = 1, len = windowClients.length; i < len; i++) {
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
                return matchClient.focus();
            }
        })
    );
});
