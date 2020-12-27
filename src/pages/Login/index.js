import { useState, useContext } from "react";
import axios from "axios";

import "./style.css";

import TitleSecondary from "../../components/TitleSecondary";

import useInputs from "../../hooks/useInputs";
import AuthContext from "../../context/Auth";

import AuthAPI from "../../api/Auth";

import { authInputs } from "../../constants/inputs";

const emailValidator = (input, errorHandler) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValid = emailRegex.test(input.value);

  if (!isValid) errorHandler(input.id);

  return isValid;
};

const lengthValidator = (input, errorHandler, min, max) => {
  const isValid = input.value.length >= min && input.value.length <= max;

  if (!isValid) errorHandler(input.id);

  return isValid;
};

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [
    formInputs,
    inputChangeHandler,
    inputFocusHandler,
    setErrorHandler,
  ] = useInputs([...authInputs]);

  const { setAuth } = useContext(AuthContext);

  const setModeHandler = (mode) => {
    setMode(mode);
  };

  const authHandler = async () => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCowqrVcdA4nxQ_VANHaFt-Z1wZfwizbZ8";

    if (mode === "login") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCowqrVcdA4nxQ_VANHaFt-Z1wZfwizbZ8";
    }

    try {
      const data = {
        email: "luis@teste.com",
        password: formInputs[1].value,
        returnSecureToken: true,
      };

      const response = await AuthAPI.register(data);

      console.log(response);

      setAuth(response);
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let isFormValid = true;

    formInputs.forEach((input) => {
      if (input.id === "email") {
        isFormValid = emailValidator(input, setErrorHandler) && isFormValid;
      }
      if (input.id === "password") {
        isFormValid =
          lengthValidator(input, setErrorHandler, 6, 50) && isFormValid;
      }
    });

    if (!isFormValid) {
      return;
    }

    authHandler();
  };

  return (
    <section className="section section--center">
      <div className="form__control">
        <button
          className={mode === "login" ? "highlighted" : null}
          onClick={() => setModeHandler("login")}
        >
          Login
        </button>
        <button
          className={mode === "register" ? "highlighted" : null}
          onClick={() => setModeHandler("register")}
        >
          Register
        </button>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <TitleSecondary
          title="Login to purchase your delicious burger!"
          modifier="center"
        />
        <div className="form__input-group">
          <label htmlFor={formInputs[0].id} className="form__input-label">
            Email
          </label>
          <input
            type={formInputs[0].type}
            id={formInputs[0].id}
            value={formInputs[0].value}
            className={`${
              formInputs[0].hasError ? "form__input-error" : "form__input"
            }`}
            onChange={inputChangeHandler}
            onFocus={inputFocusHandler}
          />
        </div>
        <div className="form__input-group">
          <label htmlFor={formInputs[1].id} className="form__input-label">
            Password
          </label>
          <input
            type={formInputs[1].type}
            id={formInputs[1].id}
            value={formInputs[1].value}
            className={`${
              formInputs[1].hasError ? "form__input-error" : "form__input"
            }`}
            onChange={inputChangeHandler}
            onFocus={inputFocusHandler}
          />
          <p className="form__input-info">{formInputs[1].info}</p>
        </div>
        <div className="form__cta-container">
          <button onClick={submitHandler}>
            {mode === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
