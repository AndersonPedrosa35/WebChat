const socket = window.io();
      
const formName = document.getElementById('formName');
const formMessage = document.getElementById('formMessage');
const message = document.getElementById('message');
const nickname = document.getElementById('nickname');
const ulUsersName = document.getElementById('users-on');

const randomNickName = Math.random().toString(16);

const liUsers = document.createElement('li');
liUsers.setAttribute('data-testid', 'online-user');
liUsers.innerText = randomNickName;
ulUsersName.appendChild(liUsers);

formName.addEventListener('submit', (e) => {
  if (nickname.value) {
    socket.emit('nickname', { nickname: nickname.value });
  }
});

formMessage.addEventListener('submit', (e) => {
  if (message.value) {
    socket.emit('message', { nickname: nickname.value, chatMessage: message.value });
    message.value = '';
    nickname.value = '';
  }
});