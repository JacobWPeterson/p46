import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { StyledButton } from '../styles.js';

const ContactModal = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [alert, setAlert] = useState(null);

  const isValidEmail = () => {
    // get a better regex
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const send = () => {
    if (name.length > 2 && isValidEmail(email) && message.length > 10) {
      // TODO - send mail
      // See bookmark 'React Contact Form' https://www.webtips.dev/react-contact-form-without-backend
      setAlert(null);
      setName('');
      setEmail('');
      setMessage('');
      setEmailSent(true);
    } else {
      if (name.length < 2) {
        setAlert('Please enter your name');
        return;
      }
      if (!isValidEmail(email)) {
        setAlert('Enter a valid email');
        return;
      }
      setAlert(message.length === 0 ? 'Please add your feedback.' : 'Please add more detail to your feedback.');
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please reach out with any questions or suggestions.</p>
        <p>
          Also use this form to report any errors or bugs you have found.
          For errors, please indicate the manuscript and line number.
          For bugs, please provide detailed replication steps.
        </p>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paul Maas"
              value={name}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {alert && <span style={{ color: 'red', 'padding-right': '10px' }}>{alert}</span>}
        <StyledButton background="#d3d3d3" color="#3e5276" height={38} padding="6px 12px" onClick={onHide}>{emailSent ? 'Close' : 'Cancel'}</StyledButton>
        <StyledButton disabled={emailSent} height={38} padding="6px 12px" onClick={send}>{emailSent ? 'Email Sent' : 'Send'}</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
