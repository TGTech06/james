import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
        try {
            const formData = await request.formData();
            const assistantId = formData.get('assistantId'); // Assuming you send JSON data in the request body
            let assistant = await _openaiClient.beta.assistants.retrieve(assistantId.toString());
            if (assistant.instructions) {
                return new Response(assistant.instructions, {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                        'Content-Type': 'text/plain',
                    },
                });
            } else {
                return new Response("Error retrieving instructions", {
                    status: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                        'Content-Type': 'text/plain',
                    },
                });
            }
            
            } catch (e) {
            return new Response(e.message, {
                status: 500,
                headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'text/plain',
                },
            });
            }
        }
  