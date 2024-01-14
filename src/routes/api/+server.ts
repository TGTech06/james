// import puppeteer from '@cloudflare/puppeteer';
// import domino from 'domino';
import cheerio from 'cheerio';
import {
  PRIVATE_SUPABASE_KEY,
  PRIVATE_SUPABASE_URL,
  PRIVATE_OPENAI_API_KEY,
} from "$env/static/private";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { sleep } from 'openai/core.js';
import { supabaseClient } from "$lib/supabase.js";
import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
  PUBLIC_OPENAI_API_KEY,
} from "$env/static/public";
export const _supabaseClient = createClient(
	PRIVATE_SUPABASE_URL,
	PRIVATE_SUPABASE_KEY
)
export const _openaiClient = new OpenAI({ apiKey: PRIVATE_OPENAI_API_KEY });

export async function _getDocuments(openaiClient, userId) {
  try {
    // Use the Supabase client to retrieve the list of file IDs from user_data table
    const { data: userData, error: userError } = await _supabaseClient
      .from("user_data")
      .select("file_list")
      .eq("user_id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return [];
    }

    const fileIds = userData ? userData.file_list || [] : [];
    let documents = [];

    // Loop through each file ID and retrieve the file details using OpenAI API
    for (const fileId of fileIds) {
      const fileDetails = await openaiClient.files.retrieve(fileId);
      documents.push(fileDetails);
    }

    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    // Handle error as needed
    return [];
  }
}

export async function _getFileText(openaiClient, fileId) {
  try {
    // Use the OpenAI API client to retrieve file content
    const file = await openaiClient.files.retrieveContent(fileId);
    console.log("File:", file);
    return file;
  } catch (error) {
    console.error("Error retrieving file:", error);
    return "";
  }
}

export async function _deleteDocument(
  openaiClient,
  fileId,
  userId
) {
  try {
    // Remove the file ID from the file_list in user_data
    const { data: userData, error: userError } = await _supabaseClient
      .from("user_data")
      .select("file_list")
      .eq("user_id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return "Error deleting file";
    }

    const fileIds = userData ? userData.file_list || [] : [];
    const updatedFileList = fileIds.filter((id) => id !== fileId);

    // Update the file_list column in user_data
    const { error: updateError } = await _supabaseClient
      .from("user_data")
      .update({ file_list: updatedFileList })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Error updating user data:", updateError);
      return "Error deleting file";
    }

    // Delete the file using OpenAI API
    const deletedFromOpenAI = await openaiClient.files.del(fileId);

    if (deletedFromOpenAI.deleted === true) {
      return "success";
    } else {
      return "Error deleting file";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error deleting file";
  }
}


export async function GET({ url }) {
  try {
    const response = await fetch(url.searchParams.get('url'));

    if (!response.ok) {
      return new Response('Failed to fetch the page.', {
        status: response.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);

    // Extract text from the document's body
    const bodyText = $('body').text();

    return new Response(bodyText, {
      status: 200,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Content-Type': 'text/plain',
      }),
    });
  } catch (error) {
    return new Response('Error occurred while processing the request.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

  
//irrelevant code now that we dont need to deal with supabase
// export async function _getUserID() {
//   try {
//         let supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
//         let user = await supabase.auth.getUser();
//         let userID = user.data.user.id;
//         console.log("userID:", userID);
//         return userID;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// }


// export async function _getAssistantID() {
//   let userID = await _getUserID();
//   console.log("userID:", userID);
//   const { data: userData, error: userError } = await _supabaseClient
//     .from("user_data")
//     .select("assistant_id")
//     .eq("user_id", userID)
//     .single();

//   if (userError) {
//     console.error("Error fetching user data:", userError);
//   } else {
//     if (userData) {
//       const assistantId = userData.assistant_id;
//       return assistantId;
//     } else {
//       console.log("User not found");
//     }
//   }
// }

// export async function _upload_file(files) {
//   let assistantId = await _getAssistantID();
//   let userID = await _getUserID();
//   if (files) {
//     try {
//       // const client = new OpenAI({
//       //   apiKey: PUBLIC_OPENAI_API_KEY,
//       //   dangerouslyAllowBrowser: true,
//       // });

//       // Fetch the current list of files from the user_data table
//       const { data: userData, error: userError } = await _supabaseClient
//         .from("user_data")
//         .select("file_list")
//         .eq("user_id", userID)
//         .single();

//       if (userError) {
//         console.error("Error fetching user data:", userError);
//         return "Error fetching user data";
//       }

//       // Update the file list with the new file ID
//       let file_ids = userData ? userData.file_list || [] : [];
//       const uploadResult = await _openaiClient.files.create({
//         file: files,
//         purpose: "assistants",
//       });

//       file_ids.push(uploadResult.id);

//       // Update the file_list column in supabase
//       const { data: updateData, error: updateError } = await _supabaseClient
//         .from("user_data")
//         .update({ file_list: file_ids })
//         .eq("user_id", userID);

//       if (updateError) {
//         console.error("Error updating user data:", updateError);
//         return "Error updating user data";
//       }

//       return "success";
//     } catch (E) {
//       return E.message;
//     }
//   } else {
//     return "files is null";
//   }
// }