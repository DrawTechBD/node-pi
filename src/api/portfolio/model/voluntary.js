class Voluntary {
  constructor(title, institution, address, year, description) {
    this.title = title;
    this.institution = institution;
    this.address = address;
    this.year = year;
    this.description = description;
  }
}

const voluntaries = [
  new Voluntary(
    "Trainer",
    "Despotic Soft",
    "Dhaka, Bangladesh",
    "2019",
    "<ul>" +
    "<li>Training on Introduction to Laravel Framework</li>" +
    "<li>Database Designing & Modeling</li>" +
    "<li>REST API Testing</li>" +
    "<li>Web App structuring, code splitting & design kit</li>" +
    "</ul>",
  ),
  new Voluntary(
    "Team Member",
    "Sotej",
    "Dhaka, Bangladesh",
    "2019",
    "<ul>" +
    "<li>Pilot Studies</li>" +
    "<li>Business Planning</li>" +
    "<li>Administrative Management</li>" +
    "</ul>",
  ),
  new Voluntary(
    "Vice President (Software Development Wing)",
    "Computer & Programming Club, Daffodil International University",
    "Dhaka, Bangladesh",
    "January 2018 - December 2018",
    "<ul>\n" +
    "            <li>Administrative Work</li>\n" +
    "            <li>Manage and organize programs and events</li>\n" +
    "            <li>Promoting & Encouraging software Development</li>\n" +
    "            <li>Discussion and solution to problems faced by the developers (students') community</li>\n" +
    "            <li>Workshops organized: <strong>GitHub, SEO</strong></li>\n" +
    "            <li>Training organized: <strong>Web Development with PHP, Database Management with Java</strong></li>\n" +
    "          </ul>"
  ),
  new Voluntary(
    "Trainer",
    "Computer & Programming Club, Daffodil International University",
    "Dhaka, Bangladesh",
    "2018",
    "<ul>" +
    "<li>Web Development with PHP</li>" +
    "<li>Database Management with Java (Co-trainer)</li>" +
    "</ul>"
  ),
  new Voluntary(
    "Lab Assistant",
    "Daffodil International University",
    "Dhaka, Bangladesh",
    "2017",
    "<ul>" +
    "<li>Object Oriented Programming</li>"+
    "<li>Programming & Problem Solving</li>"+
    "<li>Data Structures</li>"+
    "</ul>"
  ),
]

module.exports = voluntaries;