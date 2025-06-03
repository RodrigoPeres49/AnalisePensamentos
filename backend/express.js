const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataDir = path.join(__dirname, 'data');
const thoughtsFile = path.join(dataDir, 'pensamentos.json');

// Garante que o arquivo de pensamentos existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(thoughtsFile)) {
  fs.writeFileSync(thoughtsFile, '[]', 'utf8');
}

// ENDPOINT PARA LER USUÁRIOS
app.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'usuarios.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler arquivo');
    }
    res.send(JSON.parse(data));
  });
});

// ENDPOINT PARA REGISTRAR NOVO USUÁRIO
app.post('/users', (req, res) => {
  const novoUsuario = req.body;
  const arquivoUsuarios = path.join(__dirname, 'usuarios.json');

  fs.readFile(arquivoUsuarios, 'utf-8', (err, data) => {
    let usuarios = [];
    if (!err) {
      try {
        usuarios = JSON.parse(data);
      } catch (e) {
        usuarios = [];
      }
    }

    const usuarioExistente = usuarios.find(u => u.usuario.toLowerCase() === novoUsuario.usuario.toLowerCase());
    if (usuarioExistente) {
      return res.status(409).send('Nome de usuário já existe. Por favor, escolha outro.');
    }

    const novoId = usuarios.length > 0
      ? Math.max(...usuarios.map(u => u.id || 0)) + 1
      : 1;

    const usuarioComId = { id: novoId, ...novoUsuario };
    usuarios.push(usuarioComId);

    fs.writeFile(arquivoUsuarios, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Erro ao salvar usuário');
      }
      res.status(201).json(usuarioComId);
    });
  });
});

// ENDPOINT PARA LER TODOS OS PENSAMENTOS
app.get('/thoughts', (req, res) => {
  fs.readFile(thoughtsFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o arquivo de pensamentos.' });
    }
    const thoughts = JSON.parse(data);
    res.json(thoughts);
  });
});

// ENDPOINT PARA REGISTRAR UM PENSAMENTO
app.post('/thought', (req, res) => {
  console.log('Dados recebidos:', req.body);

  const { userId, triggers, worry, duration, discomfort, type, coping, datetime } = req.body;

  if (!userId || !triggers || !worry || !duration || !discomfort || !type || !coping || !datetime) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  fs.readFile(thoughtsFile, 'utf-8', (err, data) => {
    let thoughts = [];
    if (!err) {
      try {
        thoughts = JSON.parse(data);
      } catch (e) {
        thoughts = [];
      }
    }

    const newId = thoughts.length > 0 ? Math.max(...thoughts.map(t => t.id || 0)) + 1 : 1;

    const novoPensamento = {
      id: newId,
      userId,
      triggers,
      worry,
      duration,
      discomfort,
      type,
      coping,
      datetime,
      dateSaved: new Date().toISOString(),
    };

    thoughts.push(novoPensamento);

    fs.writeFile(thoughtsFile, JSON.stringify(thoughts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Falha ao salvar o pensamento');
      }
      res.status(201).send('Pensamento registrado com sucesso!');
    });
  });
});

// ENDPOINT PARA LISTAR PENSAMENTOS DE UM USUÁRIO
app.get('/thoughts/:userId', (req, res) => {
  const userId = req.params.userId;

  fs.readFile(thoughtsFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o arquivo de pensamentos.' });
    }
    const thoughts = JSON.parse(data);
    const filteredThoughts = thoughts.filter(t => t.userId == userId);
    res.json(filteredThoughts);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


