/**
 * 🤖 iPAS AI 應用規劃師 ─ 意見反饋 Google Apps Script 雲端處理腳本
 * 
 * 【1 分鐘更新步驟】
 * 1. 前往 Google 雲端硬碟開啟您原本接收反饋的「Google 試算表」，或直接點擊 Apps Script 專案。
 * 2. 點擊頂端選單「擴充功能 (Extensions)」 -> 「Apps Script」。
 * 3. 將原本編輯器中的程式碼全部清除，貼上本檔案的全部內容。
 * 4. 確認下方 NOTIFICATION_EMAIL 為您要接收通知的 Email（例如：mosslin@aetgroup.com）。
 * 5. 點擊右上角「部署 (Deploy)」 -> 「管理部署作業 (Manage deployments)」：
 *    - 點擊右上角的鉛筆圖示「編輯 (Edit)」
 *    - 版本下拉選單選擇「新版本 (New version)」
 *    - 點擊「部署 (Deploy)」完成發布！
 *    （★ 無需更換 Webhook 網址，原本的 API URL 會立即生效，日後收到信件的主旨與標題將 100% 正確！）
 */

// ====== 設定區 ======
// 請在此填入您要接收通知信件的 Email 地址
const NOTIFICATION_EMAIL = "mosslin@aetgroup.com";
// ====================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 若工作表第 1 列為空，自動建立標題列
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["時間戳記", "反饋類型", "相關考科/題號", "填寫考生", "意見內容", "來源網頁"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#fdf0eb").setFontColor("#7a3e22");
    }

    // 解析前端傳來的 JSON 資料
    const data = JSON.parse(e.postData.contents);
    const time = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
    const type = data.type || "未指定";
    const unit = data.unit || "全站 / 一般建議";
    const name = data.name || "熱心考生";
    const content = data.content || "";
    const sourceUrl = data.sourceUrl || "iPAS 練習系統";

    // 讀取動態主旨與標題（若前端未傳遞，則使用專屬預設值）
    const appName = data.appName || "iPAS AI 應用規劃師 智慧練習系統";
    const subject = data.subject || `🤖【iPAS AI 題庫】收到新的意見反饋：[${type}] 來自 ${name}`;
    const headerTitle = data.title || "🤖 iPAS AI 應用規劃師 ─ 收到新的意見反饋";

    // 1. 寫入 Google 試算表新增一列
    sheet.appendRow([time, type, unit, name, content, sourceUrl]);

    // 2. 發送 Email 通知給管理者
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== "your-email@example.com") {
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans TC', Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e8d7cf; border-radius: 12px; background-color: #ffffff;">
          <div style="display: inline-block; padding: 4px 12px; background: rgba(217,119,87,0.12); color: #d97757; border-radius: 20px; font-size: 11px; font-weight: bold; margin-bottom: 12px;">
            iPAS AI 應用規劃師 · 考生回饋通知
          </div>
          <h2 style="color: #1f1e1b; margin-top: 0; font-size: 18px; border-bottom: 2px solid #d97757; padding-bottom: 10px;">
            ${headerTitle}
          </h2>
          <p style="color: #73726c; font-size: 13px; margin: 8px 0 16px;">
            收件時間：<strong>${time}</strong>
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13.5px;">
            <tr>
              <td style="padding: 9px 0; color: #73726c; width: 110px; font-weight: bold;">反饋類型：</td>
              <td style="padding: 9px 0; color: #1f1e1b;">
                <span style="background: rgba(217,119,87,0.14); color: #c4623f; padding: 3px 10px; border-radius: 6px; font-size: 12.5px; font-weight: bold;">
                  ${type}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #73726c; font-weight: bold;">關聯考科/題號：</td>
              <td style="padding: 9px 0; color: #1f1e1b; font-weight: 600;">${unit}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #73726c; font-weight: bold;">填寫考生：</td>
              <td style="padding: 9px 0; color: #1f1e1b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #73726c; font-weight: bold;">來源網址：</td>
              <td style="padding: 9px 0; color: #5d7a92; font-size: 12px; word-break: break-all;">${sourceUrl}</td>
            </tr>
          </table>

          <div style="background-color: #faf9f5; border-left: 4px solid #d97757; padding: 16px 18px; border-radius: 6px; margin-bottom: 22px; border-top: 1px solid #f1efe7; border-right: 1px solid #f1efe7; border-bottom: 1px solid #f1efe7;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #3d3d3a; font-size: 13px;">📝 反饋詳細內容：</p>
            <p style="margin: 0; color: #141413; white-space: pre-wrap; line-height: 1.7; font-size: 14px;">${content}</p>
          </div>
          
          <p style="font-size: 11.5px; color: #9c9a92; text-align: center; margin-top: 24px; border-top: 1px solid #f1efe7; padding-top: 14px;">
            本信件由 <strong>${appName}</strong> 雲端系統自動發送
          </p>
        </div>
      `;

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: subject,
        htmlBody: htmlBody
      });
    }

    // 回傳 JSON 成功響應
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
