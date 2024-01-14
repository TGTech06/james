import { _openaiClient } from '../../+server.js';

export async function POST({ request }) {
        try {
            const formData = await request.formData();
            const userID = formData.get('userID'); // Assuming you send JSON data in the request body

            let assistant = _openaiClient.beta.assistants.create({
                name: userID.toString(),
                instructions:
                  'Your name is James, do not forget that. Always introduce yourself as " Hello I\'m James your personal assistant". Use your vast knowledge base to best respond to student queries and help them with anything they ask for even things you are not sure about. Always cite your sources.',
                model: "gpt-3.5-turbo-1106",
                tools: [{ type: "retrieval" }],
              });
              let assistantID = (await assistant).id;
            if (assistantID) {
                return new Response(assistantID, {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                        'Content-Type': 'text/plain',
                    },
                });
            } else {
                return new Response("Something went wrong", {
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
  