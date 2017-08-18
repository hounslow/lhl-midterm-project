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
   knex.select("name").from("topics").then((results) => {
    // const topics = {results};
    // console.log(topics);
    const topics = {results};
    res.render("new_resource", topics);
  });
});
  return router;
}
