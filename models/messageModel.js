const connection = require('./connection');

const getAllMessages = async () => {
  const data = await connection().then((db) => db.collection('messages'));

  const result = await data.find().toArray();
  return result;
};

const createMessage = async ({ nickname, messages }) => {
};

module.exports = {
  getAllMessages,
};

{
  message: 'Lorem ipsum',
  nickname: 'xablau',
  timestamp: '2021-04-01 12:00:00'
}