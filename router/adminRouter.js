const controllers = require("../controllers/adminController");

const express = require("express")
const router = express.Router();

router.route('/user').get(controllers.getAllUsers)
// router.route('/contacts').get(controllers.getAllContact);
module.exports = router