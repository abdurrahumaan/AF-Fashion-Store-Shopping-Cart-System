module.exports = (app) => {
  const categoryController = require("../controller/category.controller");
  var router = require("express").Router();

  router.post("/create", categoryController.create);

  router.get("/findAll", categoryController.findAll);

  router.get("/findActivatedOnly", categoryController.findActivatedOnly);

  router.get("/findOne", categoryController.findOne);

  router.post("/update/:id", categoryController.update);

  router.get("/deactive/:id", categoryController.deactive);

  router.get("/delete/:id", categoryController.delete);

  app.use('/api/categories', router);
};
