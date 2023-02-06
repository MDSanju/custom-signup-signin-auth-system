import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../context/UserContext";

const Otp = ({ smShow, setSmShow }) => {
  const userContext = useContext(UserContext);
  const { otpVerification } = userContext;

  const handleSendOtp = (e) => {
    e.preventDefault();

    const token = e.target.token.value;

    otpVerification(token);
  };

  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Use OTP Code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-3">
        <Form
          onSubmit={handleSendOtp}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              name="token"
              placeholder="OTP code"
              autoFocus
              required
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Verify
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Otp;
