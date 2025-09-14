import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { ModalOverlay, ModalContent, SectionTitle, IconButton } from '../../styles/StyledComponents';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const CloseButton = styled(IconButton)`
  padding: 4px;
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
  }
`;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <SectionTitle>{title}</SectionTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;