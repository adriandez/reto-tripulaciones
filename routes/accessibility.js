const router = require("express").Router();
const routes = require("../controllers/accessibility");
const items = require("../controllers/accessibility");
const middleware = require("../middleware/verifyToken")

router.get("/", routes.hello);


router.post("/api/login", routes.login);
router.post("/api/posts", middleware.verifyToken,routes.posts);
router.post("/auth/createUser", routes.createUser);
router.post("/auth/checkToken", routes.checkToken);
router.post("/user", routes.findUser);

//GOOGLE//

router.post("/auth/googleLogin", routes.googleLogin);

//FACEBOOK//
router.post("/auth/facebookLogin", routes.facebookLogin);


module.exports = router;
