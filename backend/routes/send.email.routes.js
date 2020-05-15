module.exports = (app) => {
    const sendEmailController = require("../controller/send.email.controller");
    var router = require("express").Router();
  
    router.post("/send", sendEmailController.process);
  
    app.use('/api/sendemail', router);
  };
  