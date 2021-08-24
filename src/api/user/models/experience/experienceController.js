const ExperienceModel = require('./experienceModel');
const ExperienceService = require('./experienceService');

const LOG = "Experience Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await ExperienceService.list());
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await ExperienceService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json(e);
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await ExperienceService.showByUser(req.params._id));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await ExperienceService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await ExperienceService.update(req.params._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    remove: async (req, res) => {
        try {
            const data = await ExperienceService.remove(req.user._id, req.params.id);
            if (data) {
                return res.json();
            }
            throw {
                message: "Experience doesn't exist!",
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

