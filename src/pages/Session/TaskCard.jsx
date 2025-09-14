
// TaskCard.jsx (mobile-optimized version)
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CheckCircle, Clock, AlertCircle, User, Flag, Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { getRelativeTime } from '../../Helper/helper';
import { useDeleteTask } from '../../Authentication/useTasks';

const TaskContainer = styled.div`
  background: rgba(39, 51, 71, 0.9);
  border-radius: 12px;
  padding: ${props => props.$compact ? '0.75rem' : '1rem'};
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(71, 85, 105, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.75rem;
  cursor: pointer;
  min-height: ${props => props.$compact ? 'auto' : '120px'};
  
  &:hover {
    background: rgba(47, 59, 79, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    border-color: ${props => {
      switch(props.$priority) {
        case 'high': return 'rgba(239, 68, 68, 0.6)';
        case 'medium': return 'rgba(245, 158, 11, 0.6)';
        default: return 'rgba(16, 185, 129, 0.6)';
      }
    }};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 0;
    width: 4px;
    height: calc(100% - 24px);
    background: ${props => {
      switch(props.$priority) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        default: return '#10b981';
      }
    }};
    border-radius: 0 4px 4px 0;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-radius: 10px;
    margin-bottom: 0.5rem;
    min-height: ${props => props.$compact ? 'auto' : '100px'};
    
    &::before {
      top: 10px;
      height: calc(100% - 20px);
    }
  }

  @media (max-width: 480px) {
    padding: 0.625rem;
    min-height: ${props => props.$compact ? 'auto' : '90px'};
    
    &::before {
      top: 8px;
      height: calc(100% - 16px);
      width: 3px;
    }
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.$compact ? '0.5rem' : '0.75rem'};
  gap: 0.5rem;

  @media (max-width: 480px) {
    margin-bottom: ${props => props.$compact ? '0.375rem' : '0.5rem'};
  }
`;

const TaskTitle = styled.h4`
  font-weight: 600;
  color: white;
  font-size: ${props => props.$compact ? '0.9rem' : '1rem'};
  margin: 0;
  flex: 1;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: ${props => props.$compact ? '0.85rem' : '0.9rem'};
  }

  @media (max-width: 480px) {
    font-size: ${props => props.$compact ? '0.8rem' : '0.85rem'};
    -webkit-line-clamp: ${props => props.$compact ? '1' : '2'};
  }
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border-radius: 16px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${props => {
    switch(props.$status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      default: return '#94a3b8';
    }
  }};
  background: ${props => {
    switch(props.$status) {
      case 'completed': return 'rgba(16, 185, 129, 0.15)';
      case 'in-progress': return 'rgba(245, 158, 11, 0.15)';
      default: return 'rgba(100, 116, 139, 0.15)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$status) {
      case 'completed': return 'rgba(16, 185, 129, 0.3)';
      case 'in-progress': return 'rgba(245, 158, 11, 0.3)';
      default: return 'rgba(100, 116, 139, 0.3)';
    }
  }};
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    display: ${props => props.$hideOnMobile ? 'none' : 'flex'};
  }
`;

const TaskDescription = styled.p`
  color: rgb(203, 213, 225);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.625rem;
    -webkit-line-clamp: 1;
  }

  @media (max-width: 480px) {
    display: ${props => props.$compact ? 'none' : 'block'};
    margin-bottom: 0.5rem;
  }
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  position: relative;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.375rem;
  }
`;

const MetaSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }

  @media (max-width: 480px) {
    &:last-child {
      gap: 0.25rem;
    }
  }
`;

const AssigneeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const UserAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: white;
  font-weight: 600;
  border: 1.5px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 0.55rem;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const PriorityTag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => {
    switch(props.$priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#10b981';
    }
  }};
  background: ${props => {
    switch(props.$priority) {
      case 'high': return 'rgba(239, 68, 68, 0.15)';
      case 'medium': return 'rgba(245, 158, 11, 0.15)';
      default: return 'rgba(16, 185, 129, 0.15)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$priority) {
      case 'high': return 'rgba(239, 68, 68, 0.3)';
      case 'medium': return 'rgba(245, 158, 11, 0.3)';
      default: return 'rgba(16, 185, 129, 0.3)';
    }
  }};

  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
    font-size: 0.6rem;
  }

  @media (max-width: 480px) {
    display: ${props => props.$hideOnMobile ? 'none' : 'flex'};
  }
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgb(148, 163, 184);
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  background: rgba(71, 85, 105, 0.2);

  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    display: ${props => props.$hideOnMobile ? 'none' : 'flex'};
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: rgb(148, 163, 184);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.375rem;
  }
`;

const ContextMenu = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(71, 85, 105, 0.6);
  border-radius: 6px;
  padding: 0.375rem;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  min-width: 120px;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    right: auto;
    left: 0;
    min-width: 110px;
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: 100%;
  padding: 0.375rem 0.5rem;
  background: none;
  border: none;
  color: rgb(226, 232, 240);
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(71, 85, 105, 0.4);
  }
  
  &:first-child {
    margin-bottom: 0.125rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.375rem;
  }
`;

const UsernameText = styled.span`
  font-size: 0.7rem;
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileOnlyText = styled.span`
  display: none;
  
  @media (max-width: 480px) {
    display: inline;
    font-size: 0.6rem;
  }
`;

const TaskCard = ({ task, index, compact = false, onEdit, onDelete , isDeleting }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={12} />;
      case 'in-progress': return <Clock size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

    const handleEdit = () => {
    setIsMenuOpen(false);
    if (onEdit) onEdit(task); // تمرير المهمة للدالة
  };


  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };
  
  const getInitials = (username) => {
    if (!username) return '?';
    return username.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const dueDate = getRelativeTime(task.created_at);

  // Check if mobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleDelete = () => {
    setIsMenuOpen(false);
    if (onDelete) onDelete(task);
  };

  return (
    <TaskContainer 
      $priority={task.priority}
      $status={task.status}
      $compact={compact}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <TaskHeader $compact={compact}>
        <TaskTitle $compact={compact}>{task.title}</TaskTitle>
        <StatusBadge $status={task.status} $hideOnMobile={isMobile}>
          {getStatusIcon(task.status)}
          {formatStatus(task.status)}
        </StatusBadge>
      </TaskHeader>
      
      {!compact && task.description && (
        <TaskDescription $compact={compact}>{task.description}</TaskDescription>
      )}
      
      <TaskMeta>
        <MetaSection>
          <AssigneeInfo>
            <User size={12} />
            <UserAvatar>
              {getInitials(task.profiles?.username)}
            </UserAvatar>
            <UsernameText>{task.profiles?.username || 'Unassigned'}</UsernameText>
            <MobileOnlyText>{task.profiles?.username ? task.profiles.username.substring(0, 8) + '...' : 'Unassigned'}</MobileOnlyText>
          </AssigneeInfo>
        </MetaSection>
        
        <MetaSection>
          <PriorityTag $priority={task.priority} $hideOnMobile={isMobile}>
            <Flag size={10} />
            <span>{task.priority}</span>
          </PriorityTag>
          
          <DueDate $hideOnMobile={isMobile}>
            <Calendar size={10} />
            <span>{dueDate}</span>
          </DueDate>
          
          <div style={{ position: 'relative' }} ref={menuRef}>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MoreVertical size={14} />
            </MenuButton>
            
            {isMenuOpen && (
              <ContextMenu>
                <MenuItem onClick={handleEdit}>
                  <Edit size={12} />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} disabled = {isDeleting}>
                  <Trash2 size={12} />
                  Delete
                </MenuItem>
              </ContextMenu>
            )}
          </div>
        </MetaSection>
      </TaskMeta>
    </TaskContainer>
  );
};

export default TaskCard;

