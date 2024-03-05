import { _openaiClient } from '../../+server.js';

//get messages from a thread
export async function POST({ request }) {
    try {
        const { threadID } = await request.json(); // Assuming you send JSON data in the request body
        const response = await _openaiClient.beta.threads.messages.list(threadID, { limit: 1, order: 'asc' }); // Set limit to 1 and order to 'asc'
        // const firstMessage = response.data[0]; // Retrieve the first message from the response data
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'application/json',
            },
        });
    }
}
