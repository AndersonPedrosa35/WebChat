// DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}
// exemplo 09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParse.json());

const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: `http://127.0.0.1:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

function Hours() {
  const data = new Date();
  const date = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`;
  const hourAndMinute = `${data.getHours()}:${data.getMinutes()}`;
  return `${date} ${hourAndMinute}`;
}

app.set('view engine', 'ejs');
app.set('views', './views');

let users = [];

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => '');
  socket.on('nickname', ({ newName, lastName }) => {
    users = [newName, ...users];
    if (lastName || lastName !== '') {
      const indexUser = users.indexOf(lastName);
      users.slice(indexUser, 1);
    }
    io.emit('nickname', users);
  });
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

http.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});