import React, { useState } from 'react';
import { UserPlus, UsersRound } from "lucide-react"
import styled from 'styled-components';
import Modal from './Modal';
import TeamMemberItem from './TeamMemberItem';
import  GetFriends  from '../../Authentication/getFriends';
import GetPending from '../../Authentication/getPending';

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



const TeamModal = ({ isOpen, onClose }) => {
  const [status , setStatus] = useState("friends")
  const {pendingFriends , isLoadingPending} = GetPending()
  const {data : friendsData , isLoading} = GetFriends();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Team Members">
      <Nav>
            <Link onClick={() => setStatus('friends')} style={status === 'friends' ? { backgroundColor: 'rgb(245, 158, 11)', color: 'rgb(15, 23, 42)' } : {}}> <UserPlus size={16}/> Friends</Link>
            <Link onClick={() => setStatus('requests')} style={status === 'requests' ? { backgroundColor: 'rgb(245, 158, 11)', color: 'rgb(15, 23, 42)' } : {}}> <UsersRound size={16}/> Requests</Link>
      </Nav>
      <TeamList>
        {isLoading && <div>Loading...</div>}
        {status === 'friends' && friendsData && friendsData.map((member) => (
          <TeamMemberItem key={member.friend.id} member={member.friend} type={'friends'}/>
        ))}
        {status === 'requests' && pendingFriends && pendingFriends.map((member) => (
          <TeamMemberItem key={member.from.id} member={member} type={'requests'}/>
        ))}
      </TeamList>
    </Modal>
  );
};

export default TeamModal;