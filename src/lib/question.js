import { writable } from "svelte/store";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
// import { OpenAI } from "langchain/llms";
import { HuggingFaceInference } from "langchain/llms/hf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { loadQAStuffChain } from "langchain/chains";
import { RetrievalQAChain } from "langchain/chains";
// import { loadQARefineChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
  PUBLIC_HUGGINGFACE_API_KEY,
  PUBLIC_OPENAI_API_KEY,
} from "$env/static/public";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import ChatInput from "./components/chat/ChatInput.svelte";
const maxTokens = 2000;

// class TruncateChatHistoryMemory extends ConversationSummaryMemory {
//   /**
//    * @param {{ chat_history: string[] }} inputs
//    */
//   transform_input(inputs) {
//     const chatHistory = inputs?.chat_history || [];
//     const truncatedChatHistory = this.truncateTokens(chatHistory);
//     inputs.chat_history = truncatedChatHistory;
//     return inputs;
//   }

//   /**
//    * @param {any[]} chatHistory
//    */
//   truncateTokens(chatHistory) {
//     let totalTokens = chatHistory.reduce(
//       (/** @type {any} */ count, /** @type {string | any[]} */ msg) =>
//         count + msg.length,
//       0
//     );
//     if (totalTokens > maxTokens) {
//       let truncatedChatHistory = [];
//       let tokenCount = 0;
//       for (let i = chatHistory.length - 1; i >= 0; i--) {
//         const msg = chatHistory[i];
//         if (tokenCount + msg.length <= maxTokens) {
//           truncatedChatHistory.unshift(msg);
//           tokenCount += msg.length;
//         } else {
//           const remainingTokens = maxTokens - tokenCount;
//           const truncatedMsg = msg.slice(0, remainingTokens);
//           truncatedChatHistory.unshift(truncatedMsg);
//           break;
//         }
//       }
//       return truncatedChatHistory;
//     } else {
//       return chatHistory;
//     }
//   }
// }

/**
 * @param {any} huggingfacehubApiToken
 * @param {{ asRetriever: () => any; }} vectorStore
 * @param {any} model
 * @param {any} temperature
 */
export async function chatWithDoc(
  huggingfacehubApiToken,
  vectorStore,
  model,
  temperature,
  question
) {
  // Return the user ID or null if the user is not authenticated
  if (question === undefined || question === null || question === "") {
    return "Please enter a question";
  } else {
    console.log("question is actually ", question);
    const llm = new HuggingFaceInference({
      apiKey: huggingfacehubApiToken,
      // temperature: 0.2,
      // model: "stabilityai/StableBeluga2",
      model: "tiiuae/falcon-7b-instruct",
      maxTokens: 5000,
    });

    const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    let embeddings = new OpenAIEmbeddings({ openAIApiKey });
    const aimodel = new OpenAI({
      temperature: 1,
      openAIApiKey,
      maxTokens: 1000,
    });
    // const chain = loadQARefineChain(aimodel);
    // let embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    // });
    const user = await client.auth.getUser();
    let vector = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
    });

    // const relevantDocs = await vector.similaritySearch(
    //   question,
    //   1
    //   // {
    //   // user_id: user.data.user.id,
    //   // }
    // );

    // console.log(relevantDocs.length);

    // try {
    //   let { data: documents, error } = await client
    //     .from("documents")
    //     .select("content");
    //   // Limit to one row

    //   if (error) {
    //     console.error("Error fetching data:", error.message);
    //   }

    //   if (documents.length === 0) {
    //     console.log("No data found in the table.");
    //   }

    //   // Assuming 'content' is of type 'text', you can access the value like this:
    //   const contentValue = documents[0].content;
    //   console.log("contentValue", contentValue);
    // } catch (error) {
    //   console.error("Error fetching data:", error.message);
    // }

    //const stuffChain = loadQAStuffChain(llm);
    // console.log("relevantDocs", relevantDocs);
    // const result = await chain.call({
    //   input_documents: relevantDocs,
    //   question: question,
    // });

    const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Answer this question, always give it a go do not say you don't know: {question}`;

    const qa = ConversationalRetrievalQAChain.fromLLM(
      aimodel,
      vectorStore.asRetriever(),
      {
        returnSourceDocuments: true,
        questionGeneratorChainOptions: {
          template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
        },
      }
    );
    let vectordbkwargs = { search_distance: 0.9 };
    const result = await qa.call({
      question: question,
      chat_history: [],
      vector_db_kwargs: vectordbkwargs,
    });
    console.log("result", result);
    //console.log("result['source_documents']", result["source_documents"]);
    console.log(result.text);
    return result.text;
  }
}
