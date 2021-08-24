const UserModel = require('./userModel');
const UserService = require('./userService');

module.exports = {
  list: async (req, res) => {
    try {
      return res.json(await UserService.list());
    } catch (err) {
      return res.status(500).json({
        message: 'Error when getting user.',
        error: err
      });
    }
  },

  show: async (req, res) => {
    try {
      const user = await UserService.show({_id: req.params._id});
      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }
      return res.json(user);
    } catch (e) {
      return res.status(500).json({
        message: "Error getting data",
        error: e,
      });
    }
  },

  /**
   * userController.create()
   */
  create: async (req, res) => {
    try {
      return res.json(await UserService.create(req.body));
    } catch(e) {
      return res.status(500).json({
        message: "Error creating user",
        error: e,
      })
    }
    //   var user = new UserModel({
    // name : req.body.name,
    // phone : req.body.phone,
    // email : req.body.email,
    // messenger : req.body.messenger,
    // password : req.body.password,
    // isAdmin : req.body.isAdmin,
    // avatar : req.body.avatar,
    // token : req.body.token,
    // expiresIn : req.body.expiresIn,
    // location : req.body.location
    //   });

    // user.save(function (err, user) {
    //   if (err) {
    //     return res.status(500).json({
    //       message: 'Error when creating user',
    //       error: err
    //     });
    //   }
    //
    //   return res.status(201).json(user);
    // });
  },

  /**
   * userController.update()
   */
  update: async function (req, res) {
    try {
      return res.json(await UserService.update(req.params.id, req.body));
    } catch (e) {
      return res.status(500).json({
        message: "Error updating profile",
        error: e,
      });
    }
  },

  /**
   * userController.updateInfo()
   */
  updateInfo: async function (req, res) {
    try {
      return res.json(await UserService.updateInfo(req.user._id, req.body));
    } catch (e) {
      return res.status
    }
  },

  /**
   * userController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the user.',
          error: err
        });
      }

      return res.status(204).json();
    });
  },

  active: async function (req, res) {
    return res.json(await UserService.active(req.params.id, req.body.active));
  }
};
