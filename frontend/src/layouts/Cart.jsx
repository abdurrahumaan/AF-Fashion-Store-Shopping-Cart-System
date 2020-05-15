import React, { Component } from "react";
import { Input, FormGroup, Label, FormText } from "reactstrap";
import { Grid, Row, Col, Table, Button, Form } from "react-bootstrap";
import { Jumbotron, Container } from "reactstrap";
import Banner1 from "../assets/img/banners/b4.jpg";

import Card from "components/Card/Card.jsx";

import CartDataService from "../controllers/cart.service";
import CheckoutDataService from "../controllers/checkout.service";

const thArray = ["Product Name", "Unit Price", "Qty", "Total Amount", "Action"];

class Cart extends Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.loadCart();
    this.state = {
      total: 0.0,
      cartRecords: [],
    };
  }

  loadCart() {
    CartDataService.getAll(localStorage.getItem("uid").replace(/["]/g, ""))
      .then((response) => {
        if (response.data.length > 0) {
          var fulltotal = 0.0;

          this.cartRecords = response.data[0]["products"].map(
            (item, key) =>
              (fulltotal += item["productData"]["price"] * item["pqty"])
          );

          this.setState({
            total: fulltotal.toFixed(2),
            cartRecords: response.data[0]["products"].map((item, key) => [
              item["productData"]["name"],
              item["productData"]["price"].toFixed(2),
              item["pqty"],
              "LKR " + (item["productData"]["price"] * item["pqty"]).toFixed(2),
              <Button
                onClick={this.removeItem}
                data-pid={item["productData"]["id"]}
                data-qty={item["pqty"]}
                className="btn btn-sm btn-fill btn-warning"
              >
                Remove
              </Button>,
            ]),
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeItem(e) {
    CartDataService.delete({
      id: localStorage.getItem("uid").replace(/["]/g, ""),
      pid: e.currentTarget.dataset.pid,
    })
      .then((response) => {
        this.loadCart();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  checkout(e) {
    CheckoutDataService.process({
      uid: localStorage.getItem("uid").replace(/["]/g, ""),
    })
      .then((response) => {
        this.loadCart();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const imgWidth = { width: "100%" };
    return (
      <div className="content">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">The Fashion Store Cart</h1>
            <p className="lead">
              These are the items you have added to your cart.
            </p>
          </Container>
          {/* <img src={Banner1} style={imgWidth} /> */}

          <Grid fluid>
            <Row>
              <Col md={9}>
                <Card
                  title="Your Cart Item List"
                  category=""
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.cartRecords.map((prop, key) => {
                          return (
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                return <td key={key}>{prop}</td>;
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  }
                />
              </Col>
              <Col md={3}>
                <Card
                  title="Purchase Order"
                  category=""
                  content={
                    <div>
                      <Form className="login-form">
                        <FormGroup>
                          <label>Sub Total</label>
                          <br />
                          <p>
                            <strong>LKR {this.state.total}</strong>
                          </p>
                          <hr></hr>
                          <div>
                            <div className="">
                              <label>Total Amount</label>
                              <p>
                                <strong>LKR {this.state.total}</strong>
                              </p>
                            </div>
                          </div>

                          <input
                            type="submit"
                            onClick={this.checkout}
                            value="Place Order"
                            className="form-control btn btn-primary btn-fill"
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default Cart;
