import React from "react";
import { render } from "react-dom";
import { Router, RouteComponentProps, Link } from "@reach/router";

let Home = (props: RouteComponentProps) => <div>Home</div>;
let Dash = (props: RouteComponentProps) => <div>Dash</div>;

export default function App() {
  return (
    <Router>
      <Home path="/" />
      <Dash path="dashboard" />
    </Router>
  );
}
