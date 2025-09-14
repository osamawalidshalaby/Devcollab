import React from 'react';
import styled from 'styled-components';
import { UserPlus, Users } from 'lucide-react';
import { Heading, SubHeading, PrimaryButton, SecondaryButton } from '../../styles/StyledComponents';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderContent = styled.div`
  animation: fadeIn 0.6s ease-out;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Header = ({ onAddFriend, onShowFriends }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Heading>Project Alpha</Heading>
      </HeaderContent>
      
      <ButtonGroup>
        <PrimaryButton onClick={onAddFriend}>
          <UserPlus size={16} />
          Add Team Member
        </PrimaryButton>
        <SecondaryButton onClick={onShowFriends}>
          <Users size={16} />
          Team
        </SecondaryButton>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;