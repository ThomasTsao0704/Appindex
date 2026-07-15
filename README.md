# INDEX — 應用目錄 PWA 設定說明

## 為什麼分成兩塊？
Google Apps Script 的網頁應用程式網址會經過重新導向到隨機的 `googleusercontent.com`
網域，這會讓 `manifest` 和 `service worker` 無法穩定運作，導致「安裝到主畫面」不可靠。
所以這裡把系統拆成兩塊：

- **Code.gs**：只負責讀你的 Google 試算表，對外提供一個 JSON API。
- **其餘檔案**（index.html / manifest.webmanifest / sw.js / icon-*.png）：
  一個真正可安裝的 PWA，另外找免費空間放（GitHub Pages、Firebase Hosting、
  Cloudflare Pages 都可以），再向上面的 API 要資料。

## 步驟一：試算表欄位
確認第一列是標題，且欄位名稱依序為（大小寫不拘）：

| App | Url | Describe |
|---|---|---|

## 步驟二：部署 Apps Script API
1. 在試算表點「擴充功能 → Apps Script」，把 `Code.gs` 的內容貼進去。
2. 右上角「部署 → 新增部署作業 → 網頁應用程式」。
   - 執行身分：**我**
   - 存取權限：**任何人**（一定要選這個，PWA 才讀得到資料）
3. 部署完成後複製網址（結尾 `/exec`），例如：
   `https://script.google.com/macros/s/AKfycb.../exec`
4. 用瀏覽器打開 `你的網址?action=list`，應該會看到 JSON 資料，代表 API 正常。

## 步驟三：設定前端
打開 `index.html`，找到這一行，換成你自己的網址：

```js
const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

## 步驟四：上架成可安裝的 PWA（擇一）
最簡單：**GitHub Pages**
1. 新增一個 GitHub repo，把 `index.html`、`manifest.webmanifest`、`sw.js`、
   `icon-192.png`、`icon-512.png`、`icon-512-maskable.png` 全部上傳到根目錄。
2. Repo 設定 → Pages → Source 選 `main` 分支，儲存。
3. 幾分鐘後就能用 `https://你的帳號.github.io/repo名稱/` 打開，
   手機瀏覽器會出現「加到主畫面」的提示。

也可以用 Firebase Hosting 或 Cloudflare Pages，步驟大同小異，
重點是這些檔案要放在同一個資料夾、用 HTTPS 提供服務。

## 之後要更新內容？
直接在 Google 試算表新增/修改列即可，前端每次開啟都會即時抓最新資料，
不用重新部署。
# INDEX — 應用目錄 PWA 設定說明

## 為什麼分成兩塊？
Google Apps Script 的網頁應用程式網址會經過重新導向到隨機的 `googleusercontent.com`
網域，這會讓 `manifest` 和 `service worker` 無法穩定運作，導致「安裝到主畫面」不可靠。
所以這裡把系統拆成兩塊：

- **Code.gs**：只負責讀你的 Google 試算表，對外提供一個 JSON API。
- **其餘檔案**（index.html / manifest.webmanifest / sw.js / icon-*.png）：
  一個真正可安裝的 PWA，另外找免費空間放（GitHub Pages、Firebase Hosting、
  Cloudflare Pages 都可以），再向上面的 API 要資料。

## 步驟一：試算表欄位
確認第一列是標題，且欄位名稱依序為（大小寫不拘）：

| App | Url | Describe | Tags（選填） |
|---|---|---|---|

`Tags` 欄位是選填的，欄名可以是 `Tags` / `Tag` / `標籤` / `分類` 其中一種，
不加這欄完全不影響原本功能。多個標籤請用逗號、頓號或分號分隔，例如：`工作,設計`。

## 這次新增的前端功能
- **標籤篩選**：依 Tags 欄位自動長出篩選按鈕，可複選（符合任一標籤即顯示）。
- **收藏 ★**：卡片右上角可以收藏常用項目，會釘選在最上方；收藏清單存在使用者
  自己瀏覽器的 `localStorage`，不會寫回試算表，也不會被別人看到。
- **排序切換**：字母排序 / 最新加入優先（依試算表列的先後）/ 常用優先
  （依這台裝置上的點擊次數，同樣存在本機）。
- **搜尋範圍擴大**：現在也會比對標籤內容，不只 App 名稱和說明。

## 步驟二：部署 Apps Script API
1. 在試算表點「擴充功能 → Apps Script」，把 `Code.gs` 的內容貼進去。
2. 右上角「部署 → 新增部署作業 → 網頁應用程式」。
   - 執行身分：**我**
   - 存取權限：**任何人**（一定要選這個，PWA 才讀得到資料）
3. 部署完成後複製網址（結尾 `/exec`），例如：
   `https://script.google.com/macros/s/AKfycb.../exec`
4. 用瀏覽器打開 `你的網址?action=list`，應該會看到 JSON 資料，代表 API 正常。

## 步驟三：設定前端
打開 `index.html`，找到這一行，換成你自己的網址：

```js
const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

## 步驟四：上架成可安裝的 PWA（擇一）
最簡單：**GitHub Pages**
1. 新增一個 GitHub repo，把 `index.html`、`manifest.webmanifest`、`sw.js`、
   `icon-192.png`、`icon-512.png`、`icon-512-maskable.png` 全部上傳到根目錄。
2. Repo 設定 → Pages → Source 選 `main` 分支，儲存。
3. 幾分鐘後就能用 `https://你的帳號.github.io/repo名稱/` 打開，
   手機瀏覽器會出現「加到主畫面」的提示。

也可以用 Firebase Hosting 或 Cloudflare Pages，步驟大同小異，
重點是這些檔案要放在同一個資料夾、用 HTTPS 提供服務。

## 之後要更新內容？
直接在 Google 試算表新增/修改列即可，前端每次開啟都會即時抓最新資料，
不用重新部署。
