import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";
import { Button } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import ProductDataService from "../controllers/product.service";
import CartDataService from "../controllers/cart.service";
import WishlistDataService from "../controllers/wishlist.service";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import defaultImg from "../assets/img/items/default.jpg";
import Banner1 from "../assets/img/banners/b4.jpg";

import Login from "./LogIn";

class HomeContet extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.retrieveProducts();
    this.state = {
      ProductsArray: [],
    };
  }

  addToCart(e) {
    if (localStorage.getItem("uid") != null) {
      CartDataService.process({
        pid: e.currentTarget.dataset.id,
        uid: e.currentTarget.dataset.uid,
        qty: e.currentTarget.dataset.qty,
      })
        .then((response) => {
          alert("Added to the cart");
        })
        .catch((e) => {
          alert(e.response.data["message"]);
        });
    } else {
      alert("Please login");
    }
  }
  addToWishlist(e) {
    if (localStorage.getItem("uid") != null) {
      WishlistDataService.process({
        pid: e.currentTarget.dataset.id,
        uid: e.currentTarget.dataset.uid,
      })
        .then((response) => {
          alert("Added to the wishlist");
        })
        .catch((e) => {
          alert(e.response.data["message"]);
        });
    } else {
      alert("Please login");
    }
  }

  retrieveProducts() {
    const imgWidth = { width: "100%" };
    ProductDataService.getAll()
      .then((response) => {
        this.setState({
          ProductsArray: response.data.map((pro, key) => [
            <div className="col-md-3">
              <Card
                content={
                  <div className="">
                    <a href={"/productView/" + pro["id"]}>
                      <div style={{ width: "100%", height: "300px" }}>
                        <img
                          src={
                            "http://localhost:8080/uploads/" + pro["images"] ==
                            null
                              ? defaultImg
                              : "http://localhost:8080/uploads/" + pro["images"]
                          }
                          style={imgWidth}
                        />
                      </div>
                    </a>
                    <div className="text-center">
                      <h5>{pro["name"].toUpperCase()}</h5>
                      <small>{pro["category"]}</small>
                      <p className="text-primary">
                        Rs. {pro["disprice"].toFixed(2)}
                      </p>
                      <Button
                        data-id={pro["id"]}
                        data-qty={1}
                        data-uid={
                          localStorage.getItem("uid") != null
                            ? localStorage.getItem("uid").replace(/["]/g, "")
                            : ""
                        }
                        onClick={this.addToCart}
                        className={
                          localStorage.getItem("uid") != null
                            ? "btn btn-round btn-success"
                            : "btn btn-round btn-success disabled"
                        }
                      >
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        onClick={this.addToWishlist}
                        data-id={pro["id"]}
                        data-uid={
                          localStorage.getItem("uid") != null
                            ? localStorage.getItem("uid").replace(/["]/g, "")
                            : ""
                        }
                        className={
                          localStorage.getItem("uid") != null
                            ? "btn btn-round btn-danger"
                            : "btn btn-round btn-danger disabled"
                        }
                      >
                        <i class="fa fa-heart" aria-hidden="true"></i>
                      </Button>
                    </div>
                  </div>
                }
              />
            </div>,
          ]),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const imgWidth = { width: "100%" };
    return (
      <Router>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">The Fashion Store</h1>
              <p className="lead">
                Our purpose at Cents of Style is to empower women to lead bold and full lives. We believe that if you look good, you feel good.
                And when you feel good you can do good for others around you. Cents of Style brings you a wide range of trendy shoes, beautiful scarves,
                and statement-making jewelry, all at affordable prices to make them accessible to you.
              </p>
            </Container>
            <img src={Banner1} style={imgWidth} />
          </Jumbotron>
          <div className="row">
            {this.state.ProductsArray.map((prop, key) => {
              return prop;
            })}
          </div>
        </div>
      </Router>
    );
  }
}

export default HomeContet;
