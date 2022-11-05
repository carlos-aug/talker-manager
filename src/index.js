const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const talker = path.resolve(__dirname, './talker.json');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const palestrantes = await fs.readFile(talker, 'utf-8');
  const result = palestrantes ? JSON.parse(palestrantes) : [];
  return res.status(HTTP_OK_STATUS).json(result); 
});

// app.get('/talker/:id', async (_req, res) => {
  
// });  

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;