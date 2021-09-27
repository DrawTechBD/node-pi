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
  const projectsList = projects(`${req.protocol}://${host}/cdn/projects`);

  var tags = [];
  projectsList.map((project) => {
    project['technologies'].map((item) => tags.push(item.name));
  });
  const uniqueTags = tags.filter((item, pos) => {
    return tags.indexOf(item) === pos;
  })
  return res.status(200).json({
    tags: uniqueTags,
    name: "Tanveer",
    titles: titles,
    image: "https://avatars.githubusercontent.com/u/22547527?s=400&u=943944cf0253caf99eb8015d74d85f1a73f5ea9f&v=4",
    about: "👋 I'm Tanveer.<br/>Experienced Developer with a demonstrated history of working in the computer software industry.<br/>Skilled in Problem solving, Software Development, Web Development, Android Development, Embedded Systems Development. Strong ideas and working ability with a Masters Degree focused in Computer Science.<br/><br/>Typically I love to work with Flutter and Nodejs.",
    skills: skills,
    socials: socials,
    projects: projectsList,
    experiences: experiences,
  });
});

router.get('/cv', (req, res) => {
  // res.setHeader("Content-Security-Policy", "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;**script-src 'self' http://onlineerp.solution.quebec 'unsafe-inline' 'unsafe-eval';** ");
  return res.render('portfolio/cv', {title: 'Hey', message: "Hello there"});
});

module.exports = router;