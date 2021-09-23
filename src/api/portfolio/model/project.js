const iconToClass = require("../iconToClass");

class Project {
  /**
   *
   * @param {String} title
   * @param {String} slug
   * @param {String} started
   * @param {String} status
   * @param {String} description
   * @param {Array} images
   * @param {String} url
   * @param {Array} technologies
   * @param {Array} tags
   * @param {Array} platforms
   * @param {String} cdn
   */
  constructor(title, slug, started, status, description, images, url, technologies, tags, platforms, cdn) {
    this.title = title;
    this.slug = slug;
    this.started = started;
    this.status = status;
    this.description = description;
    this.images = images.map((image) => `${cdn}/${slug}/${image}`);
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
    "Embedded system to monitor, log home environment variables and determine plant survival using ESP8266 and Laravel REST API",
    [
      "Connection Diagram.png",
      "dead_tree.jpg",
      "Diagram.png",
      "Flow.png",
      "Flowchart.png",
      "Node+csoil.png",
      "Parts-Bill.png",
      "Soil Sensor Flow Chart.png",
    ],
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
];

module.exports = projects;