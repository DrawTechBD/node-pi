const TestimonialModel = require('./testimonialModel');
const TestimonialService = require('./testimonialService');

const LOG = "Testimonial Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await TestimonialService.list());
        } catch (e) {
            return res.status(500).json({
                message: "Error getting testimonials.",
                error: e,
            });
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await TestimonialService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json({
                message: "Error getting testimonial.",
                error: e,
            });
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await TestimonialService.showByUser(req.params._id));
        } catch (e) {
            return res.status(500).json({
                message: "Error getting testimonial by user",
                error: e,
            });
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await TestimonialService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Error creating testimonial",
                error: e,
            });
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await TestimonialService.update(req.params._id, req.body));
        } catch (e) {
            return res.status(500).json({
                message: "Error updating testimonial",
                error: e,
            });
        }
    },

    remove: async (req, res) => {
        try {
            const data = await TestimonialService.remove(req.user._id, req.params._id);
            if (data) {
                return res.json();
            }
            throw "Testimonial doesn't exist!";
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

