const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// INICIANDO APLICAÇÃO E DEFININDO A PORTA

const app = express();
const PORT = 5000;

// UTILIDADES

app.use(cors()); // CORS PARA PERMITIR REQUISOÇÕES DE OUTRAS ORIGENS
app.use(bodyParser.json()); // ANALISAR REQUISIÇÕES EM JSON
app.use(bodyParser.urlencoded()); // ANALISAR REQUISIÇÕES EM URL ENCODED


//ENDPOINTS

// ENDPOINT PARA PEGAR DADOS DE USUARIOS

app.get('/users', (req, res) =>{
    fs.readFile(path.join(__dirname,'usuarios.json'), 'utf-8', (err, data) =>{
        if(err){
            res.status(500).send('Erro ao ler arquivo');
            return;
        }
        res.send(JSON.parse(data)); // ENVIAR DADOS DE RESPOSTA
    })
})

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
})

