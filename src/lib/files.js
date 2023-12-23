import { getHtml, convertHtmlToTxt } from "./loaders/html";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
  PUBLIC_OPENAI_API_KEY,
} from "$env/static/public";
import { supabaseClient } from "./supabase.ts";

let userID;
async function getUserID() {
  try {
    let supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    let user = await supabase.auth.getUser();
    userID = user.data.user.id;
  } catch (e) {
    console.log(e);
  }
}

async function getAssistantID() {
  await getUserID();
  const { data: userData, error: userError } = await supabaseClient
    .from("user_data")
    .select("assistant_id")
    .eq("user_id", userID)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError);
  } else {
    if (userData) {
      const assistantId = userData.assistant_id;
      return assistantId;
    } else {
      console.log("User not found");
    }
  }
}

export async function upload_file(files) {
  let assistantId = await getAssistantID();
  if (files) {
    try {
      const client = new OpenAI({
        apiKey: PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const uploadResult = await client.files.create({
        file: files,
        purpose: "assistants",
      });
      let currentFiles = await client.beta.assistants.files.list(assistantId);
      let file_ids = [];
      for (var i = 0; i < currentFiles.data.length; i++) {
        file_ids.push(currentFiles.data[i].id);
      }
      file_ids.push(uploadResult.id);
      client.beta.assistants.update(assistantId, {
        file_ids: file_ids,
      });
      return "success";
    } catch (E) {
      return E.message;
    }
  } else {
    return "files is null";
  }
}

export async function create_file_and_upload(title, text) {
  try {
    const txtFile = new File([text], title, { type: "text/plain" });
    let outcome = await upload_file(txtFile);
    return outcome;
  } catch (e) {
    return e.message;
  }
}

export async function url_uploader(url) {
  try {
    const htmlContent = await getHtml(url);
    if (htmlContent) {
      const txtFile = await convertHtmlToTxt(htmlContent, url);
      if (txtFile) {
        let outcome = await upload_file(txtFile);
        return outcome;
      } else {
        return "txtFile is null";
      }
    }
  } catch (error) {
    return error.message;
  }
}
