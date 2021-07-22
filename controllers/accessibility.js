const { user } = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mySecret = process.env.SECRET;

const routes = {
  hello: (req, res) => {
    try {
      res.status(200).json({ message: "Say Hello to my little friend" });
    } catch (err) {
      console.log(err);
    }
  },
  checkToken: async (req, res) => {
    let token = req.body.token;

    const base64Url = await token.split(".")[1];

    let decoding = new Buffer(base64Url, "base64");
    let tokenDecoding = decoding.toString("ascii");

    var decodedValue = JSON.parse(tokenDecoding);

    const response2 = await user.findOne({
      where: { user_ID: decodedValue.user_ID },
    });

    console.log(response2.dataValues);

    res.status(200).json(response2.dataValues);
  },
  createUser: async (req, res) => {
    console.log(req.body);

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 11);
    const entry = { name: name, email: email, password: hashedPassword };
    console.log(entry);
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
      const { username, password } = req.body;

      const project = await user.findOne({ where: { email: username } });

      console.log(project);
      let user_ID = project.dataValues.user_ID;
      let nameUser = project.dataValues.name;

      let passUserDatabase = project.dataValues.password;

      const isMatch = await bcrypt.compare(password, passUserDatabase);

      if (project !== null && isMatch) {
        const payload = {
          user_ID: user_ID,
          name: nameUser,
        };

        jwt.sign(
          payload,
          mySecret,

          (err, token) => {
            res.cookie(token);

            res.json({
              mensaje: "El usuario no existe",
              status: "true",
              token: token,
            });
          }
        );
        console.log("el usuario EXISTE");
      } else {
        console.log("el usuario  NO EXISTE");
        res.json({
          mensaje: "El usuario no existe",
          status: "false",
          token: "",
        });
      }
    } catch {
      console.log("el usuario no existe, se tiene que registrar");
    }
  },

  googleLogin: async (req, res) => {
    const { email ,name, password} = req.body;

    

    const project = await user.findOne({ where: { email: email  } });

  

    if(project===null){


      const hashedPassword = await bcrypt.hash(password, 11);
      const entry = { name: name, email: email, password: hashedPassword };
      console.log(entry);
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


    }
    else if (project !==null){


      const project = await user.findOne({ where: { email: email } });

      
      let user_ID = project.dataValues.user_ID;
      let nameUser = project.dataValues.name;

      const payload = {
        user_ID: user_ID,
        name: nameUser,
      };

      jwt.sign(
        payload,
        mySecret,

        (err, token) => {
          res.cookie(token);

          res.json({
            mensaje: "El usuario no existe",
            status: "true",
            token: token,
          });
        }
      );
      console.log("el usuario EXISTE");
      
 



    }

  
     
  },

  posts: (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        res.json({
          mensaje: "postveriffy fue creado",
          authData,
        });
      }
    });

    res.json({ mensaje: "Postssss fué creado" });
  },
};

module.exports = routes;
