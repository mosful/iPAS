# Giscus App 授權設定與留言區指引更新報告

## 問題定位與分析
使用者遇到「`giscus is not installed on this repository`」之錯誤訊息：
- **原因**：Giscus 是一個第三方的 GitHub App。雖然本專案已在儲存庫中成功啟用了 Discussions 功能並設定了精準的 GraphQL Category ID (`DIC_kwDOSFrsv84DFkAT`)，但 GitHub 系統基於安全性機制，要求儲存庫擁有者必須在 GitHub 平台上為 `mosful/iPAS` 儲存庫**安裝 / 授權 Giscus 官方 App**。
- **處理方式**：
  1. 系統已在留言區介面上方增設顯目的【Giscus 留言區啟用提示與一鍵安裝按鈕】。
  2. 提供直接前往 GitHub Discussions 討論串的直通捷徑與免登入雲端快速寄信管道（Dual Mode），確保考生在任何情況下皆能順利反饋交流。

---

## 3 步一鍵啟用 Giscus 指南
1. 前往 Giscus GitHub 官方授權安裝頁面：[https://github.com/apps/giscus](https://github.com/apps/giscus)
2. 點擊綠色的 **Install** 或 **Configure** 按鈕（選擇 `mosful` 個人帳號）。
3. 在「Repository access」中選擇「Only select repositories」並勾選 `mosful/iPAS`，點擊 **Save** 儲存。
4. 完成後重新整理網頁，Giscus 即刻無縫載入！
