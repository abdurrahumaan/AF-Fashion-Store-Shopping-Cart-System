module.exports = (app) => {
  const wishlistController = require("../controller/watchlist.controller");
  var router = require("express").Router();

  router.post("/process", wishlistController.process);

  router.post("/findAll/:id", wishlistController.findAll);

  router.post("/deleteOneByOne/", wishlistController.deleteOneByOne);

  app.use("/api/wishlist", router);
};
