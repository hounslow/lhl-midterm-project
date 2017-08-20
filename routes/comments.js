"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
     router.post("/", (req, res) => {
    knex('comments').select("content").where('name', req.body.comments).then((comment_id) => {
      knex('comments')
        .insert({user_id: 1, resource_id: resource[0].id, content: req.body.comments})
        .then((results) => {
          res.render('index', {results});
      });
  });

});
  });
  router.get("/", (req, res) => {
    knex.select("content").from("comments").then((results) => {
      const comments = {results};
      res.render("resourceComments", comments);
    });
  return router;
  });
}
