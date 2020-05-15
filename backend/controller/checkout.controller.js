const db = require("../models");
const checkout = db.checkout;
const product = db.product;
const cart = db.cart;

exports.checkout = async(req, res) => {
    if (!req.body.uid) {
        res.status(400).send({
            message: "Params cannot be empty",
        });
        return;
    }

    var productDataArray;

    await product
        .find()
        .then((data) => {
            productDataArray = data;
        })
        .catch((err) => {});

    await cart
        .findOne({
            uid: req.body.uid,
        })
        .then((data) => {
            if (data) {


                if (data["products"].length > 0) {


                    var cartId = data['_id'];

                    //Checkout Process
                    var totAmount = 0.0;



                    var mainCartProductArray = [];


                    data["products"].forEach(function(item) {

                        var currentObj = '';

                        productDataArray.forEach(function(productItem) {
                            if (productItem['id'] == item['pid']) {
                                currentObj = productItem;
                                return;
                            }
                        });

                        var obj = {
                            "productData": currentObj,
                            'cartQty': item['pqty'],
                            'total': item['pqty'] * currentObj['price'],
                        };

                        totAmount += item['pqty'] * currentObj['price'];
                        //update
                        var qtyBalance = currentObj['qty'] - item['pqty'];

                        product.findOneAndUpdate({
                                _id: item['pid'],
                            }, {
                                qty: qtyBalance,
                            }, {
                                useFindAndModify: false,
                            })
                            .then((data) => {})
                            .catch((err) => {

                            });

                        mainCartProductArray.push(obj);

                    })

                    const NewCheckOut = new checkout({
                        uid: req.body.uid,
                        products: mainCartProductArray,
                        totamount: totAmount,
                        status: "1"
                    });

                    NewCheckOut
                        .save(NewCheckOut)
                        .then((data) => {

                            //delete Cart

                            cart
                                .findByIdAndRemove(cartId)
                                .then((data1) => {
                                    res.status(200).send(data);
                                });


                        })
                        .catch((err) => {
                            res.status(400).send({
                                message: eer.message || "Something Wrong",
                            });
                        });

                } else {
                    //Cart hasn't Products
                    res.status(400).send({
                        message: "User cart hasn't products",
                    });
                    return;
                }
            } else {
                //No cart
                res.status(400).send({
                    message: "User hasn't a cart",
                });
                return;
            }
        })
}