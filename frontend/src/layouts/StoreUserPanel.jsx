import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import StoreUserAddProduct from '../views/StoreUser_AddProduct';

const Example = (props) => {
  return (

    <Router>
      <div className="container">
        <Jumbotron>
          <h1 className="display-3">Hello, Store Manager!</h1>
        </Jumbotron>
        <Switch>
          <Route exact path="/store/addProduct" component={StoreUserAddProduct} />
        </Switch>
      </div>
    </Router>
  );
};

export default Example;