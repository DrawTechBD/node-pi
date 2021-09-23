const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    name: "Tanveer",
    titles: [
      "Flutter Developer",
      "Mobile App Developer",
      "Backend Developer",
    ],
    image: "https://avatars.githubusercontent.com/u/22547527?s=400&u=943944cf0253caf99eb8015d74d85f1a73f5ea9f&v=4",
    about: "👋 I'm Tanveer. Experienced Developer with a demonstrated history of working in the computer software industry. Skilled in Problem solving, Software Development, Web Development, Android Development, Embedded Systems Development. Strong ideas and working ability with a Masters Degree focused in Computer Science.\n\nTypically I love to work with Flutter and Nodejs.",
    skills: {
      core: [
        {
          name: "Flutter",
          class: "devicon-flutter-plain colored",
          level: 95,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        },
        {
          name: 'ExpressJS',
          class: "devicon-express-original-wordmark colored",
          level: 95,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg',
        },
        {
          name: "ReactJS",
          class: "devicon-react-original colored",
          level: 95,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
      ],
      language: [
        {
          name: "Dart",
          class: "devicon-dart-plain",
          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original-wordmark.svg",
        },
        {
          name: "JavaScript",
          class: "devicon-javascript-plain",
          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",

        },
        {
          name: "TypeScript",
          class: "devicon-typescript-plain",
        },
        {
          name: "Python",
          class: "devicon-python-plain-wordmark",
        },
        {
          name: "Java",
          class: "devicon-java-plain-wordmark"
        },
        {
          name: "c#",
          class: "devicon-csharp-plain-wordmark",
        },
        {
          name: "Arduino",
          class: "devicon-arduino-plain",
        },
        {
          name: "Bash",
          class: "devicon-bash-plain",
        },
        {
          name: "c++",
          class: "devicon-cplusplus-plain-wordmark"
        },
      ],
      frontend: [
        {
          name: "Flutter",
          class: "devicon-flutter-plain"
        },
        {
          name: "ReactJS",
          class: "devicon-react-original-wordmark"
        },
        {
          name: "React Native",
          class: "devicon-react-original"
        },
        {
          name: "VueJS",
          class: "devicon-vuejs-plain-wordmark",
        },
        // {
        //     name: "Blade",
        //     class: ""
        // },
        // {
        //     name: "Jinja",
        //     class: "",
        // },
        // {
        //     name: "Swing",
        //     class: "",
        // }
      ],
      backend: [
        "ExpressJS",
        "Laravel",
        "Flask",
        "Django",
      ],
      ui: [
        {
          name: "Adobe XD",
          class: "devicon-xd-plain"
        },
        {
          name: "Adobe Photoshop",
          class: "devicon-photoshop-plain"
        },
        {
          name: "Adobe Illustrator",
          class: "devicon-illustrator-plain"
        },
      ],
      platform: [
        {
          name: "Cross Platform",
          framework: [
            {
              name: "Flutter",
              class: "devicon-flutter-plain"
            },
            {
              name: "React Native",
              class: "devicon-react-original"
            },
          ],
        },
        {
          name: "Web",
          framework: [
            {
              name: "ReactJS",
              class: "devicon-react-original-wordmark"
            },
            {
              name: "VueJS",
              class: "devicon-vuejs-plain-wordmark",
            },
            {
              name: "ExpressJS",
              class: "devicon-express-original-wordmark",
            },
            {
              name: "Laravel",
              class: "devicon-laravel-plain-wordmark",
            },
            {
              name: "Flask",
              class: "devicon-flask-original-wordmark",
            },
            {
              name: "Django",
              class: "devicon-django-plain",
            },
            {
              name: ".NET Core",
              class: "devicon-dotnetcore-plain",
            }
          ],
        },
        {
          name: "Mobile",
          framework: [
            {
              name: "Android",
              class: "devicon-android-plain-wordmark",
            },
          ]
        },
        {
          name: "Desktop",
          framework: [
            {
              name: "ElectronJS",
              class: "devicon-electron-original-wordmark"
            },
            {
              name: "Swing",
              class: "devicon-java-plain-wordmark"
            },
            {
              name: ".NET Desktop",
              class: "devicon-dot-net-plain-wordmark",
            }
          ]
        },
        {
          name: "IoT",
          framework: [
            {
              name: "Arduino",
              class: "devicon-arduino-plain-wordmark",
            },
            {
              name: "Raspberry Pi",
              class: "devicon-raspberrypi-line-wordmark",
            }
          ],
        },
      ],
      database: [
        {
          name: "MongoDB",
          class: "devicon-mongodb-plain-wordmark",
        },
        {
          name: "MySQL",
          class: "devicon-mysql-plain-wordmark",
        },
        {
          name: "Firebase Firestore",
          class: "devicon-firebase-plain-wordmark",
        }
      ],
      other: [
        "OOP",
        "Data Structures & Algorithms",
        "REST API",
        "Firebase",
      ],
      oj: [
        "Hackerrank (hackos: 5900+)",
        "URI 182+ solved",
      ],
      tools: [
        {
          name: "git",
          class: "devicon-git-plain",
        },
        {
          name: "Docker",
          class: "devicon-docker-plain-wordmark",
        }
      ],
      icons: [
        {
          "name": "HTML 5",
          "class": "devicon-flutter-plain",
          "level": "95"
        },
        {
          "name": "CSS 3",
          "class": "devicon-express-plain",
          "level": "95"
        },
        {
          "name": "Angular",
          "class": "devicon-angularjs-plain",
          "level": "80"
        },
        {
          "name": "TypeScript",
          "class": "devicon-typescript-plain",
          "level": "90"
        },
        {
          "name": "JavaScript",
          "class": "devicon-javascript-plain",
          "level": "70"
        },
        {
          "name": "Sass",
          "class": "devicon-sass-original",
          "level": "75"
        },
        {
          "name": "Bootstrap",
          "class": "devicon-bootstrap-plain",
          "level": "85"
        },
        {
          "name": "C#",
          "class": "devicon-csharp-plain",
          "level": "65"
        },
        {
          "name": "MySql",
          "class": "devicon-mysql-plain",
          "level": "60"
        }
      ]
    },
    socials: [
      {
        "name": "github",
        "url": "https://github.com/tanvoid0",
        "class": "fab fa-github"
      },
      {
        "name": "instagram",
        "url": "https://www.instagram.com/tanvoid0",
        "class": "fab fa-instagram"
      }
    ],
    projects: [
      {
        "title": "Eco Friend",
        "slug": "eco-friend",
        "started": "2018",
        "status": "Discontinued",
        "description": "Embedded system to monitor, log home environment variables and determine plant survival using ESP8266 and Laravel REST API",
        "images": [
          "http://localhost:5000/cdn/projects/eco-friend/Connection Diagram.png",
          "http://localhost:5000/cdn/projects/eco-friend/dead_tree.jpg",
          "http://localhost:5000/cdn/projects/eco-friend/Diagram.png",
          "http://localhost:5000/cdn/projects/eco-friend/Flow.png",
          "http://localhost:5000/cdn/projects/eco-friend/Flowchart.png",
          "http://localhost:5000/cdn/projects/eco-friend/Node+csoil.png",
          "http://localhost:5000/cdn/projects/eco-friend/Parts-Bill.png",
          "http://localhost:5000/cdn/projects/eco-friend/Soil Sensor Flow Chart.png",
        ],
        "url": "https://github.com/tanvoid0/eco-friend",
        "technologies": [
          {
            name: "ESP8266",
            class: "devicon-arduino-plain-wordmark",
          },
          {
            name: "Django",
            class: "devicon-django-plain-wordmark",
          },
          {
            name: "Laravel",
            class: "devicon-laravel-plain-wordmark",
          },
        ],
        tags: [
          "IoT",
          "Data Filtering",
        ],
        platforms: [
          "IoT",
          "Web",
        ]
      },
      {
        "title": "Qinter",
        "slug": "qinter",
        "started": "2018",
        "status": "Ongoing",
        "description": "Mobile app to find lost belongings",
        "images": [
          "http://localhost:5000/cdn/projects/eco-friend/Parts-Bill.png",
          "http://localhost:5000/cdn/projects/eco-friend/Parts-Bill.png",
        ],
        "url": "https://github.com/tanvoid0/qinter",
        "technologies": [
          {
            name: "Flutter",
            class: "",
          },
          {
            name: "ExpressJS",
            class: "",
          }
        ],
        platforms: [
          "Android",
          "IoS",
          "Web"
        ],
      },

      // {
      //     "title": "",
      //     "slug":"",
      //     "started": "",
      //     "status": "",
      //     "description": "",
      //     "images": [
      //         "",
      //     ],
      //     "url": "",
      //     "technologies": [
      //         {
      //             name: "",
      //             class: "",
      //         },
      //     ],
      // },
    ],
    projs: [
      "qinter: Mobile app to find lost belongings.\n" +
      "Gamestop: A cross platform Game review app built with flutter.\n" +
      "Password Manager: A .net web app to manage user passwords in encrypted format.\n" +
      "7 DOF Robot: A 7 DOF robot with basic controlling & movements using Arduino Nano.\n" +
      "Simulating single server queue: A single queue customer simulation web app using JS.\n" +
      "Prescription: Digital Prescription Management system using Laravel, jQuery.",
      "Vlog: A video blog on Laravel, YouTube API.\n" +
      "Teamwork: Gaming and streaming community blog & scheduling web app using Laravel, Vue.\n" +
      "Blood bank: Smart blood bank management system using Laravel.\n" +
      "Chat App: Real-time chat web app based on React, Socket.io\n" +
      "Genect: A machine learning project in the flask to determine gender based on a user’s name.\n" +
      "Audio sensing lights: Raspberry pi project to convert audio sensitivity to RGB lights.\n" +
      "Heart rate sensor: Arduino project to measure heart rate.\n" +
      "Power Timer: c#.NET and Scripting app to set the timer for windows auto shutdown, restart, sleep,\n" +
      "hibernate.\n" +
      "Coolpad: Notepad to edit, encrypt & decrypt data, for secure diary.\n" +
      "Mailbomb: Mailbomb testing app with c#.NET.\n" +
      "Snake & ladders: Classic snake & ladders game built with Swing.\n" +
      "Who is the thief: Classic Android police & thief lottery game using computer & human as a 4-player\n" +
      "game."
    ],
    experiences: [
      {
        name: "Internship",
        icon: "fas fa-briefcase",
        experiences: [
          {
            institution: "Samsung Research & Development Institute Bangladesh",
            address: "Dhaka, Bangladesh",
            title: "Intern",
            year: "2020",
            topics: [
              "Algorithms",
              "Data Structures",
              "Problem Solving"
            ]
          }
        ]
      },
      {
        name: "Voluntary",
        icon: "fas fa-hands-helping",
        experiences: [
          {
            institution: "Despotic Soft",
            address: "Dhaka, Bangladesh",
            title: "Trainer",
            year: "2019",
            topics: [
              "Training on Introduction to Laravel Framework",
              "Database Designing & Modeling",
              "REST API Testing",
              "Web App structuring, code splitting & design kit.",
            ]
          },
          {
            institution: "Sotej",
            address: "Dhaka, Bangladesh",
            title: "Team Member",
            year: "2019",
            topics: [
              "Pilot Studies",
              "Business Planning",
              "Administrative Management"
            ],
          },
          {
            institution: "Computer & Programming Club, Daffodil International University",
            address: "Dhaka, Bangladesh",
            title: "Vice President (Software Development Wing)",
            year: "2018",
            details: [
              "Manage and organise different programmes and events",
              "Providing Service to the university community (students and staffs). Promoting & encouraging software development.",
              "Discussed and solved the problems faced by developers (students’) community. The whole process helped me to be a good listener and a good mentor.",
              "Workshops Organized: GitHub, SEO",
              "Training Organized: Web Development with PHP, Database Management with Java, Introduction to UI/UX",
            ],
            topics: [
              "Training Organize",
              "Workshop Organize",
              "Administrative Work",
            ]
          },
          {
            institution: "Computer & Programming Club, Daffodil International University",
            address: "Dhaka, Bangladesh",
            title: "Trainer",
            year: "2018",
            topics: [
              "Web Development with PHP",
              "Database Management with Java (Co-trainer)"
            ],
          },
          {
            institution: "Daffodil International University",
            address: "Dhaka, Bangladesh",
            year: "2017",
            title: "Lab Assistant",
            topics: [
              "Object Oriented Programming",
              "Programming & Problem Solving",
              "Data Structures"
            ],
          },

        ],
      },
      {
        name: "Achievements",
        icon: "fas fa-trophy",
        experiences: [
          {
            title: "Hult Prize Mumbai Regionals 2019 finale",
            address: "Mumbai, India",
            description: "Became top 6 with the idea of fresh food cart delivery & online marketplace with the challenge of\n" +
              "creating job for 10,000 youths. Had to beat 560 teams in campus and 60 international teams in India.",
            year: "2019",
          },
          {
            title: "DIU ICT Carnival 2019 finale",
            address: "Daffodil International University, Dhaka, Bangladesh",
            description: "Became finalists with the app (qHunter) which helps to find lost belongings.",
            year: "2019",
          },
          {
            title: "Hult Prize Campus 2017 finale",
            address: "Daffodil International University, Dhaka, Bangladesh",
            description: "Secured top 6 position with a smart device idea for gardening at home using embedded device with the challenge of renewable energy.",
            year: "2017",
          },
          {
            title: "Inter Section Programming Contest (Team)",
            address: "Daffodil International University, Dhaka, Bangladesh",
            description: "Winner of the inter section problem solving contest",
            year: "2016",
          },
        ],
      }
    ],
  });
  // return res.json({
  //       "name": "Tanveer",
  //       "titles": [
  //          "Flutter Developer",
  //          "Mobile App Developer",
  //          "Backend Developer",
  //       ],
  //       "social": [
  //          {
  //             "name": "github",
  //             "url": "https://github.com/tanvoid0",
  //             "class": "fab fa-github"
  //          },
  //          {
  //             "name": "instagram",
  //             "url": "https://www.instagram.com/tanvoid0",
  //             "class": "fab fa-instagram"
  //          }
  //       ],

  //
  //    "skills": {
  //       "icons": [
  //          {
  //             "name": "HTML 5",
  //             "class": "devicon-html5-plain",
  //             "level": "95"
  //          },
  //          {
  //             "name": "CSS 3",
  //             "class": "devicon-css3-plain",
  //             "level": "95"
  //          },
  //          {
  //             "name": "Angular",
  //             "class": "devicon-angularjs-plain",
  //             "level": "80"
  //          },
  //          {
  //             "name": "TypeScript",
  //             "class": "devicon-typescript-plain",
  //             "level": "90"
  //          },
  //          {
  //             "name": "JavaScript",
  //             "class": "devicon-javascript-plain",
  //             "level": "70"
  //          },
  //          {
  //             "name": "Sass",
  //             "class": "devicon-sass-original",
  //             "level": "75"
  //          },
  //          {
  //             "name": "Bootstrap",
  //             "class": "devicon-bootstrap-plain",
  //             "level": "85"
  //          },
  //          {
  //             "name": "C#",
  //             "class": "devicon-csharp-plain",
  //             "level": "65"
  //          },
  //          {
  //             "name": "MySql",
  //             "class": "devicon-mysql-plain",
  //             "level": "60"
  //          }
  //       ]
  //    }
  // });
});

module.exports = router;