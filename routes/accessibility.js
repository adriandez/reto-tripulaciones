const router = require("express").Router();
const routes = require("../controllers/accessibility");
const items = require("../controllers/accessibility");
const middleware = require("../middleware/verifyToken")

router.get("/", routes.hello);


router.post("/api/login", routes.login);
router.post("/api/posts", middleware.verifyToken,routes.posts);
router.post("/create", routes.createUser);
router.post("/user", routes.findUser);


module.exports = router;
