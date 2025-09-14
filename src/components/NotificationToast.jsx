// NotificationToast.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
`;

const ToastItem = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'success': return '#4CAF50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      default: return '#2196F3';
    }
  }};
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${props => props.isExiting ? slideUp : slideDown} 0.3s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
`;

const ToastMessage = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  margin-left: 10px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const NotificationToast = ({ type = 'info', message, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!message) return null;

  return (
    <ToastContainer>
      <ToastItem type={type} isExiting={isExiting}>
        <ToastMessage>{message}</ToastMessage>
        <CloseButton onClick={handleClose}>
          ×
        </CloseButton>
      </ToastItem>
    </ToastContainer>
  );
};

export default NotificationToast;