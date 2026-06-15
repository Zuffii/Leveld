const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1024 });
  
  // Go to landing page
  await page.goto('http://localhost:3000/', {waitUntil: 'networkidle0'});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'landing_page_scroll_0.png'});
  
  // Scroll to 600
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'landing_page_scroll_600.png'});
  
  // Scroll to 1200 (Calculator / Combine)
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'landing_page_scroll_1200.png'});

  // Scroll to 2000 (Ivy Interactive)
  await page.evaluate(() => window.scrollTo(0, 2000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'landing_page_scroll_2000.png'});

  // Scroll to 3000 (Features bento grid)
  await page.evaluate(() => window.scrollTo(0, 3000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'landing_page_scroll_3000.png'});

  // Scroll to 4000 (Why Choose Leveled / Postcards / Pricing)
  await page.evaluate(() => window.scrollTo(0, 4000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({path: 'landing_page_scroll_4000.png'});
  
  await browser.close();
  console.log("Scroll screenshots captured.");
})();
