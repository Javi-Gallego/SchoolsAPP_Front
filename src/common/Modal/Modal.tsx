import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, children }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modalBackground" onClick={toggleModal} />
      <div className="modalContent">
        {children}
      </div>
    </div>
  );
};