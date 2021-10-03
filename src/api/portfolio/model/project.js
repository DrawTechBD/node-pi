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
      this.description = `# ${title}`;
      fs.writeFileSync(`./public/markdowns/${slug}.md`, this.description);
    }
    // this.description = markdown.markdown(this.description);
    this.images = [];
    try {
      fs.readdirSync(`./public/projects/${slug}/`).forEach(image => {
        this.images.push(`${cdn}/${slug}/${image}`);
      });
    } catch (e) {
      // this.images = [`${cdn}/dummy.png`];
      this.images = ["https://www.designveloper.com/wp-content/uploads/2020/07/Software-Development_Banner-illustration.png"];
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
    'Problem Solving',
    'problem-solving',
    '2016',
    'Release',
    null,
    [
      'c++',
      'python',
    ],
    [
      "Online Judge",
      "Problem Solving",
      "Critical Thinking",
      "Interview prep",
    ],
    [
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
  new Project(
    "MovieFlix",
    "movieflix",
    "2021",
    "Deployed",
    null,
    [
      "Flutter",
    ],
    [
      "Movie",
      "Review"
    ],
    [
      "Cross Platform",
    ],
    cdn,
  ),
  new Project(
    "Password Manager",
    "password-manager",
    "2021",
    "Deployed",
    null,
    [
      ".NET core",
    ],
    [
      "Password",
      "Cryptography",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "7 DOF Robot",
    "7-dof-robot",
    "2019",
    "Deployed",
    null,
    [
      "Arduino",
    ],
    [
      "Robot",
      "Embedded"
    ],
    [
      "Embedded",
    ],
    cdn,
  ),

  new Project(
    "Queue Simulation",
    "single-server-queue-sim",
    "2017",
"Deployed",
    null,
    [
      "JavaScript"
    ],
    [
      "Simulation",
      "Queue",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Prescription",
    "prescription-management",
    "2017",
    "Deployed",
    null,
    [
      "Laravel",
      "jQuery",
    ],
    [
      "Management System",
      "PDF",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Vlog",
    "vlog",
    "2018",
    "Deployed",
    null,
    [
      "Laravel",
    ],
    [
      "vlog",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Teamwork",
    "teamwork",
    "2019",
    "Ongoing",
    null,
    [
      "Laravel",
      "VueJS",
    ],
    [
      "Management System",
      "Game Scheduler",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Blood Bank",
    "blood-bank",
    "2018",
    "Deployed",
    null,
    [
      "Laravel",
    ],
    [
      "Management",
      "Mailing",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Chat App",
    "chat-app",
    "2020",
    "Deployed",
    null,
    [
      "ReactJS",
    ],
    [
      "Chat",
      "Socket"
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Genect",
    "genect",
    "2019",
    "Deployed",
    null,
    [
      "jQuery",
      "Python",
    ],
    [
      "Data Mining",
      "Machine Learning",
    ],
    [
      "Web",
    ],
    cdn,
  ),
  new Project(
    "Audio sensing lights",
    "audio-sensing-lights",
    "2019",
    "Deployed",
    null,
    [
      "Raspberry Pi",
      "IoT",
    ],
    [
      "Lights",
      "Embedded",
    ],
    [
      "Raspberry Pi",
    ],
    cdn,
  ),
  // new Project(
  //   "Heart rate sensor",
  // ),
  new Project(
    "Power Timer",
    "power-timer",
    "2017",
    "Deployed",
    null,
    [
      ".NET Desktop",
    ],
    [
      "desktop",
      "power-off timer"
    ],
    [
      "Windows",
    ],
    cdn,
  ),
  new Project(
    "Coolpad",
    "coolpad",
    "2016",
    "Deployed",
    null,
    [
      "Swing",
    ],
    [
      "Desktop",
      "Notepad",
      "Editor",
      "Cryptography",
    ],
    [
      "Windows",
      "Linux",
      "Mac",
    ],
    cdn,
  ),
  new Project(
    "Mailbomb",
    "mailbomb",
    "2017",
    "Deployed",
    null,
    [
      ".NET Desktop",
    ],
    [
      "Mailbomb",
      "Cyber Testing",
    ],
    [
      "Windows",
    ],
    cdn,
  ),
  new Project(
    "Mailbomb-script",
    "mailbomb-script",
    "2017",
    "Deployed",
    null,
    [
      "Python",
    ],
    [
      "Script",
      "Cyber Testing",
    ],
    [
      "Windows",
      "Mac",
      "Linux",
    ],
    cdn,
  ),
  new Project(
    "Snake & Ladders",
    "snake-and-ladders",
    "2017",
    "Deployed",
    null,
    [
      "Swing",
      "Java"
    ],
    [
      "Game",
    ],
    [
      "Windows",
      "Mac",
      "Linux",
    ],
    cdn,
  ),
  new Project(
    "Snake 3D",
    "snake-3d",
    "2018",
    "Deployed",
    null,
    [
      "Unity",
      "c#",
    ],
    [
      "Game",
    ],
    [
      "Windows",
    ],
    cdn,
  ),
  new Project(
    "Who is the thief",
    "who-is-the-thief",
    "2018",
    "Deployed",
    null,
    [
      "Android",
      "Java",
    ],
    [
      "Game",
      "Android",
    ],
    [
      "Android",
    ],
    cdn,
  ),
];

module.exports = projects;