const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs")


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  fs.readdir(`./hisaab`, function (err, files) {
    if (err) {
      return res.status(500).send(err)
    }
    else {
      res.render("index", { files: files })
    }
  })
})



app.get("/create", (req, res) => {
  res.render("create")
})


app.get("/edit/:filename", (req, res) => {
  fs.readFile(`hisaab/${req.params.filename}`, "utf-8", function (filedata, err) {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.render("edit", { filedata, filename: req.params.filename })
    }
  })
})
app.listen(5500)