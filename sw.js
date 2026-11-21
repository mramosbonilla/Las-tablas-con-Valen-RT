const CACHE='tablas-valen-rt-v03';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tablas-valen-rt-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.registration.scope))return;if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return;}e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(r);return hit||fetch(r);}));});
