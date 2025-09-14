
// LandingPage.jsx
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Code, Users, Zap, Shield, Star, ChevronRight, MessageCircle, X, Trash } from 'lucide-react';
import Login from './Login';
import SignupPage from './SignupPage';
import { PrimaryButton, SecondaryButton } from '../styles/StyledComponents';

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

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  overflow-x: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f59e0b;
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgb(226, 232, 240);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #f59e0b;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #f59e0b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgb(203, 213, 225);
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const AppPreview = styled.div`
  width: 400px;
  height: 450px;
  background: linear-gradient(135deg, rgba(26, 35, 51, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
  border-radius: 20px;
  border: 1px solid rgba(85, 65, 125, 0.6);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  
  @media (max-width: 968px) {
    width: 320px;
    height: 360px;
    transform: none;
  }
  
  @media (max-width: 480px) {
    width: 280px;
    height: 360px;
  }
`;

const PreviewHeader = styled.div`
  padding: 1rem;
  background: rgba(30, 41, 59, 0.8);
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-weight: 600;
`;

const PreviewContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PreviewMessage = styled.div`
  padding: 0.75rem;
  background: ${props => props.own ? 'rgba(59, 130, 246, 0.2)' : 'rgba(71, 85, 105, 0.3)'};
  border-radius: 12px;
  border: 1px solid ${props => props.own ? 'rgba(59, 130, 246, 0.3)' : 'rgba(71, 85, 105, 0.4)'};
  align-self: ${props => props.own ? 'flex-end' : 'flex-start'};
  max-width: 80%;
  font-size: 0.875rem;
`;

const PreviewTask = styled.div`
  padding: 0.75rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(15, 23, 42, 0.5);
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(26, 35, 51, 0.8);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${props => props.color ? props.color : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled.p`
  color: rgb(148, 163, 184);
  line-height: 1.6;
`;

const CtaSection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(26, 35, 51, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgb(203, 213, 225);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Footer = styled.footer`
  padding: 3rem 2rem;
  background: rgba(15, 23, 42, 0.9);
  border-top: 1px solid rgba(71, 85, 105, 0.3);
  text-align: center;
  color: rgb(148, 163, 184);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: rgba(26, 35, 51, 0.95);
  border-radius: 16px;
  border: 1px solid rgba(85, 65, 125, 0.6);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(71, 85, 105, 0.5);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  
  &:hover {
    background: rgba(71, 85, 105, 0.7);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: 2px solid rgba(96, 165, 250, 0.8);
    outline-offset: 2px;
  }
`;

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const features = [
    {
      icon: <Code size={30} />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time on projects, with live updates and synchronized editing.",
      color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    {
      icon: <Users size={30} />,
      title: "Team Management",
      description: "Easily add team members, assign tasks, and manage permissions for your projects.",
      color: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    },
    {
      icon: <Zap size={30} />,
      title: "Integrated Code Editor",
      description: "Code together with our built-in editor featuring syntax highlighting and live preview.",
      color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    },
    {
      icon: <MessageCircle size={30} />,
      title: "Team Chat",
      description: "Communicate with your team through our integrated chat system with message history.",
      color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      icon: <Shield size={30} />,
      title: "Secure & Private",
      description: "Your data is encrypted and secure with enterprise-grade security practices.",
      color: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
    },
    {
      icon: <Star size={30} />,
      title: "Task Management",
      description: "Create, assign, and track tasks with our intuitive task management system.",
      color: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
    }
  ];

  const handleToggleForm = () => {
    if (showLogin) {
      setShowLogin(false);
      setShowSignup(true);
    } else {
      setShowSignup(false);
      setShowLogin(true);
    }
  };

  return (
    <LandingContainer>
      <Header>
        <Logo>
          <Zap size={28} />
          <span>DevCollab</span>
        </Logo>
        
        {/* <Nav>
          <NavLink>Features</NavLink>
          <NavLink>How It Works</NavLink>
          <NavLink>Pricing</NavLink>
          <NavLink>Contact</NavLink>
        </Nav> */}
        
        <AuthButtons>
          <SecondaryButton onClick={() => setShowLogin(true)}>
            Sign In
          </SecondaryButton>
          <PrimaryButton onClick={() => setShowSignup(true)}>
            Get Started
          </PrimaryButton>
        </AuthButtons>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Code Together, Build Faster
          </HeroTitle>
          <HeroSubtitle>
            DevCollab is the ultimate platform for developers to collaborate in real-time, 
            manage projects, and write code together from anywhere in the world.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton onClick={() => setShowSignup(true)}>
              Start Coding Together
              <ChevronRight size={20} />
            </PrimaryButton>
            <SecondaryButton onClick={() => setShowLogin(true)}>
              Sign In
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
        
        <HeroImage>
          <AppPreview>
            <PreviewHeader>
              <MessageCircle size={18} />
              Team Chat
            </PreviewHeader>
            <PreviewContent>
              <PreviewMessage>
                <strong>Alex:</strong> Have you finished the login component?
              </PreviewMessage>
              <PreviewMessage own>
                <strong>You:</strong> Yes, just pushed the changes!
              </PreviewMessage>
              <PreviewTask>
                <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#10b981'}}></div>
                <span>Create authentication system - Completed</span>
              </PreviewTask>
              <PreviewTask>
                <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b'}}></div>
                <span>Design landing page - In progress</span>
              </PreviewTask>
            </PreviewContent>
          </AppPreview>
        </HeroImage>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Powerful Features</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon color={feature.color}>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <CtaSection>
        <CtaTitle>Ready to Transform Your Workflow?</CtaTitle>
        <CtaSubtitle>
          Join thousands of developers who are already collaborating more effectively with DevCollab.
        </CtaSubtitle>
        <PrimaryButton onClick={() => setShowSignup(true)} size="large">
          Get Started for Free
        </PrimaryButton>
      </CtaSection>

      <Footer>
        <p>© 2023 DevCollab. All rights reserved.</p>
      </Footer>

      {(showLogin || showSignup) && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => { setShowLogin(false); setShowSignup(false); }}>
              <X size={24} style={{position : 'absolute' , top: '50%', right: '50%', transform: 'translate(50%, -50%)'}}/>
            </CloseButton>
            {showLogin && <Login onToggleForm={handleToggleForm} />}
            {showSignup && <SignupPage onToggleForm={handleToggleForm} />}
          </ModalContent>
        </ModalOverlay>
      )}
    </LandingContainer>
  );
};

export default LandingPage;