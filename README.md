## Obs: Repo criado com o objetivo de experimentação e estudo das APIs do OpenAI.

## Fontes:

- Curso LangChain for LLM Application Development: [DeepLearning.AI](https://learn.deeplearning.ai/)
- [Docs Langchain](https://js.langchain.com/docs/get_started/introduction)

# [LangChain](https://python.langchain.com/docs/get_started/introduction)

É um framework para desenvolvimento de aplicações baseadas em modelos de linguagem. Neste exemplo é usado para analise de sentimentos com base em texto.

# Configuração do Modelo OpenAI

- Um objeto `chat` é criado a partir da classe `ChatOpenAI`, configurado com a chave de API da OpenAI (`openAIApiKey`), temperatura (`temperature`) configurada como 0 para obter respostas determinísticas, nome do modelo (`modelName`) definido como "gpt-3.5-turbo".

# Análise de Sentimento

Este código em Javascript utiliza a biblioteca `langchain` para criar uma aplicação de processamento de linguagem natural (NLP) que interage com o modelo de linguagem (LLM) GPT-3.5-turbo da OpenAI. A aplicação realiza as seguintes etapas:

1. **Importação de Módulos:**

   - `createTaggingChain` é uma função fornecida pela biblioteca `langchain/chains` para criar uma cadeia de processamento de texto.
   - `schema` é importado de um arquivo JSON local chamado `schema.json` e representa o schema para que o modelo entenda qual deve ser o formato do output.

2. **Função Principal (`app`):**

   Um texto em português é definido como exemplo para processamento: "Eu deveria estar muito irritado porque está muito tarde, mas meu sentimento é justamente o oposto!".
   Uma cadeia de processamento (`chain`) é criada usando o esquema definido em `schema` e o modelo de chat configurado anteriormente.
   A função `run` da cadeia é chamada com o texto, resultando em uma interação com o modelo de linguagem GPT-3.5-turbo.
   O resultado da interação é impresso no console, incluindo a resposta gerada pelo modelo (`chatModelResult`) e o custo estimado em dólares (`price`).

3. **Callback de Custo:**
   O callback `handleLLMEnd` é acionado ao final da geração do texto pelo LLM. Ele registra o número total de tokens utilizados e calcula o custo em dólares com base na taxa de 0.002 dólares por mil tokens.

# Output Parsers

O código analisa mensagens de clientes relacionadas a avaliações de produtos. Vamos entender as principais partes do código:

1.  **Dependências Importadas:**

    - `ChatPromptTemplate`: Uma classe que representa um modelo de prompt para interações de chat.
    - `StructuredOutputParser`: Uma classe que ajuda a analisar e estruturar a saída da interação de chat.
    - `z`: Uma biblioteca para validação de esquemas de objetos. Aqui, é utilizada para definir o esquema da estrutura desejada para analisar as mensagens do cliente.

2.  **Função Principal (`app`):**

    Dentro da função, é definido um esquema (`schema`) utilizando o Zod para especificar a estrutura desejada das informações a serem extraídas das mensagens do cliente. As informações incluem se o item foi comprado como presente, quantos dias demorou para o produto chegar e quais foram as informações sobre preço ou valor.
    Em seguida, é criado um parser de saída estruturada (`output_parser`) com base no esquema definido utilizando a classe `StructuredOutputParser`. O código então prepara um template de prompt (`prompt_template`) para extrair as informações específicas das mensagens do cliente usando o formato instrucional do parser.
    Um exemplo de avaliação do cliente (`customer_review`) é fornecido como entrada para o template, que é formatado conforme as instruções do template.
    A aplicação então chama a função `call` do objeto `chat` para obter a resposta do modelo de linguagem.
    Finalmente, a resposta é parseada utilizando o `output_parser` e o resultado é exibido no console.
