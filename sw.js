// 每次「有意義的更動」記得把版本號 +1（v2 → v3 ...），
// 這樣舊訪客的瀏覽器才會確實丟掉舊快取、換上新檔案。
const CACHE = 'index-shell-v2';
const SHELL_FILES = [
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Apps Script API 呼叫：完全不攔截，直接放行給網路。
  if (url.hostname.includes('script.google.com') || url.hostname.includes('googleusercontent.com')) {
    return;
  }

  // HTML 主頁（含導覽請求）：網路優先，這樣你更新內容後訪客一定拿得到新版；
  // 只有離線時才退回快取。
  const isShellDoc = e.request.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname === '/';
  if (isShellDoc) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // 其餘靜態檔案（圖示、manifest）：快取優先，省流量。
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return (
        cached ||
        fetch(e.request)
          .then((res) => {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
            return res;
          })
          .catch(() => cached)
      );
    })
  );
});
