const EducationModel = require('./educationModel');
const EducationService = require('./educationService');

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await EducationService.list());
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await EducationService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json(e);
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await EducationService.showByUser(req.params.id));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await EducationService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await EducationService.update(req.params._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    remove: async (req, res) => {
        try {
            const data = await EducationService.remove(req.user._id, req.params._id);
            if (data) {
                return res.json(data);
            }
            throw  "Item doesn't exist!";
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

