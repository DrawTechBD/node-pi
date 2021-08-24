const SocialModel = require('./socialModel');
const SocialService = require('./socialService');

const LOG = "Social Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await SocialService.list());
        } catch (e) {
            return res.status(500).json({
                message: "Error getting socials.",
                error: e,
            });
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await SocialService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json({
                message: "Error getting social.",
                error: e,
            });
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await SocialService.showByUser(req.params._id));
        } catch (e) {
            return res.status(500).json({
                message: "Error getting social by user",
                error: e,
            });
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await SocialService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Error creating social",
                error: e,
            });
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await SocialService.update(req.params._id, req.body));
        } catch (e) {
            return res.status(500).json({
                message: "Error updating social",
                error: e,
            });
        }
    },

    remove: async (req, res) => {
        try {
            const data = await SocialService.remove(req.user._id, req.params._id);
            if (data) {
                return res.json();
            }
            throw "Social doesn't exist!";
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

