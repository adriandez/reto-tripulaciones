const { user } = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const mySecret = process.env.SECRET;

const { aseos } = require("../models/seeds");
const { aseo } = require("../utils/database");
const { raiting } = require("../utils/database");
const { userRaiting } = require("../utils/database");

const routes = {
  checkToken: async (req, res) => {
    let token = req.body.token;
    const decrypt = jwt.verify(token, mySecret);
    res.status(200).json(decrypt);
  },
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    const entry = {
      name: name,
      email: email,
      password: hashedPassword,
      tutorial: true,
    };
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
  getAseos: async (req, res) => {
    try {
      const response = await aseo.findAll();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  getByID: async (req, res) => {
    console.log(req.params);
    try {
      const response = await aseo.findOne({ where: req.params });
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  updateRaiting: async (req, res) => {
    console.log(req.body);
    try {
      const response = await raiting
        .update(
          {
            raiting: req.body.raiting,
          },
          { where: { codigoAseo: req.body.codigoAseo } }
        )
        .then(() => res.status(200).json({ message: "Thank you for rating" }));
    } catch (err) {
      console.log(err);
    }
  },
  ceateUserRaiting: async (req, res) => {
    const entry = req.body;
    try {
      await userRaiting
        .create(entry)
        .then((newEntry) => {
          console.log(newEntry);
        })
        .catch((error) => {
          console.log(error);
        });
      res.status(200).json({ message: "Success!" });
    } catch (err) {
      console.log(err);
    }
  },
  updateUserRaiting: async (req, res) => {
    console.log(req.body);
    try {
      const response = await userRaiting
        .update(
          {
            userRaiting: req.body.userRaiting,
          },
          {
            where: {
              user_ID: req.body.user_ID,
              codigoAseo: req.body.codigoAseo,
            },
          }
        )
        .then(() => res.status(200).json({ message: "Update" }));
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
      let tutorialD = dbRes.dataValues.tutorial;
      let passUserDatabase = dbRes.dataValues.password;
      const isMatch = await bcrypt.compare(password, passUserDatabase);
      if (dbRes !== null && isMatch) {
        const payload = {
          user_ID: user_ID,
          name: nameUser,
          tutorial: tutorialD,
          auth: true,
          google: false,
        };
        jwt.sign(payload, mySecret, (err, token) => {
          res.cookie("reto", token);
          res.json({
            mensaje: "El usuario no existe",
            status: "true",
            token: token,
          });
        });
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
  seed: (req, res) => {
    try {
      aseos.forEach((wc) => {
        aseo
          .create(wc)
          .then((newWc) => {
            console.log(newWc);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      aseos.forEach((wc) => {
        const rait = {
          codigoAseo: wc.codigoAseo,
        };
        raiting
          .create(rait)
          .then((newRait) => {
            console.log(newRait);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      res.status(200).json({ message: "Thank you for feeding aseos" });
    } catch (err) {
      console.log(err);
    }
  },
  posts: async (req, res) => {
    try {
      const decrypt = jwt.verify(req.body.token, mySecret);
      const resp = await user.findOne({ where: { user_ID: decrypt.user_ID } });
      res.status(200).json({ tutorial: resp.tutorial });
    } catch (err) {
      console.log(err);
      res.sendStatus(403);
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
  getByAseoID: async (req, res) => {
    console.log("LE LLEGAAAAAAAAAAAA");

    console.log(req.params);
    try {
      const response = await aseo.findOne({ where: req.params });

      console.log(response);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  getRatingWc: async (req, res) => {
    try {
      const response = await raiting.findOne({ where: req.params });

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  updateTutorial: async (req, res) => {
    try {
      const response = await user.update(
        {
          tutorial: false,
        },
        { where: { user_ID: req.body.user_ID } }
      );

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const response = await user.update(req.body.data, {
        where: { user_ID: req.body.decrypt.user_ID },
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = routes;
