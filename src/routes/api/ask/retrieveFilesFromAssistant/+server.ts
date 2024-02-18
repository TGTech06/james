import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
    //await client.beta.assistants.files.list(assistantId);
        try {
            const { assistantId } = await request.json(); // Assuming you send JSON data in the request body
        
            const addedFiles = await _openaiClient.beta.assistants.files.list(assistantId);
        
            return new Response(JSON.stringify(addedFiles), {
                status: 200,
                headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'application/json',
                },
            });
            } catch (e) {
            console.error("Error:", e);
            return new Response(JSON.stringify({ error: e.message }), {
                status: 500,
                headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'application/json',
                },
            });
            }
        }