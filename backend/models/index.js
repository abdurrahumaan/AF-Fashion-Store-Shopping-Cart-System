const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.category = require("./category.model.")(mongoose); 
db.user = require("./user.model")(mongoose); 
db.product = require("./product.model")(mongoose); 
db.comment = require("./comment.model")(mongoose); 
db.cart = require("./cart.model")(mongoose); 
db.watchlist = require("./watchlist.model")(mongoose); 
db.checkout = require("./checkout.model")(mongoose); 

module.exports = db;
