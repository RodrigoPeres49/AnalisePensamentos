const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // <-- Faltava importar isso
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ENDPOINT PARA LER USUÁRIOS
app.get('/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'usuarios.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler arquivo');
            return;
        }
        res.send(JSON.parse(data));
    });
});

// ENDPOINT PARA REGISTRAR NOVO USUÁRIO
app.post('/users', (req, res) => {
    const novoUsuario = req.body;

    const arquivoUsuarios = path.join(__dirname, 'usuarios.json');

    fs.readFile(arquivoUsuarios, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler arquivo');
            return;
        }

        let usuarios = [];

        try {
            usuarios = JSON.parse(data);
        } catch (e) {
            // Se o JSON estiver vazio ou mal formado
            usuarios = [];
        }

        usuarios.push(novoUsuario);

        fs.writeFile(arquivoUsuarios, JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                res.status(500).send('Erro ao salvar usuário');
                return;
            }
            res.status(201).send('Usuário registrado com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


