// Importa o framework Express para gerenciar o servidor web
import express from "express";

// Importa o Multer para manipulação de uploads de arquivos
import multer from "multer";

// Importa funções do controlador para gerenciar as rotas
import { listarPosts, postar, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Importa o middleware CORS para controle de acesso por origem
import cors from "cors";

// Configuração das opções do CORS
// - Permite apenas requisições vindas de http://localhost:8000
// - Define o status de sucesso padrão como 200 para requisições pré-flight (OPTIONS)
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Configuração de armazenamento para o Multer
// - Define onde os arquivos serão salvos e seus nomes
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão salvos
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo com o nome original
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
    // Middleware global para processar JSON no corpo das requisições
    app.use(express.json());

    // Middleware global para habilitar CORS com as opções configuradas
    app.use(cors(corsOptions));

    // Rota GET /posts
    // - Chama a função listarPosts para obter uma lista de posts
    app.get("/posts", listarPosts);

    // Rota POST /posts
    // - Chama a função postar para criar um novo post
    app.post("/posts", postar);

    // Rota POST /upload
    // - Processa o upload de um único arquivo chamado "imagem"
    // - Depois chama a função uploadImagem para salvar ou manipular o arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota PUT /upload/:id
    // - Atualiza o post identificado pelo parâmetro :id
    // - Chama a função atualizarNovoPost
    app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para ser usada no arquivo principal da aplicação
export default routes;
