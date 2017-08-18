"use strict";

const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser());

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    const templateVariable = {user_id: req.params.id};
    res.render("update_profile", templateVariable);
  });

  router.put("/:id", (req, res) => {
    knex('users').where('id', req.cookies.user_id).update({
      name: req.body.inputName3,
      email: req.body.inputEmail3,
      password: req.body.inputPassword3
    })
  });

  router.post("/login/:id", (req, res) => {
    res.cookie('user_id', req.params.id);
    res.redirect('/');
});

  return router;
}
