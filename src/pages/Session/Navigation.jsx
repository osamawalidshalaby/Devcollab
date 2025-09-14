// Navigation.jsx (updated)
import styled from 'styled-components';
import { Zap } from 'lucide-react';
import { Container, Title, IconButton } from '../../styles/StyledComponents';
import Notifications from './Notifications';
import SettingsDropdown from './SettingsDropdown';
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(71, 85, 105, 0.5);
`;

const NavContent = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  padding: 8px;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Navigation = () => {
  const navigate = useNavigate()
  return (
    <NavContainer>
      <Container>
        <NavContent>
          <LogoContainer onClick={() => navigate('/app')} style={{cursor: 'pointer'}}>
            <LogoIcon>
              <Zap size={24} color="white" />
            </LogoIcon>
            <Title>DevCollab</Title>
          </LogoContainer>
          
          <ActionButtons>
            <Notifications />
            <SettingsDropdown />
          </ActionButtons>
        </NavContent>
      </Container>
    </NavContainer>
  );
};

export default Navigation;