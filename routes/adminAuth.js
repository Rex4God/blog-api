"use strict";
const express = require("express");
const router = express.Router()
//const {auth} = require("../app/middleware/authentication")
const controller = require("../app/controllers/UserController")

router.post("/", controller.create)

router.post("/login", controller.login)

router.get("/", controller.fetchAdmins)

router.put("/:adminId", controller.updateAdmin)

router.get("/:adminId", controller.getAdmin)

router.delete("/:adminId", controller.deleteAdmin)



module.exports =router;