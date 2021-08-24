var TokenModel = require('./tokenModel.js');

/**
 * tokenController.js
 *
 * @description :: Server-side logic for managing tokens.
 */
module.exports = {

    /**
     * tokenController.list()
     */
    list: function (req, res) {
        TokenModel.find(function (err, tokens) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting token.',
                    error: err
                });
            }

            return res.json(tokens);
        });
    },

    /**
     * tokenController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        TokenModel.findOne({_id: id}, function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting token.',
                    error: err
                });
            }

            if (!token) {
                return res.status(404).json({
                    message: 'No such token'
                });
            }

            return res.json(token);
        });
    },

    /**
     * tokenController.create()
     */
    create: function (req, res) {
        var token = new TokenModel({
			userId : req.body.userId,
			token : req.body.token,
			createdAt : req.body.createdAt
        });

        token.save(function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating token',
                    error: err
                });
            }

            return res.status(201).json(token);
        });
    },

    /**
     * tokenController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        TokenModel.findOne({_id: id}, function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting token',
                    error: err
                });
            }

            if (!token) {
                return res.status(404).json({
                    message: 'No such token'
                });
            }

            token.userId = req.body.userId ? req.body.userId : token.userId;
			token.token = req.body.token ? req.body.token : token.token;
			token.createdAt = req.body.createdAt ? req.body.createdAt : token.createdAt;
			
            token.save(function (err, token) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating token.',
                        error: err
                    });
                }

                return res.json(token);
            });
        });
    },

    /**
     * tokenController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        TokenModel.findByIdAndRemove(id, function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the token.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
