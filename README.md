# Demonstração do Projeto

[![Alt text](https://img.youtube.com/vi/lXk14qt2D28/0.jpg)](https://www.youtube.com/watch?v=lXk14qt2D28)

## Introdução

Estas instruções vão te ajudar a configurar e executar o projeto em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Ter o NPM / Yarn e o Node.js instalados.

### Arquivo .env

No diretório `server > .env`, você encontrará algumas informações. Use sua própria chave de API, pois a chave fornecida pode não funcionar futuramente.

```
BRAINTREE_MERCHANT_ID=seu_id
BRAINTREE_PUBLIC_KEY=sua_chave_publica
BRAINTREE_PRIVATE_KEY=sua_chave_privada
```

### Instalação

Instale os módulos NPM nos diretórios `client` e `server` executando os seguintes comandos no diretório do projeto:

```
cd client && npm install
```

```
cd server && npm install
```

### Executando a aplicação

Abra um terminal no diretório `server` e execute:

```
npm run start:dev
```

Depois, abra outro terminal no diretório `client` e execute:

```
npm run start
```

Acesse o aplicativo no navegador pelo link: http://localhost:3000/

### Implantando o servidor backend no Render

Siga estes passos 👇👇

1. Crie uma conta no Render em https://render.com/
2. Conecte seu GitHub ao Render e conceda permissão ao projeto.
3. Crie um novo Web Service e adicione seu repositório (ele deve ter a mesma estrutura de pastas deste projeto, contendo `frontend` e `backend`).
4. Para a implantação, todas as mudanças devem ser feitas na branch `render-deploy-backend`. Não altere o `.env` da branch `master`.
5. Altere a conexão do banco de dados de local para o MongoDB Atlas. O link do seu banco de dados na nuvem deve ter um formato semelhante a:

   ```
   DATABASE=mongodb+srv://usuario:senha_do_cluster@meucluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

   Edite o arquivo `.env` na branch `render-deploy-backend` e substitua a linha antiga:
   
   ```
   DATABASE=mongodb://127.0.0.1:27017/ecommerce
   ```
   
   por:
   
   ```
   DATABASE=mongodb+srv://usuario:senha_do_cluster@meucluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
   
   **Importante**: Não copie o exemplo acima diretamente! Use as credenciais do seu cluster no MongoDB Atlas. Para obter a URL correta, acesse o site do MongoDB Atlas, abra seu banco de dados e clique no botão "Conectar" para copiar a URL correta.
   
6. No site do Render, forneça todas as informações necessárias e altere o nome da branch de `master` para `render-deploy-backend`.
7. Configuração do Render:
   
   ![Configuração do Render](assetREADME.md/renderDeployBackendSetup.png)

8. Após concluir todas as configurações, crie o Web Service e o projeto será implantado automaticamente.

Você pode implantar o frontend no Vercel ou Netlify. Obrigado!

`Construído com 💛 por Joaquim Mulaza`

