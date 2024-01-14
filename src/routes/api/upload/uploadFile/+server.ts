import { _openaiClient} from '../../+server.js';

export async function _upload_file(files) {
   let uploadResult = await _openaiClient.files.create({
    file: files,
    purpose: "assistants",
   });
    return uploadResult.id;
}
  
export async function POST({ request }) {
    const formData = await request.formData();
   let uploadResult = await _upload_file(formData.get("files"));
    return new Response(uploadResult, {
      status: 200,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Content-Type': 'text/plain',
      }),
    });
  }
