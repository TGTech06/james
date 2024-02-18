import { _openaiClient} from '../../+server.js';

export async function POST({ request }){
  try {
    const { assistantId, files } = await request.json(); 
    // const fileDetails = await _openaiClient.files.retrieve(fileId);
    const response = await _openaiClient.beta.assistants.update(assistantId, {
      file_ids: files,
    });
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


