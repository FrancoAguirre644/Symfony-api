import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from "../src/components/Home";
import Navbar from "./components/navbar/Navbar";
import { Categories } from './components/crud/categories/Categories';
import { Customers } from './components/crud/customers/Customers';
import { Products } from './components/crud/products/Products';
import { AddProduct } from './components/crud/products/AddProduct';
import { UpdateProduct } from './components/crud/products/UpdateProduct';
import { UpdateCategory } from './components/crud/categories/UpdateCategory';
import { UpdateCustomer } from './components/crud/customers/UpdateCustomer';
import { AddCategory } from './components/crud/categories/AddCategory';
import { AddCustomer } from './components/crud/customers/AddCustomer';
import { Carts } from './components/crud/carts/Carts';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact strict path="/">
            <Home />
          </Route>
          <Route exact strict path="/categories">
            <Categories />
          </Route>
          <Route exact strict path="/categories/add">
            <AddCategory />
          </Route>
          <Route exact strict path="/products">
            <Products />
          </Route>
          <Route exact strict path="/products/add">
            <AddProduct />
          </Route>
          <Route exact path="/products/update/:id">
            <UpdateProduct />
          </Route>
          <Route exact path="/categories/update/:id">
            <UpdateCategory />
          </Route>
          <Route exact path="/customers">
            <Customers />
          </Route>
          <Route exact path="/customers/add">
            <AddCustomer />
          </Route>
          <Route exact path="/customers/update/:id">
            <UpdateCustomer />
          </Route>
          <Route exact path="/carts">
            <Carts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
