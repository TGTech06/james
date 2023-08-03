// import puppeteer from '@cloudflare/puppeteer';
// import domino from 'domino';
// export async function GET({ url }) {
  
//   const browser = await puppeteer.launch({ headless: 'new' });
//   const page = await browser.newPage();
//   console.log("url", url.searchParams.get('url'));
//   const urls = 'https://example.com'; // Replace with the desired URL
//   await page.goto(url.searchParams.get('url'));
//   const pageContent = await page.content();
//   const window = domino.createWindow(pageContent);
//   const document = window.document;

//   // Extract text from the document's body
//   const bodyText = document.body.textContent;

//   await browser.close();

// console.log(pageContent);
//   return new Response(bodyText, {
//     status: 200,
//     headers: new Headers({
//       'Content-Type': 'text/plain',
//     }),
//   });
// }