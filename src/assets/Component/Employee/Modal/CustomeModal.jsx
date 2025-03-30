import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomeModal = ({ show, handleClose, data, handleSave, title, fields }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group className="mb-3" key={field.name}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type="text"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSave(formData)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomeModal;
