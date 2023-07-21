

// export const GET: RequestHandler = async ({ url }: { url: URL }) => {
//   // const { request } = event;
//   // const { url } = request;
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const urls = 'https://example.com'; // Replace with the desired URL
//     await page.goto(urls);
//   const pageContent = await page.content();
//   console.log(pageContent);
//     return new Response(pageContent.toString(), {
//       status: 200,
//       headers: new Headers({
//         'Content-Type': 'text/html',
//       }),
//     });
// };
import puppeteer from 'puppeteer';

export async function GET({ url }) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  console.log("url", url.searchParams.get('url'));
  const urls = 'https://example.com'; // Replace with the desired URL
  await page.goto(url.searchParams.get('url'));
const pageContent = await page.content();
console.log(pageContent);
  return new Response(pageContent.toString(), {
    status: 200,
    headers: new Headers({
      'Content-Type': 'text/html',
    }),
  });
}