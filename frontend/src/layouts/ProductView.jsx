import React, { Component } from "react";
import { Input, FormGroup, Label, FormText } from "reactstrap";
import { Grid, Row, Col, Table, Button, Form } from "react-bootstrap";
import { Jumbotron, Container } from "reactstrap";
import ProductDataService from "../controllers/product.service";
import CommentDataService from "../controllers/comment.service";
import CartDataService from "../controllers/cart.service";
import WishlistDataService from "../controllers/wishlist.service";
import Card from "components/Card/Card.jsx";

import StarRatings from "react-star-ratings";

import ContentImage4 from "../assets/img/items/default.jpg";

const imgWidth = { width: "100%" };

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.getProductDetails();
    this.getComments();
    this.getSaveComment = this.getSaveComment.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.clearComment = this.clearComment.bind(this);
    this.state = {
      comment: "",
      rating: "1",
      id: this.props.match.params.id,
      img: "",
      name: "",
      desc: "",
      catid: "",
      category: "",
      qty: "",
      price: "",
      id: this.props.match.params.id,
      commentArray: [],
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

  getComments() {
    CommentDataService.getAll(this.props.match.params.id)
      .then((response) => {
        this.setState({
          commentArray: response.data.map((com, key) => [
            <div>
              <Card
                title={<h5>{com["user"]}</h5>}
                category={
                  <StarRatings
                    rating={com["rating"]}
                    starRatedColor="gold"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                  />
                }
                content={
                  <div>
                    <small>{com["comment"]}</small>
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

  getProductDetails() {
    ProductDataService.getProduct(this.props.match.params.id)
      .then((response) => {
        this.setState({
          img: response.data["images"],
          name: response.data["name"],
          desc: response.data["desc"],
          category: response.data["category"],
          qty: response.data["qty"],
          price: response.data["disprice"].toFixed(2),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getSaveComment(e) {
    CommentDataService.create(this.props.match.params.id, {
      comment: this.state.comment,
      uid: localStorage.getItem("uid").replace(/["]/g, ""),
      rating: this.state.rating,
    })
      .then((response) => {
        this.getComments();
        this.clearComment(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  clearComment(e) {
    this.setState({
      comment: "",
      rating: "1",
    });
  }

  onRateChange(event) {
    this.setState({ rating: event.target.value });
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    const imgWidth = { width: "100%" };
    return (
      <div className="content">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Product View</h1>
            <br />
          </Container>

          <Grid fluid>
            <Row>
              <Col md={4}>
                <Card
                  content={
                    <div>
                      <img src={"http://localhost:8080/uploads/"+this.state.img!=null?"http://localhost:8080/uploads/"+this.state.img:ContentImage4} style={imgWidth} />
                      <br />
                      <br />
                    </div>
                  }
                />
              </Col>
              <Col md={8}>
                <Card
                  title="Specifications"
                  category="product specifications"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <tbody>
                        <tr>
                          <td>
                            <small>Product Name</small>
                          </td>
                          <td name="product_name">{this.state.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <small>Product Category</small>
                          </td>
                          <td name="product_category">{this.state.category}</td>
                        </tr>
                        <tr>
                          <td>
                            <small>Description</small>
                          </td>
                          <td name="product_description">{this.state.desc}</td>
                        </tr>
                        <tr>
                          <td>
                            <small>Available Quantity</small>
                          </td>
                          <td name="product_available_qty">{this.state.qty}</td>
                        </tr>
                        <tr>
                          <td>
                            <small>Unit Price</small>
                          </td>
                          <td name="price">
                            <strong>Rs. {this.state.price}</strong>
                          </td>
                        </tr>
                        {localStorage.getItem("uid") != null ? (
                          <tr>
                            <td></td>
                            <td>
                              <Button
                                data-id={this.props.match.params.id}
                                data-qty={1}
                                data-uid={localStorage
                                  .getItem("uid")
                                  .replace(/["]/g, "")}
                                onClick={this.addToCart}
                                className="btn btn-sm btn-warning btn-fill "
                              >
                                Add Cart
                              </Button>
                              &nbsp;
                              <Button
                                onClick={this.addToWishlist}
                                data-id={this.props.match.params.id}
                                data-uid={localStorage
                                  .getItem("uid")
                                  .replace(/["]/g, "")}
                                className="btn btn-sm btn-primary btn-fill "
                              >
                                Add Wishlist
                              </Button>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </Table>
                  }
                />

                {localStorage.getItem("uid") != null ? (
                  <Card
                    title="Add Comment"
                    category="Add Comments and Rate this product"
                    content={
                      <div>
                        <Form className="comment-form">
                          <FormGroup>
                            <label>Add Comment</label>
                            <br />
                            <input
                              className="form-control"
                              type="textarea"
                              value={this.state.comment}
                              onChange={this.onCommentChange}
                              placeholder="Insert your Comment here"
                            />
                          </FormGroup>

                          <FormGroup>
                            <label>Choose a rate to product</label>
                            <br />
                            <Input
                              type="select"
                              name="select"
                              value={this.state.rating}
                              onChange={this.onRateChange}
                            >
                              <option value="5">5 Star</option>
                              <option value="4">4 Star</option>
                              <option value="3">3 Star</option>
                              <option value="2">2 Star</option>
                              <option value="1">1 Star</option>
                            </Input>
                          </FormGroup>

                          <FormGroup>
                            <Button
                              className="btn btn-sm btn-warning btn-fill"
                              onClick={this.getSaveComment}
                            >
                              Submit
                            </Button>
                            &nbsp;
                            <Button
                              className="btn btn-sm btn-default btn-fill"
                              onClick={this.clearComment}
                            >
                              Clear
                            </Button>
                          </FormGroup>
                        </Form>
                      </div>
                    }
                  />
                ) : (
                  ""
                )}

                <Card
                  title="Recommendation"
                  category="Review user comments and ratings"
                  content={this.state.commentArray}
                />
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default ProductView;
