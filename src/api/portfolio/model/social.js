const iconToClass = require("../iconToClass");

class Social {
  /**
   *
   * @param {String} name
   * @param {String} url
   * @param  {String} icon
   * @returns {{name, icon, url}}
   */
  constructor(name, url, icon="") {
    this.name = name;
    this.url = url;
    this.icon = iconToClass(name);
    return {name: this.name, url: this.url, icon: this.icon};
  }
}

socials = [
  new Social('Github', 'https://github.com/tanvoid0'),
  new Social("Instagram", "https://instagram.com/tanvoid0"),
];

module.exports = socials;
