import { _openaiClient } from '../../+server.js';

export async function DELETE({ request }) {
  try {
    const formData = await request.formData();
    const fileId = formData.get('fileId');
    const deletedFromOpenAI = await _openaiClient.files.del(fileId.toString());

    if (deletedFromOpenAI.deleted === true) {
      return new Response("success", {
        status: 200,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Content-Type': 'text/plain',
        }),
      });
    } else {
      return new Response("Error deleting file", {
        status: 500,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Content-Type': 'text/plain',
        }),
      });
    }
  }catch(error){
    return new Response("Error deleting file", {
      status: 500,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Content-Type': 'text/plain',
      }),
    });
  }
}
