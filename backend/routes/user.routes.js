module.exports = (app) => {
    const userController = require("../controller/user.controller");
    var router = require("express").Router();
  
    router.post("/create", userController.create);
  
    router.post("/findByUnPw", userController.findByUnPw);

    router.get("/findAll", userController.findAll);

    router.get("/findActivatedOnly", userController.findActivatedOnly);
    
    router.get("/findShopUsers", userController.findShopUsers);

    router.post("/update/:id", userController.update);

    router.post("/deactive/:id", userController.deactive);
  
    app.use('/api/user', router);
  };
  
