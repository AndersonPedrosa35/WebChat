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

// Criação do nome aleatório do usuario
createNickname(randomNickname, document.createElement('li'));

function createMessage() {
  formMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputMessage.value) {
      socket.emit('message', { 
        chatMessage: inputMessage.value, nickname: '',
      });
    }
  });
}
