"use strict";
const{StatusCodes} = require("http-status-codes")

const router = require("express").Router();
 /* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(StatusCodes.ACCEPTED).render('index', { title: 'Eraconneckt.org Service' });
});

module.exports = router;