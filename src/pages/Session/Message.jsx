import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/StyledComponents';
import useUser from '../../Authentication/useUser';

const MessageContainer = styled.div`
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid ${props => props.isOwn ? '#8b5cf6' : '#3b82f6'};
  background: ${props => props.isOwn ? 'rgba(139, 92, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)'};
  animation: ${fadeIn} 0.6s ease-out;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${props => props.isOwn ? '#c084fc' : '#60a5fa'};
`;

const Timestamp = styled.span`
  color: rgb(100, 116, 139);
  font-size: 0.75rem;
`;

const MessageContent = styled.p`
  color: rgb(226, 232, 240);
  margin: 0;
  line-height: 1.6;
  word-wrap: break-word;      /* يكسر الكلمة الطويلة */
  overflow-wrap: break-word;  /* بديل حديث */
  white-space: pre-wrap;      /* يخلي النص يلف مع الحفاظ على المسافات */
  max-width: 100%;  
`;

const Message = ({ message }) => {
  const { user } = useUser()
    const userId = user?.id
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MessageContainer isOwn={message.user?.username}>
      <MessageHeader>
        <Username isOwn={message.user?.username}>
          {message.user?.id === userId ? 'you' : message.user?.username || "Unknown"}
        </Username>
        <Timestamp>
          {formatTime(message.created_at)}
        </Timestamp>
      </MessageHeader>
      <MessageContent>{message.content}</MessageContent>
    </MessageContainer>
  );
};

export default Message;