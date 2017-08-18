"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("resources")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });
  router.get("/", (req, res) => {
    res.render("new_resource");
  });
  return router;
}
