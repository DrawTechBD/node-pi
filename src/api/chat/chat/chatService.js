const ChatModel = require('./chatModel.js');
const ChatRoomModel = require('../chatRoom/chatRoomModel');
const ChatRoomService = require('../chatRoom/chatRoomService');
const QRModel = require("../../qr/qrModel");
const enums = require('../../../helper/enums');

class ChatService {
  list = async () => await ChatModel.find().sort({'createdAt': 'desc'});

  listByRoom = async (room) => await ChatModel.find({room}).sort({'createdAt': 'desc'});

  get = async (id) => await ChatModel.findById(id);


  create = async ({room, data, type, sender, status}) => {
    const chat = new ChatModel({
      room,
      data,
      type,
      status,
      sender,
      seenBy: [sender],
    });
    return await chat.save();
  }
  remove = async (id) => {
    return ChatModel.findByIdAndDelete(id);
    // await ChatroomModel.findOne()
  }
  removeAll = async () => {
    return ChatModel.deleteMany({});
  }
}

module.exports = new ChatService();
