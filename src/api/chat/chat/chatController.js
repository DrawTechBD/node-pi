const ChatService = require('./chatService');
/**
 * chatController.js
 *
 * @description :: Server-side logic for managing chats.
 */
module.exports = {
    list: async (req, res) =>{
        try{
            return res.json(await ChatService.list());
        } catch(e){
            return res.status(500).json(e);
        }
    },

    listByRoom: async(req, res) => {
        try{
            return res.json(await ChatService.listByRoom(req.params.room));
        } catch (e){
            return res.status(500).json(e);
        }
    },


    show: function (req, res) {
        var id = req.params.id;

        ChatModel.findOne({_id: id}, function (err, chat) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting chat.',
                    error: err
                });
            }

            if (!chat) {
                return res.status(404).json({
                    message: 'No such chat'
                });
            }

            return res.json(chat);
        });
    },


    create: async (req, res) => {
        try{
            const data = await ChatService.create(req.body, req.user._id);
            return res.status(201).json(data);
        } catch(e){
            console.log(e);
            return res.status(500).json(e);
        }
    },

    update: function (req, res) {
        var id = req.params.id;

        ChatModel.findOne({_id: id}, function (err, chat) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting chat',
                    error: err
                });
            }

            if (!chat) {
                return res.status(404).json({
                    message: 'No such chat'
                });
            }

            chat.text = req.body.text ? req.body.text : chat.text;
			chat.type = req.body.type ? req.body.type : chat.type;
			chat.status = req.body.status ? req.body.status : chat.status;
			chat.sender = req.body.sender ? req.body.sender : chat.sender;
			chat.seenBy = req.body.seenBy ? req.body.seenBy : chat.seenBy;

            chat.save(function (err, chat) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating chat.',
                        error: err
                    });
                }

                return res.json(chat);
            });
        });
    },

    remove: async function (req, res) {
        try{
            return res.status(204).json(await ChatService.remove(req.params.id));
        } catch(e){
            return res.status(500).json(e);
        }
    },

    removeAll: async function(req, res) {
        try{
            return res.status(204).json(await ChatService.removeAll());
        } catch(e){
            return res.status(500).json(e);
        }
    }
};
