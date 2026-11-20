const C='trip-e6208152';
const PRE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'no-cors':'same-origin'})).catch(()=>{}))))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp));return r;}).catch(()=>caches.match('./index.html')));return;}
 e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)|cdnjs|tile\.openstreetmap/.test(u.host))){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>m)));});
