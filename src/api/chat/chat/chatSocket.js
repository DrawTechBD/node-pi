// clients = {};
//
// exports.chatIO = (socket) => {
//     // console.log("connected");
//     // console.log(socket.id, "has joined");
//
//     socket.on("login", (id) => {
//         console.log("Id", id);
//     });
//
//     socket.on("signin", (id) => {
//         // console.log(id);
//         clients[id] = socket;
//         // console.log(clients);
//     });
//     socket.on("message", (msg) => {
//         console.log(msg);
//         let targetId = msg.targetId;
//         if (clients[targetId]) clients[targetId].emit("message", msg);
//     });
// }

const ChatService = require('./chatService');
const ChatroomService = require('../chatRoom/chatRoomService');

const LOG = "CHAT_SOCKET";

const SOCKET_CONNECT = "connect";
const SOCKET_JOIN = "join";
const SOCKET_FETCH_ROOM = "fetchRoom";
const SOCKET_FETCH_CHAT = "fetchChat";
const SOCKET_SEND_MESSAGE = "sendMessage";
const SOCKET_NEW_MESSAGE = "newMessage";
const SOCKET_CREATE_ROOM = "createRoom";
const SOCKET_ROOM_REQUEST = "requestRoom";
const SOCKET_ROOM_ACTION = "actionRoom";


const {addUser, removeUser, getUser, getUsersInRoom} = require('../../socket/chatFunctions');
// clients = [];

/**
 * @param io: SocketIO Object
 */
exports.chatIO = (io) => {
    console.log("SocketIO initialized");

    /**
     * Initiate Socket Connection
     */
    io.on(SOCKET_CONNECT, (socket) => {
        console.log(LOG, socket.id, "has joined");

        /**
         * On Client Join socket
         * @param {string}: id - user id
         * @returns {UserModel[]} - Online users
         */
        socket.on(SOCKET_JOIN, async (id) => {
            try {
                const clients = await addUser({id, socketId: socket.id});
                io.to(socket.id).emit(SOCKET_JOIN, clients);
            } catch (e) {
                console.error(e);
                io.to(socket.id).emit(SOCKET_JOIN, null);
            }
        });

        /**
         * Fetch Rooms socket
         * @param {string} id - String (user id)
         * @returns ChatRoomModel[] (Current users ChatRooms)
         */
        socket.on(SOCKET_FETCH_ROOM, async (id) => {
            try {
                const rooms = await ChatroomService.listByUser(id);
                rooms.forEach((room) => {
                    /**
                     * Create socket rooms based on the room id's
                     */
                    socket.join(`room:${room._id}`);
                });
                io.to(socket.id).emit(SOCKET_FETCH_ROOM, rooms);
            } catch (e) {
                console.error(e);
                io.to(socket.id).emit(SOCKET_FETCH_ROOM, null);
            }
        });


        /**
         * Create Room Socket
         * @param {Array.<String>} users - Array of user id's
         * @returns {RoomModel}
         */
        socket.on(SOCKET_CREATE_ROOM, async({users}) => {
            try{
                var room = await ChatroomService.create(users[0], users[1], null, null);
                room = {
                    ...room._doc,
                    otherUser: room.users[0],
                };
                console.log(LOG, SOCKET_CREATE_ROOM, users, "Trying to join room", room);
                io.to(socket.id).emit(SOCKET_CREATE_ROOM, room);
            } catch(e){
                // io.to(socket.id).emit(SOCKET_CREATE_ROOM, null);
                console.log(LOG, e);
                io.to(socket.id).emit(SOCKET_CREATE_ROOM, null);
            }
        });

        /**
         * Room Request Socket
         * @param {String} qr: qr id to create chatroom
         * @param {String} userId: user id
         * @returns {ChatRoom}
         */
        socket.on(SOCKET_ROOM_REQUEST, async ({qr, userId}) => {
            try{
                const room = await ChatroomService.request(qr, userId);
                io.to(socket.id).emit(SOCKET_ROOM_REQUEST, room);
            } catch(e){
                console.log(LOG, e);
                io.to(socket.id).emit(SOCKET_ROOM_REQUEST, null);
            }
        });

        /**
         * Room Action Socket
         * @param {String} userId - user id
         * @param {String} roomId - room id
         * @param {boolean} status - the status to be set for the room access
         * @returns {ChatRoom}
         */
        socket.on(SOCKET_ROOM_ACTION, async ({userId, roomId, status}) => {
           try{
               console.log(`taking action ${userId} ${roomId} ${status}`);
               const data = await ChatroomService.response(roomId, userId, status);
               io.sockets.emit(SOCKET_ROOM_ACTION, data);
           } catch(e){
               io.to(socket.id).emit(SOCKET_ROOM_ACTION, null);
               console.error(e);
           }
        });


        /**
         * Send Message Socket
         * @param {String} data.roomId - Room ID
         * @param {String} data.data - Message Data
         * @param {String} userId - ID of user who sent the message
         * @param {String} type - Enum of Message type (TEXT, AUDIO, VIDEO, IMAGE)
         * @returns {chat: Chat, room: ChatRoom}
         */
        socket.on(SOCKET_SEND_MESSAGE, async (data) => {
            try {
                console.log("Sending to: ", `room:${JSON.stringify(data)}`);
                const chat = await ChatService.create({...data, status: 'SENT'});
                io.to(`room:${data.room}`).emit(SOCKET_NEW_MESSAGE, chat);
            } catch (e) {
                console.log("error", e);
                socket.emit(SOCKET_NEW_MESSAGE, null);
                // io.to(room.)
            }
            // console.log(`RoomId: ${JSON.parse(room)}\nText: ${text}\nuid: ${uid}`);
        });


        /**
         * Fetch Chat Socket
         * @param id - Chat ID
         * @returns {Chat}
         */
        socket.on(SOCKET_FETCH_CHAT, async (id) => {
            try {
                const chats = await ChatService.listByRoom(id);
                io.to(socket.id).emit(SOCKET_FETCH_CHAT, chats);
            } catch (e) {
                console.log(e);
                io.to(socket.id).emit(SOCKET_FETCH_CHAT, null);
            }
        });

        /**
         * On client's socket disconnect
         */
        socket.on('disconnect', () => {
            console.log("User disconnected ", socket.id);
            removeUser(socket.id);
        });
    });
}
