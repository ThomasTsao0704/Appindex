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

## 線上狀態偵測（燈號）
App 名稱旁的小圓點：灰色閃爍＝檢查中、綠色＝可連線、紅色＝逾時或被拒絕。
點工具列的「● 線上狀態」可以整個開關這個功能（狀態存在本機，下次開啟會記得）。

**請注意這是「盡力而為」的偵測，不是真正的 Uptime Monitoring：**
- 瀏覽器基於安全限制（CORS），前端沒辦法讀到對方網站真正的 HTTP 狀態碼，
  只能用 `no-cors` 模式送出請求，靠「連得上 / 連不上」來判斷，
  所以即使對方網站回應 404 或 500，還是可能被判定成綠燈。
- 如果這個 PWA 是用 HTTPS 開啟，而某個 App 的網址是 `http://`（非加密），
  瀏覽器會直接擋下這個請求（混合內容限制），該卡片會一律顯示紅燈，
  這不代表服務真的離線。
- 想要真正準確的 Uptime 監控，得靠伺服器端定期發送請求（例如另外架一個
  Cloudflare Worker 或 UptimeRobot 之類的服務），前端受限於瀏覽器沙盒無法做到。

## 管理模式（本人 vs 訪客）
標題列右上角有一個 🔒 圖示：

- 一般訪客看到的是**唯讀目錄**：沒有右下角的新增按鈕，Tags 欄位裡標記為
  `private` / `僅本人` / `隱藏` / `admin-only` / `管理員`（其中一個字即可，
  大小寫不拘）的卡片會直接從清單消失，就像不存在一樣。
- 點 🔒 輸入通關密語（跟前面「快速新增」用的是同一個 `SHARED_SECRET`），
  驗證成功後圖示變成 🔓，這台裝置就會記住，之後開啟都直接是管理模式：
  看得到私密卡片、右下角也會出現新增按鈕。再點一次 🔓 即可登出。
- **必須先在 `Code.gs` 設定 `SHARED_SECRET`** 這個功能才有意義，
  沒設定的話輸入任何密語都會顯示「尚未設定管理密語」。

**老實說的限制**：這是「共享通關密語」等級的保護，不是帳號登入，凡是知道
密語的人都能解鎖看到私密卡片、新增資料。如果之後想要更嚴謹、以 Google
帳號身分做判斷的驗證方式，可以再告訴我，那需要另外設定 Google OAuth。

## 快速新增卡片
右下角的 **+** 按鈕會跳出表單，填寫 App 名稱、網址（必填，需 `http(s)://` 開頭）、
簡介、標籤（若試算表有 Tags 欄位才會顯示這欄），送出後會直接寫入試算表最後一列，
接著自動重新整理清單。

**技術上的取捨**（寫給想了解原理或要調整安全性的人）：
這個新增動作在底層是用 GET 請求（`?action=create&...`）而不是常見的 POST，
因為 Apps Script 網頁應用程式對「跨網域 POST + JSON」的請求會被瀏覽器的
CORS 預檢擋下來，GET 沒有這個限制。代價是：只要有人拿到你的 `/exec` 網址，
理論上就能對你的試算表寫入資料。因為部署權限必須設「任何人」PWA 才讀得到
資料，這個網址本身就要當成一個「不公開分享的密鑰」看待。

如果想加一層保護，打開 `Code.gs`，把最上面的：

```js
var SHARED_SECRET = '';
```

改成你自訂的字串，例如 `var SHARED_SECRET = 'my-secret-2026';`，重新部署後，
新增卡片時就必須在「驗證碼」欄位輸入一樣的字串才能成功寫入
（瀏覽器會記住，同一台裝置下次不用再輸入）。單純「讀取」清單不受此影響。

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
