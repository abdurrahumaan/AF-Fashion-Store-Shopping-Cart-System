const db = require("../models");
const category = db.category;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty" });
    return;
  }

  const newCategory = new category({
    title: req.body.title,
    status: req.body.status ? req.body.status : 1,
  });

  newCategory
    .save(newCategory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: eer.message || "Something Wrong",
      });
    });
};

exports.findAll = (req, res) => {
  category
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
  category
    .find({status: '1'})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.findOne = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "Id cannot be empty" });
    return;
  }

  category
    .findById(req.body.id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found"});
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving"});
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  category
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

exports.deactive = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  category
    .findByIdAndUpdate(id, {status:"2"}, { useFindAndModify: false })
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

exports.delete = (req, res) => {
  const id = req.params.id;

  category
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete record, not found by id`,
        });
      } else {
        res.send({
          message: " deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete with id",
      });
    });
};
