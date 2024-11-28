// Importa o framework Express para criar o servidor
import express from "express";
// Importa o Multer para gerenciar uploads de arquivos
import multer from "multer";
// Importa as funções controladoras para gerenciar posts
import { listarPosts, postar, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configuração do armazenamento para uploads com Multer
const storage = multer.diskStorage({
    // Define o destino dos arquivos enviados
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo como o original enviado
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com configurações de destino e armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
    // Permite que o servidor receba dados no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postar);
    // Rota para fazer upload de uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta as rotas para serem usadas em outros arquivos
export default routes;
