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

const TeamMemberSession = ({ member , type , onInviteSuccess  }) => {
  const { invite, isInvite } = InviteNewMemeber()
  const {id} = useParams()

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
        {member.profiles.avatar}
      </Avatar>
      <MemberInfo>
        <MemberName>{member.profiles.username}</MemberName>
        <MemberStatus>Online</MemberStatus>
      </MemberInfo>
      {type === 'friends' && <StatusDot online={true} />}
      {type === 'invite' && <button disabled={isInvite} onClick={handleInvite}>Invite</button>}
      
    </MemberContainer>
  );
};

export default TeamMemberSession;