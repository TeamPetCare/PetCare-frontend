<h1 align="center">🐾 Petcare Frontend</h1>

<p align="center">
  Interface web do sistema <strong>Petcare</strong>, desenvolvido para a disciplina de <strong>Pesquisa e Inovação</strong> da <strong>São Paulo Tech School</strong>. <br>
  A aplicação facilita o agendamento de serviços para pets, incluindo cadastro de clientes, pets e pagamentos.
</p>

<hr>

<h2>📌 Aviso Importante</h2>
<p>
  Esta aplicação <strong>precisa do backend rodando</strong> para funcionar corretamente.
</p>
<p>
  Você também deve editar a base da URL da API antes de executar ou fazer o deploy. Para isso:
</p>
<ul>
  <li>Acesse o arquivo: <code>src/services/api.js</code></li>
  <li>Altere o valor de <code>baseURL</code> para o endereço da sua API backend (exemplo: <code>http://localhost:3001</code> ou a URL do seu servidor)</li>
</ul>

<hr>

<h2>📋 Descrição</h2>
<p>
  O <strong>Petcare Frontend</strong> é uma aplicação feita com <strong>JavaScript, React, HTML, CSS e Vite</strong>. Ela fornece a interface visual para os usuários interagirem com o sistema de petshop.
</p>

<h3>Funcionalidades principais:</h3>
<ul>
  <li>Cadastro de clientes e pets</li>
  <li>Agendamento de serviços</li>
  <li>Login com autenticação e proteção de rotas</li>
  <li>Pagamento via PIX</li>
</ul>

<hr>

<h2>🚀 Como rodar a aplicação localmente (passo a passo para leigos)</h2>

<h3>1. Instale o Node.js</h3>
<p>
  Acesse o site <a href="https://nodejs.org" target="_blank">https://nodejs.org</a> e baixe a versão recomendada para o seu sistema.
</p>
<p>
  Após instalar, verifique se deu certo:
</p>
<code>node -v</code>

<h3>2. Baixe o projeto</h3>
<p>Abra o terminal e rode:</p>
<code>git clone https://github.com/seuusuario/repositorio.git</code>

<h3>3. Entre na pasta do projeto</h3>
<code>cd repositorio</code>

<h3>4. Instale as dependências</h3>
<code>npm install</code>

<h3>5. Edite a URL da API</h3>
<p>Abra o arquivo <code>src/services/api.js</code> e edite a baseURL com o endereço do backend:</p>
<pre>
baseURL: "http://localhost:3001" // ou o endereço onde o backend está hospedado
</pre>

<h3>6. Rode a aplicação</h3>
<code>npm run dev</code>
<p>Abra seu navegador em <a href="http://localhost:5173">http://localhost:5173</a> ou conforme o terminal indicar.</p>

<hr>

<h2>🔐 Sistema de Login</h2>

<h3>1. Tela de Login</h3>
<p>Na tela inicial, clique no botão no canto superior direito para acessar o login.</p>
<ul>
  <li><strong>E-mail:</strong> Digite um e-mail válido.</li>
  <li><strong>Senha:</strong> Digite a senha cadastrada.</li>
</ul>

<h3>2. Validação</h3>
<p>Se houver erro, será exibida uma mensagem. Se os dados estiverem corretos, você será redirecionado para a área protegida.</p>

<h3>3. Sessão</h3>
<p>Ao logar, a aplicação guarda um token no navegador, garantindo que você continue autenticado.</p>

<hr>

<h2>📦 Como fazer o Deploy</h2>

<h3>1. Gere a versão final da aplicação</h3>
<p>Com tudo pronto e funcionando localmente, execute:</p>
<code>npm run build</code>
<p>Isso criará a pasta <code>dist</code> com os arquivos prontos para publicação.</p>

<h3>2. Hospede sua aplicação</h3>
<p>Você pode usar serviços gratuitos como:</p>
<ul>
  <li><a href="https://vercel.com" target="_blank">Vercel</a></li>
  <li><a href="https://netlify.com" target="_blank">Netlify</a></li>
  <li><a href="https://pages.github.com" target="_blank">GitHub Pages</a> (para projetos simples)</li>
</ul>

<h4>Exemplo com Vercel (fácil para iniciantes)</h4>
<ol>
  <li>Acesse <a href="https://vercel.com" target="_blank">https://vercel.com</a> e crie uma conta (pode usar GitHub).</li>
  <li>Importe seu repositório do GitHub.</li>
  <li>Configure o build como:
    <ul>
      <li>Framework: Vite</li>
      <li>Comando de build: <code>npm run build</code></li>
      <li>Diretório de saída: <code>dist</code></li>
    </ul>
  </li>
  <li>Pronto! Sua aplicação estará online.</li>
</ol>

<p><strong>⚠️ Não esqueça:</strong> Certifique-se de que o backend esteja disponível publicamente ou localmente, e que o arquivo <code>src/services/api.js</code> aponte corretamente para ele.</p>

<hr>

<h2>🛠️ Padrões de Commit</h2>

<h3>Formato:</h3>
<code>&lt;tipo&gt;(escopo): &lt;mensagem&gt;</code>

<h3>Tipos comuns:</h3>
<ul>
  <li><strong>feat</strong>: nova funcionalidade</li>
  <li><strong>fix</strong>: correção de bugs</li>
  <li><strong>docs</strong>: documentação</li>
  <li><strong>style</strong>: formatação/código</li>
  <li><strong>refactor</strong>: melhorias sem mudar comportamento</li>
  <li><strong>test</strong>: testes</li>
  <li><strong>chore</strong>: tarefas administrativas</li>
</ul>

<h3>Exemplos:</h3>
<ul>
  <li><code>feat: adicionar tela de agendamento</code></li>
  <li><code>fix: corrigir autenticação de login</code></li>
  <li><code>docs: atualizar README</code></li>
</ul>
