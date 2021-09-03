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

exports.chatIO = (io) => {
    console.log("SocketIO initialized");
    io.on(SOCKET_CONNECT, (socket) => {
        console.log(LOG, socket.id, "has joined");

        socket.on(SOCKET_JOIN, async (id) => {
            try {
                const clients = await addUser({id, socketId: socket.id});
                io.to(socket.id).emit(SOCKET_JOIN, clients);
                // console.log(clients);

            } catch (e) {
                console.log(e);
                io.to(socket.id).emit(SOCKET_JOIN, null);
            }
        });

        // Fetch rooms
        socket.on(SOCKET_FETCH_ROOM, async (id) => {
            try {
                const rooms = await ChatroomService.listByUser(id);
                rooms.forEach((room) => {
                    // console.log(LOG, `room:${room._id}`, room.otherUser._id);
                    socket.join(`room:${room._id}`);
                });
                console.log(`Rooms: \n ${rooms}`);
                io.to(socket.id).emit(SOCKET_FETCH_ROOM, rooms);
            } catch (e) {
                console.log(e);
                io.to(socket.id).emit(SOCKET_FETCH_ROOM, null);
            }
        });

        socket.on(SOCKET_CREATE_ROOM, async({users}) => {
            try{
                var room = await ChatroomService.create(users[0], users[1], null, null);
                // room = {...room, _id: "sdlkfs"};
                room = {
                    ...room._doc,
                    otherUser: room.users[0],
                };
                console.log(LOG, SOCKET_CREATE_ROOM, users, "Trying to join room", room);
                io.to(socket.id).emit(SOCKET_CREATE_ROOM, room);
                // socket.join(`room:${room._id}`);
                // io.to(`room:${room._id}`).emit(SOCKET_CREATE_ROOM, room);
            } catch(e){
                // io.to(socket.id).emit(SOCKET_CREATE_ROOM, null);
                console.log(LOG, e);
                io.to(socket.id).emit(SOCKET_CREATE_ROOM, null);
            }
        });

        socket.on(SOCKET_ROOM_REQUEST, async ({chat, userId}) => {
           try{
               const room = await ChatroomService.request(chat, userId);
               io.to(socket.id).emit(SOCKET_ROOM_REQUEST, room);
           } catch(e){
               console.log(LOG, e);
               io.to(socket.id).emit(SOCKET_ROOM_REQUEST, null);
           }
        });

        /**
         * @param roomId(string), data(String), userId(String), type(TEXT, AUDIO, VIDEO, IMAGE)
         * @returns {chat: ChatModel, room: ChatRoom}
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



        socket.on(SOCKET_FETCH_CHAT, async (id) => {
            try {
                const chats = await ChatService.listByRoom(id);
                io.to(socket.id).emit(SOCKET_FETCH_CHAT, chats);
            } catch (e) {
                console.log(e);
                io.to(socket.id).emit(SOCKET_FETCH_CHAT, null);
            }
        });

        socket.on('disconnect', () => {
            console.log("User disconnected ", socket.id);
            removeUser(socket.id);
        });

        //     socket.on('join', ({ name, room }, callback) => {
        //         const { error, user } = addUser({ id: socket.id, name, room });
        //
        //         if(error) return callback(error);
        //
        //         socket.join(user.room);
        //
        //         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        //         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        //
        //         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        //
        //         callback();
        //     });
        //
        //     socket.on('sendMessage', (message, callback) => {
        //         const user = getUser(socket.id);
        //
        //         io.to(user.room).emit('message', { user: user.name, text: message });
        //
        //         callback();
        //     });
        //
        //     socket.on('disconnect', () => {
        //         const user = removeUser(socket.id);
        //
        //         if(user) {
        //             io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        //             io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        //         }
        //     })
    });
}
