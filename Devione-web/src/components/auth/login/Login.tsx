import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../../../redux/actions/authAction";
import {useAppDispatch} from "../../../redux/store";

function Login() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    let inputId = e.currentTarget.id;
    let inputValue = e.currentTarget.value;
    switch (inputId) {
      case "usernameUser":
        setUser({ ...user, username: inputValue });
        break;
      case "passwordUser":
        setUser({ ...user, password: inputValue });
        break;
    }
  };

  const loginErrors = (error: string) => {
    let messageError;
    switch (error) {
      case "badCredentials":
        messageError = "Wrong credentials";
        break;
      case "badRequest":
        messageError = "Invalid Login";
        break;
      default:
        messageError = "Invalid Login";
    }
    return messageError;
  };

  const handleSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(user))
      .then(() => {
        navigate("/home");
      })
      .catch((err: string) => {
        let message = loginErrors(err);
        setMessage(message);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmitLogin} className={styles.form}>
          <Form.Group className={styles.formGroup}>
            <div className={`row ${styles.labelclass}`}>
              <Form.Label>Username</Form.Label>
            </div>

            <div className={styles.inputContainer}>
              <Form.Control
                id="usernameUser"
                className={styles.inputClass}
                autoFocus
                type="text"
                value={user.username}
                onChange={handleChangeUser}
              />
            </div>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <div className={`row ${styles.labelclass}`}>
              <Form.Label>Password</Form.Label>
            </div>
            <div className={styles.inputContainer}>
              <Form.Control
                id="passwordUser"
                type="password"
                className={styles.inputClass}
                value={user.password}
                onChange={handleChangeUser}
              />
            </div>
          </Form.Group>
          {message && (
            <div className={styles.messageContainer}>
              <p className={styles.errorMessage}>{message}</p>
            </div>
          )}
          <div className={styles.submitBtnContainer}>
            <button
              name="action"
              value="login"
              type="submit"
              className={styles.btnSubmit}
            >
              <p className={styles.txtSubmit}>Sign in</p>
            </button>
          </div>
          <Link to="/register">Register</Link>

        </Form>
      </div>
    </div>
  );
}

export default Login;
