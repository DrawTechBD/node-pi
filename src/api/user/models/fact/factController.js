const FactModel = require('./factModel');
const FactService = require('./factService');

const LOG = "Fact Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await FactService.list());
        } catch (e) {
            return res.status(500).json({
                message: "Error getting facts.",
                error: e,
            });
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await FactService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json(e);
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await FactService.showByUser(req.params._id));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await FactService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await FactService.update(req.params._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    remove: async (req, res) => {
        try {
            const data = await FactService.remove(req.user._id, req.params.id);
            if (data) {
                return res.json();
            }
            throw {
                message: "Fact doesn't exist!",
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

