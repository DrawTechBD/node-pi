const VolunteeringModel = require('./volunteeringModel');
const VolunteeringService = require('./volunteeringService');

const LOG = "Volunteering Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await VolunteeringService.list());
        } catch (e) {
            return res.status(500).json({
                message: "Error getting volunteerings.",
                error: e,
            });
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await VolunteeringService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json({
                message: "Error getting volunteering.",
                error: e,
            });
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await VolunteeringService.showByUser(req.params._id));
        } catch (e) {
            return res.status(500).json({
                message: "Error getting volunteering by user",
                error: e,
            });
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await VolunteeringService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Error creating volunteering",
                error: e,
            });
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await VolunteeringService.update(req.params._id, req.body));
        } catch (e) {
            return res.status(500).json({
                message: "Error updating volunteering",
                error: e,
            });
        }
    },

    remove: async (req, res) => {
        try {
            const data = await VolunteeringService.remove(req.user._id, req.params._id);
            if (data) {
                return res.json();
            }
            throw "Volunteering doesn't exist!";
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

