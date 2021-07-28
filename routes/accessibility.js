const router = require("express").Router();
const routes = require("../controllers/accessibility");
const middleware = require("../middleware/verifyToken");

router.post("/auth/createUser", routes.createUser);
router.post("/auth/login", routes.login);
router.post("/auth/googleLogin", routes.googleLogin);
router.post("/auth/posts", middleware.verifyToken, routes.posts);
router.post("/auth/checkToken", routes.checkToken);
router.post("/user", routes.findUser);
router.get("/aseos", middleware.verifyRoute, routes.getAseos);
router.get("/aseos/:aseo_ID", routes.getByID);
router.put("/aseos/raiting", middleware.verifyRoute, routes.updateRaiting);
router.post("/aseos/userRaiting", routes.ceateUserRaiting);
router.put("/aseos/userRaiting", routes.updateUserRaiting);
router.put("/tutorial", routes.updateTutorial);
router.post("/seed", routes.seed);

router.get("/aseos/details/:codigoAseo", routes.getByAseoID);
router.get("/aseos/raiting/:codigoAseo", routes.getRatingWc);

module.exports = router;
