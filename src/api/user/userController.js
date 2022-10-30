const UserService = require('./userService');
const {throwResourceNotFound} = require('../error/throwError');
const Controller = require("../../helper/Controller");

class UserController extends Controller {
  /**
   * Finds All users
   */
  showAll = async (req, res) => this.request(req, res, async () => {
    return await UserService.list();
  });

  /**
   * Finds user by id
   */
  showById = async (req, res) => this.request(req, res, async () => {
    const data = await UserService.show({_id: req.params.id})
    return this.idNotFoundFilter(res, data, req.params.id);
  });

  /**
   * Find user by username
   */
  showByUsername = async (req, res) => this.request(req, res, async() => {
    const data = await UserService.show({username: req.params.username})
    if (!data){
      throwResourceNotFound(res, 'User', 'user', req.params.username);
    }
    return data;
  });


  /**
   * creates a user
   */
  create = async (req, res) => this.request(req, res, async () => {
    return await UserService.create(req.body);
  }, 201);

  /**
   * updates user data
   */
  update = async (req, res) => this.request(req, res, async () => {
    const data = await UserService.update(req.params.id, req.body)
    return this.idNotFoundFilter(res, data, req.params.id);
  });

  /**
   * Updates user info
   */
  updateInfo = async (req, res) => this.request(req, res, async () => {
    const data = await UserService.updateInfo(req.user._id, req.body);
    return this.idNotFoundFilter(res, data, req.user._id);
  });

  /**
   * Removes a user by id
   */
  remove = async (req, res) => this.request(req, res, async () => {
    const data = await UserService.remove({_id: req.params.id});
    return this.idNotFoundFilter(res, data, req.params.id);
  }, 204);

  /**
   * Updates the active at timestamp on a user
   */
  active = async (req, res) => this.request(req, res, async () => {
    const data = await UserService.active(req.params.id, req.body.active);
    return this.idNotFoundFilter(res, data, req.params.id);
  });

  idNotFoundFilter = (res, data, id) => null == data ? throwResourceNotFound(res, 'User', id) : data;
}

module.exports = new UserController();
