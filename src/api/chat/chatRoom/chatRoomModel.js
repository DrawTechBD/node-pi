const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatModel = require('../chat/chatModel');
const LOG = "Chatroom Model:";
const enums = require('../../../helper/enums');

const chatRoomSchema = new Schema({
    'users': [{
            type: Schema.Types.ObjectId,
            ref: 'user',
            default: [],
        }],
    'title': {
        type: String,
        default: '',
    },
    'lastMessage': {
        type: String,
        default: '',
    },
    'chats': [{
        type: Schema.Types.ObjectId,
        ref: 'chat',
        default: []
    }],
    'status': {
        type: Boolean,
        default: null,
        // enum: enums.CHAT_REQUEST_STATUS,
        // default: enums.CHAT_REQUEST_STATUS[0],
    },
    'otherUser': {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null,
    },
}, {timestamps: true, toJSON: {virtuals: true}, versionKey: false });

chatRoomSchema.pre('find', function(next) {
    this.populate('users').populate({
        path: 'chats',
        options: {sort: {'createdAt': -1}}
    });
    next();
});

chatRoomSchema.pre('findOne', function(next) {
    this.populate('users').populate({
        path: 'chats',
        options: {sort: {'createdAt': -1}}
    });
    next();
});

// chatRoomSchema.pre('findOne', (next) => {
//     this.populate('users').populate({
//         path: 'chats',
//         options: {sort: {'createdAt': -1}}
//     });
//     next();
// })

chatRoomSchema.pre('deleteOne', {document: true}, async function (next) {
    try{
        this.model('chat').deleteMany({room: this._id}, next);
        next();
        // await ChatModel.deleteMany({room: this._id});
        // await ChatModel.remove({room: this._id}).exec();
        // console.log(LOG, "Pre deleteOne", this);
        // next();
    } catch(e){
        console.error(LOG, "Error", "Pre deleteOne", this);
        next(Error(e));
    }
});

module.exports = mongoose.model('chat_room', chatRoomSchema);
