const jwt = require("jsonwebtoken");
const mySecret = process.env.SECRET;

const middleware = {
  verifyToken: (req, res, next) => {
    if (typeof req.body.headers["Authorization"] !== undefined) {
      const bearerHeader = req.body.headers["Authorization"];
      const bearerToken = bearerHeader.split(" ")[1];
      req.body.token = bearerToken;
    } else {
      res.sendStatus(403);
    }
    next();
  },
  verifyRoute: (req, res, next) => {
    if (typeof req.body.headers["Authorization"] !== undefined) {
      const bearerHeader = req.body.headers["Authorization"];
      const bearerToken = bearerHeader.split(" ")[1];
      req.body.token = bearerToken;
      const decrypt = jwt.verify(req.body.token, mySecret);
      if (decrypt.auth) next();
    } else {
      res.sendStatus(403);
    }
  },
};

module.exports = middleware;
