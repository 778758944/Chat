const cacheName = "CHAT-CACHE-V3";

const urlsToCache = [
   "./"
];



self.addEventListener("install", (event) => {
    // console.log("installed");
});


self.addEventListener("fetch", (event) => {
    // console.log("fetch event:", event);

    if (event.request.method === 'HEAD') {
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
    console.log(event.data.text());
    var data=JSON.parse(event.data.text());
	event.waitUntil(
		self.registration.showNotification(data.title,{
			body:data.body,
			icon:data.icon,
			tag:data.title,
			data:data.data
		})
	);
});


self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
});