const socket = window.io();
      
const formName = document.getElementsByClassName('formName')[0];
const formMessage = document.getElementsByClassName('formMessage')[0];
const inputMessage = document.getElementById('inputMessage');
const ulMessage = document.getElementById('ul-message');
const inputUserName = document.getElementById('inputUserName');
const ulUsersName = document.getElementById('users-on');

function randomNickname() {
  const random = Math.random().toString(16).substr(2, 8)
  + Math.random().toString(16).substr(2, 8);
  return random;
}

function createNickname(name, action) {
  const liUsers = action;
  liUsers.className = 'usersName';
  liUsers.setAttribute('data-testid', 'online-user');
  liUsers.innerText = name;
  ulUsersName.appendChild(liUsers);
  return name;
}

function createMessage(message) {
  const liMessage = document.createElement('li');
  liMessage.className = 'message';
  liMessage.setAttribute('data-testid', 'message');
  liMessage.innerText = message;
  ulMessage.appendChild(liMessage);
}

// Criação do nome aleatório do usuario
const randomUserName = randomNickname();
createNickname(randomUserName, document.createElement('li'));
socket.emit('nickname', { newName: randomUserName, lastName: '' });

// Variavel utilizada para montar a mensagem
let userName = randomUserName;

formName.addEventListener('submit', (e) => {
  e.preventDefault();
  const liUsers = document.getElementsByClassName('usersName');
  if (inputUserName.value.trim() !== '') {
    userName = inputUserName.value;
    [...liUsers].forEach((user) => {
      if (user.innerText === randomUserName) {
        socket.emit('nickname', { 
          newName: inputUserName.value, lastName: user.innerText, 
        });
      }
    });
    inputUserName.value = '';
  }
});

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('nickname', (users) => {
  ulUsersName.innerText = '';
  const index = users.findIndex((user) => user.name === userName);
  let resetPositionArray = [...users];
  if (index !== -1) {
    users.splice(index, 1);
    resetPositionArray = [...users];
    resetPositionArray = [{ id: 1, name: userName }, ...resetPositionArray];
  }
  resetPositionArray.forEach(({ name }) => {
    createNickname(name, document.createElement('li'));
  });
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', {
      chatMessage: inputMessage.value, nickname: userName,
    });
  }
  inputMessage.value = '';
  inputUserName.value = '';
});
