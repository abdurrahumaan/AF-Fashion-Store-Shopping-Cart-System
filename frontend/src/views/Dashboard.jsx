import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import CategoryDataService from "../controllers/category.service";
import SweetAlert from "sweetalert2-react";

import Card from "components/Card/Card.jsx";

const thArray = ["Category Name", "Status", "Action"];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategories();
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.state = {
      categoryId: "",
      categoryEdit: "",
      categoryStatus: "",
      categoryName: "",
      tdArray: [],
    };
    
  }

  retrieveCategories() {
    CategoryDataService.getAll()
      .then((response) => {
        this.setState({
          tdArray: response.data.map((category, key) => [
            category["title"],
            category["status"] === "1" ? "ACTIVE" : "NOT ACTIVE",
            <Button
              className="btn btn-sm btn-fill btn-warning"
              data-id={category["id"]}
              data-name={category["title"]}
              data-status={category["status"]}
              onClick={this.editCategory}
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

  editCategory(e) {
    this.setState({
      categoryId: e.currentTarget.dataset.id,
      categoryEdit: e.currentTarget.dataset.name,
      categoryStatus: e.currentTarget.dataset.status,
    });
  }

  saveNewCategory(e) {
    if (this.state.categoryName.length > 0) {
      e.preventDefault();
      var data = { title: this.state.categoryName };
      CategoryDataService.create(data)
        .then((response) => {
          this.retrieveCategories();
          this.setState({
            showSuccess: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      e.preventDefault();
      this.setState({ showWarning: true });
    }
  }

  onNewCategoryChange(event) {
    this.setState({ categoryName: event.target.value });
  }

  onUpdateCategoryChange(event) {
    this.setState({ categoryEdit: event.target.value });
  }

  updateCategory(e) {
    if (this.state.categoryId.length > 0) {
      CategoryDataService.update(this.state.categoryId, {
        status: this.state.status,
        title: this.state.categoryEdit,
      })
        .then((response) => {
          this.retrieveCategories();
          this.setState({
            showDeleteSuccess: true,
            categoryId: "",
            categoryEdit: "",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  deleteCategory(e) {
    if (this.state.categoryId.length > 0) {
      CategoryDataService.update(this.state.categoryId, { status: (this.state.categoryStatus=="1")?2:1 })
        .then((response) => {
          this.retrieveCategories();
          this.setState({
            showDeleteSuccess: true,
            categoryId: "",
            categoryEdit: "",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Category"
                category="Add new category here"
                content={
                  <form onSubmit={this.saveNewCategory.bind(this)} method="GET">
                    <Row>
                      <Col md={5}>
                        <FormGroup>
                          <input
                            className="form-control"
                            type="text"
                            required=""
                            name="categoryName"
                            value={this.state.categoryName}
                            onChange={this.onNewCategoryChange.bind(this)}
                            placeholder="Category Name"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <input
                            type="submit"
                            className="btn btn-fill btn-primary"
                            value="Insert Category"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Category List"
                category="Click action button to edit or delete record"
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

            <Col md={12}>
              <Card
                title="Action for Category"
                category="Category action"
                content={
                  <Row>
                    <Col md={5}>
                      <FormGroup>
                        <input
                          name="edit_category"
                          className="form-control"
                          type="text"
                          value={this.state.categoryEdit}
                          onChange={this.onUpdateCategoryChange.bind(this)}
                          placeholder="Category Name"
                        />
                        <br />
                        <Button
                          className="btn btn-success btn-fill"
                          onClick={this.updateCategory}
                        >
                          Edit Category
                        </Button>
                        &nbsp;
                        <Button
                          className={(this.state.categoryStatus=="1")?"btn btn-danger btn-fill":"btn btn-warning btn-fill"}
                          onClick={this.deleteCategory}
                        >
                          {(this.state.categoryStatus=="1")?"Disable":"Enable"}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
        <SweetAlert
          show={this.state.showWarning}
          title="Empty Category Name"
          type="warning"
          text="Please enter value before save category"
          onConfirm={() => this.setState({ showWarning: false })}
        />
        <SweetAlert
          show={this.state.showSuccess}
          title="Success"
          type="success"
          text="Record Saved"
          onConfirm={() =>
            this.setState({ showSuccess: false, categoryName: "" })
          }
        />
        <SweetAlert
          show={this.state.showUpdateSuccess}
          title="Updated"
          type="success"
          text="Record Updated"
          onConfirm={() => this.setState({ showUpdateSuccess: false })}
        />
        <SweetAlert
          show={this.state.showDeleteSuccess}
          title={(this.state.categoryStatus=="2")?"Enabled":"Disabled"}
          type={(this.state.categoryStatus=="2")?"warning":"error"}
          text="Record Updated"
          onConfirm={() => this.setState({ showDeleteSuccess: false })}
        />
      </div>
    );
  }
}

export default Dashboard;
