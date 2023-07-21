// export const GET: RequestHandler = async () => {
//     return new Response();
// };

import { GET } from "./api/+server";
// src/routes/random.js
export async function random(request) {
  // Call the 'GET' handler with the RequestEvent object
  const url = new URL("https://www.example.com");
  // Replace with your desired URL
  const response = await GET(url);
  //const response = await fetch(url, { method: "GET" });
  console.log(response + "response");

  return {
    status: 200,
    body: {
      randomValue: await response.text(),
    },
  };
}
