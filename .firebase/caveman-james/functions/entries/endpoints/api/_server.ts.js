import cheerio from "cheerio";
async function GET({ url }) {
  try {
    const response = await fetch(url.searchParams.get("url"));
    if (!response.ok) {
      return new Response("Failed to fetch the page.", {
        status: response.status,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);
    const bodyText = $("body").text();
    return new Response(bodyText, {
      status: 200,
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        // Allow requests from any origin
        "Content-Type": "text/plain"
      })
    });
  } catch (error) {
    return new Response("Error occurred while processing the request.", {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
export {
  GET
};
