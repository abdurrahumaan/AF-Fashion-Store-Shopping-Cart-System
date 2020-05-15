module.exports = (app) => {
    const commentController = require("../controller/comments.controller");
    var router = require("express").Router();
  
    router.post("/create/:id", commentController.create);
  
    router.get("/getAll/:id", commentController.findAll);

    router.post("/update:/id", commentController.update);
  
    app.use('/api/comments', router);
  };
  