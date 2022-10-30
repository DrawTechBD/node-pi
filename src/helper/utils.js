const passport = require("passport");
exports.isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

exports.authenticate = passport.authenticate("jwt", {session: false}, null);
