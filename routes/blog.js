"use strict";
const express = require("express")
const router = express.Router()
const {auth} = require("../app/middleware/authentication")
const controller = require("../app/controllers/BlogController")


router.post("/", controller.createBlog);
router.get("/", controller.getBlogs)
router.get("/:blogId", controller.getBlog)
router.put("/:blogId", controller.updateBlog);
router.delete("/:blogId", controller.deleteBlog);

module.exports =router
