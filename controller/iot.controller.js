const helper = require("./helper");

exports.getIot = async (req, res) => {
  try {
    res.json({msg: "Hello world!"});
  } catch(err) {
    res.status(500).json({data: err});
  }
}
