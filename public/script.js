const socket = window.io();
      
const formName = document.getElementById('formName');
const formMessage = document.getElementById('formMessage');
const message = document.getElementById('message');
const nickname = document.getElementById('nickname');
const ulUsersName = document.getElementById('users-on');

function RandomNickname() {
  const randomNickName = Math.random().toString(16).substr(2, 8) 
  + Math.random().toString(16).substr(2, 8);
  const liUsers = document.createElement('li');
  liUsers.className = 'users';
  liUsers.setAttribute('data-testid', 'online-user');
  liUsers.innerText = randomNickName;
  ulUsersName.appendChild(liUsers);
  return ulUsersName;
}

RandomNickname();

formName.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nickname.value) {
    socket.emit('nickname', { nickname: nickname.value });
  }
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const liUser = document.getElementsByClassName('users');
  console.log(liUser);
  let nicknameUser = liUser.value;
  if (!liUser.value) {
    nicknameUser = RandomNickname();
  }
  if (message.value) {
    socket.emit('message', { nickname: nicknameUser, chatMessage: message.value });
    message.value = '';
    nickname.value = '';
  }
});