const EducationModel = require('./educationModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Education Service";
class EducationService {
  static list = async () => {
    return EducationModel.find();
  }

  static show = async (filter) => {
    return EducationModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.educations;
  }

  static create = async (userId, data) => {
    let newEducation = new EducationModel(data);
    const user = await UserModel.findOneAndUpdate(
      {_id: userId},
      {$push: {educations: newEducation._id}},
      {new: true});
    return newEducation.save();
  }

  static remove = async (userId, _id) => {
    try{
      const item = await EducationModel.deleteOne({_id});
      console.log(LOG, 'education', item);
      const user = await UserService.removeData(userId, {educations: _id});
      console.log(LOG, 'user', user);
      return item.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return EducationModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = EducationService;
