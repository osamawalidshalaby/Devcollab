import React from 'react';
import styled from 'styled-components';


const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    background: ${props => props.clickable ? 'rgba(30, 41, 59, 0.6)' : 'rgba(30, 41, 59, 0.4)'};
    border-color: ${props => props.clickable ? 'rgba(139, 92, 246, 0.5)' : 'rgba(71, 85, 105, 0.3)'};
    transform: ${props => props.clickable ? 'translateY(-2px)' : 'none'};
  }
`;

const Model = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex
;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    padding: 1rem;
`


const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0; /* Prevents text overflow */
`;

const UserName = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserId = styled.div`
  color: rgb(148, 163, 184);
  font-size: 0.75rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Avtar = styled.div`
    border-radius : 50% ;
    width : 40px ; 
    height : 40px ; 
    display : flex ;
    flex-direction : row ;
    justify-content : center ; 
    align-items : center ;
    background: linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(249, 115, 22) 100%);
    color : black ; 
    margin : 11px;
    font-weight : bolder ;
`;

const UserBox = ({ 
  user, 
  clickable = false,
  onClick,
  className 
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick(user);
    }
  };

  // Ensure we have user data
  if (!user) {
    return null;
  }

  return (
    <Model>
      <BoxContainer 
      clickable={clickable} 
      onClick={handleClick}
      className={className}
    >
      <Avtar>
        {user.username.charAt(0)}
      </Avtar>

      <UserInfo>
        <UserName>
          {user.username || user.name || 'Unknown User'}
        </UserName>
        <UserId>
          ID: {user.id || user.userId || 'N/A'}
        </UserId>
      </UserInfo>
    </BoxContainer>
    </Model>
  );
};

export default UserBox;