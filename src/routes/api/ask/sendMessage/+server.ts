import { _openaiClient } from '../../+server.js';

//get messages from a thread
export async function POST({ request }) {
    //await client.beta.assistants.files.list(assistantId);
        try {
            const { selectedThreadId, question } = await request.json(); // Assuming you send JSON data in the request body
            await _openaiClient.beta.threads.messages.create(
                selectedThreadId,
                {
                  role: "user",
                  content: question,
                  // file_ids: [],
                }
              );
            return new Response("success", {
                status: 200,
                headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Content-Type': 'text/plain',
                },
            });
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
    