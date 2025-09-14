
import React, { useState } from 'react';
import styled from 'styled-components';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import {GoogleAuthButton, useSingup} from '../Authentication/useSingup';
import { SpinnerMini } from '../components/SpinnerMini';

const SignupContainer = styled.div`
  padding: 2.5rem;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const SignupTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const SignupSubtitle = styled.p`
  text-align: center;
  color: rgb(148, 163, 184);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: rgb(100, 116, 139);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(100, 116, 139);
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgb(100, 116, 139);
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: rgb(100, 116, 139);

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(71, 85, 105, 0.5);
  }

  span {
    padding: 0 1rem;
    font-size: 0.875rem;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.8);
  color: #ffffff;
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(71, 85, 105, 0.8);
  }
`;

const LoginPrompt = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #94a3b8;
`;

const LoginLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

function SignupPage({ onToggleForm, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useSingup();
  const { mutate, isSign } = GoogleAuthButton()

  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) return;

    const username = `${firstName} ${lastName}`;
    signup({ email, password, username }, {
      onSettled: () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      },
    });
  }

  return (
    <SignupContainer>
      <SignupTitle>Create Account</SignupTitle>
      <SignupSubtitle>Join thousands of developers using CollabCode</SignupSubtitle>
      
      <Form onSubmit={handleSubmit}>
        <InputRow>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              disabled={isLoading}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              disabled={isLoading}
              required
            />
          </InputGroup>
        </InputRow>
        
        <InputGroup>
          <InputIcon>
            <Mail size={20} />
          </InputIcon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            disabled={isLoading}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <InputIcon>
            <Lock size={20} />
          </InputIcon>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading}
            required
          />
          <PasswordToggle 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </PasswordToggle>
        </InputGroup>
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Create Account'}
        </SubmitButton>
      </Form>
      
      <Divider>
        <span>or</span>
      </Divider>
      
      <GoogleButton type="button" disabled={isSign} onClick={() => mutate()}>
        <FcGoogle size={20} />
        Sign up with Google
      </GoogleButton>
      
      <LoginPrompt>
        Already have an account?{' '}
        <LoginLink onClick={onToggleForm} disabled={isLoading}>
          Sign in
        </LoginLink>
      </LoginPrompt>
    </SignupContainer>
  );
}

export default SignupPage;
