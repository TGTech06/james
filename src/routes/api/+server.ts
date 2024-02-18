// import puppeteer from '@cloudflare/puppeteer';
// import domino from 'domino';
import cheerio from 'cheerio';
import {
  PRIVATE_OPENAI_API_KEY,
} from "$env/static/private";
import { OpenAI } from "openai";

export const _openaiClient = new OpenAI({ apiKey: PRIVATE_OPENAI_API_KEY });

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