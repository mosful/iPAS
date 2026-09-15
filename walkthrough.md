# iPAS 智慧練習系統 ─ 意見反饋信件主旨與標題修復報告

## 問題根因排查
1. **Google Apps Script Webhook 複用問題**：
   - 經檢查，`index.html` 中的 `GOOGLE_FEEDBACK_API_URL` 複用了之前在「學習城堡 (StudyCastle)」建立的 Google Apps Script 網址。
   - 原先的 GAS 後端程式碼內，信件主旨寫死為：
     `🏰【學習城堡】收到新的意見反饋：[${type}] 來自 ${name}`
     內容標題寫死為：
     `🏰 學習城堡 — 收到新的意見反饋`
   - 因此當考生在 iPAS 題庫系統送出意見時，管理者收到的 Email 主旨與標題才會出現「學習城堡」。

---

## 解決方案與執行成果

### 1. 前端 Payload 智慧升級
在 [index.html](file:///c:/Code/iPAS/index.html) 的 `handleFeedbackSubmit` 與 `sendMailDirectly` 中，加入完整的系統標識與主旨參數：
- **`appName`**：`iPAS AI 應用規劃師 智慧練習系統`
- **`subject`**：`🤖【iPAS AI 題庫】收到新的考生反饋：[${type}] 來自 ${name}`
- **`title`**：`🤖 iPAS AI 應用規劃師 ─ 收到新的考生反饋`

### 2. 建立 iPAS 專屬 Google Apps Script 程式碼
已在專案中建立專屬腳本檔案 [google_apps_script_ipas.js](file:///c:/Code/iPAS/google_apps_script_ipas.js)：
- **預設主旨**：`🤖【iPAS AI 題庫】收到新的意見反饋：[${type}] 來自 ${name}`
- **預設內容標題**：`🤖 iPAS AI 應用規劃師 ─ 收到新的意見反饋`
- **動態適配**：優先讀取前端傳送之 `data.subject` 與 `data.title`，徹底避免跨專案標題錯置。
- **排版風格**：採用 AITerms 溫潤陶土橘風格 HTML Email 模板，並標註關聯題號、考生稱呼與來源網址。

### 3. 管理者 1 分鐘更新步驟（無需換網址）
1. 開啟原本接收反饋的「Google 試算表」，點選頂部「擴充功能」->「Apps Script」。
2. 將 [google_apps_script_ipas.js](file:///c:/Code/iPAS/google_apps_script_ipas.js) 的程式碼全選複製，覆蓋原本編輯器內容。
3. 點擊右上角「部署 (Deploy)」->「管理部署作業」-> 點擊鉛筆「編輯」-> 版本選擇「新版本 (New version)」->「部署」。
4. 部署後，原本的 Webhook 網址維持不變，日後收到信件的主旨與內容標題即 100% 正確為 iPAS！
