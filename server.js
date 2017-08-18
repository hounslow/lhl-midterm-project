"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");
const commentsRoutes = require("./routes/comments");
const topicsRoutes = require("./routes/topics");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
// app.use("/api/resources", resourcesRoutes(knex));
// app.use("/api/comments", commentsRoutes(knex));
// app.use("/api/topics", topicsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  knex.select("name").from("topics").then((results) => {
    const topics = {results};
    res.render("index", topics);
  });
});


app.post("/", (req, res) => {
  knex('topics').select("id").where('name', req.body.select_topic).then((topic_id) => {
    knex('resources')
    .insert({user_id: 1, topic_id: topic_id[0].id, title: req.body.resource_title, url: req.body.resource_url, description: req.body.resource_description})
    .then((results) => {
      res.redirect('/');
    });
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
