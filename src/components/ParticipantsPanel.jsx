import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMessages, sendMessage, subscribeMessages } from '../Authentication/Chat';
import styled from 'styled-components';
import { 
  Users, 
  MessageCircle, 
  Send, 
} from 'lucide-react';
import { supabase } from '../Authentication/Supabase';
import useUser from '../Authentication/useUser';

const PanelContainer = styled.div`
  background-color: #1e293b;
  border-radius: 16px;
  border: 1px solid #334155;
  padding: 1rem;
  height: fit-content;
  width: 95%;
  max-width: 780px;
  margin: auto;
  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: ${props => props.isDesktop ? 'default' : 'pointer'};
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #f8fafc;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ChatSection = styled.div`
  background-color: #334155;
  border-radius: 12px;
  padding: 1rem;
`;

const ChatTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChatMessages = styled.div`
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 1rem;
  height : 500px;
  @media (min-width: 768px) {
    max-height: 200px;
  }
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;

  .user {
    color: #f59e0b;
    font-weight: bold;
  }

  .time {
    color: #94a3b8;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }

  .content {
    color: #e2e8f0;
  }
`;

const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChatInputField = styled.input`
  flex: 1;
  padding: 0.5rem;
  background-color: #475569;
  border: none;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 0.875rem;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #f59e0b;
  color: #0f172a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d97706;
  }

  &:active {
    transform: scale(0.95);
  }
`;


function ParticipantsPanel() {
  const sessionId = '77574e23-15df-46ad-bb24-6acbfe8f337c';
  const { user } = useUser()
  const userId = user?.id
  const [newMessage, setNewMessage] = useState("")
  const queryClient = useQueryClient()
  const messagesEndRef = useRef(null)

  // 1. Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", sessionId],
    queryFn: () => getMessages(sessionId),
  })

  // 2. Send message
  const mutation = useMutation({
    mutationFn: (content) => sendMessage(sessionId, userId, content),
    onSuccess: (data) => {
      queryClient.setQueryData(["messages", sessionId], (old = []) => [...old, data])
      setNewMessage("")
    },
  })

  const handleSend = () => {
    if (!newMessage.trim()) return
    mutation.mutate(newMessage)
  }

  // 3. Realtime
  useEffect(() => {
    const channel = subscribeMessages(sessionId, (newMsg) => {
      queryClient.setQueryData(["messages", sessionId], (old = []) => {
        if (old.some((msg) => msg.id === newMsg.id)) return old
        return [...old, newMsg]
      })
    })
    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId, queryClient])

  // 4. Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isLoading) return <p>Loading messages...</p>

  return (
    <PanelContainer>
      <Header>
        <SectionTitle>Participants</SectionTitle>
      </Header>

      <ChatSection>
        <ChatTitle>Session Chat</ChatTitle>

        <ChatMessages>
          {messages.map((msg) => (
            <Message key={msg.id}>
              <span className="user">
                {msg.user?.id === userId ? 'you' : msg.user?.username || "Unknown"}
              </span>
              <span className="time">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div className="content">{msg.content}</div>
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>

        <ChatInput>
          <ChatInputField
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <SendButton onClick={handleSend}>Send</SendButton>
        </ChatInput>
      </ChatSection>
    </PanelContainer>
  )
}

export default ParticipantsPanel
