const PortfolioModel = require('./portfolioModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Portfolio Service";
class PortfolioService {
  static list = async () => {
    return PortfolioModel.find();
  }

  static show = async (filter) => {
    return PortfolioModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.portfolios;
  }

  static create = async (userId, data) => {
    let newPortfolio = new PortfolioModel(data);
    await UserService.addData(userId, {portfolios: newPortfolio._id});
    return newPortfolio.save();
  }

  static remove = async (userId, _id) => {
    try{
      const portfolio = await PortfolioModel.deleteOne({_id});
      await UserService.removeData(userId, {portfolios: _id});
      return portfolio.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return PortfolioModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = PortfolioService;
