const UserModel = require('../user/userModel');
const UserService = require('../user/userService');
const users = {};

const LOG = "CHAT_FUNCTIONS";

const addUser = async ({id, socketId}) => {
    if (users.hasOwnProperty(id))
        return users[id];
    const user = await UserService.active(id, true);
    users[id] = {
        user,
        socketId: socketId,
    };
    return users;

}

const removeUser = async (socketId) => {
    const id = Object.keys(users).find(key => users[key].socketId === socketId);
    await UserService.active(id, false);
    delete users[id];
    // console.log("Key", getKey);
    // const user = Object.keys(users).find(key => users[key].socketId === socketId);
    // console.log(`Remove USER: ${user}`)
    // delete users[user];
    console.log(users);
    // const index = users.findIndex((user) => user.socketId === socketId);
    // const user = await UserService.active(users[index]._id, false);
    //
    // if(index !== -1) return users.splice(index, 1)[0];
    // console.log("removed user", users);
}

const getUser = (id) => users[id];

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
