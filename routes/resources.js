"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post("/", (req, res) => {
    knex('topics').select("id").where('name', req.body.select_topic).then((topic_id) => {
      knex('resources')
        .insert({user_id: 1, topic_id: topic_id[0].id, title: req.body.resource_title, url: req.body.resource_url, description: req.body.resource_description})
        .then((results) => {
          res.render('index', {results});
      });
  });
});

  router.get("/", (req, res) => {
    knex.select("name").from("topics").then((results) => {
      const topics = {results};
      res.render("new_resource", topics);
    });
  });
  return router;
}
