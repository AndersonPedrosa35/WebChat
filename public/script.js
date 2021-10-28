const socket = window.io();
      
const formName = document.getElementsByClassName('formName')[0];
const formMessage = document.getElementsByClassName('formMessage')[0];
const inputMessage = document.getElementById('inputMessage');
const ulMessage = document.getElementById('ul-message');
const sectionNames = document.getElementById('containerName');
const inputUserName = document.getElementById('inputUserName');
const ulUsersName = document.getElementById('users-on');

const isReplace = false;

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

  socket.on('message', (message) => {
    createMessage(message);
  });

  socket.on('nickname', (users) => {
    ulUsersName.innerText = '';
    users.forEach((user) => {
      createNickname(user, document.createElement('li'));
    });
  });

// Criação do nome aleatório do usuario
const randomUserName = randomNickname();
createNickname(randomUserName, document.createElement('li'));
socket.emit('nickname', { newName: randomUserName, lastName: '' });

formName.addEventListener('submit', (e) => {
  e.preventDefault();
  const liUsers = document.getElementsByClassName('usersName');
  if (inputUserName.value) {
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

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', {
      chatMessage: inputMessage.value, nickname: '',
    });
  }
  inputMessage.value = '';
  inputUserName.value = '';
});
