// DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}
// exemplo 09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!
require('dotenv').config();
const express = require('express');
const bodyParse = require('body-parser');

const app = express();
app.use(bodyParse.json());
const http = require('http').createServer(app);

const { PORT } = process.env;

app.use('view engine', 'ejs');
app.use('views', './views');

app.get('/', (req, res) => res.sendFile(`${__dirname}index.ejs`));

http.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});