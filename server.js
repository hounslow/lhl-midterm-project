"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession = require('cookie-session');

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const methodOverride = require('method-override');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");
const commentsRoutes = require("./routes/comments");
const topicsRoutes = require("./routes/topics");

app.use(cookieSession({
  name: 'session',
  secret: "Some kind of secret here",
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

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

app.post('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  const templateVariable = {user_id: req.session.user_id};
  return res.redirect('/');
  // res.render('update_profile', templateVariable);
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/get_url/:url', (req, res) => {
  res.redirect(req.params.url);
});

app.put('/:id', (req, res) => {
  knex('users').select('*').where('id', req.session.user_id).then((user_info) => {
    knex('users').where('id', req.session.user_id)
    .update({name: req.body.user_name || user_info[0].name , email: req.body.user_email || user_info[0].email, password: req.body.user_password || user_info[0].password})
    .then((results) => {
      res.redirect('/');
    });
  });
});

app.get("/get/resources", (req, res) => {
  knex('resources').select("*").then((resources) => {
    res.json(resources);
  });
});


app.get("/", (req, res) => {
  if (!req.session.user_id){
    res.redirect('/login')
  }
  else {
  knex.select("name").from("topics").then((topics) => {
    knex.select("name").from("users").where("id", req.session.user_id).then((user_name) => {
      let templateVariable = {topics, user_name, user_id: req.session.user_id};
      res.render("index", templateVariable);
    });
  });
}
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

// My Resources page
app.get("/:id/myresources", (req, res) => {
  if (!req.session.user_id){
    res.redirect('/login')
  }
  else {
  knex.select("name").from("topics").then((topics) => {
    knex.select("name").from("users").where("id", req.session.user_id).then((user_name) => {
      let templateVariable = {topics, user_name, user_id: req.session.user_id};
      res.render("myresources", templateVariable);
    });
  });
}
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
