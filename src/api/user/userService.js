const UserModel = require('./userModel');
const isEmpty = require("../../helper/utils");

const LOG = "UserService";
const populateList = [
  'educations',
  'experiences',
  'facts',
  'portfolios',
  'skills',
  'socials',
  'testimonials',
  'volunteerings',
];
const withoutPopulateList = populateList.map((item) => '-'+item);

class UserService {
  static listFull = async () => await UserModel.find().populate(populateList);
  static list = async () => await UserModel.find().select(withoutPopulateList);

  static showFull = async (filter) => await UserModel.findOne(filter).populate(populateList);
  static show = async (filter) => await UserModel.findOne(filter).select(withoutPopulateList);

  static showPortfolio = async (username) => {
    const data = await UserModel.findById("628804469240d6cfc9a19ee8");
    return data;
  }

  static showWithPassword = async (email) => {
    return UserModel.findOne({email}).select(["+password", ...withoutPopulateList]).populate(populateList);
  }

  static active = async (id, activeStatus) => await UserModel.findByIdAndUpdate(id, {
    active: activeStatus,
    lastActive: Date.now(),
  }, {new: true});

  static create = async (body) => {

  }

  static update = async (id, body) => {
    return UserModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        avatar: body.avatar,
        phone: body.phone,
        email: body.email,
        messenger: body.messenger,
        location: body.location,
      },
      {new: true},
    );
  }

  static remove = async (filter) => {
    try {
      const item = await UserModel.deleteOne(filter);
      return item.deletedCount > 0;
    } catch (e) {
      return null;
    }
  }

  static updateInfo = async (id, body) => {
    console.log(LOG, "Update Info:", body);
    const data = {};
    if (!isEmpty(body.name)) {
      data.name = body.name;
    }
    if (!isEmpty(body.title)) {
      data.title = body.title;
    }
    if (!isEmpty(body.email)) {
      data.email = body.email;
    }
    if (!isEmpty(body.phone)) {
      data.phone = body.phone;
    }
    if (!isEmpty(body.address)) {
      console.log(body.address);
      data.location = {
        address: body.address,
      };
      // data.location.address = body.address;
    }
    if (!isEmpty(body.messenger)) {
      data.messenger = body.messenger;
    }
    // if (!isEmpty(body.dob)) {
    //   data.dob = body.dob;
    // }
    return UserModel.findByIdAndUpdate(id, data, {new: true});
  }

  static addData = async (_id, data) => {
    return UserModel.findOneAndUpdate(
      {_id},
      {$push: data},
      {new: true}
    );
  }

  static removeData = async (_id, data) => {
    return UserModel.findOneAndUpdate(
      {_id},
      {$pull: data},
      {new: true}
    );
  }
}

module.exports = UserService;
