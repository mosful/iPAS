const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium, webkit, firefox } = require('playwright');

const root = path.resolve(__dirname, '..');
const pages = ['home', 'search', 'practice', 'review', 'study', 'sources', 'feedback', 'settings'];
const sizes = [[320, 568], [375, 812], [390, 844], [430, 932], [640, 900], [768, 1024], [820, 1180], [1024, 768], [1280, 800], [1440, 900], [1920, 1080], [844, 390]];
const browserNames = (process.env.IPAS_TEST_BROWSERS || 'chromium').split(',');
const browsers = new Map();
let server, baseURL, revision = 1;

before(async () => {
  server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    try {
      let body = await fs.readFile(file);
      const ext = path.extname(file);
      if (ext === '.html') body = Buffer.from(body.toString().replace('<html lang=', `<html data-test-revision="${revision}" lang=`));
      res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json' })[ext] || 'application/octet-stream');
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, 'localhost', resolve));
  baseURL = `http://localhost:${server.address().port}`;
  for (const name of browserNames) {
    const engine = name === 'webkit' ? webkit : name === 'firefox' ? firefox : chromium;
    browsers.set(name, await engine.launch({ headless: true, ...(['chrome', 'msedge'].includes(name) ? { channel: name } : {}) }));
  }
});

after(async () => {
  await Promise.all([...browsers.values()].map(browser => browser.close()));
  if (server) await new Promise(resolve => server.close(resolve));
});

async function openPage(browser, width, height, serviceWorkers = 'block') {
  const context = await browser.newContext({ viewport: { width, height }, isMobile: width <= 1024, hasTouch: width <= 1024, serviceWorkers });
  // 外部留言與統計服務使用空白回應，測試不會寄信或寫入外部資料。
  await context.route('**/*', route => new URL(route.request().url()).hostname === 'localhost'
    ? route.continue() : route.fulfill({ contentType: route.request().resourceType() === 'stylesheet' ? 'text/css' : 'text/javascript', body: '' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.setDefaultTimeout(8000);
  await page.goto(baseURL, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof executePageSwitch === 'function');
  return { context, page, errors };
}

async function checkLayout(page, label) {
  const issues = await page.evaluate(() => {
    const issues = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) issues.push(`頁面寬度 ${document.documentElement.scrollWidth} 超出 ${innerWidth}`);
    for (const el of document.querySelectorAll('#topbar *, .page.active *')) {
      if (el.closest('.table-scroll')) continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (rect.left < -1 || rect.right > innerWidth + 1) issues.push(`${el.id || el.className || el.tagName} 超出畫面`);
    }
    return issues.slice(0, 8);
  });
  assert.deepEqual(issues, [], label);
}

async function navigate(page, id) {
  if (await page.locator('.hbg').isVisible()) await page.locator('.hbg').click();
  await page.locator(`.nav-item[onclick="gp('${id}',this)"]`).click();
  assert.equal(await page.locator(`#page-${id}`).evaluate(el => el.classList.contains('active')), true);
  assert.equal(await page.locator('body').evaluate(el => el.classList.contains('interaction-locked')), false);
}

async function snapshot(page, name, width, browserName) {
  if (browserName !== browserNames[0] || ![375, 820, 1440].includes(width)) return;
  await fs.mkdir(path.join(root, 'test-results'), { recursive: true });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.screenshot({ path: path.join(root, 'test-results', `${name}-${width}.png`), animations: 'disabled' });
}

for (const browserName of browserNames) {
  test(`${browserName}：各尺寸全頁面、考點章節與深淺色版面`, async t => {
    for (const [width, height] of sizes) {
      await t.test(`${width} × ${height}`, async () => {
        const { context, page, errors } = await openPage(browsers.get(browserName), width, height);
        try {
          await page.emulateMedia({ reducedMotion: 'reduce' });
          assert.equal(await page.locator('#sidebar').evaluate(el => el.inert), width <= 1024);
          for (const theme of ['dark', 'light']) {
            await page.locator(`#theme-btn-${theme}`).click();
            for (const id of pages) {
              await navigate(page, id);
              await checkLayout(page, `${id} / ${theme} / ${width}`);
              if (id === 'study') {
                for (const button of await page.locator('.stab-btn').all()) {
                  await button.click();
                  await checkLayout(page, `${await button.textContent()} / ${width}`);
                }
                await page.locator('.stab-btn').first().click();
              }
              if (id === 'home' && theme === 'dark') await snapshot(page, 'home', width, browserName);
              if (id === 'study' && theme === 'light') await snapshot(page, 'study-light', width, browserName);
            }
          }
          assert.deepEqual(errors, []);
        } finally { await context.close(); }
      });
    }
  });

  test(`${browserName}：觸控、搜尋、收藏、測驗、鍵盤、彈窗與旋轉`, async t => {
    for (const [width, height] of [[375, 812], [820, 1180], [1440, 900], [844, 390]]) {
      await t.test(`${width} × ${height}`, async () => {
        const { context, page, errors } = await openPage(browsers.get(browserName), width, height);
        try {
          await navigate(page, 'home');
          const faq = page.locator('details.faq-item').first();
          assert.equal(await faq.locator('.faq-a').isVisible(), true);
          await faq.locator('summary').click();
          assert.equal(await faq.locator('.faq-a').isVisible(), false);
          await navigate(page, 'search');
          await page.getByRole('searchbox').fill('ReAct');
          await page.waitForFunction(() => Number(document.querySelector('#search-result-count').textContent) > 0 && document.querySelector('.search-mark'));
          await page.locator('.star-btn').first().click();
          assert.equal(await page.locator('.star-btn').first().evaluate(el => el.classList.contains('active')), true);
          await page.getByRole('button', { name: '⭐ 我的收藏', exact: true }).click();
          assert.equal(await page.locator('#search-result-count').textContent(), '1');
          await checkLayout(page, '搜尋與收藏');

          await navigate(page, 'settings');
          await page.locator('#set-cnt').selectOption('10');
          await page.locator('label[for="switch-shortcuts"]').click();
          await navigate(page, 'exam');
          assert.equal(await page.locator('#qcon .opt').count(), 4);
          await page.keyboard.press('1');
          assert.equal(await page.evaluate(() => S.ans[0]), null);
          await page.locator('#qcon .opt').first().click();
          assert.equal(await page.locator('.exp-box.show').isVisible(), true);
          await page.locator('#btn-next').click();
          assert.equal(await page.locator('#qprog').textContent(), '2 / 10');
          await page.locator('#btn-prev').click();
          await page.locator('#btn-timer-pause').click();
          assert.equal(await page.locator('#pause-mask').isVisible(), true);
          await page.getByRole('button', { name: '▶️ 繼續作答', exact: true }).click();
          assert.equal(await page.locator('#pause-mask').isVisible(), false);
          await checkLayout(page, '作答與暫停');
          await snapshot(page, 'exam', width, browserName);

          await page.locator('#feedbackFab').click();
          assert.equal(await page.locator('body').evaluate(el => el.classList.contains('interaction-locked')), true);
          const answerBefore = await page.evaluate(() => [...S.ans]);
          await page.keyboard.press('2');
          assert.deepEqual(await page.evaluate(() => S.ans), answerBefore);
          for (const field of ['modalFbType', 'modalFbUnit', 'modalFbName', 'modalFbEmail', 'modalFbContent']) {
            assert.equal(await page.locator(`label[for="${field}"]`).count(), 1);
          }
          await page.locator('#modalFbContent').fill('測試表單排版，無須送出。');
          await page.locator('#modalSubmitBtn').scrollIntoViewIfNeeded();
          const submitBox = await page.locator('#modalSubmitBtn').boundingBox();
          assert.ok(submitBox.y >= 0 && submitBox.y + submitBox.height <= height + 1, '彈窗送出按鈕可捲動至畫面內');
          await page.keyboard.press('Tab');
          assert.equal(await page.locator('#feedbackModal').evaluate(el => el.contains(document.activeElement)), true);
          await snapshot(page, 'feedback', width, browserName);
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('#feedbackModal').isVisible(), false);
          assert.equal(await page.locator('body').evaluate(el => el.classList.contains('interaction-locked')), false);

          await page.locator('.btn-home').click();
          assert.equal(await page.locator('#appDialogOverlay').getAttribute('aria-hidden'), 'false');
          await page.locator('#dialogCancelBtn').click();
          assert.equal(await page.locator('#page-exam').evaluate(el => el.classList.contains('active')), true);
          await page.locator('.exam-hd > .btn').click();
          assert.equal(await page.locator('#result-area').isVisible(), true);
          await checkLayout(page, '測驗結果');
          const totalDone = await page.evaluate(() => S.totalDone);
          await page.evaluate(() => endExam());
          assert.equal(await page.evaluate(() => S.totalDone), totalDone, '交卷不重複累加成績');
          await navigate(page, 'review');
          assert.ok(await page.locator('.rev-item').count() > 0);
          await checkLayout(page, '錯題複習');

          await navigate(page, 'study');
          if (width < 560) {
            const table = page.locator('.study-chapter.active .table-scroll').first();
            await table.focus();
            await page.keyboard.press('ArrowRight');
            await page.waitForFunction(() => document.querySelector('.study-chapter.active .table-scroll').scrollLeft > 0);
            await checkLayout(page, '表格橫向捲動');
          }
          await page.setViewportSize({ width: 820, height: 1180 });
          await page.waitForFunction(() => drawerMedia.matches && document.getElementById('sidebar').inert);
          await page.locator('.hbg').click();
          assert.equal(await page.locator('.hbg').getAttribute('aria-expanded'), 'true');
          await page.setViewportSize({ width: 1440, height: 900 });
          await page.waitForFunction(() => !drawerMedia.matches && !document.body.classList.contains('interaction-locked'));
          assert.equal(await page.locator('body').evaluate(el => el.classList.contains('interaction-locked')), false);
          assert.equal(await page.locator('#sidebar').evaluate(el => el.inert), false);
          await page.setViewportSize({ width: 390, height: 844 });
          await page.waitForFunction(() => drawerMedia.matches && document.getElementById('sidebar').inert);
          assert.equal(await page.locator('#sidebar').evaluate(el => el.inert), true);
          await page.locator('.hbg').click();
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.hbg').getAttribute('aria-expanded'), 'false');
          await navigate(page, 'feedback');
          await checkLayout(page, '頁面回饋表單');
          await navigate(page, 'sources');
          await checkLayout(page, '資源庫');
          await page.evaluate(() => {
            const longest = QB_ALL.reduce((a, b) => a.q.length > b.q.length ? a : b);
            S.qs = [{ ...longest, opts: [longest.opts[0] + 'LongTechnicalIdentifier'.repeat(30), ...longest.opts.slice(1)] }];
            S.ans = [null]; S.cur = 0; S.examActive = true;
            executePageSwitch('exam', null);
            document.getElementById('exam-area').style.display = 'block';
            document.getElementById('result-area').style.display = 'none';
            renderQ();
          });
          await checkLayout(page, '最長題幹與連續英文選項');
          await page.emulateMedia({ reducedMotion: 'reduce' });
          assert.ok(parseFloat(await page.locator('#sidebar').evaluate(el => getComputedStyle(el).transitionDuration)) < .01);
          assert.deepEqual(errors, []);
        } finally { await context.close(); }
      });
    }
  });
}

test('PWA：連線時取得新版頁面，離線仍能開啟題庫', async () => {
  const chromiumBrowser = [...browsers.entries()].find(([name]) => !['webkit', 'firefox'].includes(name))?.[1];
  if (!chromiumBrowser) return;
  const { context, page, errors } = await openPage(chromiumBrowser, 390, 844, 'allow');
  try {
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    assert.ok(await page.evaluate(() => caches.has('ipas-cache-v2')));
    revision = 2;
    await page.reload({ waitUntil: 'load' });
    assert.equal(await page.locator('html').getAttribute('data-test-revision'), '2');
    await context.setOffline(true);
    await page.reload({ waitUntil: 'load' });
    assert.equal(await page.locator('html').getAttribute('data-test-revision'), '2');
    await page.locator('.top-btns .btn-primary').click();
    assert.equal(await page.locator('#qcon .opt').count(), 4);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});
