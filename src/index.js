const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { generateToken,
  validateEmailAndPassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middlewares');

const talker = path.resolve(__dirname, './talker.json');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const dataTalker = await fs.readFile(talker, 'utf-8');
  const result = dataTalker ? JSON.parse(dataTalker) : [];
  return res.status(HTTP_OK_STATUS).json(result); 
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params; 
  const dataTalker = await fs.readFile(talker, 'utf-8');
  const result = JSON.parse(dataTalker);

  const findData = result.find((talkerId) => talkerId.id === Number(id));  
  if (!findData) { 
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(HTTP_OK_STATUS).json(findData); 
});  

app.post('/login', validateEmailAndPassword, async (_req, res) => {
  const crypto = generateToken();
  res.status(HTTP_OK_STATUS).json({ token: crypto });
});

app.post('/talker', validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate, async (req, res) => {
  const palestrante = req.body;
  const dataTalker = await fs.readFile(talker, 'utf-8');
  const result = JSON.parse(dataTalker);
  const index = result[result.length - 1].id + 1;
  const newObjPalestrante = { id: index, ...palestrante };
  const dataTalkerAndPalestrante = [...result, newObjPalestrante];
  await fs.writeFile(talker, JSON.stringify(dataTalkerAndPalestrante));
  res.status(201).json(newObjPalestrante);
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;