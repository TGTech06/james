import { _openaiClient } from '../../+server.js';

//get messages from a thread
export async function POST({ request }) {
    //await client.beta.assistants.files.list(assistantId);
        try {
            const { selectedThreadId, assistantId, instructions, enableRetrieval, enableCodeInterpreter } = await request.json();
            // Assuming you send JSON data in the request body
            let run;
            if (enableRetrieval && enableCodeInterpreter) {
                run = await _openaiClient.beta.threads.runs.create(
                    selectedThreadId, // threadId
                    {
                        assistant_id: assistantId,
                        instructions: instructions,
                        tools: [{ "type": "retrieval" }, { "type": "code_interpreter" }]
                    }
                );
            } else if (enableCodeInterpreter)  { 
                run = await _openaiClient.beta.threads.runs.create(
                    selectedThreadId, // threadId
                    {
                        assistant_id: assistantId,
                        instructions: instructions,
                        tools: [{ "type": "code_interpreter" }]
                    }
                );
            } else if (enableRetrieval) {
                run = await _openaiClient.beta.threads.runs.create(
                    selectedThreadId, // threadId
                    {
                        assistant_id: assistantId,
                        instructions: instructions,
                        tools: [{ "type": "retrieval" }]
                    }
                );
            } else {
                run = await _openaiClient.beta.threads.runs.create(
                    selectedThreadId, // threadId
                    {
                        assistant_id: assistantId,
                        instructions: instructions,
                        tools: []
                    }
                );
            }
                
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
    