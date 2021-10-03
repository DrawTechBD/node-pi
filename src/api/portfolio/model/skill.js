const iconToClass = require("../iconToClass");

class Skill {
  /**
   *
   * @param {String} name - Name of Skill
   * @param {String} icon - css icon name
   * @param {String} image - image url
   */
  constructor(name, icon="", image="https://cdn.iconscout.com/icon/free/png-256/code-280-460136.png") {
    this.name = name;
    this.icon = iconToClass(name);
    this.image = image;
    return {name: this.name, icon: this.icon, image: this.image};
  }
}

skills = {
  core: [
    new Skill('Flutter'),
    new Skill('ExpressJS'),
    new Skill('ReactJS'),
  ],
  language: [
    new Skill('Dart'),
    new Skill('JavaScript'),
    new Skill('TypeScript'),
    new Skill('Python'),
    new Skill('Java'),
    new Skill('Arduino'),
    new Skill('Bash'),
    new Skill('c++'),
  ],
  platform: [
    {
      name: "Cross Platform",
      framework: [
        new Skill("Flutter"),
        new Skill("React Native"),
      ],
    },
    {
      name: "Web",
      framework: [
        new Skill("ReactJS"),
        new Skill("VueJS"),
        new Skill("Laravel"),
        new Skill("Flask"),
        new Skill("Django"),
        new Skill(".NET Core"),
      ],
    },
    {
      name: "Mobile",
      framework: [
        new Skill("Android"),
      ],
    },
    {
      name: "Desktop",
      framework: [
        new Skill("ElectronJS"),
        new Skill("Swing"),
        new Skill(".NET Desktop"),
      ],
    },
    {
      name: "IoT",
      framework: [
        new Skill('Arduino'),
        new Skill('Raspberry Pi'),
      ]
    }
  ],
  database: [
    new Skill("MongoDB"),
    new Skill("MySQL"),
    new Skill("Firebase Firestore"),
  ],
  other: [
    "Object Oriented Programming",
    "Data Structures & Algorithms",
    "Docker",
    "IoT",
    "REST API",
    "Git",
    "Firebase",
  ],
  oj: [
    {
      name: "HackerRank",
      profile: "",
      image: "",
      progress: "5900+ HackOS",
    },
    {
      name: "URI",
      profile: "",
      image: "",
      progress: "180+ Solved",
    },
    {
      name: "FreeCodeCamp",
      profile: "",
      image: "",
      progress: "286+ points",
    },
    {
      name: "Timus OJ",
      profile: "",
      image: "",
      progress: "286+ Rating",
    },
  ],
}
module.exports = skills;
