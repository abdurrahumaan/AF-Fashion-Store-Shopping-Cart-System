const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require('path');

const app = express();
app.use(express.static('./public'));

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to application." });
// });

require("./routes/category.routes")(app);
require("./routes/user.routes")(app);
require("./routes/products.routes")(app);
require("./routes/comments.routes")(app);
require("./routes/cart.routes")(app);
require("./routes/watchlist.routes")(app);
require("./routes/checkout.routes")(app);
require("./routes/send.email.routes")(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html ')));
}


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
