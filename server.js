const express = require("express");

const app = express();

//register view engine
app.set("view engine", "ejs");


//middleware
app.use((req, res) => {
  console.log('new request made')
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method ", req.method);

})

app.get("/", (req, res) => {
  //sending to a html page which is in the root directory of th eproject

  const blogs = [
    {
      title: "Aaron coocked managu",
      snippet:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum",
    },
    {
      title: "the lithos distractor",
      snippet:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum",
    },
    {
      title: "Johns Mwanga",
      snippet:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum",
    },
  ];
  res.render("index", { title: "home", blogs });
});

app.get("/about-us", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "error" });
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
