const ChatRoomModel = require('./chatRoomModel');
const QRModel = require("../../qr/qrModel");

const LOG = "ChatRoom Service:";

class ChatRoomService {
  request = async (chat, userId) => {
    const qr = await QRModel.findById(chat);
    if(qr === null) throw "Invalid request ID";
    if(String(qr.owner) === String(userId)) throw "Requesting user and owner cannot be the same person";
    return await this.create(qr.owner, userId);
  }

  response = async (roomId, userId, status) => {
    const chatRoom = await this.show(roomId);
    if(chatRoom === null) throw "Wrong room ID";
    // return {owner: chatRoom.users[0], finder: userId};
    // Replace with the right user
    if(String(chatRoom.users[0]) === String(userId)) {
      chatRoom.status = status;
      await chatRoom.save();
      return chatRoom;
    }
    throw "Wrong user to take action";
  }

  async listByUser(id) {
    const rooms = await ChatRoomModel.find({users: id});
    rooms.forEach((room) => {
      room.otherUser = room.users.find((user) => String(user._id) !== String(id));
      room.users = undefined;
      room.chats.forEach((chat) => {
        chat.isSender = String(chat.sender) === String(id);
      })
    });
    return rooms;
  }

  async oneRoomByUser(userId, _id){
    const room = await ChatRoomModel.findOne({_id});
    room.otherUser = room.users.find((user) => String(user._id) !== String(userId));
    room.users = undefined;
    room.chats.forEach((chat) => {
      chat.isSender = String(chat.sender) === String(userId);
    })
    return room;
  }

  show = async (_id) => ChatRoomModel.findOne({_id});

  // return ChatRoomModel.findOne({_id}).select(['-chats', '-users']);

  list = async () => ChatRoomModel.find();

  async create(user1, user2) {
    const ChatRoomExists = await ChatRoomModel.findOne({users: [user1, user2]}).populate('users').populate({
      path: 'chats',
      options: {sort: {'createdAt': -1}}
    });
    if (ChatRoomExists)
      return ChatRoomExists;
    const ChatRoom = new ChatRoomModel({
      users: [
        user1,
        user2
      ]
    }).populate('users').populate({
      path: 'chats',
      options: {sort: {'createdAt': -1}}
    });

    await ChatRoom.save();
    return ChatRoomModel.findOne({_id: ChatRoom._id}).populate('users').populate({
      path: 'chats',
      options: {sort: {'createdAt': -1}}
    });
  }

  async remove(_id) {
    const data = await ChatRoomModel.findOne({_id});
    return await data.deleteOne();
  }
}

module.exports = new ChatRoomService();
