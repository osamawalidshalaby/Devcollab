import styled, { keyframes, css, createGlobalStyle } from "styled-components";

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Main Container
export const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #312e81 50%, #581c87 100%);
  position: relative;
  overflow: hidden;
`;

// Background Elements
// export const BackgroundElement = styled.div`
//   position: absolute;
//   border-radius: 50%;
//   filter: blur(96px);
//   animation: ${pulse} 3s ease-in-out infinite;
//   pointer-events: none;

//   ${(props) =>
//     props.variant === "purple" &&
//     css`
//       top: 25%;
//       left: 25%;
//       width: 384px;
//       height: 384px;
//       background: rgba(147, 51, 234, 0.2);
//     `}

//   ${(props) =>
//     props.variant === "blue" &&
//     css`
//       top: 75%;
//       right: 25%;
//       width: 384px;
//       height: 384px;
//       background: rgba(59, 130, 246, 0.2);
//       animation-delay: 1s;
//     `}
  
//   ${(props) =>
//     props.variant === "emerald" &&
//     css`
//       bottom: 25%;
//       left: 50%;
//       width: 384px;
//       height: 384px;
//       background: rgba(16, 185, 129, 0.1);
//       animation-delay: 2s;
//     `}
// `;

// In your StyledComponents.js file, update the BackgroundElement component:
export const BackgroundElement = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  z-index: 1;
  
  ${props => {
    switch(props.variant) {
      case 'purple':
        return `
          width: 500px;
          height: 500px;
          background: #8b5cf6;
          top: -250px;
          right: -250px;
        `;
      case 'blue':
        return `
          width: 600px;
          height: 600px;
          background: #3b82f6;
          bottom: -300px;
          left: -300px;
        `;
      case 'emerald':
        return `
          width: 400px;
          height: 400px;
          background: #10b981;
          top: 50%;
          left: 20%;
        `;
      case 'teal':
        return `
          width: 500px;
          height: 500px;
          background: #0d9488;
          top: -250px;
          right: -250px;
        `;
      case 'cyan':
        return `
          width: 600px;
          height: 600px;
          background: #0891b2;
          bottom: -300px;
          left: -300px;
        `;
      default:
        return '';
    }
  }}
`;


export const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

// Common Button Styles
export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;



export const SecondaryButton = styled(Button)`
  background: rgba(30, 41, 59, 0.5);
  color: rgb(226, 232, 240);
  border: 1px solid rgba(71, 85, 105, 0.5);

  &:hover {
    background: rgba(51, 65, 85, 0.5);
    border-color: rgba(139, 92, 246, 0.5);
  }
`;

export const IconButton = styled.button`
  padding: 8px;
  background: rgba(30, 41, 59, 0.5);
  color: rgb(148, 163, 184);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(51, 65, 85, 0.5);
    transform: scale(1.05);
  }
`;

// Card Components


// Input Components
export const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  color: rgb(226, 232, 240);
  font-size: 14px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgb(148, 163, 184);
  }

  &:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.5);
  }
`;

// Text Components
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #c084fc 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

export const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin: 0 0 8px 0;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const SubHeading = styled.p`
  color: rgb(148, 163, 184);
  font-size: 1.125rem;
  margin: 0;
`;


// Layout Components
export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  gap: 32px;

  @media (min-width: 1280px) {
    grid-template-columns: 70% 1fr;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

// Modal Components
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 28rem;
  animation: ${slideIn} 0.3s ease-out;
`;


// Add to your existing StyledComponents.js file

// Enhanced Card component
export const Card = styled.div`
  background: rgba(26, 35, 51, 0.95);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(71, 85, 105, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  width: 100%; // Ensure full width
  box-sizing: border-box; // Include padding in width calculation

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
`;

// Enhanced PrimaryButton
export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Enhanced SectionTitle
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-y: scroll
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.5);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(51, 65, 85, 0.5);
    border-radius: 3px;
  }

`;

// Scrollbar Styles
export const ScrollContainer = styled.div`
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.5);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(51, 65, 85, 0.5);
    border-radius: 3px;
  }
`;

// Status Indicators
export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => {
    switch (props.status) {
      case "online":
        return "#10b981";
      case "offline":
        return "#6b7280";
      default:
        return "#10b981";
    }
  }};
  animation: ${(props) => (props.status === "online" ? pulse : "none")} 2s
    ease-in-out infinite;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
