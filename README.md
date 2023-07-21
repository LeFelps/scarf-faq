## Setup do projeto (frontend)

Apos clonar ou baixar o repositorio, execute os seguintes passos no prompt de comando no pasta root do projeto

### Instalação

```bash
# instalação de dependências
yarn
#ou
npm install
```

### Rodando o projeto

```bash
# script para rodar o projeto em desenvolvimento 
yarn dev
#ou
npm run dev

# script para fazer o build e rodar o projeto
yarn build && yarn start
#ou
npm run dev && npm run start

```

Após executado, o projeto será acessivel em [http://localhost:3000](http://localhost:3000).

***IMPORTANTE*** <br/> 
O projeto requer que a api esteja rodando para funcionar corretamente. Siga os passos do backend.

## Backend

O backend desse projeto está separado em [outro repositorio](https://github.com/LeFelps/scarf-faq-backend). <br/>
É necessário rodar os dois projetos simultaneamente.
