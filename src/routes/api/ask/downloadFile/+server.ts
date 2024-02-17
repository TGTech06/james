import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
    //await client.beta.assistants.files.list(assistantId);
        try {
            const { fileId } = await request.json(); // Assuming you send JSON data in the request body
            const file = await _openaiClient.files.content(fileId);
            
            const bufferView = new Uint8Array(await file.arrayBuffer());
            // const blob = file.blob();
            return new Response(JSON.stringify(bufferView), {
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