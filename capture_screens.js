const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  
  await page.goto('http://localhost:3000/?mock=true#dashboard', {waitUntil: 'networkidle0'});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'dashboard_screenshot_v2.png', fullPage: true});
  
  await page.goto('http://localhost:3000/?mock=true#portfolio', {waitUntil: 'networkidle0'});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'portfolio_screenshot.png', fullPage: true});
  
  await browser.close();
  console.log("Screenshots captured.");
})();
