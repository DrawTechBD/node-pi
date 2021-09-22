const FactModel = require('./factModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Fact Service";
class FactService {
  static list = async () => {
    return FactModel.find();
  }

  static show = async (filter) => {
    return FactModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.facts;
  }

  static create = async (userId, data) => {
    let newFact = new FactModel(data);
    await UserService.addData(userId, {facts: newFact._id});
    return newFact.save();
  }

  static remove = async (userId, _id) => {
    try{
      const fact = await FactModel.deleteOne({_id});
      await UserService.removeData(userId, {facts: _id});
      return fact.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return FactModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = FactService;
