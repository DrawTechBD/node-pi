const ChatService = require('./chatService');
const catchAsync = require('../../error/catchAsync');

class ChatController {
    list = catchAsync(async(req,res, next) => {
        res.json(await ChatService.list());
    });

    listByRoom = catchAsync(async(req, res, next) => {
        res.json(await ChatService.listByRoom(req.params.room));
    });

    show = catchAsync(async(req, res, next) => {
        res.json(await ChatService.show(req.params.id));
    });

    create = catchAsync(async(req, res, next) => {
        const data = await ChatService.create(req.body, req.user._id);
        res.json(data);
    });

    update = catchAsync(async(req, res, next) => {
        const data = await ChatService.update(req.params.id, req.body);
        res.status(data);
    });

    remove = catchAsync(async(req, res, next) => {
       const data = await ChatService.remove(req.params.id);
       res.status(data);
    });

    removeAll = catchAsync(async(req, res, next) => {
        const data = await ChatService.removeAll();
        res.status();
    });
}

module.exports = new ChatController();