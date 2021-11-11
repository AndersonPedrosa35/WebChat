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
const messageController = require('./controllers/messageController');

function Hours() {
  const data = new Date();
  const date = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`;
  const hourAndMinute = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
  return `${date} ${hourAndMinute}`;
}

app.set('view engine', 'ejs');
app.set('views', './views');

let userAndId = [];

function socketNickname(socket, server) {
  socket.on('nickname', ({ newName, lastName }) => {
    if (lastName === '' || !lastName) {
      userAndId = [{ id: socket.id, name: newName }, ...userAndId];
    }
    const index = userAndId.findIndex((user) => user.name === lastName);
    if (index !== -1) {
      userAndId.splice(index, 1, { id: socket.id, name: newName });
      messageController.updateNickname(lastName, newName);
    } server.emit('nickname', userAndId);
  });
}

io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    messageController.createMessage({ message: chatMessage, nickname, timestamp: Hours() });
    const message = `${Hours()} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
  socketNickname(socket, io);
  socket.on('disconnect', () => {
    const index = userAndId.findIndex((user) => user.id === socket.id);
    userAndId.splice(index, 1);
    io.emit('nickname', userAndId);
  });
});

app.use(express.static(`${__dirname}/public`));

app.get('/', messageController.getAllMessages, async (req, res) => 
  res.render('index.ejs', { findMessages: req.messages }));
app.post('/');

http.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});