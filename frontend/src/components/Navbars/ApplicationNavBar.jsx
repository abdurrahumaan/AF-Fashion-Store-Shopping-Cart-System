import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Router, Switch, Redirect, Link } from "react-router-dom";

import LoginLayout from "layouts/Auth";


class Header extends Component {

    render() {
        return (
            <Navbar bg="primary" >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="">Fashion Store</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <div>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/layouts/Auth">
                                <Link to={"../layouts/Auth"}>Log In</Link>
                                </NavItem>
                            <NavItem eventKey={1} href="#">
                                Sign Up
                            </NavItem>
                            <NavItem eventKey={3} href="#">
                                Cart
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>


        );
    }
}

export default Header;
