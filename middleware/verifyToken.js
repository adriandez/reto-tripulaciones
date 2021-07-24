const verify = {
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
};

module.exports = verify;
