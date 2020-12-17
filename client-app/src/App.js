import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from "../src/components/Home";
import { Navbar } from "../src/components/Navbar";
import { Categories } from './components/crud/categories/Categories'

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
