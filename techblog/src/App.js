import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Write from './pages/Write'
import View from './pages/View';
import List from './pages/post_list';
import Modal from './pages/modal';
import Login from './pages/login'
import test from "./pages/test";

import './App.css';
import register from "./pages/register";
import Revise from "./pages/revise";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/register" component={register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/post/:id" component={View}></Route>
          <Route exact path="/post" component={View}></Route>
          <Route path="/list/:category" component={List}></Route>
          <Route path="/list" component={List}></Route>
          <Route path="/modal" component={Modal}></Route>
          <Route path="/write" component={Write}></Route>
          <Route path="/revise/:id" component={Revise}></Route>
          <Route path="/revise" component={Revise}></Route>
          <Route path="/test" component={test}></Route>
          <Route path="/" component={List}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
