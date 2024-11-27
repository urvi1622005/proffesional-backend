const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createMessage = async (req, res) => {
  const { content, user } = req.body;
  try {
    const message = await Message.create({ content, user });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create message' });
  }
};

module.exports = { getMessages, createMessage };
