// puppeteer-utils.ts
// import puppeteer from 'puppeteer';
import { error } from '@sveltejs/kit';

export async function GET(url) {
  const min = 5;
  const max = 100;

  const d = max - min;

  if (isNaN(d) || d < 0) {
      throw error(400, 'min and max must be numbers, and min must be less than max');
  }

  const random = min + Math.random() * d;
  return new Response(String(random));
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // try {
  //   const url = 'https://example.com'; // Replace with the desired URL
  //   await page.goto(url);

  //   // Wait for some time (optional, if the page loads dynamic content)
  //   await page.waitForTimeout(3000); // Wait for 3 seconds

  //   const pageContent = await page.content();
  //   return new Response(pageContent, {
  //     status: 200,
  //     headers: new Headers({
  //       'Content-Type': 'text/html',
  //     }),
  //   });
  // } catch (error) {
  //   console.error('Error while retrieving web page content:', error);
  //   return null;
  // } finally {
  //   await browser.close();
  // }
  // Your Puppeteer code here
  // For example, you can navigate to a website and take a screenshot
  // await page.goto('https://example.com');
  // await page.screenshot({ path: 'example.png' });
  // await browser.close();

}
