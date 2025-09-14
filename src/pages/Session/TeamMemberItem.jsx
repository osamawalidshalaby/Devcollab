import React from 'react';
import styled from 'styled-components';
import { Avatar, StatusDot } from '../../styles/StyledComponents';
import useAddFriend from '../../Authentication/useAddFriend';
import useUser from '../../Authentication/useUser.js'
import AcceptFriend from '../../Authentication/acceptFriend.js';
import { InviteNewMemeber } from '../../Authentication/useSearch.js';
import { useParams } from 'react-router-dom';
const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(51, 65, 85, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
  }
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
`;

const MemberStatus = styled.div`
  font-size: 0.875rem;
  color: rgb(148, 163, 184);
`;

const TeamMemberItem = ({ member , type , onInviteSuccess }) => {
  const {addFriendMutate , isAdding} = useAddFriend();
  const {acceptFriendMutate , isAccepting} = AcceptFriend()
  const { invite, isInvite } = InviteNewMemeber()
  const {id} = useParams()
  const {user} = useUser()

    function handleAddFriend() {
        addFriendMutate({userId: user.id, friendId: member.id});
    }

    const handleInvite = () => {
    invite({ sessionId: id, userId: member.id }, {
      onSuccess: () => {
        if (onInviteSuccess) {
          onInviteSuccess();
        }
      }
    });
  };

  return (
    <MemberContainer>
      <Avatar>
        {member.avatar || member.from?.avatar}
      </Avatar>
      <MemberInfo>
        <MemberName>{member.username || member.from?.username}</MemberName>
        <MemberStatus>Online</MemberStatus>
      </MemberInfo>
      {type === 'friends' && <StatusDot online={true} />}
      {type === 'addfriends' && <button onClick={handleAddFriend} disabled={isAdding}>Add Friend</button>}
      {type === 'requests' && <button onClick={() => acceptFriendMutate({id : member.id})} disabled={isAccepting}>Accept Friend</button>}
      {type === 'invite' && <button disabled={isInvite} onClick={handleInvite}>Invite</button>}
    </MemberContainer>
  );
};

export default TeamMemberItem;