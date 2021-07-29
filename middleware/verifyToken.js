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
    if (typeof req.headers["authorization"] !== undefined) {
      const bearerHeader = req.headers["authorization"];
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      const decrypt = jwt.verify(req.token, mySecret);
      if (decrypt.auth) next();
    } else {
      res.sendStatus(403);
    }
  },
  verifyRouteUser: (req, res, next) => {
    console.log(req.headers);
    if (typeof req.headers["authorization"] !== undefined) {
      const bearerHeader = req.headers["authorization"];
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      const decrypt = jwt.verify(req.token, mySecret);
      req.body = decrypt;
      if (decrypt.auth) next();
    } else {
      res.sendStatus(403);
    }
  },
  verifyRouteUser2: (req, res, next) => {
    console.log(req.headers);
    if (typeof req.headers["authorization"] !== undefined) {
      const bearerHeader = req.headers["authorization"];
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      const decrypt = jwt.verify(req.token, mySecret);
      req.body = {
        decrypt: decrypt,
        data: req.body
      };
      if (decrypt.auth) next();
    } else {
      res.sendStatus(403);
    }
  },
};

module.exports = middleware;
