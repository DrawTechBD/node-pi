const ItemModel = require('./itemModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Item Service";
class ItemService {
  static list = async () => {
    return ItemModel.find();
  }

  static show = async (filter) => {
    return ItemModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.items;
  }

  static create = async (userId, data) => {
    let newItem = new ItemModel(data);
    await UserService.addData(userId, {items: newItem._id});
    return newItem.save();
  }

  static remove = async (userId, _id) => {
    try{
      const item = await ItemModel.deleteOne({_id});
      await UserService.removeData(userId, {items: _id});
      return item.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return ItemModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = ItemService;
