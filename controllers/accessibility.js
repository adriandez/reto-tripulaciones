const { user } = require("../utils/database");
const bcrypt = require("bcrypt");

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
  findWc: async (req, res) => {
    try {

      console.log(req.body)

      let WCS = [
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





    /*   const response = await user.findOne({ where: req.body }); */
      res.status(200).json(WCS);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = routes;
