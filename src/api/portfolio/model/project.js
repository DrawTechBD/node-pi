const iconToClass = require("../iconToClass");
const fs = require('fs');
const markdown = require('markdown-js');


class Project {
  /**
   *
   * @param {String} title
   * @param {String} slug
   * @param {String} started
   * @param {String} status
   * @param {String} url
   * @param {Array} technologies
   * @param {Array} tags
   * @param {Array} platforms
   * @param {String} cdn
   */
  constructor(title, slug, started, status, url, technologies, tags, platforms, cdn) {
    this.title = title;
    this.slug = slug;
    this.started = started;
    this.status = status;
    this.description = "";
    try{
      this.description = fs.readFileSync(`./public/markdowns/${slug}.md`, 'utf8');
    } catch(e){
      this.description = `# ${slug.toUpperCase()}`;
      fs.writeFileSync(`./public/markdowns/${slug}.md`, this.description);
    }
    this.description = markdown.markdown(this.description);
    this.images = [];
    try {
      fs.readdirSync(`./public/projects/${slug}/`).forEach(image => {
        this.images.push(`${cdn}/${slug}/${image}`);
      });
    } catch (e) {
      this.images = [`${cdn}/dummy.png`];
    }
    this.url = url;
    this.repo = `https://github.com/tanvoid0/${slug}`
    this.technologies = technologies.map((item) => {
      return {
        name: item,
        icon: iconToClass(item)
      }
    });
    this.tags = tags;
    this.platforms = platforms;

    return {
      title: this.title,
      slug: this.slug,
      started: this.started,
      status: this.status,
      description: this.description,
      images: this.images,
      url: this.url,
      repo: this.repo,
      technologies: this.technologies,
      tags: this.tags,
      platforms: this.platforms,
    }
  }
}

const projects = (cdn) => [
  new Project(
    "Eco Friend",
    "eco-friend",
    "2018",
    "Discontinued",
    null,
    [
      "ESP8266",
      "Django",
      "Laravel"
    ],
    [
      "IoT",
      "PyCV",
      "Pandas"
    ],
    [
      "IoT",
      "Web"
    ],
    cdn,
  ),
  new Project(
    "Qinter",
    "qinter",
    "2018",
    "On going",
    "https://github.com/tanvoid0/qinter",
    [
      "Flutter",
      "ExpressJS",
    ],
    [
      "Mobile App",
      "QR",
    ],
    [
      "Android",
      "iOS",
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Gamestop",
    "gamestop",
    "2021",
    "Deployed",
    null,
    [
      "Flutter",
      "ExpressJS",
    ],
    [
      "Game Review",
      "Mobile App",
    ],
    [
      "Android",
      "iOS",
      "Windows",
      "Linux",
      "Mac",
    ],
    cdn,
  ),
  // new Project(
  //   "MovieFlix",
  //   "movieflix",
  //   "2021",
  //   "Deployed",
  //   "Movie Details Application",
  // ),
  // new Project(
  //   "Password Manager",
  // ),
  // new Project(
  //   "7 DOF Robot",
  // ),
  //
  // new Project(
  //   "Simulating Single Server Queue",
  //
  // ),
  // new Project(
  //   "Prescription",
  //
  // ),
  // new Project(
  //   "Vlog",
  // ),
  // new Project(
  //   "Teamwork",
  // ),
  // new Project(
  //   "Blood Bank",
  // ),
  // new Project(
  //   "Chat App",
  // ),
  // new Project(
  //   "Genect",
  // ),
  // new Project(
  //   "Audio sensing lights",
  // ),
  // new Project(
  //   "Heart rate sensor",
  // ),
  // new Project(
  //   "Power Timer",
  // ),
  // new Project(
  //   "Coolpad",
  // ),
  // new Project(
  //   "Mailbomb",
  // ),
  // new Project(
  //   "Snake & Ladders",
  // ),
  // new Project(
  //   "Who is the thief"
  // ),
];

module.exports = projects;