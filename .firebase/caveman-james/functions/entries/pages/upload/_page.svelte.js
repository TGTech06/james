import { c as create_ssr_component, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import "langchain/text_splitter";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/openai";
import "pdfjs-dist";
import "langchain/document_loaders/fs/text";
import "langchain/document_loaders/fs/pdf";
import "langchain/document_loaders/fs/unstructured";
import "fs";
import "langchain/embeddings/hf";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4"><div class="flex flex-col items-center">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <div class="p-4 md:p-8 flex flex-col items-center h-screen"><h1 class="text-2xl md:text-4xl font-bold mb-4 md:mb-8" data-svelte-h="svelte-1uys3o0">Insert Data Page</h1>  ${``}  <div class="w-full mb-4 md:mb-8"><label class="label mb-2 text-lg font-bold" data-svelte-h="svelte-qb0qet">Upload Files</label> <div class="flex flex-col md:flex-row items-center"><input type="file" multiple class="input input-accent mr-0 md:mr-4 mb-2 md:mb-0"> <button class="btn btn-primary text-lg font-bold" data-svelte-h="svelte-lgl95g">Upload Files</button></div></div>  <div class="w-full"><label class="label mb-2 text-lg font-bold" data-svelte-h="svelte-qczuz7">Add the URL to the database</label> <div class="flex flex-col md:flex-row items-center"><textarea class="textarea textarea-accent resize-none flex-grow text-lg font-bold mb-2 md:mb-0 md:mr-4" rows="1">${escape("")}</textarea> <button class="btn btn-primary text-lg font-bold" data-svelte-h="svelte-q899tv">Add URL</button></div></div></div></div></div>`;
    }
  })}  `;
});
export {
  Page as default
};
