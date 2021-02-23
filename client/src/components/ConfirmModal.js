import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";

const ConfirmModal = (props) => {
  return ReactDOM.createPortal(
    <Modal show onHide={props.onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>{props.actions}</Modal.Footer>
    </Modal>,
    document.getElementById("modal")
  );
};

export default ConfirmModal;
