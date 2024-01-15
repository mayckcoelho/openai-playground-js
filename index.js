require("dotenv").config();

const { ChatOpenAI } = require("langchain/chat_models/openai");
const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.0,
  modelName: "gpt-3.5-turbo",
});

let app;

switch (process.env.TYPE) {
  case "sentment_analysis":
    app = require("./langchain/sentment_analysis");
    break;
  case "translator_prompt":
    app = require("./langchain/translator_prompt");
    break;
  case "output_parsers":
    app = require("./langchain/output_parsers");
}

app(chat);
