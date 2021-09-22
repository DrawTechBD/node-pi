const SkillModel = require('./skillModel');
const UserModel = require('../../userModel');
const UserService = require("../../userService");

class SkillService {
    static showByTitle = async (title) => {
        return SkillModel.findOne({title});
    }

    static showByUser = async(userId) => {
        const user = await UserService.show(userId);
        return user.skills;
    }

    static create = async (id, data) => {
        // const skill = await SkillService.showByTitle(data.title);
        // if (skill) {
        //     throw {
        //         message: "Skill already exists!",
        //     };
        // }
        let newSkill = new SkillModel({
            title: data.title,
            percentage: data.percentage,
            description: data.description
        });
        newSkill = await newSkill.save();
        const user = await UserModel.findOneAndUpdate(
            {_id: id},
            {$push: {skills: newSkill._id}},
            {new: true});
        console.log(newSkill);
        return newSkill.save();
    }

    static remove = async (userId, _id) => {
        try{
            const item = await SkillModel.deleteOne({_id});
            await UserService.removeData(userId, {skills: _id});
            return item.deletedCount > 0;
        } catch(e){
            console.log(e);
            return null;
        }
    }
}

module.exports = SkillService;
