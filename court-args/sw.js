// רשת קודם, ובלי אינטרנט נופלים לעותק השמור
var C = "court-args-v1";
var CORE = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];
self.addEventListener("install", function(e){ self.skipWaiting(); e.waitUntil(caches.open(C).then(function(c){ return c.addAll(CORE); })); });
self.addEventListener("activate", function(e){ e.waitUntil(caches.keys().then(function(k){ return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);})); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener("fetch", function(e){
  if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(function(r){ var cp=r.clone(); caches.open(C).then(function(c){ c.put(e.request, cp); }); return r; }).catch(function(){ return caches.match(e.request).then(function(m){ return m || caches.match("index.html"); }); }));
});
