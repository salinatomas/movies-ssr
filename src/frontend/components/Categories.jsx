import React from "react";

import "../assets/styles/components/Categories.scss";

const Categories = ({ children, title, idTitle }) => (
  <div className="categories" id={`${idTitle ? idTitle : "categories"}`}>
    <h3 className="categories__title">{title}</h3>
    {children}
  </div>
);

export default Categories;
