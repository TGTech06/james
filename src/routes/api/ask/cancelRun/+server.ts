import { _openaiClient } from '../../+server.js';

//get messages from a thread
export async function POST({ request }) {
    //await client.beta.assistants.files.list(assistantId);
        try {
            const { selectedThreadId, runID } = await request.json();
            // Assuming you send JSON data in the request body
            let run = _openaiClient.beta.threads.runs.cancel(selectedThreadId, runID);
            return new Response(JSON.stringify(run), {
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
    