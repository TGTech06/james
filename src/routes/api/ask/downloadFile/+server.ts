import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
    try {
        const { fileId } = await request.json(); // Assuming you send JSON data in the request body
        const file = await _openaiClient.files.content(fileId);
        
        const bufferView = await file.arrayBuffer();
       

        // Return the file content as a response with appropriate headers
        return new Response(bufferView, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'application/json', // Default to binary/octet-stream
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
