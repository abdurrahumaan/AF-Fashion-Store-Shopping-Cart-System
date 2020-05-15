module.exports = (app) => {
    const productController = require("../controller/products.controller");
    var router = require("express").Router();
  
    router.post("/create", productController.create);
  
    router.get("/findAll", productController.findAll);

    router.get("/findActivatedOnly", productController.findActivatedOnly);
    
    router.post("/findallbyuid", productController.findallbyuid);

    router.get("/getProduct/:id", productController.getProduct);

    router.post("/update/:id", productController.update);

    router.post("/deactive/:id", productController.deactive);
  
    app.use('/api/product', router);
  };
  