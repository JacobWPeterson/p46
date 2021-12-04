import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { StyledButton } from '../styles.js';

const ContactModal = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [alert, setAlert] = useState(null);

  const isValidEmail = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const send = () => {
    if (name && isValidEmail(email) && message) {
      // TODO - send mail
      // See bookmark 'React Contact Form' https://www.webtips.dev/react-contact-form-without-backend
      setAlert(null);
      setName('');
      setEmail('');
      setMessage('');
      setEmailSent(true);
    } else {
      setAlert(isValidEmail(email) ? 'Please fill in all fields.' : 'Invalid Email');
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
        <p>Also use this form to report any errors or bugs you have found.</p>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        {alert && <span>{alert}</span>}
        <StyledButton background="#d3d3d3" color="#3e5276" height={38} padding="6px 12px" onClick={onHide}>Cancel</StyledButton>
        <StyledButton disabled={emailSent} height={38} padding="6px 12px" onClick={send}>{emailSent ? 'Email Sent' : 'Send'}</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
