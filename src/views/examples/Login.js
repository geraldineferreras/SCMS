/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("scms_users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    if (user.status !== "active") {
      setError("Your account is inactive. Please contact the administrator.");
      return;
    }
    setError("");
    // Proceed with login (set session, redirect, etc.)
    alert("Login successful!");
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="pb-2 border-0">
            <div className="text-center">
              <h1 className="display-4 text-dark mb-0" style={{ fontWeight: 700, fontSize: '2.5rem' }}>Login</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {error && <div className="text-danger text-center mb-3">{error}</div>}
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <Button className="my-4 w-100" color="primary" type="submit">
                Sign in
              </Button>
              <hr style={{ border: 'none', height: '1px', background: '#e9ecef', margin: '2rem 0 1rem 0' }} />
              <div className="text-center text-muted mb-2">
                <small>Or sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/github.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/google.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link
              className="text-light"
              to="/auth/forgot-password"
            >
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link
              className="text-light"
              to="/auth/register"
            >
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
