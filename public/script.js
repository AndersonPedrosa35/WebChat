const socket = window.io();
      
const formName = document.getElementsByClassName('formName')[0];
const formMessage = document.getElementsByClassName('formMessage')[0];
const message = document.getElementById('message');
const ulMessage = document.getElementById('ul-message');
const nickname = document.getElementById('nickname');
const ulUsersName = document.getElementById('users-on');

function randomNickName() {
  const randomNickname = Math.random().toString(16).substr(2, 8) 
  + Math.random().toString(16).substr(2, 8);
  return randomNickname;
}
function nicknameUser(nameUser) {
  const liUsers = document.createElement('li');
  liUsers.className = 'users';
  liUsers.setAttribute('data-testid', 'online-user');
  liUsers.innerText = nameUser;
  ulUsersName.appendChild(liUsers);
  return ulUsersName;
}

nicknameUser(randomNickName());

socket.on('message', (item) => {
  console.log(item, 'MENSAGEM DO LADO DO CLIENTE');
  const liMessage = document.createElement('li');
  liMessage.className = 'messageList';
  liMessage.setAttribute('data-testid', 'message');
  liMessage.innerText = item;
  ulMessage.appendChild(liMessage);
});

formName.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nickname.value) {
    nicknameUser(nickname.value);
  }
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const liUser = document.getElementsByClassName('users');
  const lastUser = liUser[liUser.length - 1];
  let usersList = lastUser.innerText;
  if (!lastUser.innerText || lastUser.innerText === '') {
    usersList = randomNickName();
  }
  if (message.value) {
    socket.emit('message', { nickname: usersList, chatMessage: message.value });
    message.value = '';
    nickname.value = '';
  }
});