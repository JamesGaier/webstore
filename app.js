const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");
var mysql = require('mysql');
const app = express();
const port = 3000;


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "mydb"
});

con.connect();


app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    con.query("SELECT * FROM dress_info;",(err,result) => {
        if(err) throw err;

        let arr = [];
        let dress_info = [];
        for(let i = 0; i < result.length; i++) {
            arr.push(result[i]);
            if(i == 3 || i == result.length - 1) {
                dress_info.push(arr);
                arr = []
            }

        }
        res.render("index", {items: dress_info});

    });
});


app.get("/item", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    con.query("SELECT * FROM dress_info WHERE name=?",queryObject.n, (err, result) => {
        if(err) throw err;
        res.render("item", {
           dress: {
                src: result[0].src,
                name: result[0].name,
                price: result[0].price
            }
        });
    });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));