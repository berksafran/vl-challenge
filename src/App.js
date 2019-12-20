import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Categories from "./sections/Categories/index";
import Home from "./sections/Home";
import Title from "./components/Title";
import Footer from "./components/Footer";
import "./i18n";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Title />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route
            path="/categories"
            exact
            component={() => <Categories />}
          />
          <Route
            render={() => <h1 className="p-5">Something went wrong! </h1>}
          />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
