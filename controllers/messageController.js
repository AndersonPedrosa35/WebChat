const messageModel = require('../models/messageModel');

const getAllMessages = async (req, res, next) => {
  const messages = await messageModel.getAllMessages();
  req.messages = messages;
  return next();
};

const createMessage = async (body) => {
  const create = await messageModel.createMessage(body);
  if (create.status) {
    return create;
  }
  return create;
};

const updateNickname = async (lastNickname, newNickname) => {
  const update = await messageModel.updateNickname(lastNickname, newNickname);
  if (update.message) {
    return update;
  }
  return update;
};

module.exports = {
  getAllMessages,
  createMessage,
  updateNickname,
};
