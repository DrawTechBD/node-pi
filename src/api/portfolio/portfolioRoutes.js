const express = require('express');
const router = express.Router();
const titles = require('./json/titles.json');
// const skills = require('./json/skills.json');
const socials = require('./model/social.js');
const projects = require('./model/project.js');
const skills = require('./model/skill');
const experiences = require('./model/experience');
const academics = require("./model/academic");
const certificates = require("./model/certificate");
const achievements = require('./model/achievement');
const voluntaries = require('./model/voluntary');
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
    info: {
      name: "Tanveer Hoque",
      title: "Software Developer",
      description: "Experienced Developer with a demonstrated history of working in the computer software industry. Skilled in Problem solving, Software Development, Web Development, Android Development, Embedded Systems Development. Strong ideas and working ability with a Masters Degree focused in Computer Science.",
      phone: "+44 (0) 7767651102",
      email: "thaque20@gmail.com",
      username: "tanvoid0",
      website: "tanveerhoque.com",
      address: "Princess Street, Treforest, Pontypridd, CF37 1RY, Wales",
    },
    languages: [
      {
        name: "English",
        status: "Fluent",
      },
      {
        name: "Bengali",
        status: "Native",
      },
      {
        name: "Hindi",
        status: "Fluent",
      },
      {
        name: "Urdu",
        status: "Fluent"
      },
    ],
    academics: academics,
    certificates: certificates,
    achievements: achievements,
    hobbies: [
      {
        name: "Video Game",
        icon: "fas fa-gamepad"
      },
      {
        name: "Travelling",
        icon: "fas fa-plane-departure",
      },
      {
        name: "Reading",
        icon: "fas fa-book"
      },
      {
        name: "Cycling",
        icon: "fas fa-biking"
      }
    ],
    name: "Tanveer",
    titles: titles,
    image: "https://avatars.githubusercontent.com/u/22547527?s=400&u=943944cf0253caf99eb8015d74d85f1a73f5ea9f&v=4",
    about: "👋 I'm Tanveer.<br/>Experienced Developer with a demonstrated history of working in the computer software industry.<br/>Skilled in Problem solving, Software Development, Web Development, Android Development, Embedded Systems Development. Strong ideas and working ability with a Masters Degree focused in Computer Science.<br/><br/>Typically I love to work with Flutter and Nodejs.",
    skills: skills,
    socials: socials,
    projects: projectsList,
    experiences: experiences,
    voluntaries: voluntaries,
    tags: uniqueTags,
  });
});

router.get('/cv', (req, res) => {
  // res.setHeader("Content-Security-Policy", "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;**script-src 'self' http://onlineerp.solution.quebec 'unsafe-inline' 'unsafe-eval';** ");
  return res.render('portfolio/cv', {title: 'Hey', message: "Hello there"});
});

module.exports = router;