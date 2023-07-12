import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Alert, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      const signInResponse = await axios.post("/dj-rest-auth/login/", {
        username: signUpData.username,
        password: signUpData.password1,
      });
      // Handle successful sign up and sign in here
      console.log("User signed up and signed in:", signInResponse.data);

      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from); // Redirect to the same place as the sign-in form
    } catch (err) {
      console.log(err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Container className={`${appStyles.Content} p-4`}>
        <h1 className={styles.Header}>sign up</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username && errors.username.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password1 && errors.password1.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password2 && errors.password2.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} d-flex justify-content-center`}
            type="submit"
          >
            Sign up
          </Button>
          {errors.non_field_errors && errors.non_field_errors.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
      </Container>

      <Container className={`mt-3 ${appStyles.Content}`}>
        <Link className={styles.Link} to="/signin">
          Already have an account? <span>Sign in</span>
        </Link>
      </Container>
    </div>
  );
};

export default SignUpForm;
