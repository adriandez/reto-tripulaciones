const { user } = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const mySecret = process.env.SECRET;
const clientSecret = process.env.CLIENT_SECRET;

const routes = {
  checkToken: async (req, res) => {
    let token = req.body.token;
    const decrypt = jwt.verify(token, mySecret);
    res.status(200).json(decrypt);
  },
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    const entry = { name: name, email: email, password: hashedPassword };
    try {
      await user
        .create(entry)
        .then((newUser) => {
          console.log(newUser);
        })
        .catch((error) => {
          console.log(error);
        });
      res.status(200).json({ message: `CREATED User: ${entry.name}` });
    } catch (err) {
      console.log(err);
    }
  },
  findUser: async (req, res) => {
    try {
      const response = await user.findOne({ where: req.body });
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const dbRes = await user.findOne({ where: { email: email } });
      let user_ID = dbRes.dataValues.user_ID;
      let nameUser = dbRes.dataValues.name;
      let passUserDatabase = dbRes.dataValues.password;
      const isMatch = await bcrypt.compare(password, passUserDatabase);
      if (dbRes !== null && isMatch) {
        const payload = {
          user_ID: user_ID,
          name: nameUser,
          auth: true,
          google: false,
        };
        jwt.sign(
          payload,
          mySecret,
          (err, token) => {
            res.cookie("reto", token);
            res.json({
              mensaje: "El usuario no existe",
              status: "true",
              token: token,
            });
          }
        );
      } else {
        res.json({
          mensaje: "Validación erronea",
          status: "false",
          token: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  googleLogin: async (req, res) => {
    const token = req.body.token;
    const verify = async () => {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload2 = ticket.getPayload();
      const payload = {
        user_ID: payload2["sub"],
        name: payload2["given_name"],
        auth: true,
        google: true,
      };
      jwt.sign(payload, mySecret, (err, token) => {
        res.cookie("reto", token);
        res.json({
          mensaje: "Usuario Verificado",
          status: "true",
          token: token,
        });
      });
    };
    verify().catch(console.error);
  },
  posts: (req, res) => {
    try {
      const decrypt = jwt.verify(req.body.token, mySecret);
      if (decrypt.auth) res.send("success")
    } catch (err) {
      console.log(err);
      res.sendStatus(403);
    }
  },
};

module.exports = routes;
