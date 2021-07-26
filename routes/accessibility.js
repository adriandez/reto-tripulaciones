const router = require("express").Router();
const routes = require("../controllers/accessibility");
const items = require("../controllers/accessibility");

router.get("/", routes.hello);
router.post("/create", routes.createUser);
router.post("/user", routes.findUser);
 
router.get("/aseos", routes.getAseos);
router.get("/aseos/:aseo_ID", routes.getByID);
router.get("/aseos/details/:codigoAseo", routes.getByAseoID);
router.get("/aseos/raiting/:codigoAseo", routes.getRatingWc);
router.put("/aseos/raiting", routes.updateRaiting);
router.post("/aseos/userRaiting", routes.ceateUserRaiting);
router.put("/aseos/userRaiting", routes.updateUserRaiting);
router.post("/seed", routes.seed);


router.post("/api/search",routes.findWc)

router.get("/api/allWcs",routes.allWcs)
 
module.exports = router;
