const db = require("../models");
const user = db.user;

exports.create = (req, res) => {
  if (!req.body.fname || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Fname,Email,Password cannot be empty" });
    return;
  }

  user
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.status(415).send({
          message: "Account already exists",
        });
      } else {
        const newUser = new user({
          fname: req.body.fname,
          lname: req.body.lname
            ? req.body.lname == ""
              ? null
              : req.body.lname
            : null,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile ? req.body.mobile : null,
          address: req.body.address,
          usertype: !req.body.usertype
            ? 3
            : req.body.usertype === "admin"
            ? 1
            : 2,
          status: req.body.status ? req.body.status : 1,
        });

        newUser
          .save(newUser)
          .then((data) => {
            res.send(data);
            res.status(200).send({
              message: "Register Complete",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: eer.message || "Something Wrong",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.findByUnPw = (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(400).send({ message: "Username and password cannot be empty" });
    return;
  }

  user
    .findOne({
      status: "1",
      email: req.body.email,
      password: req.body.password,
    })
    .then((data) => {
      if (data) {
        res.status(200).send({
          data: data,
          message: "Login Success",
        });
      } else {
        res.status(401).send({
          message: "Incorrect Data",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.findAll = (req, res) => {
  user
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.findActivatedOnly = (req, res) => {
  user
    .find({ status: "1" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.findShopUsers = (req, res) => {
  user
    .find({ usertype: "2" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  user
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update. Params not found!`,
        });
      } else res.send({ message: "User updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating",
      });
    });
};

exports.deactive = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  user
    .findByIdAndUpdate(id, { status: "2" }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update. Params not found!`,
        });
      } else res.send({ message: " was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating",
      });
    });
};
