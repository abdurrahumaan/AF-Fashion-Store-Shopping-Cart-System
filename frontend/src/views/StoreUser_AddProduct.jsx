import React, { Component } from "react";
import { Input, FormGroup, Label, FormText } from "reactstrap";
import { Grid, Row, Col, Table, Button, Form } from "react-bootstrap";
import CategoryDataService from "../controllers/category.service";
import ProductDataService from "../controllers/product.service";

import Card from "components/Card/Card.jsx";

const thArray = [
  "Product Name",
  "Category",
  "Qty",
  "Unit Price",
  "Discount",
  "Status",
  "Action",
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategories();
    this.retrieveProducts();
    this.saveProduct = this.saveProduct.bind(this);
    this.editData = this.editData.bind(this);
    this.updateData = this.updateData.bind(this);
    // this.deleteCategory = this.deleteCategory.bind(this);
    // this.updateCategory = this.updateCategory.bind(this);
    this.state = {
      id: "",
      pname: "",
      pdesc: "",
      pprice: "",
      pqty: "",
      pdiscount: "",
      statusVal: "2",
      categoryVal: "0",
      imageVal: null,
      categoryArray: [],
      ProductsArray: [],
    };
  }

  editData(e) {
    this.setState({
      id: e.currentTarget.dataset.id,
      pname: e.currentTarget.dataset.name,
      pdesc: e.currentTarget.dataset.desc,
      pprice: e.currentTarget.dataset.price,
      pdiscount: e.currentTarget.dataset.discount,
      pqty: e.currentTarget.dataset.qty,
      statusVal: e.currentTarget.dataset.status,
      categoryVal: e.currentTarget.dataset.cat,
      imageVal: null,
    });
  }

  retrieveProducts() {
    ProductDataService.findAllByUid({
      uid: localStorage.getItem("uid").replace(/["]/g, ""),
    })
      .then((response) => {
        this.setState({
          ProductsArray: response.data.map((pro, key) => [
            pro["name"],
            pro["category"],
            pro["qty"],
            pro["disprice"].toFixed(2),
            pro["discount"] + "%",
            pro["status"] == 1 ? "ACTIVE" : "INACTIVE",
            <Button
              data-id={pro["id"]}
              data-name={pro["name"]}
              data-cat={pro["catid"]}
              data-desc={pro["desc"]}
              data-price={pro["price"]}
              data-discount={pro["discount"]}
              data-qty={pro["qty"]}
              data-status={pro["status"]}
              onClick={this.editData}
              className="btn btn-sm btn-fill btn-warning"
            >
              Action
            </Button>,
          ]),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveCategories() {
    CategoryDataService.getAll()
      .then((response) => {
        this.setState({
          categoryArray: response.data.map((cat, key) => [
            { id: cat["id"], category: cat["title"] },
          ]),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveProduct(e) {
    if (
      this.state.pname != "" &&
      this.state.pdesc != "" &&
      this.state.pprice != "" &&
      this.state.pqty != "" &&
      this.state.categoryVal != ""
    ) {

      var formData=new FormData();
      formData.append('images',this.state.imageVal);
      formData.append('name',this.state.pname);
      formData.append('desc',this.state.pdesc);
      formData.append('price',this.state.pprice);
      formData.append('qty',this.state.pqty);
      formData.append('discount',this.state.pdiscount);
      formData.append('uid',localStorage.getItem("uid").replace(/["]/g, ""));
      formData.append('catid',this.state.categoryVal);
      formData.append('status',this.state.statusVal);


      ProductDataService.create(formData)
        .then((response) => {
          this.setState({
            id: "",
            pname: "",
            pdesc: "",
            pprice: "",
            pdiscount: "",
            pqty: "",
            pdiscount: "",
            statusVal: "2",
            categoryVal: "0",
            imageVal: null,
          });
        })
        .catch((e) => {
          console.log(e);
        });

      this.retrieveProducts();
    } else {
      alert(
        "Please fill name, description, price, quantity and category before save"
      );
    }
  }

  updateData(e) {
    if (
      this.state.pname != "" &&
      this.state.pdesc != "" &&
      this.state.pprice != "" &&
      this.state.pqty != "" &&
      this.state.categoryVal != ""
    ) {

      var formData=new FormData();
      formData.append('images',this.state.imageVal);
      formData.append('name',this.state.pname);
      formData.append('desc',this.state.pdesc);
      formData.append('price',this.state.pprice);
      formData.append('qty',this.state.pqty);
      formData.append('discount',this.state.pdiscount);
      formData.append('uid',localStorage.getItem("uid").replace(/["]/g, ""));
      formData.append('catid',this.state.categoryVal);
      formData.append('status',this.state.statusVal);

      ProductDataService.update(this.state.id, formData)
        .then((response) => {
          alert("Updated");
          this.setState({
            id: "",
            pname: "",
            pdesc: "",
            pprice: "",
            pdiscount: "",
            pqty: "",
            pdiscount: "",
            statusVal: "2",
            categoryVal: "0",
            imageVal: null,
          });
        })
        .catch((e) => {
          console.log(e);
        });

      this.retrieveProducts();
    } else {
      alert(
        "Please fill name, description, price, quantity and category before save"
      );
    }
  }

  onPNameChange(event) {
    this.setState({ pname: event.target.value });
  }

  onPDescChange(event) {
    this.setState({ pdesc: event.target.value });
  }

  onPPriceChange(event) {
    this.setState({ pprice: event.target.value });
  }

  onPDiscountChange(event) {
    this.setState({ pdiscount: event.target.value });
  }

  onPQtyChange(event) {
    this.setState({ pqty: event.target.value });
  }

  onStatusChange(event) {
    this.setState({ statusVal: event.target.value });
  }

  onCategoryChange(event) {
    this.setState({ categoryVal: event.target.value });
  }

  onImageChange(event) {
    
    let image = event.target.files[0];
    this.setState({ imageVal: image });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={4}>
              <Card
                title="Add Product"
                category=""
                content={
                  <Form className="login-form">
                    {/* <h2 className="font-weight-bold text-center">Application Login</h2>
                                <h3 className="text-center">Welcome</h3> */}
                    <FormGroup>
                      <label>Product Name</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.pname}
                        onChange={this.onPNameChange.bind(this)}
                        placeholder="Product Name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Product Category</label>
                      <br />
                      {this.state.id == "" || this.state.id == null ? (
                        <Input
                          type="select"
                          onChange={this.onCategoryChange.bind(this)}
                          value={this.state.categoryVal}
                          name="select"
                        >
                          <option value="0">Select Category</option>
                          {this.state.categoryArray.map((prop, key) => {
                            return (
                              <option value={prop[0]["id"]}>
                                {prop[0]["category"]}
                              </option>
                            );
                          })}
                        </Input>
                      ) : (
                        <Input
                          type="select"
                          disabled
                          onChange={this.onCategoryChange.bind(this)}
                          value={this.state.categoryVal}
                          name="select"
                        >
                          <option value="0">Select Category</option>
                          {this.state.categoryArray.map((prop, key) => {
                            return (
                              <option value={prop[0]["id"]}>
                                {prop[0]["category"]}
                              </option>
                            );
                          })}
                        </Input>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <label>Product Description</label>
                      <br />
                      <Input
                        type="textarea"
                        value={this.state.pdesc}
                        onChange={this.onPDescChange.bind(this)}
                        name="text"
                      />
                    </FormGroup>

                    <FormGroup row>
                      <Label sm={2}>Image</Label>
                      <Col sm={10}>
                        <Input
                          type="file"
                          name="file"
                          onChange={(e) => {this.onImageChange(e)}}
                          accept="image/*"
                        />
                        <FormText color="muted">
                          Choose a product image from local files to upload.
                          white background .jpg files or background removed .png
                          files are preffred
                        </FormText>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <label>Product Price</label>
                      <br />
                      <input
                        className="form-control"
                        type="number"
                        value={this.state.pprice}
                        onChange={this.onPPriceChange.bind(this)}
                        placeholder="0.00"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Product Discount</label>
                      <br />
                      <input
                        className="form-control"
                        type="number"
                        value={this.state.pdiscount}
                        onChange={this.onPDiscountChange.bind(this)}
                        placeholder="0%"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Product Quantity</label>
                      <br />
                      <input
                        className="form-control"
                        type="number"
                        value={this.state.pqty}
                        onChange={this.onPQtyChange.bind(this)}
                        placeholder="0"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Product Status</label>
                      <br />
                      <Input
                        type="select"
                        name="status"
                        onChange={this.onStatusChange.bind(this)}
                        value={this.state.statusVal}
                      >
                        <option value="1">Active</option>
                        <option value="2">Deactive</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <input
                        type="button"
                        onClick={
                          this.state.id == "" || this.state.id == null
                            ? this.saveProduct
                            : this.updateData
                        }
                        value={
                          this.state.id == "" || this.state.id == null
                            ? "Save"
                            : "Update"
                        }
                        className="form-control btn btn-primary btn-fill"
                      />
                    </FormGroup>
                  </Form>
                }
              />
            </Col>

            <Col md={8}>
              <Card
                title="Product List"
                category="Update or delete added products"
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
                      {this.state.ProductsArray.map((prop, key) => {
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
      </div>
    );
  }
}

export default Dashboard;
