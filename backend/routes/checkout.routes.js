module.exports = (app) => {
    const checkoutController = require("../controller/checkout.controller");
    var router = require("express").Router();

    router.post("/checkout", checkoutController.checkout);

    app.use('/api/checkout', router);
};