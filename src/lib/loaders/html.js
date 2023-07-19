// import { processFile } from "./common";
// import { UnstructuredLoader } from "langchain/document_loaders";
// import { writable } from "svelte/store";
// import { get } from "svelte/store";
// import { requests } from "requests";
// import { slugify as slugifyPython } from "./slugify";

// export function processHtml(vectorStore, file) {
//   return processFile(vectorStore, file, UnstructuredLoader, ".html");
// }

// export async function getHtml(url) {
//   const response = await requests.get(url);
//   if (response.status === 200) {
//     return response.text;
//   } else {
//     return null;
//   }
// }

// export function createHtmlFile(url, content) {
//   const file_name = slugify(url) + ".html";
//   const temp_file_path = `${tempfile.gettempdir()}/${file_name}`;
//   const temp_file = open(temp_file_path, "w");
//   temp_file.write(content);
//   temp_file.close();

//   const record = new UploadedFileRec(
//     null,
//     file_name,
//     "text/html",
//     fs.readFileSync(temp_file_path)
//   );
//   const uploaded_file = new UploadedFile(record);

//   return [uploaded_file, temp_file_path];
// }

// export function deleteTempFile(temp_file_path, url, ret) {
//   try {
//     fs.unlinkSync(temp_file_path);
//     if (ret) {
//       console.log(`✅ Content saved... ${url}`);
//     }
//   } catch (e) {
//     console.log(`❌ Error while saving content... ${url}`);
//   }
// }

// function slugify(text) {
//   const slugifyPython = require("./slugify");
//   return slugifyPython(text);
// }

//convert python code to javascript
// from .common import process_file
// from langchain.document_loaders import UnstructuredHTMLLoader
// import requests
// import re
// import unicodedata
// import tempfile
// import os
// import streamlit as st
// from streamlit.runtime.uploaded_file_manager import UploadedFileRec, UploadedFile

// def process_html(vector_store, file):
//     return process_file(vector_store, file, UnstructuredHTMLLoader, ".html")

// def get_html(url):
//     response = requests.get(url)
//     if response.status_code == 200:
//         return response.text
//     else:
//         return None

// def create_html_file(url, content):
//     file_name = slugify(url) + ".html"
//     temp_file_path = os.path.join(tempfile.gettempdir(), file_name)
//     with open(temp_file_path, 'w') as temp_file:
//         temp_file.write(content)

//     record = UploadedFileRec(id=None, name=file_name, type='text/html', data=open(temp_file_path, 'rb').read())
//     uploaded_file = UploadedFile(record)

//     return uploaded_file, temp_file_path

// def delete_tempfile(temp_file_path, url, ret):
//     try:
//         os.remove(temp_file_path)
//         if ret:
//             st.write(f"✅ Content saved... {url}  ")
//     except OSError as e:
//         print(f"Error while deleting the temporary file: {str(e)}")
//         if ret:
//             st.write(f"❌ Error while saving content... {url}  ")

// def slugify(text):
//     text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
//     text = re.sub(r'[^\w\s-]', '', text).strip().lower()
//     text = re.sub(r'[-\s]+', '-', text)
//     return text

//js code
// import { processFile } from "./common";
// import { UnstructuredLoader } from "langchain/document_loaders";
// import { writable } from "svelte/store";
// import { get } from "svelte/store";
// import { requests } from "requests";

// export function processHtml(vectorStore, file) {
//   return processFile(vectorStore, file, UnstructuredLoader, ".html");
// }

// export async function getHtml(url) {
//   const response = await requests.get(url);
//   if (response.status === 200) {
//     return response.text;
//   } else {
//     return null;
//   }
// }

//convert python code to javascript
// def slugify(text):
//     text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
//     text = re.sub(r'[^\w\s-]', '', text).strip().lower()
//     text = re.sub(r'[-\s]+', '-', text)
//     return text
//js code
// function slugify(text) {
//     text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
// }

import { process_file } from "./common";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import axios from "axios";
import fs from "fs";

export async function processHtml(vector_store, file) {
  return process_file(vector_store, file, UnstructuredLoader, ".html");
}

export async function getHtml(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export function createHtmlFile(url, content) {
  const file_name = slugify(url) + ".html";
  const temp_file_path = fs.mkdtempSync("/tmp/") + file_name;
  fs.writeFileSync(temp_file_path, content);

  const uploaded_file = {
    id: null,
    name: file_name,
    type: "text/html",
    data: fs.readFileSync(temp_file_path),
  };

  return { uploaded_file, temp_file_path };
}

export function deleteTempFile(temp_file_path, url, ret) {
  try {
    fs.unlinkSync(temp_file_path);
    if (ret) {
      console.log(`✅ Content saved... ${url}`);
    }
  } catch (error) {
    console.log(`❌ Error while saving content... ${url}`);
  }
}

function slugify(text) {
  text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  text = text
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase();
  text = text.replace(/[-\s]+/g, "-");
  return text;
}
