import React, { Component } from "react";
import UserDataService from "../controllers/user.service";
import EmailService from "../controllers/email.service";
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
    this.saveNewStoreUser = this.saveNewStoreUser.bind(this);
    this.editUserData = this.editUserData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      edit_id: "",
      edit_email: "",
      edit_firstname: "",
      edit_lastname: "",
      edit_mobile: "",
      edit_status: "",
      edit_password: "",
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
      edit_password: e.currentTarget.dataset.password,
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
          edit_password: "",
        });
        this.retrieveAllUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  clearAll(e) {
    this.setState({
      edit_id: "",
      edit_email: "",
      edit_firstname: "",
      edit_lastname: "",
      edit_mobile: "",
      edit_status: "",
      edit_password: "",
    });
  }

  editUserData(e) {
    UserDataService.update(this.state.edit_id, {
      status: this.state.edit_status,
      fname: this.state.edit_firstname,
      lname: this.state.edit_lastname,
      mobile: this.state.edit_mobile,
      password: this.state.edit_password,
    })
      .then((response) => {
        this.setState({
          edit_id: "",
          edit_email: "",
          edit_firstname: "",
          edit_lastname: "",
          edit_mobile: "",
          edit_status: "",
          edit_password: "",
        });
        this.retrieveAllUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveNewStoreUser(e) {
    if (
      this.state.edit_firstname.length > 0 &&
      this.state.edit_email.length > 0 &&
      this.state.edit_mobile.length > 0 &&
      this.state.edit_password.length > 0
    ) {
      UserDataService.create({
        status: 1,
        usertype: "shop",
        fname: this.state.edit_firstname,
        lname: this.state.edit_lastname,
        email: this.state.edit_email,
        mobile: this.state.edit_mobile,
        password: this.state.edit_password,
      })
        .then((response) => {
          EmailService.sendEmail({
            emailto: this.state.edit_email,
            emailfrom: "runtimersaf@gmail.com",
            emailsub: "Fashionstore",
            emailtext:
              "Hello, Congratulation, Now you are fashion Store Manager",
          })
            .then((response) => {});

          this.clearAll(null);
          this.retrieveAllUsers();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 415) {
            alert(error.response.data["message"]);
          }
        });
    } else {
      alert("Please fill all essential data before create an account");
    }
  }

  retrieveAllUsers() {
    UserDataService.getShopAll()
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
              data-password={user["password"]}
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

  on_edit_password(event) {
    this.setState({ edit_password: event.target.value });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <form>
                <Card
                  title="Store Managers List"
                  category="update or delete added store mnager user list"
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
                title="Add Store Manager "
                category=""
                content={
                  <form>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <label>Email</label>
                          <input
                            name="edit_email"
                            value={this.state.edit_email}
                            onChange={this.on_edit_email.bind(this)}
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            readOnly={
                              this.state.edit_status == "" ? false : true
                            }
                          />
                          <br />
                          <label>First Name</label>
                          <input
                            name="edit_firstname"
                            value={this.state.edit_firstname}
                            onChange={this.on_edit_firstname.bind(this)}
                            className="form-control"
                            type="text"
                            placeholder="First Name"
                          />
                          <br />
                          <label>Last Name</label>
                          <input
                            name="edit_lastname"
                            value={this.state.edit_lastname}
                            onChange={this.on_edit_lastname.bind(this)}
                            className="form-control"
                            type="text"
                            placeholder="Last Name"
                          />
                          <br />
                          <label>Mobile</label>
                          <input
                            name="edit_mobile"
                            value={this.state.edit_mobile}
                            onChange={this.on_edit_mobile.bind(this)}
                            className="form-control"
                            type="email"
                            placeholder="Mobile"
                          />
                          <br />
                          <br />
                          <label>Password</label>
                          <input
                            name="edit_password"
                            value={this.state.edit_password}
                            onChange={this.on_edit_password.bind(this)}
                            className="form-control"
                            type="Password"
                            placeholder="Password"
                          />
                          <br />
                          <Button
                            onClick={this.saveNewStoreUser}
                            className={
                              this.state.edit_status === ""
                                ? "btn btn-success btn-fill"
                                : "btn btn-success btn-fill disabled"
                            }
                          >
                            Save
                          </Button>
                          &nbsp;
                          <Button
                            onClick={this.editUserData}
                            className={
                              this.state.edit_status === ""
                                ? "btn btn-success btn-fill disabled"
                                : "btn btn-success btn-fill"
                            }
                          >
                            Edit
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
                          &nbsp;
                          <Button
                            onClick={this.clearAll}
                            className="btn btn-danger btn-fill"
                          >
                            Clear
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
