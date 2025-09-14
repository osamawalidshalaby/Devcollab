import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.variant === 'primary' && `
    background-color: #f59e0b;
    color: #0f172a;
  `}

  ${props => props.variant === 'success' && `
    background-color: #22c55e;
    color: #0f172a;
  `}

  ${props => props.variant === 'danger' && `
    background-color: #ef4444;
    color: #fff;
  `}

  ${props => props.variant === 'secondary' && `
    background-color: #334155;
    color: #e2e8f0;
  `}

  ${props => props.fullWidth && `
    width: 100%;
    justify-content: center;
  `}

  ${props => props.size === 'small' && `
    padding: 0.5rem;
  `}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'normal',
  fullWidth = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;