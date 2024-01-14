import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
        try {
            const formData = await request.formData();
            const assistantId = formData.get('assistantId'); // Assuming you send JSON data in the request body
            const instructions = formData.get('instructions'); // Assuming you send JSON data in the request body
            let response = await _openaiClient.beta.assistants.update(assistantId.toString(), {
                instructions: instructions.toString(),
            });
            if (response.instructions === instructions.toString()) {
                return new Response("success", {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                        'Content-Type': 'text/plain',
                    },
                });
            } else {
                return new Response("Error updating assistant", {
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
  