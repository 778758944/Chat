/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-13 14:12:22
 * @version $Id$
 */
importScripts('profill.js');
var base='/build/';
var urlToCache=[
	base+'profill.js',
	base+"sw.js"
];


var staticCacheName='static';
var version='v1::';

//创建缓存
function updateStaticCache(){
	return caches.open(version+staticCacheName).then(function(cache){
		return cache.addAll(urlToCache);
	})
}


self.addEventListener('install',function(event){
	console.log('initial');
	self.skipWaiting();
	event.waitUntil(updateStaticCache());
})



self.addEventListener('activate',function(event){
	console.log('active');
	event.waitUntil(
		caches.keys().then(function(keys){
			console.log(keys);
			return Promise.all(keys.filter(function(key){
				return key.indexOf(version) !==0;
			})
			.map(function(key){
				return caches.delete(key);
			})
			)
		})
	)
})


self.addEventListener('fetch',function(event){
	var request=event.request;
	// console.log(request,{credentials: 'include'});
	var accept=request.headers.get('Accept');
	if(request.method !== 'GET'){
		event.respondWith(fetch(request,{credentials: 'include'}));
		return;
	}

	else{
		console.log('get');

		if(accept.indexOf('text/html') !== -1){
			event.respondWith(
				fetch(request).then(function(response){
					var copy=response.clone();
					caches.open(version+staticCacheName).then(function(cache){
						cache.put(request,copy);
					});
					return response;
				}).catch(function(){
					return caches.match(request).then(function(response){
						if(response){
							return response;
						}
						// else if(accept.indexOf('image') !== -1){
						// 	return new Response('<svg>...</svg>',{headers:{
						// 		'Content-Type':"image/svg+xml"
						// 	}})
						// }
						else{
							return new Response('ddddd',{headers:{
								'Content-Type':"text/plain"
							}})
						}
					})
				})
			)
		}

		else{
	        event.respondWith(
				caches.match(request).then(function(response){
					return response || fetch(request).then(function(response2){
						var copy=response2.clone();
						caches.open(version+staticCacheName).then(function(cache){
							cache.put(request,copy);
						});
						return response2;
					})
				})
			)
	    }
	}
})

self.addEventListener('push',function(event){
	console.log('push',event);
	var title='push message';
	console.log(event.data.text());
	var data=JSON.parse(event.data.text());
	event.waitUntil(
		self.registration.showNotification(data.title,{
			body:data.body,
			icon:data.icon,
			tag:data.title
		})
	);
});

































