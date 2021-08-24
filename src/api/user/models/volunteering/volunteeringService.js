const VolunteeringModel = require('./volunteeringModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Volunteering Service";
class VolunteeringService {
  static list = async () => {
    return VolunteeringModel.find();
  }

  static show = async (filter) => {
    return VolunteeringModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.volunteerings;
  }

  static create = async (userId, data) => {
    let newVolunteering = new VolunteeringModel(data);
    await UserService.addData(userId, {volunteerings: newVolunteering._id});
    return newVolunteering.save();
  }

  static remove = async (userId, _id) => {
    try{
      const volunteering = await VolunteeringModel.deleteOne({_id});
      await UserService.removeData(userId, {volunteerings: _id});
      return volunteering.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return VolunteeringModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = VolunteeringService;
