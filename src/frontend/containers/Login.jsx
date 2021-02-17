import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, logoutRequest } from "../actions";

import "../assets/styles/components/Login.scss";
import googleIcon from "../assets/static/google-icon.png";
import twitterIcon from "../assets/static/twitter-icon.png";

import Header from "../components/Header";

const Login = (props) => {
  const [form, setForm] = useState({ email: "", rememberMe: false });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckbox = (event) => {
    setForm({
      ...form,
      rememberMe: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, "/");
  };

  return (
    <>
      <Header isLogin />
      <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
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
              Iniciar sesión
            </button>
            <div className="login__container--remember-me">
              <label>
                <input
                  type="checkbox"
                  id="cbox1"
                  value="first_checkbox"
                  onChange={handleCheckbox}
                />
                Recuérdame
              </label>
              <a href="/">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div>
              <a href="/auth/google">
                <img src={googleIcon} /> Inicia sesión con Google
              </a>
            </div>
            <div>
              <a href="/auth/twitter">
                <img src={twitterIcon} /> Inicia sesión con Twitter
              </a>
            </div>
          </section>
          <p className="login__container--register">
            No tienes ninguna cuenta <Link to="/register">Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
  logoutRequest,
};

export default connect(null, mapDispatchToProps)(Login);
