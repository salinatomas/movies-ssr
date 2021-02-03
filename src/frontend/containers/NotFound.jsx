import React from "react";

import "../assets/styles/components/NotFound.scss";
import Header from "../components/Header";

const NotFound = () => (
  <React.Fragment>
    <Header isNotFound />
    <section className="error">
      <h1>404</h1>
      <p>Página no encontrada</p>
    </section>
  </React.Fragment>
);

export default NotFound;
