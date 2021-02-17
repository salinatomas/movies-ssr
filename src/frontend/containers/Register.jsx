import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../actions";

import "../assets/styles/components/Register.scss";
import Header from "../components/Header";

const Register = (props) => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerUser(form, "/login");
  };

  return (
    <>
      <Header isRegister />
      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form className="register__container--form" onSubmit={handleSubmit}>
            <input
              name="name"
              className="input"
              type="text"
              placeholder="Nombre"
              onChange={handleChange}
            />
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleChange}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
            <button className="button" type="submit">
              Registrarme
            </button>
          </form>
          <Link className="register__container--login" to="/login">
            Iniciar sesión
          </Link>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);
