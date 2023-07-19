import { writable } from "svelte/store";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
// import { OpenAI } from "langchain/llms";
import { HuggingFaceInference } from "langchain/llms/hf";

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

  const llm = new HuggingFaceInference({
    apiKey: huggingfacehubApiToken,
    model: "tiiuae/falcon-7b-instruct",
    maxTokens: 5000,
  });

  const qa = ConversationalRetrievalQAChain.fromLLM(
    llm,
    vectorStore.asRetriever(),
    { returnSourceDocuments: true }
  );
  const result = await qa.call({
    question: questionValue,
    chat_history: [],
  });
  console.log("result", result);
  console.log(result.text);
}
