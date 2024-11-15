import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORTA_APP = process.env.PORT || 3000;

// Middleware para permitir o CORS
app.use(cors());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(process.cwd(), 'aplicacao-petcare/dist')));

// Redirecionamento para `index.html` em rotas não reconhecidas
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'aplicacao-petcare/dist', 'index.html'));
});

// Inicialização do servidor
app.listen(PORTA_APP, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA_APP}`);
});
