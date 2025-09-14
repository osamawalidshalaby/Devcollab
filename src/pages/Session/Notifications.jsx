// components/Notifications.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const NotificationsContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const NotificationsButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  position: relative;
  
  &:hover {
    background: rgba(51, 65, 85, 0.3);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const NotificationsMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 12px;
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
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

const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
`;

const NotificationsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: rgb(100, 116, 139);
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    color: white;
  }
`;

const NotificationsList = styled.div`
  padding: 8px;
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  background: ${props => props.unread ? 'rgba(51, 65, 85, 0.3)' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
  }
`;

const NotificationIcon = styled.div`
  color: ${props => {
    switch(props.type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#3b82f6';
    }
  }};
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  font-size: 0.875rem;
`;

const NotificationMessage = styled.div`
  color: rgb(148, 163, 184);
  font-size: 0.875rem;
  line-height: 1.4;
`;

const NotificationTime = styled.div`
  color: rgb(100, 116, 139);
  font-size: 0.75rem;
  margin-top: 4px;
`;

const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: rgb(148, 163, 184);
`;

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Task Completed',
      message: 'Your task "Design Review" has been marked as completed',
      type: 'success',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'New Message',
      message: 'You have a new message from John Doe',
      type: 'info',
      time: '5 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'Meeting Reminder',
      message: 'Team meeting starts in 30 minutes',
      type: 'warning',
      time: '1 day ago',
      unread: false
    }
  ]);
  const dropdownRef = useRef(null);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false
    })));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      case 'error': return <X size={16} />;
      default: return <Info size={16} />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

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
    <NotificationsContainer ref={dropdownRef}>
      <NotificationsButton onClick={toggleNotifications}>
        <Bell size={20} />
        {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
      </NotificationsButton>
      
      {isOpen && (
        <NotificationsMenu>
          <NotificationsHeader>
            <NotificationsTitle>Notifications</NotificationsTitle>
            {unreadCount > 0 && (
              <ClearButton onClick={markAllAsRead}>
                Mark all as read
              </ClearButton>
            )}
          </NotificationsHeader>
          
          <NotificationsList>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem key={notification.id} unread={notification.unread}>
                  <NotificationIcon type={notification.type}>
                    {getNotificationIcon(notification.type)}
                  </NotificationIcon>
                  <NotificationContent>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    <NotificationTime>{notification.time}</NotificationTime>
                  </NotificationContent>
                </NotificationItem>
              ))
            ) : (
              <EmptyState>
                <Bell size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <div>No notifications</div>
              </EmptyState>
            )}
          </NotificationsList>
        </NotificationsMenu>
      )}
    </NotificationsContainer>
  );
};

export default Notifications;