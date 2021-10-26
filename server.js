// DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}
// exemplo 09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParse.json());

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
  },
});

const { PORT } = process.env;

app.set('view engine', 'ejs');
app.set('views', './views');

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`${nickname} : ${chatMessage}`);
  });
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/', (_req, res, _next) => {
  res.render('index.ejs');
});

http.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});