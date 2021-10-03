class Experience {
  /**
   * @param {String} institution
   * @param {String} address
   * @param {String} title
   * @param {String} year
   * @param {Array} topics
   * @param {Array} details
   * @param {String} description
   * @returns {{institution, address, year, topics, description, details, title}}
   */
  constructor(institution, address, title, year, topics, details, description) {
    this.institution = institution;
    this.address = address;
    this.title = title;
    this.year = year;
    this.topics = topics;
    this.details = details;
    this.description = description;

    return {
      institution: this.institution,
      address: this.address,
      title: this.title,
      year: this.year,
      topics: this.topics,
      details: this.details,
      description: this.description
    };
  }
}
const experiences = [
  new Experience(
    "Samsung Research & Development Institute Bangladesh",
    "Dhaka, Bangladesh",
    "Intern",
    "2020",
    [
      "Algorithms",
      "Data Structures",
      "Problem Solving"
    ],
    null,
    null
  ),
];

// const experiences = [
//   {
//     name: "Internship",
//     icon: "fas fa-briefcase",
//     experiences: [
//       new Experience(
//         "Samsung Research & Development Institute Bangladesh",
//         "Dhaka, Bangladesh",
//         "Intern",
//         "2020",
//         [
//           "Algorithms",
//           "Data Structures",
//           "Problem Solving"
//         ],
//         null,
//         null
//       ),
//     ]
//   },
//   {
//     name: "Voluntary",
//     icon: "fas fa-hands-helping",
//     experiences: [
//       new Experience(
//         "Despotic Soft",
//         "Dhaka, Bangladesh",
//         "Trainer",
//         "2019",
//         [
//           "Training on Introduction to Laravel Framework",
//           "Database Designing & Modeling",
//           "REST API Testing",
//           "Web App structuring, code splitting & design kit."
//         ],
//         null,
//         null,
//       ),
//       new Experience(
//         "Sotej",
//         "Dhaka, Bangladesh",
//         "Team Member",
//         "2019",
//         [
//           "Pilot Studies",
//           "Business Planning",
//           "Administrative Management"
//         ],
//         null,
//         null,
//       ),
//       new Experience(
//         "Computer & Programming Club, Daffodil International University",
//         "Dhaka, Bangladesh",
//         "Vice President (Software Development Wing)",
//         "2018",
//         [
//           "Training Organize",
//           "Workshop Organize",
//           "Administrative Work",
//         ],
//         [
//           "Manage and organise different programmes and events",
//           "Providing Service to the university community (students and staffs). Promoting & encouraging software development.",
//           "Discussed and solved the problems faced by developers (students’) community. The whole process helped me to be a good listener and a good mentor.",
//           "Workshops Organized: GitHub, SEO",
//           "Training Organized: Web Development with PHP, Database Management with Java, Introduction to UI/UX",
//         ],
//       ),
//       new Experience(
//         "Computer & Programming Club, Daffodil International University",
//         "Dhaka, Bangladesh",
//         "Trainer",
//         "2018",
//         [
//           "Web Development with PHP",
//           "Database Management with Java (Co-trainer)"
//         ],
//         null,
//         null,
//       ),
//       new Experience(
//         "Daffodil International University",
//         "Dhaka, Bangladesh",
//         "Lab Assistant",
//         "2017",
//         [
//           "Object Oriented Programming",
//           "Programming & Problem Solving",
//           "Data Structures"
//         ],
//         null,
//         null,
//       ),
//     ],
//   },
//   {
//     name: "Achievements",
//     icon: "fas fa-trophy",
//     experiences: [
//       new Experience(
//         "Hult Prize Mumbai Regionals 2019 finale",
//         "Mumbai, India",
//         "Top 6 finalist",
//         "2019",
//         null,
//         null,
//         "Secured top 6 position with the idea of fresh food cart delivery & online marketplace with the challenge of creating job for 10,000 youths. Had to beat 560 teams in campus and 60 international teams in India.",
//       ),
//       new Experience(
//         "DIU ICT Carnival 2019 finale",
//         "Daffodil International University, Dhaka, Bangladesh",
//         "Finalist",
//         "2019",
//         null,
//         null,
//         "Became finalists with the app (qHunter) which helps to find lost belongings."
//       ),
//       new Experience(
//         "Inter Section Programming Contest (Team)",
//         "Daffodil International University, Dhaka, Bangladesh",
//         "Winner",
//         "2016",
//         null,
//         null,
//         "Winner of the inter section problem solving contest"
//       ),
//     ],
//   }
// ];

module.exports = experiences;