import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
    //await client.beta.assistants.files.list(assistantId);
        try {
            let { fileId } = await request.json(); 
            if (fileId !== null) {
                let fileDetails = await _openaiClient.files.retrieve(fileId.toString());
                return new Response(JSON.stringify(fileDetails), {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                return new Response(JSON.stringify({ error: "No file ID provided" }), {
                    status: 500,
                    headers: {
                    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                    'Content-Type': 'application/json',
                    },
                });
            }
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
    