const CACHE='tablas-valen-rt-v06';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(a=>new Request(a,{cache:'reload'}))))));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tablas-valen-rt-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.registration.scope))return;e.respondWith(caches.open(CACHE).then(async c=>{if(r.mode==='navigate')return (await c.match('./index.html'))||fetch(r);return (await c.match(r))||fetch(r);}));});
