# Google Apps Script 雙專案自動分流架構說明

## 使用者核心考量
使用者精準提出重要疑慮：
> 「這樣蓋掉 script 後，不就變成原本的學習城堡會收到 iPAS 的信件主旨？」

## 最佳解決架構：智慧來源分流引擎 (Smart Router)

為了解決共用同一個 Webhook 時的衝突，我們已將 [google_apps_script_ipas.js](file:///c:/Code/iPAS/google_apps_script_ipas.js) 升級為 **雙專案智慧來源分流引擎**：

```javascript
// 智慧來源識別
const isIPAS = (data.appName && data.appName.includes("iPAS")) ||
               (data.subject && data.subject.includes("iPAS")) ||
               sourceUrl.toLowerCase().includes("ipas");
```

### 1. 學習城堡發送的請求（`isIPAS === false`）
- 100% 保持原本的【🏰 學習城堡】信件主旨：`🏰【學習城堡】收到新的意見反饋：[${type}] 來自 ${name}`
- 內容標題維持：`🏰 學習城堡 — 收到新的意見反饋`
- 色彩維持：學習城堡皇家靛藍（`#4338ca`）
- 稱呼維持：「填寫冒險家」與「相關學習單元」
- **學習城堡完全不受影響，原汁原味！**

### 2. iPAS 題庫發送的請求（`isIPAS === true`）
- 自動切換為【🤖 iPAS AI 題庫】信件主旨：`🤖【iPAS AI 題庫】收到新的意見反饋：[${type}] 來自 ${name}`
- 內容標題切換為：`🤖 iPAS AI 應用規劃師 ─ 收到新的考生反饋`
- 色彩切換為：AITerms 暖陶土橘（`#d97757`）
- 稱呼切換為：「填寫考生」與「關聯考科/題號」

### 3. 試算表記錄分流
- 系統會自動在 Google 試算表中建立 `iPAS反饋記錄` 與 `學習城堡反饋` 兩個獨立工作表（分頁），資料整齊不混雜。
- **結論**：使用者只需將這份智慧腳本覆蓋至原本的 Apps Script，原本的 Webhook 網址維持不變，**兩套系統即可同時完美運作，各自收到各自的主旨與標題！**
- **替代方案**：若使用者希望「學習城堡」與「iPAS」徹底分開於兩份不同的 Google 試算表，亦可開新試算表獨立部署，再將新的 Webhook 填回 iPAS `index.html`。
