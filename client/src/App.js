import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductsList from "./components/products-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <div class="title">
          <h1>JustPlants</h1>
        </div>
        <nav className="navbar">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="item">
                JustPlants
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="item">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="item">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="search">
          <Switch>
            <Route exact path={["/", "/products"]} component={ProductsList} />
            <Route exact path="/add" component={AddProduct} />
            <Route path="/products/:id" component={Product} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;