const express = require('express');
const router = express.Router();
const titles = require('./json/titles.json');
// const skills = require('./json/skills.json');
const socials = require('./model/social.js');
const projects = require('./model/project.js');
const skills = require('./model/skill');
const experiences = require('./model/experience');
router.get('/', (req, res) => {
  const host = req.get('host');

  return res.status(200).json({
    name: "Tanveer",
    titles: titles,
    image: "https://avatars.githubusercontent.com/u/22547527?s=400&u=943944cf0253caf99eb8015d74d85f1a73f5ea9f&v=4",
    about: "👋 I'm Tanveer.\nExperienced Developer with a demonstrated history of working in the computer software industry.\nSkilled in Problem solving, Software Development, Web Development, Android Development, Embedded Systems Development. Strong ideas and working ability with a Masters Degree focused in Computer Science.\n\nTypically I love to work with Flutter and Nodejs.",
    skills: skills,
    socials: socials,
    projects: projects(`${req.protocol}://${host}/cdn/projects`),
    experiences: experiences,
  });
});

module.exports = router;