const ExperienceModel = require('./experienceModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Experience Service";
class ExperienceService {
  static list = async () => {
    return ExperienceModel.find();
  }

  static show = async (filter) => {
    return ExperienceModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.experiences;
  }

  static create = async (userId, data) => {
    let newExperience = new ExperienceModel(data);
    await UserService.addData(userId, {experiences: newExperience._id});
    return newExperience.save();
  }

  static remove = async (userId, _id) => {
    try{
      const experience = await ExperienceModel.deleteOne({_id});
      await UserService.removeData(userId, {experiences: _id});
      return experience.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return ExperienceModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = ExperienceService;
