const multer = require("multer");
const db = require("../models");
const product = db.product;
const category = db.category;
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
      "-" +
      Math.round(Math.random() * 10) +
      path.extname(file.originalname).toLowerCase()
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("images");

function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error: Images Only");
  }
}

exports.create = (req, res) => {
  upload(req, res, (err) => {
    const newProduct = new product({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      qty: req.body.qty,
      discount: req.body.discount ? req.body.discount : 0.0,
      catid: req.body.catid,
      uid: req.body.uid,
      status: req.body.status ? req.body.status : 1,
      images: req.file === undefined ? null : req.file.filename,
    });

    newProduct
      .save(newProduct)
      .then((data) => {
        res.send(data);
        res.status(200).send({
          data: data,
          message: "Product Saved",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Something Wrong",
        });
      });
  });
};

exports.findAll = async (req, res) => {
  var catData;

  await category
    .find()
    .then((data) => {
      catData = data;
    })
    .catch((err) => { });

  product
    .find()
    .then((data) => {
      var dataArray = [];
      data.forEach(function (item) {
        var catname = "";

        catData.forEach(function (category) {
          if (category["id"] == item["catid"]) {
            catname = category["title"];
            return;
          }
        });

        if (item["status"] === "1") {
          dataArray.push({
            id: item["id"],
            name:
              item["name"].length > 20
                ? item["name"].substring(1, 20)
                : item["name"],
            desc: item["desc"],
            price: item["price"],
            disprice: (item["price"] * (100 - item["discount"])) / 100,
            qty: item["qty"],
            discount: item["discount"],
            images: item["images"],
            status: item["status"],
            category: catname,
            catid: item["catid"],
          });
        }
      });

      res.send(dataArray);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.findallbyuid = async (req, res) => {
  if (!req.body.uid) {
    res.status(400).send({
      message: "userid cannot be empty",
    });
    return;
  }

  var catData;

  await category
    .find()
    .then((data) => {
      catData = data;
    })
    .catch((err) => { });

  product
    .find({
      uid: req.body.uid,
    })
    .then((data) => {
      var dataArray = [];
      data.forEach(function (item) {
        var catname = "";

        catData.forEach(function (category) {
          if (category["id"] == item["catid"]) {
            catname = category["title"];
            return;
          }
        });

        dataArray.push({
          id: item["id"],
          name: item["name"],
          desc: item["desc"],
          price: item["price"],
          disprice: (item["price"] * (100 - item["discount"])) / 100,
          images: item["images"],
          qty: item["qty"],
          discount: item["discount"],
          status: item["status"],
          category: catname,
          catid: item["catid"],
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

exports.getProduct = async (req, res) => {
  var catData;

  await category
    .find()
    .then((data) => {
      catData = data;
    })
    .catch((err) => { });

  product
    .find({
      _id: req.params.id,
    })
    .then((data) => {
      if (data) {
        var item = data[0];

        catData.forEach(function (category) {
          if (category["id"] == item["catid"]) {
            catname = category["title"];
            return;
          }
        });

        res.status(200).send({
          id: item["id"],
          name: item["name"],
          desc: item["desc"],
          price: item["price"],
          disprice: (item["price"] * (100 - item["discount"])) / 100,
          qty: item["qty"],
          discount: item["discount"],
          status: item["status"],
          category: catname,
          catid: item["catid"],
          images: item["images"],
        });
      } else {
        res.status(401).send({
          message: err.message || "Something Wrong",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Error",
      });
    });
};

exports.findActivatedOnly = (req, res) => {
  product
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

exports.update = (req, res) => {
  const id = req.params.id;

  upload(req, res, (err) => {

    var d;
    if (req.file === undefined) {
      d = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        qty: req.body.qty,
        discount: req.body.discount ? req.body.discount : 0.0,
        catid: req.body.catid,
        uid: req.body.uid,
        status: req.body.status ? req.body.status : 1,
      };
    } else {
      d = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        qty: req.body.qty,
        discount: req.body.discount ? req.body.discount : 0.0,
        catid: req.body.catid,
        uid: req.body.uid,
        status: req.body.status ? req.body.status : 1,
        images: req.file === undefined ? null : req.file.filename,
      };
    }

    product
      .findByIdAndUpdate(
        id,
        d,
        { useFindAndModify: false }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update. Params not found!`,
          });
        } else res.send({ message: "Updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating",
        });
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

  product
    .findByIdAndUpdate(id, { status: "2" }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update. Params not found!`,
        });
      } else res.send({ message: "Updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating",
      });
    });
};
