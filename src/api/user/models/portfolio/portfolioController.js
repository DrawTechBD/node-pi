const PortfolioModel = require('./portfolioModel');
const PortfolioService = require('./portfolioService');

const LOG = "Portfolio Controller";

module.exports = {
    list: async (req, res) => {
        try {
            return res.json(await PortfolioService.list());
        } catch (e) {
            return res.status(500).json({
                message: "Error getting portfolios.",
                error: e,
            });
        }
    },

    show: async (req, res) => {
        try {
            return res.json(await PortfolioService.show({_id: req.params._id}))
        } catch (e) {
            return res.status(500).json({
                message: "Error getting portfolio.",
                error: e,
            });
        }
    },
    showByUser: async (req, res) => {
        try {
            return res.json(await PortfolioService.showByUser(req.params._id));
        } catch (e) {
            return res.status(500).json({
                message: "Error getting portfolio by user",
                error: e,
            });
        }
    },

    create: async (req, res) => {
        try {
            return res.json(await PortfolioService.create(req.user._id, req.body));
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Error creating portfolio",
                error: e,
            });
        }
    },

    update: async (req, res) => {
        try {
            return res.json(await PortfolioService.update(req.params._id, req.body));
        } catch (e) {
            return res.status(500).json({
                message: "Error updating portfolio",
                error: e,
            });
        }
    },

    remove: async (req, res) => {
        try {
            const data = await PortfolioService.remove(req.user._id, req.params._id);
            if (data) {
                return res.json();
            }
            throw "Portfolio doesn't exist!";
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the skill.',
                error: err
            });
        }
    },
};

