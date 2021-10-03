class Certificate {
  constructor(title, institution, address, year, description) {
    this.title = title;
    this.institution = institution;
    this.address = address;
    this.year = year;
    this.description = description;
    return {
      title,
      institution,
      address,
      year,
      description,
    };
  }
}

const certificates = [
  new Certificate("Cyber Security", "Arena Web Security", "Dhaka, Bangladesh", "August 2018", "Tested website security from <strong>SQL Injections, XSS, DDoS, redirect bypass,</strong> etc."),
  new Certificate("Advanced Graphics Design & Outsourcing", "Bangladesh Computer Council", "Dhaka, Bangladesh", "September 2015", "Learned to use <strong>Adobe Photoshop, Adobe Illustrator, and Freelancing market</strong>"),
];

module.exports=certificates;