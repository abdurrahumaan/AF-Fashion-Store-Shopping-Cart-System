import React, { Component } from "react";
import UserDataService from "../controllers/user.service";
import { Grid, Row, Col, FormGroup, Table } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

const thArray = [
  "First name",
  "Last name",
  "Email",
  "Type",
  "Status",
  "Action",
];

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.retrieveAllUsers();
    this.editUser = this.editUser.bind(this);
    this.editUserStatus = this.editUserStatus.bind(this);
    this.editUserData = this.editUserData.bind(this);
    this.state = {
      edit_id: "",
      edit_email: "",
      edit_firstname: "",
      edit_lastname: "",
      edit_mobile: "",
      edit_status: "",
      tdArray: [],
    };
  }

  editUser(e) {
    this.setState({
      edit_id: e.currentTarget.dataset.id,
      edit_email: e.currentTarget.dataset.email,
      edit_firstname: e.currentTarget.dataset.fname,
      edit_lastname: e.currentTarget.dataset.lname,
      edit_mobile: e.currentTarget.dataset.mobile,
      edit_status: e.currentTarget.dataset.status,
    });
  }

  editUserStatus(e) {
    UserDataService.update(e.currentTarget.dataset.id, {
      status: this.state.edit_status === "1" ? "2" : "1",
    })
      .then((response) => {
        this.setState({
          edit_id: "",
          edit_email: "",
          edit_firstname: "",
          edit_lastname: "",
          edit_mobile: "",
          edit_status: "",
        });
        this.retrieveAllUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  editUserData(e) {
    UserDataService.update(this.state.edit_id, {
      status: this.state.edit_status,
      fname: this.state.edit_firstname,
      lname: this.state.edit_lastname,
      mobile: this.state.edit_mobile,
    })
      .then((response) => {
        this.setState({
          edit_id: "",
          edit_email: "",
          edit_firstname: "",
          edit_lastname: "",
          edit_mobile: "",
          edit_status: "",
        });
        this.retrieveAllUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveAllUsers() {
    UserDataService.getAll()
      .then((response) => {
        this.setState({
          tdArray: response.data.map((user, key) => [
            user["fname"],
            user["lname"] === null ? "-" : user["lname"],
            user["email"],
            <h6>
              {user["usertype"] == "1"
                ? "ADMIN"
                : user["usertype"] == "2"
                ? "SHOPOWNER"
                : "USER"}
            </h6>,
            user["status"] === "1" ? "ACTIVE" : "NOT ACTIVE",
            <Button
              className="btn btn-sm btn-fill btn-warning"
              data-id={user["id"]}
              data-fname={user["fname"]}
              data-lname={user["lname"] === null ? "" : user["lname"]}
              data-email={user["email"]}
              data-mobile={user["mobile"] === null ? "" : user["mobile"]}
              data-status={user["status"]}
              onClick={this.editUser}
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

  on_edit_email(event) {
    this.setState({ edit_email: event.target.value });
  }

  on_edit_firstname(event) {
    this.setState({ edit_firstname: event.target.value });
  }

  on_edit_lastname(event) {
    this.setState({ edit_lastname: event.target.value });
  }

  on_edit_mobile(event) {
    this.setState({ edit_mobile: event.target.value });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <form>
                <Card
                  title="Users List"
                  category="update or delete added users list"
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
              </form>
            </Col>
            <Col md={4}>
              <Card
                title="Edit User Details"
                category=""
                content={
                  <form>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <label>Email</label>
                          <input
                            name="edit_email"
                            className="form-control"
                            readOnly
                            type="text"
                            value={this.state.edit_email}
                            onChange={this.on_edit_email.bind(this)}
                            placeholder="Email"
                          />
                          <br />
                          <label>First Name</label>
                          <input
                            name="edit_firstname"
                            className="form-control disa"
                            type="text"
                            value={this.state.edit_firstname}
                            onChange={this.on_edit_firstname.bind(this)}
                            placeholder="First Name"
                          />
                          <br />
                          <label>Last Name</label>
                          <input
                            name="edit_lastname"
                            className="form-control"
                            type="text"
                            value={this.state.edit_lastname}
                            onChange={this.on_edit_lastname.bind(this)}
                            placeholder="Last Name"
                          />
                          <br />
                          <label>Mobile</label>
                          <input
                            name="edit_mobile"
                            className="form-control"
                            type="number"
                            value={this.state.edit_mobile}
                            onChange={this.on_edit_mobile.bind(this)}
                            placeholder="Mobile"
                          />
                          <br />
                          <Button
                            onClick={this.editUserData}
                            className={
                              this.state.edit_status === ""
                                ? "btn btn-success btn-fill disabled"
                                : "btn btn-success btn-fill"
                            }
                          >
                            Update Details
                          </Button>
                          &nbsp;
                          <Button
                            data-id={this.state.edit_id}
                            onClick={this.editUserStatus}
                            className={
                              this.state.edit_status === "1"
                                ? "btn btn-warning btn-fill"
                                : this.state.edit_status === ""
                                ? "btn btn-info btn-fill disabled"
                                : "btn btn-info btn-fill"
                            }
                          >
                            {this.state.edit_status === "1"
                              ? "DEACTIVE"
                              : "ACTIVE"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
