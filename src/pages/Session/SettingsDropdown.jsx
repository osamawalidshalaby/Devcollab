// components/SettingsDropdown.jsx (updated)
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LogOut, User, Settings } from 'lucide-react';
import  useUser  from '../../Authentication/useUser';
import useProfile from '../../Authentication/useProfile';
import useLogout from '../../Authentication/useLogout';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: rgba(51, 65, 85, 0.3);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 12px;
  padding: 16px;
  min-width: 250px;
  z-index: 1000;
  margin-top: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: rgb(148, 163, 184);
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  background: none;
  border: none;
  border-radius: 8px;
  color: rgb(226, 232, 240);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
    color: white;
  }
  
  svg {
    color: rgb(148, 163, 184);
  }
  
  &:hover svg {
    color: white;
  }
`;

const LogoutButton = styled(DropdownItem)`
  color: rgb(239, 68, 68);
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: rgb(248, 113, 113);
  }
  
  &:hover svg {
    color: rgb(248, 113, 113);
  }
`;

const SettingsDropdown = () => {
  const { profile, isLoading  , error} = useProfile()
  const {Logout , isLogout} = useLogout()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user} = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Logout(); 
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        <Settings size={20} />
      </DropdownButton>
      
      {isOpen && (
        <DropdownMenu>
          <UserInfo>
            <UserAvatar>
              {profile?.avatar || 'U'}
            </UserAvatar>
            <UserDetails>
              <UserName>{profile?.username || 'User'}</UserName>
              <UserEmail>ID : {profile.random_id}</UserEmail>
            </UserDetails>
          </UserInfo>
          
          <DropdownItem>
            <User size={16} />
            Profile Settings
          </DropdownItem>
          
          <LogoutButton onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </LogoutButton>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default SettingsDropdown;