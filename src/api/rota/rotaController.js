const RotaModel = require('./rotaModel.js');

/**
 * rotaController.js
 *
 * @description :: Server-side logic for managing rotas.
 */
module.exports = {

    /**
     * rotaController.list()
     */
    list: function (req, res) {
        RotaModel.find(function (err, rotas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting rota.',
                    error: err
                });
            }

            return res.json(rotas);
        });
    },

    /**
     * rotaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        RotaModel.findOne({_id: id}, function (err, rota) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting rota.',
                    error: err
                });
            }

            if (!rota) {
                return res.status(404).json({
                    message: 'No such rota'
                });
            }

            return res.json(rota);
        });
    },

    /**
     * rotaController.create()
     */
    create: function (req, res) {
        var rota = new RotaModel({
			job_id : req.body.job_id,
			start_date : req.body.start_date,
			week_no : req.body.week_no,
			start : req.body.start,
			end : req.body.end,
			end_type : req.body.end_type,
			shift_start : req.body.shift_start,
			shift_end : req.body.shift_end
        });

        rota.save(function (err, rota) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating rota',
                    error: err
                });
            }

            return res.status(201).json(rota);
        });
    },

    /**
     * rotaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        RotaModel.findOne({_id: id}, function (err, rota) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting rota',
                    error: err
                });
            }

            if (!rota) {
                return res.status(404).json({
                    message: 'No such rota'
                });
            }

            rota.job_id = req.body.job_id ? req.body.job_id : rota.job_id;
			rota.start_date = req.body.start_date ? req.body.start_date : rota.start_date;
			rota.week_no = req.body.week_no ? req.body.week_no : rota.week_no;
			rota.start = req.body.start ? req.body.start : rota.start;
			rota.end = req.body.end ? req.body.end : rota.end;
			rota.end_type = req.body.end_type ? req.body.end_type : rota.end_type;
			rota.shift_start = req.body.shift_start ? req.body.shift_start : rota.shift_start;
			rota.shift_end = req.body.shift_end ? req.body.shift_end : rota.shift_end;
			
            rota.save(function (err, rota) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating rota.',
                        error: err
                    });
                }

                return res.json(rota);
            });
        });
    },

    /**
     * rotaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        RotaModel.findByIdAndRemove(id, function (err, rota) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the rota.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
