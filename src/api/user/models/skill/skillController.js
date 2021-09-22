const SkillModel = require('./skillModel');
const SkillService = require('./skillService');

const LOG = "Skill Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await SkillService.list());
        } catch (e) {
            return res.status(500).json({
                message: "Error getting skills.",
                error: e,
            });
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await SkillService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json({
                message: "Error getting skill.",
                error: e,
            });
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await SkillService.showByUser(req.params._id));
        } catch (e) {
            return res.status(500).json({
                message: "Error getting skill by user",
                error: e,
            });
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await SkillService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Error creating skill",
                error: e,
            });
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await SkillService.update(req.params._id, req.body));
        } catch (e) {
            return res.status(500).json({
                message: "Error updating skill",
                error: e,
            });
        }
    },

    remove: async (req, res) => {
        try {
            const data = await SkillService.remove(req.user._id, req.params._id);
            if (data) {
                return res.json();
            }
            throw "Skill doesn't exist!";
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

