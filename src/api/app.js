const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const error = require('../middlewares/error');
const root = require('../controllers/root');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

root(app);

error(app);

module.exports = app;
