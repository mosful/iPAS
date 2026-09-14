# iPAS 智慧練習系統 ─ GitHub Discussions 設定與 Giscus 留言板修復報告

## 問題根因排查
1. **GitHub Discussions 功能未啟用**：遠端儲存庫 `mosful/iPAS` 原始設定中 `has_discussions` 為 `False`，導致 Giscus API 無法掛載討論串。
2. **Giscus 參數配置錯誤**：原 `index.html` 內帶有非本儲存庫的舊 ID：
   - 原 `data-repo-id="R_kgDOOGj_xw"`（非 `mosful/iPAS` 之 ID）
   - 原 `data-category-id="DIC_kwDOOGj_x84CeI3A"`（非 `mosful/iPAS` 之 Category ID）
3. **本機 file:/// 協定限制**：本機直接以檔案模式開啟時，瀏覽器會將 Origin 判定為 `"null"`，Giscus 的 iframe 會受到跨域安全保護；需在 HTTPS 網域（如 GitHub Pages）或本地 HTTP 伺服器下方能完整渲染互動。

---

## 解決方案與執行成果

### 1. 遠端儲存庫啟用 Discussions
已透過 GitHub CLI 執行 API 調度：
```bash
gh repo edit mosful/iPAS --enable-discussions
```
目前 `mosful/iPAS` 已成功啟用 Discussions 功能。

### 2. 獲取真實 GraphQL Node ID 並更新至 Giscus
透過 GitHub GraphQL API 取得之真實參數：
- **Repository**：`mosful/iPAS`
- **Repo ID (`data-repo-id`)**：`R_kgDOSFrsvw`
- **Category**：`General`
- **Category ID (`data-category-id`)**：`DIC_kwDOSFrsv84DFkAT`

已全數更新寫入 [index.html](file:///c:/Code/iPAS/index.html)。

### 3. Giscus 主題自動連動（深色 / 淺色）
- 加入 postMessage 監聽與切換機制，當使用者切換系統之深色墨黑或淺色暖白模式時，Giscus 留言區亦會自動連動切換為對應的 `dark` / `light` 主題。

### 4. 提醒與核對清單
- 請確保 GitHub 帳號已在 [Giscus GitHub App](https://github.com/apps/giscus) 中將 `mosful/iPAS` 納入授權儲存庫清單中（若過去已勾選「All repositories」則已自動涵蓋）。
