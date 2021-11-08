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
  return true;
};

const getAllMessages = async () => {
  const data = await connection().then((db) => db.collection('messages'));

  const result = await data.find().toArray();
  return result;
};

const createMessage = async ({ message, nickname, timestamp }) => {
  const validName = isValidNickname(nickname);
  const validMessage = isValidMessage(message);
  if (validName.message) {
    return validName;
  }
  if (validMessage.message) {
    return validMessage;
  }

  const data = await connection().then((db) => db.collection('messages'));
  const { insertedId } = await data.insertOne({ message, nickname, timestamp });
  return { _id: insertedId, nickname, message, timestamp };
};

const updateNickname = async (lastNickname, newNickname) => {
  const validName = isValidNickname(newNickname);
  if (validName.message) {
    return validName;
  }

  const banco = await connection().then((db) => db.collection('messages'));
  const update = await banco.updateOne({ nickname: lastNickname }, 
    { $set: { nickname: newNickname } });
  return update;
};

module.exports = {
  getAllMessages,
  createMessage,
  updateNickname,
};
