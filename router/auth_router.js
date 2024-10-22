const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth_controller")
const validate = require("../middleWare/vaildate-middleware")
const signupSchema = require("../validator/auth_validator")
const authMiddleWare = require("../middleWare/auth-middleware")

/*
router.get("/",(req,res)=>{
    res.status(200).send("Welcome!!")
})           M1
*/

router.route("/").get(authController.home)

router.route("/register").post(validate(signupSchema),authController.register)
router.route("/login").post(authController.login)
router.route("/user").get(authMiddleWare,authController.fetchUser)
module.exports =router 

// authMiddleWare to chk if user is logged in or not