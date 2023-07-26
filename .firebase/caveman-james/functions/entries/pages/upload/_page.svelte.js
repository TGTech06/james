import { c as create_ssr_component, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import "langchain/text_splitter";
import "langchain/embeddings/hf";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/openai";
import "pdfjs-dist";
import "langchain/document_loaders/fs/text";
import "langchain/document_loaders/fs/pdf";
import "langchain/document_loaders/fs/unstructured";
import "fs";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4"><div class="flex flex-col items-center"><nav class="w-full bg-gray-900 rounded-lg mb-6 shadow-md"><div class="navbar p-4 bg-gray-900 text-white rounded-t-lg rounded-b-lg border border-white"><div class="flex items-center justify-center flex-1"><a href="/" class="text-3xl font-bold hover:text-blue-400 cursor-pointer" data-svelte-h="svelte-1da30rr">James 🧠🧠</a></div> <div class="flex items-center justify-center flex-1 space-x-4"><a href="/upload" class="text-lg text-white hover:text-blue-400" data-svelte-h="svelte-8kva0r">Upload Data</a> <a href="/ask" class="text-lg text-white hover:text-blue-400" data-svelte-h="svelte-1i5p5cg">Chat with James</a> <a href="/profile" class="text-lg text-white hover:text-blue-400" data-svelte-h="svelte-3pkr3">Profile</a> </div></div></nav> <div class="p-8 flex flex-col items-center h-screen"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-1jf55pk">Insert Data Page</h1>  ${``}  <div class="w-full mb-8"><label class="label mb-2 text-lg font-bold" data-svelte-h="svelte-qb0qet">Upload Files</label> <div class="flex items-center"><input type="file" multiple class="input input-accent mr-4"> <button class="btn btn-primary text-lg font-bold" data-svelte-h="svelte-lgl95g">Upload Files</button></div></div>  <div class="w-full"><label class="label mb-2 text-lg font-bold" data-svelte-h="svelte-qczuz7">Add the URL to the database</label> <div class="flex items-center"><textarea class="textarea textarea-accent resize-none flex-grow text-lg font-bold" rows="1">${escape("")}</textarea> <button class="btn btn-primary text-lg font-bold ml-4" data-svelte-h="svelte-i43hfh">Add URL</button></div></div></div></div></div>`;
    }
  })}  `;
});
export {
  Page as default
};
