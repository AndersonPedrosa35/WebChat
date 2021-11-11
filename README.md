# Boas vindas ao repositório do projeto WebChat!

O projeto WebChat foi feito com a intenção de práticar os conhecimentos de Socket.io, sempre fiquei curioso para saber o que acontecia ao entrar no whatsapp e ver as pessoas mandando mensagem simultaneamente, então fiz esse projeto, se trata de um WebChat em tempo real, fique a vontade para testar.
# Sumário

- [Habilidades](#habilidades)
- [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
  - [Data de entrega](#data-de-entrega)
- [Instruções para entregar seu projeto](#instruções-para-entregar-seu-projeto)
  - [Antes de começar a desenvolver](#-antes-de-começar-a-desenvolver)
  - [Durante o desenvolvimento](#durante-o-desenvolvimento)
- [Como desenvolver](#como-desenvolver)
  - [Linter (Análise Estática)](#linter-análise-estática)
  - [Variáveis](#variáveis)
  - [Conexão com o banco](#conexão-com-o-banco)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Lista de Requisitos](#lista-de-requisitos)
    `Requisitos Obrigatórios`
    - [1 - Crie um back-end para conexão simultaneamente de clientes e troca de mensagens em chat público](#1---crie-um-back-end-para-conexão-simultânea-de-clientes-e-troca-de-mensagens-em-chat-público)
    - [2 - Crie um frontend para que as pessoas interajam com o chat](#2---crie-um-frontend-para-que-as-pessoas-interajam-com-o-chat)
    - [3 - Elabore o histórico do chat para que as mensagens persistam](#3---elabore-o-histórico-do-chat-para-que-as-mensagens-persistam)
    - [4 - Informe a todos os clientes quem está online no momento](#4---informe-a-todos-os-clientes-quem-está-online-no-momento)
- [Depois de terminar o desenvolvimento (opcional)](#depois-de-terminar-o-desenvolvimento-opcional)
- [Revisando um pull request](#revisando-um-pull-request)
- [Avisos Finais](#avisos-finais)

---

# Habilidades

- Desenvolver um server socket usando o socket.io;

- Emitir eventos personalizados usando o socket.io;

- Usar o pacote `socket.io` do Node.js para criar aplicações que trafeguem mensagens através de sockets.


## O que foi desenvolvido
  Desenvolvido um chat capaz de:

 - Usar um front-end para enviar mensagens a clientes conectados;
 - Visualizar o histórico de mensagens da conversa;
 - Visualizar os usuários online no momento;
 - Alterar o nome de usuário no chat em tempo real;

## Durante o desenvolvimento

## Linter (Análise Estática)

Para garantir a qualidade do código, usamos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `WebChat/package.json`

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### Como utilizar
Entre no terminal, e vá até o diretório que vc quer que esteja este projeto, digite git clone e a url desse repositório (https://github.com/AndersonPedrosa35/WebChat), assim que carregar, entre no diretório do projeto e digite ```npm install``` para baixar e carregar as dependências do projeto.

Crie um arquivo .env para configurar as variáveis de ambiente, tenha como base o .env.example para criação das variáveis, assim que criado, basta colocar os seus dados, exemplo DB_URL coloque a sua rede local (localhost), DB_NAME coloque o nome do banco que ficará no MongoDB que vai ser armazenado as mensagens, e PORT será a porta que será executada a aplicação.

Entre no diretório do projeto, e digite ```yarn start``` ou ```npm start```

Então o projeto será carregado na porta que você especificou no .env da sua rede local(localhost);

