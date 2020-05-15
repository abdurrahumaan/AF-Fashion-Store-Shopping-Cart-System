module.exports = (app) => {
    const cartController = require("../controller/cart.controller");
    var router = require("express").Router();

    router.post("/process", cartController.process);

    router.post("/findAllCartItems/:id", cartController.findAllCartItems);

    router.post("/deleteOneByOne/", cartController.deleteOneByOne);

    app.use('/api/cart', router);
};