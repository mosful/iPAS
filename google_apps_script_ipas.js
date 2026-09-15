/**
 * 🚀 智慧雙專案自動分流處理腳本（支援 iPAS AI 題庫 與 學習城堡 StudyCastle 共用）
 * 
 * 【設計說明】
 * 本腳本內建「智慧來源識別引擎」：
 * 1. 收到 iPAS AI 題庫請求時 ➔ 自動套用【🤖 iPAS AI 題庫】主旨、陶土橘模板與考生標題。
 * 2. 收到 學習城堡 請求時 ➔ 100% 保持【🏰 學習城堡】主旨、皇家藍模板與冒險家標題。
 * 兩套系統共用同一個 Webhook URL 也絕不混淆！
 * 
 * 【更新步驟】
 * 1. 開啟原本接收反饋的「Google 試算表」，點選頂部「擴充功能」->「Apps Script」。
 * 2. 清除原本內容，貼上本檔案全部程式碼。
 * 3. 確認下方 NOTIFICATION_EMAIL 為您的 Email（mosslin@aetgroup.com）。
 * 4. 點擊右上角「部署 (Deploy)」->「管理部署作業」-> 點擊鉛筆「編輯」-> 版本選「新版本」->「部署」。
 * （無需更換任何網址，雙系統即刻自動完美分流！）
 */

// ====== 設定區 ======
const NOTIFICATION_EMAIL = "mosslin@aetgroup.com";
// ====================

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 解析前端傳來的 JSON 資料
    const data = JSON.parse(e.postData.contents);
    const time = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
    const type = data.type || "未指定";
    const unit = data.unit || "全站 / 一般建議";
    const name = data.name || "訪客";
    const content = data.content || "";
    const sourceUrl = data.sourceUrl || "";

    // ── 智慧來源識別引擎 ──
    // 檢查是否來自 iPAS AI 應用規劃師
    const isIPAS = (data.appName && data.appName.includes("iPAS")) ||
                   (data.subject && data.subject.includes("iPAS")) ||
                   sourceUrl.toLowerCase().includes("ipas");

    let appName, appBadge, subject, headerTitle, primaryColor, softBgColor, userRoleText, unitLabel, sheetName;

    if (isIPAS) {
      // 🤖 【iPAS AI 題庫】專屬樣式與主旨
      appName = data.appName || "iPAS AI 應用規劃師 智慧練習系統";
      appBadge = "iPAS AI 規劃師 · 考生回饋通知";
      subject = data.subject || `🤖【iPAS AI 題庫】收到新的意見反饋：[${type}] 來自 ${name}`;
      headerTitle = data.title || "🤖 iPAS AI 應用規劃師 ─ 收到新的考生反饋";
      primaryColor = "#d97757"; // AITerms 陶土橘
      softBgColor = "rgba(217,119,87,0.12)";
      userRoleText = "填寫考生：";
      unitLabel = "關聯考科/題號：";
      sheetName = "iPAS反饋記錄";
    } else {
      // 🏰 【學習城堡】專屬樣式與主旨（完全保留原本格式，不影響原城堡系統）
      appName = "學習城堡 互動學習系統";
      appBadge = "🏰 學習城堡 · 冒險家反饋通知";
      subject = `🏰【學習城堡】收到新的意見反饋：[${type}] 來自 ${name}`;
      headerTitle = "🏰 學習城堡 — 收到新的意見反饋";
      primaryColor = "#4338ca"; // 學習城堡皇家靛藍
      softBgColor = "#e0e7ff";
      userRoleText = "填寫冒險家：";
      unitLabel = "相關學習單元：";
      sheetName = "學習城堡反饋";
    }

    // 1. 寫入 Google 試算表（自動依專案建立專屬分頁或記錄於當前頁）
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      // 若尚無該分頁則建立，或使用當前活動工作表
      if (ss.getSheets().length === 1 && ss.getSheets()[0].getLastRow() === 0) {
        sheet = ss.getSheets()[0];
        sheet.setName(sheetName);
      } else {
        sheet = ss.insertSheet(sheetName);
      }
    }
    
    // 若該工作表第 1 列為空，自動建立標題列
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["時間戳記", "反饋類型", unitLabel.replace("：",""), userRoleText.replace("：",""), "意見內容", "來源網頁"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground(isIPAS ? "#fdf0eb" : "#f0f4f8").setFontColor(isIPAS ? "#7a3e22" : "#312e81");
    }

    sheet.appendRow([time, type, unit, name, content, sourceUrl]);

    // 2. 發送客製化 Email 通知給管理者
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== "your-email@example.com") {
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans TC', Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 14px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="display: inline-block; padding: 4px 12px; background: ${softBgColor}; color: ${primaryColor}; border-radius: 20px; font-size: 11px; font-weight: bold; margin-bottom: 12px;">
            ${appBadge}
          </div>
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
            ${headerTitle}
          </h2>
          <p style="color: #64748b; font-size: 13px; margin: 8px 0 16px;">
            收件時間：<strong>${time}</strong>
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13.5px;">
            <tr>
              <td style="padding: 9px 0; color: #64748b; width: 110px; font-weight: bold;">反饋類型：</td>
              <td style="padding: 9px 0; color: #0f172a;">
                <span style="background: ${softBgColor}; color: ${primaryColor}; padding: 3px 10px; border-radius: 6px; font-size: 12.5px; font-weight: bold;">
                  ${type}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #64748b; font-weight: bold;">${unitLabel}</td>
              <td style="padding: 9px 0; color: #0f172a; font-weight: 600;">${unit}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #64748b; font-weight: bold;">${userRoleText}</td>
              <td style="padding: 9px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #64748b; font-weight: bold;">來源網址：</td>
              <td style="padding: 9px 0; color: #3b82f6; font-size: 12px; word-break: break-all;">${sourceUrl}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid ${primaryColor}; padding: 16px 18px; border-radius: 6px; margin-bottom: 22px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #334155; font-size: 13px;">📝 反饋詳細內容：</p>
            <p style="margin: 0; color: #0f172a; white-space: pre-wrap; line-height: 1.7; font-size: 14px;">${content}</p>
          </div>
          
          <p style="font-size: 11.5px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 14px;">
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

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
