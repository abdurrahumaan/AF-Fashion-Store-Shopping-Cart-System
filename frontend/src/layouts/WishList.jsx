import React, { Component } from "react";
import { Input, FormGroup, Label, FormText } from "reactstrap";
import { Grid, Row, Col, Table, Button, Form } from "react-bootstrap";
import { Jumbotron, Container } from "reactstrap";
import Banner1 from "../assets/img/banners/b4.jpg";

import WishListDataService from "../controllers/wishlist.service";

import Card from "components/Card/Card.jsx";

const thArray = ["Product Name", "Unit Price", "Available Qty", "Action"];

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.loadWishList();
    this.state = {
      tdArray: [],
    };
  }

  loadWishList() {
    WishListDataService.getAll(localStorage.getItem("uid").replace(/["]/g, ""))
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            tdArray: response.data[0]["products"].map((item, key) => [
            <a href={"/productView/" + item["id"]}>{item['name']}</a>,
                "LKR "+item['price'].toFixed(2),
                item['qty'],
              <Button 
              data-pid={item['id']}
              onClick={this.deleteRecord}
              className="btn btn-sm btn-fill btn-warning">
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

  deleteRecord(e){
    WishListDataService.delete({
        "id":localStorage.getItem("uid").replace(/["]/g, ""),
        "pid":e.currentTarget.dataset.pid
    })
      .then((response) => {
        alert('Deleted');
        this.loadWishList();
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
            <h1 className="display-3">The Fashion Store Wishlist</h1>
            <p className="lead">
              These are the items you have added to your wish list.
            </p>
          </Container>
          {/* <img src={Banner1} style={imgWidth} /> */}

          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Your Favourite Item List"
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
                        {this.state.tdArray.map((prop, key) => {
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
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default Wishlist;
