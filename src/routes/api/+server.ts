// import puppeteer from '@cloudflare/puppeteer';
// import domino from 'domino';
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
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(htmlContent, 'text/html');
  
      // Extract text from the document's body
      const bodyText = doc.body.textContent;
  
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
  