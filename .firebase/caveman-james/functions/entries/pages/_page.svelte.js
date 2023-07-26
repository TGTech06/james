import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "langchain/text_splitter";
import "langchain/embeddings/hf";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/openai";
import "pdfjs-dist";
import "langchain/document_loaders/fs/text";
import "langchain/document_loaders/fs/pdf";
import "langchain/document_loaders/fs/unstructured";
import "fs";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
import "langchain/vectorstores/memory";
import { N as NavBar } from "../../chunks/NavBar.js";
const ask_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col min-h-screen bg-gray-900 text-white p-4"><div class="flex flex-col items-center"> ${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <h1 class="text-6xl font-bold my-8" data-svelte-h="svelte-10ixsw2">Welcome to James 🧠🧠</h1> <div class="max-w-3xl mx-auto space-y-4"><p class="text-xl text-center mb-6" data-svelte-h="svelte-11zjwmi">James is an AI-powered assistant that can remember everything you tell
        him and answer your questions. He is a smart and curious AI, constantly
        learning and improving with every interaction.</p> <p class="text-xl text-center mb-6" data-svelte-h="svelte-1a5mza6">Whether you need help with research, have questions about various
        topics, or simply want to chat, James should be here to assist you.
        PLEASE provide feedback and suggestions to help him become even better!</p></div> ${`<button class="btn btn-primary btn-lg mt-8 rounded-md uppercase" data-svelte-h="svelte-q8u9rg">Log In</button>`} <p class="text-xl text-center mt-8 mb-6" data-svelte-h="svelte-11mrk0x">What James can help you with (when he feels like it):</p>  <div class="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-8"><div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"><div class="flex items-center justify-center mb-4"><span class="text-4xl" role="img" aria-label="Research" data-svelte-h="svelte-1ollpdz">🔍</span></div> <h3 class="text-2xl font-bold text-white" data-svelte-h="svelte-135kwp4">Research</h3> <p class="text-lg text-white" data-svelte-h="svelte-1mvvnm1">James can read and remember entire books, articles, and web pages. He
          can also answer your questions about what he has read, but don&#39;t try
          to trick him, he&#39;s smarter than you.</p></div> <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"><div class="flex items-center justify-center mb-4"><span class="text-4xl" role="img" aria-label="Study" data-svelte-h="svelte-1n5n2yq">📚</span></div> <h3 class="text-2xl font-bold text-white" data-svelte-h="svelte-nuleb2">Studying</h3> <p class="text-lg text-white" data-svelte-h="svelte-1a0w9zx">With James by your side, you will probably never need to study again,
          but if you do, he can help you with that too. He can make flashcards,
          answer questions, and even help you with your homework (but don&#39;t tell
          your teacher).</p></div> <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"><div class="flex items-center justify-center mb-4"><span class="text-4xl" role="img" aria-label="Programming" data-svelte-h="svelte-17ikkc7">💻</span></div> <h3 class="text-2xl font-bold text-white" data-svelte-h="svelte-1rvp22w">Programming</h3> <p class="text-lg text-white" data-svelte-h="svelte-9k6qwb">James can swallow up entire documentation pages so you don&#39;t have to.
          If you have a question about a programming language or framework, he
          can hopefully answer it. He can also help you with your code, but he&#39;s
          not very good at it yet.</p></div> <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"><div class="flex items-center justify-center mb-4"><span class="text-4xl" role="img" aria-label="Chat" data-svelte-h="svelte-1vjrmcj">💬</span></div> <h3 class="text-2xl font-bold text-white" data-svelte-h="svelte-r8mlpt">Chat with Your Notes</h3> <p class="text-lg text-white" data-svelte-h="svelte-1d9gr5u">Please let James read all your personal notes and thoughts. He
          promises he won&#39;t tell anyone. He can also answer your questions and
          have a conversation with you.</p></div></div> </div></div>`;
});
export {
  Page as default
};
