// import puppeteer from 'puppeteer';
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

// import puppeteer from '@cloudflare/puppeteer';
// import domino from 'domino';
import cheerio from 'cheerio';

export async function GET({ url }) {
  try {
    const response = await fetch(url.searchParams.get('url'));

    if (!response.ok) {
      return new Response('Failed to fetch the page.', {
        status: response.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);

    // Extract text from the document's body
    const bodyText = $('body').text();

    return new Response(bodyText, {
      status: 200,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Content-Type': 'text/plain',
      }),
    });
  } catch (error) {
    return new Response('Error occurred while processing the request.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

  