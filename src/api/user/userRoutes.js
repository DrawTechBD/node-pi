const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('./userController.js');

const educationRoutes = require('./models/education/educationRoutes');
const experienceRoutes = require('./models/experience/experienceRoutes');
const factRoutes = require('./models/fact/factRoutes');
const portfolioRoutes = require('./models/portfolio/portfolioRoutes');
const skillRoutes = require('./models/skill/skillRoutes');
const socialRoutes = require('./models/social/socialRoutes');
const testimonialRoutes = require('./models/testimonial/testimonialRoutes');
const volunteeringRoutes = require('./models/volunteering/volunteeringRoutes');


router.use('/education', educationRoutes);

router.use('/experience', experienceRoutes);

router.use('/fact', factRoutes);

router.use('/portfolio', portfolioRoutes);

router.use('/skill', skillRoutes);

router.use('/social', socialRoutes);

router.use('/testimonial', testimonialRoutes);

router.use('/volunteering', volunteeringRoutes);

router.get('/', userController.list);

router.get('/test', (req, res) => {
  return res.status(500).json({data: "Hi"});
});

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);

router.post('/active/:id', userController.active);

router.put('/info', passport.authenticate('jwt', {session: false}), userController.updateInfo);

/*
 * PUT
 */
router.put('/:id', passport.authenticate("jwt", {session: false}), userController.update);


/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
