import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../../../redux/actions/authAction";
import { useAppDispatch } from "../../../redux/store";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username must be at least 2 characters long")
      .max(20, "Username must not be longer than 20 characters")
      .required("Username is required")
      .matches(
        /^(?!.*[ ]{2})[a-z0-9]+(?:[a-z0-9_.]+)*[a-z0-9]$/,
        "Username is not valid"
      ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must not be longer than 32 characters")
      .required("Password is required")
      .matches(
        /^.*((?=.*[!@#$%^&*()\-=+{};:,<.>]){0})((?=.*[0-9]{1}))((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password is not valid"
      ),
  });

  const [message, setMessage] = useState("");

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

  const handleSubmitLogin = async (values: FormValues) => {
    try {
      await dispatch(login(values));
      toast.success("You have successfully logged in", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/home");
    } catch (error: any) {
      let message = loginErrors(error);
      setMessage(message);
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitLogin}
        >
          {({ isSubmitting }) => (
            <FormikForm className={styles.form}>
              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Username</Form.Label>
                </div>

                <div className={styles.inputContainer}>
                  <Field
                    id="username"
                    name="username"
                    className={styles.inputClass}
                    autoFocus
                    type="text"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Password</Form.Label>
                </div>
                <div className={styles.inputContainer}>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={styles.inputClass}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              </Form.Group>
              <div className={styles.submitBtnContainer}>
                <button
                  type="submit"
                  className={styles.btnSubmit}
                  disabled={isSubmitting}
                >
                  <p className={styles.txtSubmit}>Sign in</p>
                </button>
              </div>
              <Link className={styles.link} to="/register">Register</Link>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
