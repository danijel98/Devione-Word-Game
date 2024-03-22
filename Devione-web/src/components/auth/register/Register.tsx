import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { register } from "../../../redux/actions/authAction";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../../../redux/store";
import * as Yup from "yup";
import { Formik, Form as FormikForm, Field, ErrorMessage, FormikValues } from "formik";

interface FormValues {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

function Register() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(30, "Name must not be longer than 30 characters")
      .required("Name is required")
      .matches(
        /^(?!.*[ ]{2})[A-ZČĆĐŠŽ]+(?:[a-zA-ZČčĆćŠšĐđŽž ]+)*[a-zčćšđž]$/,
        "Name is not valid"
      ),
    lastname: Yup.string()
      .min(2, "Last name must be at least 2 characters long")
      .max(40, "Last name must not be longer than 40 characters")
      .required("Last name is required")
      .matches(
        /^(?!.*[ ]{2})[A-ZČĆĐŠŽ]+(?:[a-zA-ZČčĆćŠšĐđŽž -]+)*[a-zčćšđž]$/,
        "Last name is not valid"
      ),
    email: Yup.string()
      .email("Email is not valid")
      .min(5, "Email must be at least 5 characters long")
      .max(60, "Email must not be longer than 60 characters")
      .required("Email is required"),
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

  const handleRegister = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    dispatch(register(values))
      .then(() => {
        navigate("/login");
      })
      .catch((err: string) => {
        setMessage(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            name: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}

        >
          {({ isSubmitting }) => (
            <FormikForm className={styles.form} >
              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Name</Form.Label>
                </div>
                <Field
                  name="name"
                  type="text"
                  as={Form.Control}
                  className={styles.inputClass}
                  />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.errorMessage}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Last Name</Form.Label>
                </div>
                <Field
                  name="lastname"
                  type="text"
                  as={Form.Control}
                  className={styles.inputClass}
                  />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className={styles.errorMessage}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Email</Form.Label>
                </div>
                <Field
                  name="email"
                  type="email"
                  as={Form.Control}
                  className={styles.inputClass}
                  />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Username</Form.Label>
                </div>
                <Field
                  name="username"
                  type="text"
                  as={Form.Control}
                  className={styles.inputClass}
                  />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.errorMessage}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <div className={`row ${styles.labelclass}`}>
                  <Form.Label>Password</Form.Label>
                </div>
                <Field
                  name="password"
                  type="password"
                  as={Form.Control}
                  className={styles.inputClass}
                  />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </Form.Group>
              <button
                type="submit"
                className={styles.btnSubmit}
                disabled={isSubmitting}
              >
                <p className={styles.txtSubmit}>Register</p>
              </button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
