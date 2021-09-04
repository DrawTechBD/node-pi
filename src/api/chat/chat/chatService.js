const ChatModel = require('./chatModel.js');
const ChatRoomModel = require('../chatRoom/chatRoomModel');
const ChatRoomService = require('../chatRoom/chatRoomService');
const QRModel = require("../../qr/qrModel");
const enums = require('../../../helper/enums');
const AppError = require('../../error/appError');

class ChatService {
  list = async () => await ChatModel.find().sort({'createdAt': 'desc'});

  listByRoom = async (room) => await ChatModel.find({room}).sort({'createdAt': 'desc'});


  show = async (id) => await ChatModel.findById(id);

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

  update = async (_id, data) => {
    return await ChatModel.findOne({_id})
        .then((chat) => {
          if (!chat) {
            return AppError('Not found', 404);
          }
          chat.text = data.text ? data.text : chat.text;
          chat.type = data.type ? data.type : chat.type;
          chat.status = data.status ? data.status : chat.status;
          chat.sender = data.sender ? data.sender : chat.sender;
          chat.seenBy = data.seenBy ? data.seenBy : chat.seenBy;
          return chat.save()
              .catch(err => {
              return AppError(`Error when updating chat. ${err}`, 500);
            });
        })
        .catch(err => {
          if(err) {
            return AppError(`Error fetching chat ${err}`, 400);
          }
        });
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
