const ChatService = require('./chatService');
const Controller = require("../../../helper/Controller");

class ChatController extends Controller {
  list = async (req, res) => this.request(req, res, async () => {
    return await ChatService.list();
  });

  listByRoom = async (req, res) => this.request(req, res, async () => {
    return await ChatService.listByRoom(req.params.room);
  });

  show = async (req, res) => this.request(req, res, async () => {
    return await ChatService.show(req.params.id);
  });

  create = async (req, res) => this.request(req, res, async () => {
    return await ChatService.create(req.body, req.user._id);
  });

  update = async (req, res) => this.request(req, res, async () => {
    return await ChatService.update(req.params.id, req.body);
  });

  remove = async (req, res) => this.request(req, res, async () => {
    return await ChatService.remove(req.params.id);
  });

  removeAll = async (req, res) => this.request(req, res, async () => {
    return await ChatService.removeAll();
  });
}

module.exports = new ChatController();