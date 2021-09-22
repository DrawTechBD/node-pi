const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enums = require('../../../helper/enums');
const ChatroomModel = require('../chatRoom/chatRoomModel');

const LOG = "CHAT_MODEL:";

const chatSchema = new Schema({
  'room': String,
  'data': String,
  'type': {
    type: String,
    enum: enums.CHAT_TYPE,
    default: enums.CHAT_TYPE[0],
  },
  'status': {
    type: String,
  },
  'sender': {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  'isSender': {
    type: Boolean,
    default: false,
  },
  'seenBy': [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }
  ],
  'createdAt': {type: Date, default: Date.now}

}, { versionKey: false });
chatSchema.pre('save', function (next) {
  next();
});

chatSchema.post('save', async (doc) => {
  const room = await ChatroomModel.findByIdAndUpdate(doc.room, {
    'lastMessage': doc.data,
  });
  room.chats.push(doc._id);
  await room.save();
})


chatSchema.pre('find', function (next) {
  next();
});

chatSchema.post('find', function (doc) {
});

// chatSchema.post('create', async (doc) =>{
//     console.log("Creating ", doc.text);
//     const room = await ChatroomModel.findByIdAndUpdate(doc.room, {
//         'lastMessage': doc.text,
//     });
//     await room.chats.push(doc._id);
//     console.log(LOG, "Room", room);
// });

module.exports = mongoose.model('chat', chatSchema);
