import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORTA_APP = process.env.PORT || 8080; // Usa a variável de ambiente ou 8080

// Middleware
app.use(cors());

// Serve os arquivos estáticos da sua aplicação React
app.use(express.static(path.join(process.cwd(), 'dist'))); // Corrigido para usar a pasta correta

// Rota para todas as requisições não tratadas
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html')); // Corrigido para usar a pasta correta
});

// Iniciar o servidor
app.listen(PORTA_APP, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA_APP}`);
});
