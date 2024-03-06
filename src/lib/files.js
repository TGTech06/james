import { getHtml, convertHtmlToTxt } from "./html";
import { supabaseClient } from "./supabase";

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

async function getUserID() {
  try {
    let user = await supabaseClient.auth.getUser();
    let userID = await user.data.user.id;
    return userID;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function upload_file(files) {
  if (files) {
    try {
      let userID = await getUserID();

      // Fetch the current list of files from the user_data table
      const { data: userData, error: userError } = await supabaseClient
        .from("user_data")
        .select("file_list")
        .eq("user_id", userID)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
        return "Error fetching user data";
      }

      // Update the file list with the new file ID
      let file_ids = userData ? userData.file_list || [] : [];

      // Upload the file to the server using API endpoint I created
      const formData = new FormData();
      formData.append("files", files);
      let response = await fetch("/api/upload/uploadFile", {
        method: "POST",
        body: formData,
      });
      let uploadResultID = await response.text();
      //new code is over this is the old code

      file_ids.push(uploadResultID);

      // Update the file_list column in supabase
      const { data: updateData, error: updateError } = await supabaseClient
        .from("user_data")
        .update({ file_list: file_ids })
        .eq("user_id", userID);

      if (updateError) {
        console.error("Error updating user data:", updateError);
        return "Error updating user data";
      }

      return "success";
    } catch (E) {
      return E.message;
    }
  } else {
    return "files is null";
  }
}
