// Importa funções do modelo para interagir com os dados dos posts
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
// Importa o módulo do sistema de arquivos (fs) para manipular arquivos
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função para buscar todos os posts no banco de dados
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function postar(req, res) {
    // Obtém o conteúdo do novo post do corpo da requisição
    const novoPost = req.body;
    try {
        // Chama a função para criar o post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Exibe o erro no console em caso de falha
        console.error(erro.message);
        // Envia uma resposta de erro com status 500 (erro interno do servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função para realizar o upload de uma imagem e criar um post associado
export async function uploadImagem(req, res) {
    // Cria um objeto de post inicial com a URL da imagem enviada
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Chama a função para criar o post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Define o novo nome do arquivo de imagem com base no ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo enviado para corresponder ao novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Exibe o erro no console em caso de falha
        console.error(erro.message);
        // Envia uma resposta de erro com status 500 (erro interno do servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função para criar um novo post
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}
