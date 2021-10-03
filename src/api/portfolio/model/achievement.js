class Achievement {
  constructor(title, year, address, achievement, description) {
    this.title = title;
    this.year = year;
    this.address = address;
    this.achievement = achievement;
    this.description = description;
    return {title, year, address, achievement, description};
  }
}

const achievements = [
  new Achievement(
    "Hult Prize Mumbai Regionals 2019 finale",
    "2019",
    "Mumbai, India",
    "Top 6 finalist",
    "Idea of<strong> Fresh food cart delivery & online marketplace </strong> with the challenge of creating a job for 10,000 youths. Had to\n <strong> beat 560 teams on campus </strong> and <strong> 60 international teams in India.</strong>"
  ),
  new Achievement(
    "DIU ICT Carnival 2019 finale",
    "2019",
    "Daffodil International University, Dhaka, Bangladesh",
    "Finalist",
    "Qinter, an app that helps to find <strong>find lost belongings</strong>"
  ),
  new Achievement(
    "Hult Prize Campus 2017 finale",
    "2017",
    "Daffodil International University, Dhaka, Bangladesh",
    "Top 6 Campus Finalist",
    "Business proposal of a Smart device that helps to do smart gardening with the challenge of renewable energy",
  ),
  new Achievement(
    "Inter Section Programming Contest (Team)",
    "2016",
    "Daffodil International University, Dhaka, Bangladesh",
    "Winner",
    null,
  ),
]

module.exports = achievements;