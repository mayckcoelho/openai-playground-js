const { ChatPromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { z } = require("zod");

module.exports = async function app(chat) {
  const schema = z.object({
    gift: z.boolean().describe(`Was the item purchased
        as a gift for someone else? 
        Answer True if yes,
        False if not or unknown, as a Javascript Boolean`),
    delivery_days: z.number().describe(`How many days
        did it take for the product
        to arrive? If this 
        information is not found,
        output -1.`),
    price_value: z.array(z.string()).describe(`Extract any
        sentences about the value or 
        price, and output them as a 
        comma separated Javascript array.`),
  });

  const output_parser = StructuredOutputParser.fromZodSchema(schema);

  /* Tentei utilizar o `StructuredOutputParser.fromNamesAndDescriptions` mas tive problema de parser quando
       o parse não entendeu que o gift era um bolean e o prive_value era u array.
       Ele tentou interpretar tudo como string.
  const output_parser = StructuredOutputParser.fromNamesAndDescriptions({
    gift: `Was the item purchased
        as a gift for someone else? 
        Answer True if yes,
        False if not or unknown, as a Javascript Boolean`,
    delivery_days: `How many days
        did it take for the product
        to arrive? If this 
        information is not found,
        output -1.`,
    price_value: `Extract any
        sentences about the value or 
        price, and output them as a 
        comma separated Javascript array.`,
  });*/

  const format_instructions = output_parser.getFormatInstructions();
  const template_string = `For the following text, extract the following information:

  gift: Was the item purchased as a gift for someone else?
  Answer True if yes, False if not or unknown.
  
  delivery_days: How many days did it take for the product
  to arrive? If this information is not found, output -1.
  
  price_value: Extract any sentences about the value or price,
  and output them as a comma separated Python list.
  
  text: {text}
  
  {format_instructions}`;
  const prompt_template = ChatPromptTemplate.fromTemplate(template_string);

  const customer_review = `This leaf blower is pretty amazing.  It has four settings:
  candle blower, gentle breeze, windy city, and tornado. 
  It arrived in two days, just in time for my wife's 
  anniversary present. 
  I think my wife liked it so much she was speechless. 
  So far I've been the only one using it, and I've been 
  using it every other morning to clear the leaves on our lawn. 
  It's slightly more expensive than the other leaf blowers 
  out there, but I think it's worth it for the extra features.`;

  const customer_messages = await prompt_template.formatMessages({
    text: customer_review,
    format_instructions,
  });

  console.log("customer_messages", customer_messages);

  response = await chat.call(customer_messages);

  // A função parse é uma Promise
  console.log(await output_parser.parse(response.content));
};
