/**
 * INDEX — App 目錄後端
 * -----------------------------------------------------------
 * 讀取試算表欄位 [App, Url, Describe]（第 1 列為標題，從第 2 列開始）
 * 部署為「網頁應用程式」後，會提供一個 JSON API 給外部的 PWA 前端呼叫。
 *
 * 部署方式：
 * 1. 在此試算表開啟「擴充功能 > Apps Script」，貼上這個檔案。
 * 2. 點選「部署 > 新增部署作業 > 網頁應用程式」。
 *    - 執行身分：我（你自己的帳號）
 *    - 存取權限：任何人（Anyone） ← 這樣手機安裝的 PWA 才能讀到資料
 * 3. 部署後複製「網頁應用程式網址」(結尾是 /exec)，
 *    貼到 index.html 裡的 API_URL 變數。
 * -----------------------------------------------------------
 */

// 若你的資料不是放在第一張工作表，把名稱改成你的分頁名稱；留空則自動抓第一張。
var SHEET_NAME = '';

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
}

function getApps_() {
  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  var headers = values.shift().map(function (h) { return String(h).trim().toLowerCase(); });

  var iApp = headers.indexOf('app');
  var iUrl = headers.indexOf('url');
  var iDesc = headers.indexOf('describe');

  var apps = values
    .map(function (row, idx) {
      return {
        id: idx + 1,
        app: String(row[iApp] || '').trim(),
        url: String(row[iUrl] || '').trim(),
        describe: String(row[iDesc] || '').trim()
      };
    })
    .filter(function (a) { return a.app && a.url; });

  return apps;
}

/**
 * doGet 同時扮演：
 *   ?action=list            → 回傳 JSON 資料（給 fetch 用）
 *   ?action=list&callback=x → 回傳 JSONP（若前端遇到 CORS 問題時的備援方案）
 *   （無參數）               → 回傳一個簡單的狀態頁，方便你確認部署成功
 */
function doGet(e) {
  var action = e && e.parameter && e.parameter.action;

  if (action === 'list') {
    var apps = getApps_();
    var payload = JSON.stringify({ ok: true, updated: new Date().toISOString(), apps: apps });

    if (e.parameter.callback) {
      return ContentService
        .createTextOutput(e.parameter.callback + '(' + payload + ');')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService
      .createTextOutput(payload)
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService.createHtmlOutput(
    '<p style="font-family:sans-serif">✅ Apps Script API 運作中。請在網址後加上 <code>?action=list</code> 測試資料，' +
    '並把這個網址填進前端 PWA 的 API_URL。</p>'
  );
}
