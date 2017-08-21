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

app.use(cookieSession({
  name: 'session',
  secret: "Some kind of secret here",
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

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
  knex('users').select("*").where("id", req.session.user_id).then((user_name) => {
    req.session.user_name = user_name[0].name;
    req.session.user_email = user_name[0].email;
    return res.redirect('/');
  })
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  res.render('logout');
});


// Get update profile page
app.get('/:id/profile', (req, res) => {
  const templateVariable = {user_name: req.session.user_name, user_id: req.session.user_id};
  res.render("update_profile", templateVariable);
});

// Update profile
app.put('/:id', (req, res) => {
  knex('users').select('*').where('id', req.session.user_id).then((user_info) => {
    knex('users').where('id', req.session.user_id)
    .update({name: req.body.user_name || user_info[0].name , email: req.body.user_email || user_info[0].email, password: req.body.user_password || user_info[0].password})
    .then((results) => {
      req.session.user_name = user_info[0].name;
      req.session.user_email = user_info[0].email;
      res.status(302).redirect('/');
    });
  });
});

app.get("/resources", (req, res) => {
  knex.select(['resources.id', 'resources.title', 'resources.url', 'resources.description', 'users.name'])
  .from('users')
  .innerJoin('resources', 'resources.user_id', 'users.id')
  .then((resources) => {
    console.log(resources);
    res.json(resources);
  });
});


app.get("/:id/user_resources", (req, res) => {
  knex.select(['resources.id', 'resources.title', 'resources.url', 'resources.description', 'users.name'])
  .from('users')
  .innerJoin('resources', 'users.id', 'resources.user_id').where('user_id', req.session.user_id)
  .then((resources) => {
    res.json(resources);
  });
});

app.get("/", (req, res) => {
  if (!req.session.user_id){
    res.redirect('/login')
  }
  else {
  knex.select("name").from("topics").then((topics) => {
    let templateVariable = {topics, user_name: req.session.user_name, user_id: req.session.user_id, email: req.session.email};
    res.render("index", templateVariable);
    });
  }
});

app.post("/", (req, res) => {
  knex('topics').select("id").where('name', req.body.select_topic).then((topic_id) => {
    knex('resources')
    .insert({user_id: req.session.user_id, topic_id: topic_id[0].id, title: req.body.resource_title, url: req.body.resource_url, description: req.body.resource_description})
    .then((results) => {
      res.redirect('/');
    });
  });
});

app.get("/:id/resource", (req, res) => {
  knex.select('*').from('resources').fullOuterJoin('users', 'users.id', 'resources.user_id').where('resources.id', req.params.id).then((resources) => {
    res.json(resources);
  });
});

// My Resources page
app.get("/:id/myresources", (req, res) => {
  if (!req.session.user_id){
    res.redirect('/login')
  }
  else {
    knex.select("name").from("topics").then((topics) => {
        knex.select("*").from("resources").where("user_id", req.session.user_id).then((resources) => {
          let templateVariable = {topics, user_name: req.session.user_name, user_id: req.session.user_id, resources, email: req.session.user_email};
          res.render("myresources", templateVariable);
        });
    });
  }
});

app.get("/:resource_id/all_comments", (req, res) => {
  knex.select("*").from("comments").fullOuterJoin('users', 'users.id', 'comments.user_id')
  .where("comments.resource_id", req.params.resource_id).then((results) => {
    res.json(results);
  });
});

// Search
app.post("/search",(req, res) => {
    res.redirect(`/${req.body.navbar_search}/search`);
});

app.get("/:query/search", (req, res) => {
  knex('resources').where('title', 'like', `%${req.params.query}%`).orWhere('url', 'like', `%${req.params.query}%`).orWhere('description', 'like', `%${req.params.query}%`).then((results) => {
    res.json(results);
  });
});

app.get("/:resource_id/comments", (req, res) => {
    knex.select("*").from('comments').innerJoin('users', 'users.id', 'comments.user_id')
    .where("resource_id", req.params.resource_id).then((comments) => {
    const templateVariable = {user_name: req.session.user_name, user_id: req.session.user_id, comments, resource_id: req.params.resource_id};
    res.render("resourceComments", templateVariable);
    });
});

app.post("/:resource_id/comments", (req, res) => {
  knex('comments').insert({user_id: req.session.user_id, resource_id: req.params.resource_id, content: req.body.comment_input})
  .then((results) => {
    res.redirect(`/${req.params.resource_id}/comments`);
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
