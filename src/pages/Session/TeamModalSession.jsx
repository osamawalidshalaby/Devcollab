import React, { useState } from 'react';
import { UserPlus, UsersRound } from "lucide-react"
import styled from 'styled-components';
import Modal from './Modal';
import Spinner from '../../components/Spinner'
import { SessionMembers } from '../../Authentication/useSearch';
import TeamMemberSession from './TeamMemberSession';

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Nav = styled.div`
    display: flex
;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`

const Link = styled.div`
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgb(51, 65, 85);
    color: rgb(226, 232, 240);
`



const TeamModalSession = ({ isOpen, onClose  , sessionId}) => {
  const { members, isLoading, error } = SessionMembers(sessionId)
  if(isLoading) return <Spinner />
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Team Members">
      <TeamList>
        {members.map((member , i) => (
          <TeamMemberSession key={i} member={member} type={'friends'}/>
        ))}
      </TeamList>
    </Modal>
  );
};

export default TeamModalSession;