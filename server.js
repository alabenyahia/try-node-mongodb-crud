require("./models/db");
const express = require("express");
const playerController = require("./controllers/playerController");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('hbs', exphbs({defaultLayout:'mainLayout', extname: '.hbs'}));
app.set('view engine', 'hbs');


app.listen(5000, () => {
  console.log("Express server started on port 5000");
});

app.use("/player", playerController);
