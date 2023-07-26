import { writable } from "svelte/store";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
// import { OpenAI } from "langchain/llms";
import { HuggingFaceInference } from "langchain/llms/hf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { loadQAStuffChain } from "langchain/chains";
import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
  PUBLIC_HUGGINGFACE_API_KEY,
} from "$env/static/public";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
const maxTokens = 2000;

class TruncateChatHistoryMemory extends ConversationSummaryMemory {
  /**
   * @param {{ chat_history: string[] }} inputs
   */
  transform_input(inputs) {
    const chatHistory = inputs?.chat_history || [];
    const truncatedChatHistory = this.truncateTokens(chatHistory);
    inputs.chat_history = truncatedChatHistory;
    return inputs;
  }

  /**
   * @param {any[]} chatHistory
   */
  truncateTokens(chatHistory) {
    let totalTokens = chatHistory.reduce(
      (/** @type {any} */ count, /** @type {string | any[]} */ msg) =>
        count + msg.length,
      0
    );
    if (totalTokens > maxTokens) {
      let truncatedChatHistory = [];
      let tokenCount = 0;
      for (let i = chatHistory.length - 1; i >= 0; i--) {
        const msg = chatHistory[i];
        if (tokenCount + msg.length <= maxTokens) {
          truncatedChatHistory.unshift(msg);
          tokenCount += msg.length;
        } else {
          const remainingTokens = maxTokens - tokenCount;
          const truncatedMsg = msg.slice(0, remainingTokens);
          truncatedChatHistory.unshift(truncatedMsg);
          break;
        }
      }
      return truncatedChatHistory;
    } else {
      return chatHistory;
    }
  }
}

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
  const questionValue = question;
  console.log("model", model);

  const llm = new HuggingFaceInference({
    apiKey: huggingfacehubApiToken,
    model: "tiiuae/falcon-7b-instruct",
    maxTokens: 5000,
  });

  const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  // const openAIApiKey = PUBLIC_OPENAI_API_KEY;
  // let embeddings = new OpenAIEmbeddings({ openAIApiKey });
  let embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: PUBLIC_HUGGINGFACE_API_KEY,
  });
  let vector = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  const relevantDocs = await vector.similaritySearch(questionValue);

  console.log(relevantDocs.length);
  console.log(relevantDocs);

  try {
    let { data: documents, error } = await client
      .from("documents")
      .select("content");
    // Limit to one row

    if (error) {
      console.error("Error fetching data:", error.message);
    }

    if (documents.length === 0) {
      console.log("No data found in the table.");
    }

    // Assuming 'content' is of type 'text', you can access the value like this:
    const contentValue = documents[0].content;
    console.log("contentValue", contentValue);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  const stuffChain = loadQAStuffChain(llm);
  console.log("relevantDocs", relevantDocs);
  const result = await stuffChain.call({
    input_documents: relevantDocs,
    question: questionValue,
  });

  // const qa = ConversationalRetrievalQAChain.fromLLM(
  //   llm,
  //   vectorStore.asRetriever(),
  //   { returnSourceDocuments: true }
  // );
  // const result = await qa.call({
  //   question: questionValue,
  //   chat_history: [],
  // });
  console.log("result", result);
  console.log(result.text);
  return result.text;
}
