const { user } = require("../utils/database");
const bcrypt = require("bcrypt");
const aseos = require("../data.json")

const { aseos } = require("../models/seeds");
const { aseo } = require("../utils/database");
const { raiting } = require("../utils/database");
const { userRaiting } = require("../utils/database");

const routes = {
  hello: (req, res) => {
    try {
      res.status(200).json({ message: "Say Hello to my little friend" });
    } catch (err) {
      console.log(err);
    }
  },
  createUser: async (req, res) => {
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
 
  allWcs: async (req,res) =>{
    
    res.status(200).json(aseos);

  },
  findWc: async (req, res) => {
    try {

      console.log(aseos)
      console.log(req.body)

     /*  let WCS = [
        {
          id: 1,
          name: "Bar Paco",
          latitude: 40.4266245,
          longitude: -3.6893492,
          img: "https://www.nestleprofessional.es/sites/g/files/gfb231/f/styles/cover/public/media/consejos-para-baristas-ventajas-de-tener-un-bar-tematico-cabecera.jpg?itok=q5f41LuA"
        },
        {
          id: 2,
          name: "Bar Loli",
          latitude: 40.4039474,
          longitude: -3.7190823,
          img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg"

        },
        {
          id: 3,
          name: "Bar Pedro",
          latitude: 40.4022764,
          longitude: -3.7137916,
          img: "https://www.nestleprofessional.es/sites/g/files/gfb231/f/styles/cover/public/media/consejos-para-baristas-ventajas-de-tener-un-bar-tematico-cabecera.jpg?itok=q5f41LuA"

        },
        {
          id: 4,
          name: "Bar Maria",
          latitude: 40.4006872,
          longitude: -3.7133578,
          img: "https://www.nestleprofessional.es/sites/g/files/gfb231/f/styles/cover/public/media/consejos-para-baristas-ventajas-de-tener-un-bar-tematico-cabecera.jpg?itok=q5f41LuA"

        },
        {
          id: 5,
          name: "Bar Sol",
          latitude: 40.425837,
          longitude: -3.631491,
          img: "https://www.nestleprofessional.es/sites/g/files/gfb231/f/styles/cover/public/media/consejos-para-baristas-ventajas-de-tener-un-bar-tematico-cabecera.jpg?itok=q5f41LuA"

        },

        
      ];
 */




    /*   const response = await user.findOne({ where: req.body }); */
/*       res.status(200).json(aseos); */
 
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = routes;
