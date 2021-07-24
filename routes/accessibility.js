const router = require("express").Router();
const routes = require("../controllers/accessibility");
const items = require("../controllers/accessibility");
const middleware = require("../middleware/verifyToken")

router.post("/auth/login", routes.login);
router.post("/auth/posts", middleware.verifyToken,routes.posts);
router.post("/auth/createUser", routes.createUser);
router.post("/auth/checkToken", routes.checkToken);
router.post("/user", routes.findUser);
router.post("/auth/googleLogin", routes.googleLogin);


module.exports = router;
