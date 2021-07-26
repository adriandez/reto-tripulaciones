const router = require("express").Router();
const routes = require("../controllers/accessibility");
const middleware = require("../middleware/verifyToken");


router.post("/create", routes.createUser);

router.get("/aseos", routes.getAseos);
router.post("/auth/createUser", routes.createUser);
router.post("/auth/login", routes.login);
router.post("/auth/googleLogin", routes.googleLogin);
router.post("/auth/posts", middleware.verifyToken, routes.posts);
router.post("/auth/checkToken", routes.checkToken);
router.post("/user", middleware.verifyRoute, routes.findUser);
router.get("/aseos", middleware.verifyRoute, routes.getAseos);
router.get("/aseos/:aseo_ID", routes.getByID);
router.get("/aseos/raiting/:codigoAseo", routes.getRatingWc);
router.put("/aseos/raiting", routes.updateRaiting);
router.post("/aseos/userRaiting", routes.ceateUserRaiting);
router.put("/aseos/userRaiting", routes.updateUserRaiting);
router.post("/seed", routes.seed);

module.exports = router;
