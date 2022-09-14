"use strict";
const home = require("./home");


module.exports = (app) => {
    app.use("/", home);
    app.use("/v1/auth/", require("./adminAuth"));
    app.use("/v1/blogs/", require("./blog"))
};
