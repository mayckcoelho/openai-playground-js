require("dotenv").config();

const app = require("./langchain");

const text =
  "Eu deveria estar muito irritado por que está muito tarde, mas meu sentimento é justamente o oposto!";

app(text);
