const ChatroomModel = require('./chatRoomModel');
const ChatroomService = require('./chatRoomService');

/**
 * chatroomController.js
 *
 * @description :: Server-side logic for managing chatrooms.
 */
module.exports = {

    request: async (req, res) => {
        try{
            const data = await ChatroomService.request(req.params.chat, req.user._id);
            return res.json(data);
        } catch(e){
            return res.status(500).json(e);
        }
    },

    /**
     *
     * @params body: room(roomId), status(string)
     * @param res
     * @returns {Promise<*>}
     */
    response: async (req, res) => {
        try{
            const data = await ChatroomService.response(req.body.room, req.user._id, req.body.status);
            return res.json(data);
        } catch(e){
            return res.status(500).json(e);
        }
    },
    /**
     * chatroomController.listByUser()
     */
    listByUser: async function (req, res) {
        const chats = await ChatroomService.listByUser(req.user._id);
        return res.json(chats);
    },

    /**
     * chatroomController.list()
     */
    list: async (req, res) => res.json(await ChatroomService.list()),

    /**
     * chatroomController.show()
     */
    show: async function (req, res) {
        return res.json(await ChatroomService.show(req.params.id));
    },

    /**
     * chatroomController.create()
     */
    create: async (req, res) => {
        try{
            return res.json(await ChatroomService.create(req.user._id, req.body.user, req.body.title, req.body.lastMessage));
        } catch(e){
            return res.status(500).json(e);
        }
    },

    /**
     * chatroomController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        ChatroomModel.findOne({_id: id}, function (err, chatroom) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting chatroom',
                    error: err
                });
            }

            if (!chatroom) {
                return res.status(404).json({
                    message: 'No such chatroom'
                });
            }

            chatroom.users = req.body.users ? req.body.users : chatroom.users;
            chatroom.title = req.body.title ? req.body.title : chatroom.title;
            chatroom.lastMessage = req.body.lastMessage ? req.body.lastMessage : chatroom.lastMessage;

            chatroom.save(function (err, chatroom) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating chatroom.',
                        error: err
                    });
                }

                return res.json(chatroom);
            });
        });
    },

    /**
     * chatroomController.remove()
     */
    remove: async (req, res) => {
        try{
            const response = await ChatroomService.remove(req.params.id);
            return res.status(204).json(response);
        } catch(e){
            return res.status(500).json(e);
        }
    }
};
