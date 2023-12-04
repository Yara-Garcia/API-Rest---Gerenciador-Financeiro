<h1> API REST - Gerenciador Financeiro 📊💰 </h1>

<p> Esse repositório demonstra os códigos desenvolvidos para finalização do Modulo 03 do curso de Desenvolvimento Back-End pela instituição Cubos Academy. Fomos desafiadas pela Cubos Academy a desenvolver um sistema de gerenciamento financeiro API REST com persistência de dados, criptogragia de senha e geração de token para os usuários logados no sistema 🤯🎯 </p>
<p>
<li> Desenvolvemos 11 rotas que buscam realizar operações básicas de um gerenciador financeiro; </li>
<li> Criamos três controladores (transações, categorias e usuários) para armazenamento dos códigos das rotas criadas. </li> 
<li> Criamos sete intermediários para a proteção das rotas criadas. </li> 
<li> As rotas possuem como tipo de resquisição req.body, req.params, req.headers e/ou req.params; </li>
<li> Todas rotas possuem a exibição de um status code adequado a resposta da requisição, seja do tipo bem-sucedida ou mal-sucedida; </li>
</p>
<p> 👩🏽‍💻✨Este projeto foi realizado em parceria com Tais Costa <a href = "https://github.com/taiscostaeng"> Acesse seu perfil </a> </p>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> 👩🏽‍🔧 Linguagens e Ferramentas </h2>
<li> JAVASCRIPT </li>
<li> NODEJS </li>
<li> PROTOCOLO HTTP </li>
<li> JSON </li>
<li> BIBLIOTECAS NODEMON E EXPRESS </li>
<li> BIBLIOTECA NODE-POSTGRES </li>
<li> BIBLIOTECA BCRYPT </li>
<li> BIBLIOTECA JWT </li>
<li> PostgreSQL e BEEKEEPER </li>
<li> INSOMNIA </li>
<li> VSCODE </li>
<li> GIT </li>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 01: Cadastrar um Usuário 👵🏽🧔🏽 </h2>
<div>
  <h3> POST /usuario </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/a9d538e9-13a8-4494-90b0-d492ee550d41">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Cria um novo usuário cujo número (ID) é único; </li>
<li> Para que seja possível o cadastro de um novo usuário, é necessário verificar se todos os campos foram informados (todos são obrigatórios);</li>
<li> Não é possível a criação de um novo usuário com o mesmo e-mail de usuário anteriormente cadastrado no sistema de banco de dados; </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 02: Realizar Login ✅👨🏽‍💻 </h2>
<div>
  <h3> POST /login </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/3c6d78d2-f343-499f-ae81-171c0bde17b4">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Realiza o login do usuário no sistema para que seja possível a realização de suas operações financeiras; </li>
<li> O usuário somente realiza login no sistema se o e-mail e senha informadas conferem com o cadastro do usuário;</li>
<li> Com o acesso do usuário ao sistema, é gerado um token de acesso. Este token é utilizado como req.headers para validação de acesso; </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 03: Detalhar usuário 🕵🏽‍♀️🧾 </h2>
<div>
  <h3> GET /usuario </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/f0135d5e-dc88-4c39-ade2-f9de4d0482ef">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Detalha as informações de um usuário; </li>
<li> Verifica se o usuário está com cadastro no sistema;</li>
<li> Token utilizado como req.headers para validação de acesso; </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 04: Atualizar usuário ✅🔄 </h2>
<div>
  <h3> PUT /usuario </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/c3a6e859-feca-4ba9-b929-4d2673e8fcbb">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Atualiza as informações de um usuário; </li>
<li> Não permite o uso de um e-mail utilizado por outro usuário cadastrado no banco de dados;</li>
<li> Token utilizado como req.headers para validação de acesso. </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 05: Listar categorias 🛒🍔 </h2>
<div>
  <h3> GET /categoria </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/eb454e99-481e-4353-848e-f7945f122ea8">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Lista todas categorias disponíveis para classificação das transações do usuário; </li>
<li> Token utilizado como req.headers para validação de acesso. </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 06: Cadastrar transação ✅🤑 </h2>
<div>
  <h3> POST /transacao </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/aeea8025-7e62-4ca9-8d35-f1d797b6b970">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Cria uma nova transação financeira cujo número (ID) é único; </li>
<li> Verifica se todos os campos foram informados (todos são obrigatórios); </li>
<li> Verifica se o ID da transação existe; </li>
<li> Verifica se o campo tipo possui escrita padronizada; </li>
<li> Token utilizado como req.headers para validação de acesso. </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 07: Listar transações ✅🧾 </h2>
<div>
    <h3> GET /transacao </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/cfbd0d30-f4a7-45a4-91bf-b403cd91c897">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Exibe todas transações financeiras do usuário; </li>
<li> Token utilizado como req.headers para validação de acesso. </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 08: Detalhar transação 🕵🏽‍♀️🧾 </h2>
<div>
  <h3> GET /transacao/:id </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/436610cb-7faa-4661-a0a9-550d8799bb47">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Detalha uma transação financeira do usuário logado; </li>
<li> Verifica se o ID da transação financeira existe; </li>
<li> Não permite o acesso a outras transações financeiras que não sejam do usuário logado; </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 09: Obter Extrato 🤑💲 </h2>
<div>
  <h3> GET /transacao/extrato </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/d0c8db7b-dbff-47be-aa94-5bf545647d32">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Exibe o extrato das transações financeiras o usuário (entradas e saidas); </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 10: Atualizar Transação 🔄💰 </h2>
<div>
  <h3> PUT /transacao/:id </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/04ba8f15-1aae-47dc-99df-dd38e8d8cf00">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Verifica a existência da transação pelo ID de transação; </li>
<li> Verifica o vinculo da transação com o usuário logado; </li>
<li> Verifica se todos os campos req.body foram totalmente preenchidos; </li>
<li> Verifica se a categoria informada existe; </li>
<li> Verifica se o campo tipo possui escrita padronizada; </li>
<li> Atualiza uma transação financeira do usuário. </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> Rota 11: Excluir Transação 🗑💰 </h2>
<div>
  <h3> DELETE /transacao/:id </h3>
  <img src = "https://github.com/taiscostaeng/sistema-gerenciador-financeiro-api-rest/assets/138815703/448fd394-a3e8-48ee-9bf0-2788f8cbb4d2">
</div>

<div>
<h3> O quê essa rota faz? 🤔 </h3>
<li> Verifica a existência da transação pelo ID de transação; </li>
<li> Verifica o vinculo da transação com o usuário logado; </li>
<li> Exclui a transação financeira. </li>
</div>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> ✨👩🏽‍💻 Como realizar a execução desse projeto? </h2>
<li> Primeiro, você precisa realizar o clone desse projeto; </li>
<li> Em seguida, você deve acessar a do projeto no terminal cd sistema-gerenciador-financeiro-api-rest </li>
<li> Instale as bibliotecas necessárias utilizando o comando npm i </li>
<li> Execute a aplicação em modo de desenvolvimento npm run dev </li>
<li> O servidor iniciará na porta 3000 - acesse http://localhost:3000 </li>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> ✨😊 Você quer contribuir com esse projeto? </h2>
<li> Primeiro, você precisa realizar o clone desse projeto; </li>
<li> Em seguida, você deve acessar a do projeto no terminal cd sistema-gerenciador-financeiro-api-rest </li>
<li> Instale as bibliotecas necessárias utilizando o comando npm i </li>
<li> Execute a aplicação em modo de desenvolvimento npm run dev </li>
<li> Depois, você pode realizar as alterações no código; </li>
<li> Por fim, você precisa realizar o Pull Request (PR) para esse repositório; </li>

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2> 🎖🏆 Funcionalidades do Projeto </h2>
Esse projeto foi desenvolvido para executar as funções básicas de um sistema de gerenciamento financeiro:
<ol>
  <li> Cadastrar Usuário </li>
  <li> Realizar Login </li>
  <li> Detalhar Usuário </li>
  <li> Atualizar Usuário </li>
  <li> Listar Categorias </li>
  <li> Cadastrar Transação </li>
  <li> Listar Transações </li>
  <li> Detalhar Transação </li>
  <li> Obter Extrato </li>
  <li> Atualizar Transação </li>
  <li> Excluir Transação </li>
</ol>
