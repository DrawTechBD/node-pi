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
const UserModel = require('./userModel');
const HobbyModel = require('./models/hobby/hobbyModel');
const SocialModel = require('./models/social/socialModel');

const AcademicModel = require('./models/organization/academicModel');
const AchievementModel = require('./models/organization/achievementModel');
const CertificateModel = require('./models/organization/certificateModel');
const ExperienceModel = require('./models/organization/experienceModel');
const OJModel = require('./models/portfolio/ojModel');

const PlatformModel = require('./models/skill/platformModel');
const FrameworkModel = require('./models/skill/framworkModel');
const LanguageModel = require('./models/skill/languageModel');
const LinguisticModel = require('./models/skill/linguisticModel');
//
//
// router.use('/education', educationRoutes);
//
// router.use('/experience', experienceRoutes);
//
// router.use('/fact', factRoutes);
//
// router.use('/portfolio', portfolioRoutes);
//
// router.use('/skill', skillRoutes);
//
// router.use('/social', socialRoutes);
//
// router.use('/testimonial', testimonialRoutes);
//
// router.use('/volunteering', volunteeringRoutes);
//
// router.get('/', userController.list);

router.get('/:username', async (req, res) => {
  try {
    const data = await UserModel.findOne({username: req.params.username});
    const user = data._id;
    data.careers = {
      academics: await AcademicModel.find({user}),
      achievements: await AchievementModel.find({user}),
      certificates: await CertificateModel.find({user}),
      experiences: await ExperienceModel.find({user}),
    };
    data.portfolios = {
      ojs: await OJModel.find({user}),
      // TODO: Complete Projects Section
      projects: []
    }
    data.skills = {
      platforms: await PlatformModel.find({user}).populate(['frameworks', 'frameworks.language']),
      frameworks: await FrameworkModel.find({user}).populate('language'),
      languages: await LanguageModel.find({user}),
      linguistics: await LinguisticModel.find({user}),
    }
    data.hobbies = await HobbyModel.find({user});
    data.socials = await SocialModel.find({user});
    return res.json(data);
  } catch(e){
    console.error(e);
    return res.error(e);
  }
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
