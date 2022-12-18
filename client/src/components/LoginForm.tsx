import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { AuthContext } from "../contexts/userContext";

import "./loginStyles.css";

interface iLoginForm {
  loginFormOpen: boolean,
  onHideLoginForm: (userDetails?: any) => void;
}

const LoginForm: React.FC<iLoginForm> = ({loginFormOpen, onHideLoginForm}: iLoginForm) => {
  const [validated, setValidated] = useState(false);
  const {state, login} = useContext(AuthContext);
  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return
    }
    event.preventDefault()
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries())
    login(formDataObj.userName, formDataObj.password);
  };

  return(
    <Modal centered show={loginFormOpen && !state.isLoggedIn} onHide={onHideLoginForm}>
      <Modal.Body>
        <div className={"login-container"}>
          <div className="form-box">
            <div className="header-form">
              <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize:"110px"}}></i></h4>
              <div className="image h3 text-center">
                <i> Divine Collections </i>
              </div>
            </div>
            <div className="body-form">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm"><span className="input-group-text"><i className="fa fa-user"></i></span></InputGroup.Text>
                  <Form.Control
                    required
                    name="userName"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Username"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter user name
                  </Form.Control.Feedback>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm"><span className="input-group-text"><i className="fa fa-lock"></i></span></InputGroup.Text>
                  <Form.Control
                    required
                    name="password"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter password
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me!" />
                </Form.Group>
                <div className="text-right forget-password social">
                   <span className="text-style no-margin">Forgot your password?</span>
                </div>
                <div className="text-right mt-2">
                  <span>
                    <a href="/signup"> Not Registered Yet? Signup </a>
                  </span>
                </div>
                <div className="social">
                   <span className="text-style no-margin"><i className="fa fa-facebook"></i></span>
                   <span className="text-style no-margin"><i className="fa fa-twitter-square"></i></span>
                   <span className="text-style no-margin"><i className="fa fa-google"></i></span>
                </div>
                {state.loginError ?
                  <div className="login-error">
                    { state.loginError.error }
                  </div> : null
                }
                <div className="mb-3 mt-2 signup-footer">
                  <Button variant="primary" type="submit" id="submit" >
                    Submit
                  </Button>
                  <Button variant="secondary" type="reset" id="cancel">
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>   
      </Modal.Body>
      <Modal.Footer>
        <a href="/"> See Our Products &gt; </a>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginForm;