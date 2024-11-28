import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
    let mongoClient

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectado ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com Sucesso!');

        return mongoClient;
    } catch (erro) {
        console.log('Falha na conexão com o Banco!', erro)
        process.exit();
    }
}