// import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
// import styled from 'styled-components';
// import { MessageCircle, Send } from 'lucide-react';
// import { Card, SectionTitle, ScrollContainer, StatusDot, PrimaryButton } from '../../styles/StyledComponents';
// import Message from './Message';
// import useUser from '../../Authentication/useUser';
// import { getMessages, sendMessage, subscribeMessages } from '../../Authentication/Chat';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { supabase } from '../../Authentication/Supabase';

// const ChatContainer = styled(Card)`
//   delay: 200ms;
// `;

// const ChatHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 24px;
// `;

// const OnlineStatus = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   color: #10b981;
//   font-size: 0.875rem;
// `;

// const MessagesContainer = styled(ScrollContainer)`
//   height: 320px;
//   margin-bottom: 16px;
// `;

// const MessagesList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   gap: 12px;
//   padding: 12px;
//   background: rgba(51, 65, 85, 0.3);
//   border-radius: 12px;
//   border: 1px solid rgba(71, 85, 105, 0.5);
// `;

// const MessageInput = styled.input`
//   flex: 1;
//   background: transparent;
//   color: rgb(226, 232, 240);
//   border: none;
//   outline: none;
//   font-size: 14px;
  
//   &::placeholder {
//     color: rgb(148, 163, 184);
//   }
// `;

// const SendButton = styled(PrimaryButton)`
//   padding: 8px;
//   border-radius: 8px;
  
//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const ChatPanel = () => {
//   const sessionId = "77574e23-15df-46ad-bb24-6acbfe8f337c";
//   const { user } = useUser();
//   const userId = user?.id;
//   const [newMessage, setNewMessage] = useState("");
//   const queryClient = useQueryClient();

//   const listRef = useRef(null); // 👈 make container scrollable
//   const isFirstLoad = useRef(true);

//   // 1. Fetch messages
//   const { data: messages = [], isLoading } = useQuery({
//     queryKey: ["messages", sessionId],
//     queryFn: () => getMessages(sessionId),
//   });

//   // 2. Send message
//   const mutation = useMutation({
//     mutationFn: (content) => sendMessage(sessionId, userId, content),
//     onSuccess: (data) => {
//       queryClient.setQueryData(["messages", sessionId], (old = []) => [
//         ...old,
//         data,
//       ]);
//       setNewMessage("");
//     },
//   });

//   const scrollToBottom = (smooth = true) => {
//     const el = listRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
//   };

//   // Scroll on first load (no smooth)
//   useLayoutEffect(() => {
//     if (!listRef.current) return;
//     scrollToBottom(false);
//   }, []);

//   // Scroll when messages change
//   useLayoutEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       return;
//     }
//     scrollToBottom(true);
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
//     mutation.mutate(newMessage, { onSuccess: () => scrollToBottom(true) });
//   };

//   // Subscribe to new messages
//   useEffect(() => {
//     const channel = subscribeMessages(sessionId, (newMsg) => {
//       queryClient.setQueryData(["messages", sessionId], (old = []) => {
//         if (old.some((msg) => msg.id === newMsg.id)) return old;
//         return [...old, newMsg];
//       });
//     });
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [sessionId, queryClient]);

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <ChatContainer>
//       <ChatHeader>
//         <SectionTitle>
//           <MessageCircle size={20} />
//           Team Chat
//         </SectionTitle>
//         <OnlineStatus>
//           <StatusDot status="online" />
//           3 online
//         </OnlineStatus>
//       </ChatHeader>

//       <MessagesContainer ref={listRef}>
//         <MessagesList>
//           {messages.map((message) => (
//             <Message key={message.id} message={message} />
//           ))}
//         </MessagesList>
//       </MessagesContainer>

//       <InputContainer>
//         <MessageInput
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <SendButton onClick={handleSendMessage}>
//           <Send size={16} />
//         </SendButton>
//       </InputContainer>
//     </ChatContainer>
//   );
// };

// export default ChatPanel;

// ChatPanel.jsx (enhanced with better contrast)
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { MessageCircle, Send, Users } from 'lucide-react';
import { Card, SectionTitle, StatusDot, PrimaryButton } from '../../styles/StyledComponents';
import Message from './Message';
import useUser from '../../Authentication/useUser';
import { getMessages, sendMessage, subscribeMessages } from '../../Authentication/Chat';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../Authentication/Supabase';

const ChatContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 500px;
  background: rgba(26, 35, 51, 0.95);
  border: 1px solid rgba(85, 65, 125, 0.6);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(85, 65, 125, 0.4);
  flex-shrink: 0;
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 500;
  background: rgba(16, 185, 129, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(16, 185, 129, 0.3);
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(85, 65, 125, 0.3);
  
  /* Enhanced scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.4);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(85, 65, 125, 0.6);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(85, 65, 125, 0.8);
  }
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: min-content;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(30, 41, 59, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(85, 65, 125, 0.6);
  transition: border-color 0.2s ease;
  flex-shrink: 0;
  
  &:focus-within {
    border-color: rgba(139, 92, 246, 0.8);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
`;

const MessageInput = styled.input`
  flex: 1;
  background: transparent;
  color: rgb(226, 232, 240);
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  
  &::placeholder {
    color: rgb(148, 163, 184);
  }
`;

const SendButton = styled(PrimaryButton)`
  padding: 10px;
  border-radius: 10px;
  min-width: auto;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  
  &:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: rgba(139, 92, 246, 0.5);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgb(148, 163, 184);
  font-size: 0.875rem;
  margin-bottom: 8px;
  padding: 4px 12px;
  background: rgba(71, 85, 105, 0.2);
  border-radius: 8px;
  align-self: flex-start;
  max-width: fit-content;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(148, 163, 184);
  animation: pulse 1.5s infinite;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgb(148, 163, 184);
  text-align: center;
  padding: 40px 20px;
  
  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const EmptyTitle = styled.h4`
  color: rgb(226, 232, 240);
  margin-bottom: 8px;
  font-weight: 600;
`;

const Timestamp = styled.div`
  text-align: center;
  color: rgb(100, 116, 139);
  font-size: 0.75rem;
  margin: 16px 0;
  padding: 4px 12px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  align-self: center;
  max-width: fit-content;
  border: 1px solid rgba(71, 85, 105, 0.4);
`;

const ChatPanel = ({sessionId}) => {
  const { user } = useUser();
  const userId = user?.id;
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();

  const listRef = useRef(null);
  const isFirstLoad = useRef(true);
  const typingTimeoutRef = useRef(null);

  // 1. Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", sessionId],
    queryFn: () => getMessages(sessionId),
  });

  // 2. Send message
  const mutation = useMutation({
    mutationFn: (content) => sendMessage(sessionId, userId, content),
    onSuccess: (data) => {
      queryClient.setQueryData(["messages", sessionId], (old = []) => [
        ...old,
        data,
      ]);
      setNewMessage("");
      setIsTyping(false);
    },
  });

  const scrollToBottom = (smooth = true) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  };

  // Scroll on first load (no smooth)
  useLayoutEffect(() => {
    if (!listRef.current) return;
    scrollToBottom(false);
  }, []);

  // Scroll when messages change
  useLayoutEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    scrollToBottom(true);
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    mutation.mutate(newMessage, { onSuccess: () => scrollToBottom(true) });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    // Typing indicator logic
    if (!isTyping) {
      setIsTyping(true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  // Subscribe to new messages
  useEffect(() => {
    const channel = subscribeMessages(sessionId, (newMsg) => {
      queryClient.setQueryData(["messages", sessionId], (old = []) => {
        if (old.some((msg) => msg.id === newMsg.id)) return old;
        return [...old, newMsg];
      });
    });
    return () => {
      supabase.removeChannel(channel);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [sessionId, queryClient]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date for timestamps
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.created_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <ChatContainer>
      <ChatHeader>
        <SectionTitle>
          <MessageCircle size={20} />
          Team Chat
        </SectionTitle>
        <OnlineStatus>
          <Users size={14} />
          <StatusDot status="online" />
          3 online
        </OnlineStatus>
      </ChatHeader>

      <MessagesContainer ref={listRef}>
        <MessagesList>
          {isLoading ? (
            <EmptyState>
              <MessageCircle size={32} />
              <EmptyTitle>Loading messages...</EmptyTitle>
            </EmptyState>
          ) : messages.length === 0 ? (
            <EmptyState>
              <MessageCircle size={40} />
              <EmptyTitle>No messages yet</EmptyTitle>
              <p>Start the conversation by sending a message!</p>
            </EmptyState>
          ) : (
            Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <React.Fragment key={date}>
                <Timestamp>
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Timestamp>
                {dateMessages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </React.Fragment>
            ))
          )}
          
          {isTyping && (
            <TypingIndicator>
              <span>Someone is typing</span>
              <Dot />
              <Dot />
              <Dot />
            </TypingIndicator>
          )}
        </MessagesList>
      </MessagesContainer>

      <InputContainer>
        <MessageInput
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={mutation.isLoading}
        />
        <SendButton 
          onClick={handleSendMessage} 
          disabled={!newMessage.trim() || mutation.isLoading}
        >
          <Send size={16} />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPanel;