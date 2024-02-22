import { _openaiClient} from '../../+server.js';

export async function POST({ request }){
  try {
    const { assistantId, files, enableCodeInterpreter, enableRetrieval } = await request.json(); 
    // const fileDetails = await _openaiClient.files.retrieve(fileId);
    if (enableCodeInterpreter && enableRetrieval) {
      _openaiClient.beta.assistants.update(assistantId, {
        file_ids: files,
        tools: [{ "type": "retrieval" }, { "type": "code_interpreter" }]
      });
    } else if (enableCodeInterpreter) {
      _openaiClient.beta.assistants.update(assistantId, {
        file_ids: files,
        tools: [{ "type": "code_interpreter" }]
      });
    } else if (enableRetrieval) {
      _openaiClient.beta.assistants.update(assistantId, {
        file_ids: files,
        tools: [{ "type": "retrieval" }]
      });
    } else {
      _openaiClient.beta.assistants.update(assistantId, {
        file_ids: files,
        tools: []
      });
    }

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


