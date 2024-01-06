const { createTaggingChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const schema = require("./schema.json");

let price = 0;

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  callbacks: [
    {
      handleLLMEnd: (output) => {
        console.log("output", output);
        const { completionTokens, promptTokens, totalTokens } =
          output.llmOutput?.tokenUsage;
        price = (totalTokens * 0.002) / 1000;
      },
    },
  ],
});

module.exports = async function app() {
  const text =
    "Eu deveria estar muito irritado por que está muito tarde, mas meu sentimento é justamente o oposto!";

  const chain = createTaggingChain(schema, chat);

  const chatModelResult = await chain.run(text);
  console.log("chatModelResult", chatModelResult);
  console.log("cost (USD):", price);
};
