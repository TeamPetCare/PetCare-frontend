import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORTA_APP = process.env.PORT || 3000; 

// Middleware
app.use(cors());

// Serve os arquivos estáticos da aplicação React
app.use(express.static(path.join(process.cwd(), 'dist'))); 

// Rota para todas as requisições não tratadas
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html')); 
});

// Iniciar o servidor
app.listen(PORTA_APP, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA_APP}`);
});
