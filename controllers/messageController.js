const messageModel = require('../models/messageModel');

const getAllMessages = async (_req, res) => {
  const messages = await messageModel.getAllMessages();

  return res.status(200).json(messages);
};

const createMessage = async (req, res, next) => {
  const { body } = req;
  const create = await messageModel.createMessage(body);
  if (create.status) {
    return next(create);
  }
  return res.status(201).json(create);
};

module.exports = {
  getAllMessages,
  createMessage,
};
