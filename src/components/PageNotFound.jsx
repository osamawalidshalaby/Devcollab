// NotFound.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Home, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../styles/StyledComponents';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NotFoundContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(71, 85, 105, 0.4);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out;
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    color: #f59e0b;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const Description = styled.p`
  color: rgb(148, 163, 184);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HomeButton = styled(PrimaryButton)`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Content>
        <IconContainer>
          <AlertTriangle size={48} />
        </IconContainer>
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Description>
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or return to the homepage.
        </Description>
        <HomeButton onClick={() => navigate('/')}>
          <Home size={20} />
          Return to Homepage
        </HomeButton>
      </Content>
    </NotFoundContainer>
  );
};

export default NotFound;