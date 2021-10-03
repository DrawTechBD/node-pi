class Academic {
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

const academics = [
  new Academic("M.Sc. in Computer Science", "University of South Wales", "United Kingdom", "2020-2021", "Dissertation in <strong>Designing & Implementing a Secure Lost & Found Application</strong>"),
  new Academic("B.Sc. in Computer Science & Engineering", "Daffodil International University", "Bangladesh", "2015-2019", "Dissertation in <strong>Data Analysis on Home Forestation using IoT</strong>")
];

module.exports = academics;