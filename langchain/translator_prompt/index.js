const { ChatOpenAI } = require("langchain/chat_models/openai");
const { ChatPromptTemplate } = require("langchain/prompts");

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.0,
  modelName: "gpt-3.5-turbo",
});

module.exports = async function app() {
  const template_string = `Translate the text that is delimited by <> 
into a style that is {style}. Text: <{text}>`;
  const prompt_template = ChatPromptTemplate.fromTemplate(template_string);

  console.log("prompt_template", prompt_template);

  const customer_style = "American English in a calm and respectful tone";

  const customer_email = `
Arrr, I be fuming that me blender lid 
flew off and splattered me kitchen walls 
with smoothie! And to make matters worse, 
the warranty don't cover the cost of 
cleaning up me kitchen. I need yer help 
right now, matey!`;

  const customer_messages = await prompt_template.formatMessages({
    style: customer_style,
    text: customer_email,
  });

  console.log("customer_messages", customer_messages);

  customer_response = await chat.call(customer_messages);

  console.log(customer_response);
};
