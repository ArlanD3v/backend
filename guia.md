# GCloud
Executa um `gcloud run services list` pra listar o seu servidor.
Pega o nome do serviço e copia ele.

Ai roda `gcloud run services delete NOME_DO_SERVIÇO` ele vai ter perguntar a região, insere o numero (provavelmente 30) depois só ir dando y e enter.

Iniciar um novo serviço na porta 3000 (API)
`gcloud run deploy --source . --port=3000`

# POSTMAN 
# Local 
Criar novo post upando uma foto, utilizando POST e form-data
localhost:3000/upload

Atualizar dados com PUT e raw
localhost:3000/upload/{ID_Gerado no Upload}

    {
        "alt": "Digite aqui"
    }

# Produção
https://instabyte-back-677036739277.southamerica-east1.run.app/upload

https://instabyte-back-677036739277.southamerica-east1.run.app/upload/{ID_Gerado}