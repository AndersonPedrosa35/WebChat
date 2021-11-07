const connection = require('./connection');

const isValidNickname = (nickname) => {
  if (!nickname || nickname.trim() === '') {
    return { status: 400, message: '"nickname" is required' };
  }
  return true;
};

const isValidMessage = (message) => {
  if (!message || message.trim() === '') {
    return { status: 400, message: '"message" is required' };
  }
};

const getAllMessages = async () => {
  const data = await connection().then((db) => db.collection('messages'));

  const result = await data.find().toArray();
  return result;
};

const createMessage = async ({ nickname, message, hours }) => {
  const validName = isValidNickname(nickname);
  const validMessage = isValidMessage(message);
  if (validName.message) {
    return validName;
  }
  if (validMessage.message) {
    return validMessage;
  }

  const data = await connection().then((db) => db.collection('messages'));
  const { insertedId } = await data.insertOne({ message, nickname, timestamp: hours });
  return { _id: insertedId, nickname, message, timestamp: hours };
};

module.exports = {
  getAllMessages,
  createMessage,
};
