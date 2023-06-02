import React from "react";
import Modal from "react-modal";

const GradeModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Modal">
      {children}
    </Modal>
  );
};

export default GradeModal;
