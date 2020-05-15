const db = require("../models");
const watchlist = db.watchlist;
const product = db.product;

exports.process = async (req, res) => {
  if (!req.body.uid || !req.body.pid) {
    res.status(400).send({
      message: "Params cannot be empty",
    });
    return;
  }

  await watchlist
    .findOne({
      uid: req.body.uid,
    })
    .then((data) => {
      if (data) {
        if (data["products"].length > 0) {
          var check = true;
          var newRecord = [];
          var i = 0;

          data["products"].forEach(function (item) {
            //exits
            if (item == req.body.pid) {
              check = false;
            }
            newRecord[i] = item;
            i++;
          });
          if (check) {
            newRecord.push(req.body.pid);

            watchlist
              .findOneAndUpdate(
                {
                  uid: req.body.uid,
                },
                {
                  products: newRecord,
                },
                {
                  useFindAndModify: false,
                }
              )
              .then((data) => {
                if (!data) {
                  res.status(404).send({
                    message: `Cannot update. Params not found!`,
                  });
                } else
                  res.send({
                    message: "Added",
                  });
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Error updating",
                });
              });
          } else {
            res.status(400).send({
              message: "Already Exists",
            });
          }
        } else {
          var productArray = [req.body.pid];
          watchlist
            .findOneAndUpdate(
              {
                uid: req.body.uid,
              },
              {
                products: productArray,
              },
              {
                useFindAndModify: false,
              }
            )
            .then((dataCart) => {
              if (!dataCart) {
                res.status(404).send({
                  message: `Cannot update. Params not found!`,
                });
              } else {
                res.status(200).send(dataCart);
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating",
              });
            });
        }
      } else {
        var productArray = [req.body.pid];

        const newData = new watchlist({
          uid: req.body.uid,
          products: productArray,
        });

        newData
          .save(newData)
          .then((dataCart) => {
            res.status(200).send(dataCart);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Something Wrong",
            });
          });
      }
    })
    .catch((eer) => {
      res.status(500).send({
        message: "Somthing Went Wrong",
      });
    });
};

exports.findAll = async (req, res) => {
  var productData;

  await product
    .find()
    .then((data) => {
      productData = data;
    })
    .catch((err) => {});

  watchlist
    .find({
      uid: req.params.id,
    })
    .then((data) => {
      var allCartArray = [];
      data.forEach(function (item) {
        var productArray = [];

        item["products"].forEach(function (productitem) {
          var productDataObj = "";

          productData.forEach(function (productObj) {
            if (productObj["id"] == productitem) {
              productDataObj = productObj;
              return;
            }
          });

          productArray.push(productDataObj);
        });

        allCartArray.push({
          id: item["_id"],
          products: productArray,
          uid: item["uid"],
        });
      });

      res.send(allCartArray);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};

exports.deleteOneByOne = async (req, res) => {
  watchlist
    .find({
      uid: req.body.id,
    })
    .then((data) => {
      var newProductsArray = [];
      if (data.length > 0) {
        data[0]["products"].forEach(function (productitem) {
          if (productitem != req.body.pid) {
            newProductsArray.push(productitem);
          }
        });
      }

      watchlist
        .findOneAndUpdate(
          {
            uid: req.body.id,
          },
          {
            products: newProductsArray,
          },
          {
            useFindAndModify: false,
          }
        )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update. Params not found!`,
            });
          } else
            res.send({
              message: "Added",
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating",
          });
        });

      res.status(200).send(newProductsArray);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something Wrong",
      });
    });
};
