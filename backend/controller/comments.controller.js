const db = require("../models");
const comment = db.comment;
const user = db.user;

exports.create = (req, res) => {
  console.log(req.body);
  if (
    !req.body.comment ||
    !req.body.rating ||
    !req.body.uid ||
    !req.params.id
  ) {
    res.status(400).send({ message: "Params cannot be empty" });
    return;
  }

  const newComment = new comment({
    pid: req.params.id,
    uid: req.body.uid,
    comment: req.body.comment,
    rating: req.body.rating,
  });

  newComment
    .save(newComment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: eer.message || "Something Wrong",
      });
    });
};

exports.findAll = async (req, res) => {
  var userData;

  await user
    .find()
    .then((data) => {
      userData = data;
    })
    .catch((err) => {});

  comment
    .find({
      pid: req.params.id,
    })
    .then((data) => {
      var dataArray = [];
      data.forEach(function (item) {
        var user = "";

        userData.forEach(function (userObj) {
          if (userObj["id"] == item["uid"]) {
            user = userObj["fname"];
            return;
          }
        });

        dataArray.push({
          id: item["id"],
          comment: item["comment"],
          rating: item["rating"],
          user: user,
        });
      });

      res.send(dataArray);
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

  comment
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
