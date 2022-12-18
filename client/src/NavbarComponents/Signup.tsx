import React, { useState } from 'react';
import { InputGroup, Form, Row, Col, Button } from 'react-bootstrap';
import "../components/loginStyles.css";
import { useNavigate } from "react-router";

const Signup : React.FC = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  async function handleSubmit (event: any) {
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

    await fetch("http://localhost:8000/user/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "localhost, 0.0.0.0/0",
        "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      },
      body: JSON.stringify(formDataObj),
    })
    .catch(error => {
      window.alert(error);
      return;
    }).finally( () => {
      navigate("/");
    })
  }

  const checkPassword = () => {
    const pass = document.getElementsByName('password');
    const rePass = document.getElementsByName('rePassword');
    if ( pass === rePass ) {
      setValidated(true);
    }
  }
  return (
    <div className={"login-container"}>
      <div className="form-box">
        <div className="header-form">
          <div className="image h3 text-center">
            <i> Please Enter Details </i>
          </div>
        </div>
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
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"><span className="input-group-text"><i className="fa fa-lock"></i></span></InputGroup.Text>
            <Form.Control
              required
              name="password"
              type={!showPass ? `password` : `text`}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Password"
            />
            <InputGroup.Text>
              <i onClick={() => setShowPass(!showPass)} className={showPass ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"><span className="input-group-text"><i className="fa fa-lock"></i></span></InputGroup.Text>
            <Form.Control
              required
              type='password'
              name="rePassword"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Re-type Password"
              onBlur={() => checkPassword()}
            />
            <Form.Control.Feedback type="invalid">
              Please fill password / Password doesn't match
            </Form.Control.Feedback>
          </InputGroup>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="fName">
              <Form.Control
                required
                name="fName" 
                placeholder="First Name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter first name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="lName">
              <Form.Control name="lName" placeholder="Last Name" />
            </Form.Group>
          </Row>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"><span className="input-group-text"><i className="fa fa-envelope"></i></span></InputGroup.Text>
            <Form.Control
              required
              name="email"
              type='email'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Enter E-mail id"
            />
            <Form.Control.Feedback type="invalid">
              Please enter email id
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm"><span className="input-group-text"><i className="fa fa-phone"></i></span></InputGroup.Text>
            <Form.Control
              required
              name="phone"
              type='phone'
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Enter Phone Number"
            />
            <Form.Control.Feedback type="invalid">
              Please enter phone number.
            </Form.Control.Feedback>
          </InputGroup>

          <div className="text-right mt-2">
          <span><a href="/login"> Already Registered Yet? Login </a></span>
          </div>
          <div className="mb-3 mt-4 signup-footer">
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
  );
}

export default Signup;