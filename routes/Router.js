const userController = require("../controller/usercontroller.js");
const router = require("express").Router();

router.post("/register", userController.addUser);
router.post("/signin",userController.loginUser);
router.get("/homescreen",userController.homescreen);
router.post("/addRenter",userController.addRenters);
router.post("/deleteUser",userController.deleteUser);

module.exports = router;
