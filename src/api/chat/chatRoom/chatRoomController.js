const ChatroomModel = require('./chatRoomModel');
const ChatroomService = require('./chatRoomService');
const Controller = require("../../../helper/Controller");

/**
 * chatroomController.js
 *
 * @description :: Server-side logic for managing chatrooms.
 */
class ChatRoomController extends Controller {
  // Request access to a chatroom
  request = async (req, res) => this.request(req, res, async () => {
    return await ChatroomService.request(req.params.chat, req.user._id);
  });

  /**
   * Response for requested access to a chatroom
   * @params body: room(roomId), status(string)
   * @returns {Promise<*>}
   */
  response = async (req, res) => this.request(req, res, async () => {
    return await ChatroomService.response(req.body.room, req.user._id, req.body.status);
  });

  /**
   * Show all ChatRooms by a user id
   */
  listByUser = async (req, res) => this.request(req, res, async () =>
    await ChatroomService.listByUser(req.user._id));

  /**
   * Show All ChatRooms
   */
  list = async (req, res) => this.request(req, res, async () =>
    await ChatroomService.list());

  /**
   * chatroomController.show()
   */
  show = async (req, res) => this.request(req, res, async () =>
    await ChatroomService.show(req.params.id));

  /**
   * chatroomController.create()
   */
  create = async (req, res) => this.request(req, res, async () =>
    await ChatroomService.create(req.user._id, req.body.user, req.body.title, req.body.lastMessage));

  /**
   * chatroomController.update()
   */
  update = (req, res) => this.request(req, res, async () => {
    const id = req.params.id;

    ChatroomModel.findOne({_id: id}, function (err, chatroom) {
      if (err) {
        throw {
          message: 'Error when getting chatroom',
          error: err
        };
      }

      if (!chatroom) {
        // TODO: Finish refactoring
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
  })

  /**
   * chatroomController.remove()
   */
  remove = (req, res) => this.request(req, res, () => ChatroomService.remove(req.params.id), 204);
}

module.exports = new ChatRoomController();