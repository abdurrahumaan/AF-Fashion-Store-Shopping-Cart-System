import React, { Component } from "react";
import { Form, FormGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import EmailService from "../controllers/email.service";

import Card from "components/Card/Card";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.sendInq = this.sendInq.bind(this);
    this.state = {
      edit_email: "",
      edit_firstname: "",
      edit_msg: "",
    };
  }

  sendInq(e) {
    if (
      this.state.edit_firstname != null &&
      this.state.edit_email != null &&
      this.state.edit_msg != null
    ) {
      EmailService.sendEmail({
        emailto: "runtimersaf@gmail.com",
        emailfrom: "runtimersaf@gmail.com",
        emailsub: "Fashionstore",
        emailtext:
          "Hello, " +
          this.state.edit_firstname +
          "(" +
          this.state.edit_email +
          ") sent an inquiry with this message - " +
          this.state.edit_msg,
      }).then((response) => {});
    } else {
      alert("Please fill all the details");
    }
  }

  on_edit_firstname(event) {
    this.setState({ edit_firstname: event.target.value });
  }

  on_edit_email(event) {
    this.setState({ edit_email: event.target.value });
  }

  on_edit_msg(event) {
    this.setState({ edit_msg: event.target.value });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Card
            title="Contact Us"
            category="Customer Support Phone: (+94) 123-4567777
            Email: info@fashionstore.lk"

            content={
              <Form className="login-form">
                <FormGroup>
                  <label>Name</label>
                  <br />
                  <input
                    className="form-control"
                    value={this.state.edit_firstname}
                    onChange={this.on_edit_firstname.bind(this)}
                    type="fname"
                    placeholder="Name"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Email</label>
                  <br />
                  <input
                    className="form-control"
                    type="lname"
                    value={this.state.edit_email}
                    onChange={this.on_edit_email.bind(this)}
                    placeholder="Email"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Message</label>
                  <br />
                  <textarea
                    className="form-control"
                    type="email"
                    value={this.state.edit_msg}
                    onChange={this.on_edit_msg.bind(this)}
                    placeholder="Message"
                  />
                </FormGroup>

                <input
                  type="submit"
                  onClick={this.sendInq}
                  value="Submit"
                  className="form-control btn btn-warning btn-fill"
                />
              </Form>
            }
          />
        </div>
      </div>
    );
  }
}

export default ContactUs;
