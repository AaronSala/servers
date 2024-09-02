const express = require("express");
const mongoose = require("mongoose");

const Blog = require("./models/blog");

const app = express();

//db connection
let uri =
  "mongodb+srv://salaaron:sala4492@cluster0.lfepu1i.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then((result) =>
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    })
  )
  .catch((err) => console.log("error"));

const morgan = require("morgan");
//register view engine
app.set("view engine", "ejs");

//middleware static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  //sending to a html page which is in the root directory of th eproject

  res.redirect("./blogs");
});

app.get("/about-us", (req, res) => {
  res.render("about", { title: "about" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    });
});
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "error" });
});
