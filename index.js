require("dotenv").config();

let app;

switch (process.env.TYPE) {
  case "sentment_analysis":
    app = require("./langchain/sentment_analysis");
    break;
  case "translator_prompt":
    app = require("./langchain/translator_prompt");
    break;
}

app();
