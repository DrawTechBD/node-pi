const SocialModel = require('./socialModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Social Service";
class SocialService {
  static list = async () => {
    return SocialModel.find();
  }

  static show = async (filter) => {
    return SocialModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.socials;
  }

  static create = async (userId, data) => {
    let newSocial = new SocialModel(data);
    await UserService.addData(userId, {socials: newSocial._id});
    return newSocial.save();
  }

  static remove = async (userId, _id) => {
    try{
      const social = await SocialModel.deleteOne({_id});
      await UserService.removeData(userId, {socials: _id});
      return social.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return SocialModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = SocialService;
