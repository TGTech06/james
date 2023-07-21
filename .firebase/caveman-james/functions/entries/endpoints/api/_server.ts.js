import puppeteer from "puppeteer";
async function GET({ url }) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log("url", url.searchParams.get("url"));
  await page.goto(url.searchParams.get("url"));
  const pageContent = await page.content();
  console.log(pageContent);
  return new Response(pageContent.toString(), {
    status: 200,
    headers: new Headers({
      "Content-Type": "text/html"
    })
  });
}
export {
  GET
};
