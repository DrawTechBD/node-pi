const ItemModel = require('./itemModel');
const ItemService = require('./itemService');

const LOG = "Item Controller";

module.exports = {
  list: async (req, res) => {
    try {
      return res.json(await ItemService.list());
    } catch (e) {
      return res.status(500).json({
        message: "Error getting items.",
        error: e,
      });
    }
  },

  show: async (req, res) => {
    try {
      return res.json(await ItemService.show({_id: req.params._id}))
    } catch (e) {
      return res.status(500).json({
        message: "Error getting item.",
        error: e,
      });
    }
  },
  showByUser: async (req, res) => {
    try {
      return res.json(await ItemService.showByUser(req.params._id));
    } catch (e) {
      return res.status(500).json({
        message: "Error getting item by user",
        error: e,
      });
    }
  },

  create: async (req, res) => {
    try {
      return res.json(await ItemService.create(req.user._id, req.body));
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Error creating item",
        error: e,
      });
    }
  },

  update: async (req, res) => {
    try {
      return res.json(await ItemService.update(req.params._id, req.body));
    } catch (e) {
      return res.status(500).json({
        message: "Error updating item",
        error: e,
      });
    }
  },

  remove: async (req, res) => {
    try {
      const data = await ItemService.remove(req.user._id, req.params._id);
      if (data) {
        return res.json();
      }
      throw "Item doesn't exist!";
    } catch (err) {
      return res.status(500).json({
        message: 'Error when deleting the skill.',
        error: err
      });
    }
  },
};

