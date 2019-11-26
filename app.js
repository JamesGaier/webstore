const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("view", {
       people: [
            {name: "dave"},
            {name: "jerry"}
        ]
    });
});
app.get("/item", (req, res) => {
    res.render("item", {
       dress: {
            name: "blah",
            url: "public/images/1.png"
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));