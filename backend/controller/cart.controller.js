const db = require("../models");
const cart = db.cart;
const product = db.product;

exports.process = async (req, res) => {
  if (!req.body.uid || !req.body.pid || !req.body.qty) {
    res.status(400).send({
      message: "Params cannot be empty",
    });
    return;
  }

  await cart
    .findOne({
      uid: req.body.uid,
    })
    .then((data) => {
      if (data) {
        if (data["products"].length > 0) {
          var check = false;
          var newRecord = [];
          var i = 0;
          data["products"].forEach(function (item) {
            //exits
            if (item["pid"] === req.body.pid) {
              item["pqty"] =
                parseInt(item["pqty"], 0) + parseInt(req.body.qty, 0);
              check = true;
            }
            newRecord[i] = item;
            i++;
          });
          if (check) {
            cart
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
                    message: "Updated successfully.",
                  });
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Error updating",
                });
              });
          } else {
            newRecord.push({
              pid: req.body.pid,
              pqty: req.body.qty,
            });
            cart
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
          var productArray = [
            {
              pid: req.body.pid,
              pqty: req.body.qty,
            },
          ];
          cart
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
        var productArray = [
          {
            pid: req.body.pid,
            pqty: req.body.qty,
          },
        ];

        const newCartObj = new cart({
          uid: req.body.uid,
          products: productArray,
        });

        newCartObj
          .save(newCartObj)
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

exports.findAllCartItems = async (req, res) => {
  var productData;

  await product
    .find()
    .then((data) => {
      productData = data;
    })
    .catch((err) => {});

  cart
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
            if (productObj["id"] == productitem["pid"]) {
              productDataObj = {
                "name":productObj["name"],
                "price":productObj["price"]*(100-productObj["discount"])/100,
                "discount":productObj["discount"],
                "status":productObj["status"],
              };
              return;
            }
          });

          productArray.push({
            pid: productitem["pid"],
            pqty: productitem["pqty"],
            productData: productDataObj,
          });
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

exports.delete = (req, res) => {
  const id = req.params.id;

  cart
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

exports.deleteOneByOne = async (req, res) => {
  cart
    .find({
      uid: req.body.id,
    })
    .then((data) => {
      var newProductsArray = [];
      if (data.length > 0) {
        data[0]["products"].forEach(function (productitem) {
          if (productitem["pid"] != req.body.pid) {
            newProductsArray.push(productitem);
          }
        });
      }

      cart
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
