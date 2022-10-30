class Controller {
  request = async (req, res, func, status = 200) => {
    try {
      console.debug("Request Parameters", req.params);
      console.debug("Request Body", req.body);
      console.debug("Authenticated User", req.user);
      const data = await func();
      console.debug("Response Body", data);
      res.status(status).json(data);
    } catch (ex) {
      console.log("Exception occurred", ex);
      res.status(null == ex.status ? 500 : ex.status).json(ex);
    }
  }
}

module.exports = Controller;