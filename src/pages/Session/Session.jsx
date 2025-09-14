
// Session.jsx (enhanced with contrasting panels)

import styled, { createGlobalStyle } from 'styled-components';

import TaskPanel from './TaskPanel';
import ChatPanel from './ChatPanel';
import AddMemberModal from './AddMemberModal';
import TeamModalSession from './TeamModalSession';
import { 
  MainContainer, 
  BackgroundContainer, 
  BackgroundElement, 
  Container, 
  Grid 
} from '../../styles/StyledComponents';
import { mockMessages, mockTasks } from '../../data/mockData';
import { useState, useEffect } from 'react';
import AddTaskModal from './AddTaskModal';
import { ChevronRight, Folder } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { GetSession } from '../../Authentication/addSession';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0f172a;
    color: white;
    overflow-x: hidden;
  }
  
  button {
    font-family: inherit;
  }
  
  input {
    font-family: inherit;
  }

  /* Custom scrollbar for the entire app */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.4);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(71, 85, 105, 0.6);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(71, 85, 105, 0.8);
  }
`;



const MainContent = styled.main`
  position: relative;
  z-index: 10;
  padding: 32px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
`;

const EnhancedGrid = styled(Grid)`
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
const StatsOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(71, 85, 105, 0.4);
  backdrop-filter: blur(10px);
  height: auto;
  min-height: 160px;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
`;

const ProjectIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


const ViewDetails = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(51, 65, 85, 0.5);
  color: rgb(226, 232, 240);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(71, 85, 105, 0.6);
    border-color: rgba(139, 92, 246, 0.4);
  }
`;


const StatCard = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: rgba(51, 65, 85, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.6);
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || 'white'};
  margin-bottom: 0.25rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const StatLabel = styled.div`
  color: rgb(203, 213, 225);
  font-size: 0.75rem;
  font-weight: 500;
`;


const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(51, 65, 85, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 12px;
  color: rgb(226, 232, 240);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(71, 85, 105, 0.7);
    border-color: rgba(139, 92, 246, 0.7);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.4);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(139, 92, 246, 0.3);
  border-top: 3px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NotificationToast = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(71, 85, 105, 0.6);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  font-weight: 500;
  z-index: 1000;
  backdrop-filter: blur(10px);
  animation: slideIn 0.3s ease-out;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;



function Session() {
  const [messages, setMessages] = useState(mockMessages);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const {id} = useParams()
  const { session, sessionLoad, sessionErrror } = GetSession(id)
  if(sessionErrror){
    setNotification(sessionErrror)
  }


// ده بيكون عندك في app




  // Current project data
  const currentProject = {
    name: 'Project Alpha',
    description: 'Building the next-generation collaboration platform with real-time features and AI integration',
    icon: <Folder size={20} />,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      user: { username: 'You' },
      content,
      created_at: new Date().toISOString(),
      isOwn: true
    };
    
    setMessages([...messages, newMessage]);
    showNotification('Message sent successfully');
  };

  const handleAddTask = () => {
    setShowAddTask(true);
    showNotification('Add new task');
  };

  const handleAddMember = () => {
    setShowAddMember(true);
    showNotification('Invite team member');
  };

  const handleShowTeam = () => {
    setShowTeam(true);
    showNotification('View team members');
  };

  // Calculate some stats for demonstration
  
  if (sessionLoad) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  }
  
  const projectStats = {
    completedTasks: session.tasks.filter(task => task.status === 'completed').length,
    totalTasks: session.tasks.length,
    activeMembers: session.members_count,
    progress: Math.round((session.tasks.filter(task => task.status === 'completed').length / session.tasks.length) * 100)
  };
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <BackgroundContainer>
          <BackgroundElement variant="purple" />
          <BackgroundElement variant="blue" />
          <BackgroundElement variant="emerald" />
        </BackgroundContainer>
        
        <MainContent>
          <Container>
            {/* Enhanced Stats Overview with Project Info */}
            <StatsOverview>
              <ProjectHeader>
                <ProjectInfo>
                  <ProjectIcon>
                    {currentProject.icon}
                  </ProjectIcon>
                  <ProjectDetails>
                    <ProjectName>
                      {session.name}
                    </ProjectName>
            
                  </ProjectDetails>
                </ProjectInfo>
                
                <ViewDetails>
                  Project Details
                  <ChevronRight size={16} />
                </ViewDetails>
              </ProjectHeader>
              
              <StatsGrid>
                <StatCard>
                  <StatValue color="#10b981">{projectStats.completedTasks}</StatValue>
                  <StatLabel>Tasks Completed</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue color="#3b82f6">{projectStats.totalTasks}</StatValue>
                  <StatLabel>Total Tasks</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue color="#f59e0b">{projectStats.activeMembers}</StatValue>
                  <StatLabel>Team Members</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue color="#8b5cf6">{projectStats.progress}%</StatValue>
                  <StatLabel>Project Progress</StatLabel>
                </StatCard>
              </StatsGrid>
            </StatsOverview>

            {/* Quick Actions */}
            <QuickActions>
              <ActionButton onClick={handleAddTask}>
                <span>📋</span>
                Add Quick Task
              </ActionButton>
              <ActionButton onClick={handleAddMember}>
                <span>👥</span>
                Invite Member
              </ActionButton>
              <ActionButton onClick={handleShowTeam}>
                <span>🏆</span>
                View Team
              </ActionButton>
            </QuickActions>

            <EnhancedGrid>
              <TaskPanel setShowAddTask={setShowAddTask} tasks = {session.tasks} sessionLoad = {sessionLoad} sessionId = {session.id}/>
              <ChatPanel 
                sessionId = {id}
                messages={session.messages} 
                onSendMessage={handleSendMessage} 
                sessionLoad ={sessionLoad}
              />
            </EnhancedGrid>
          </Container>
        </MainContent>

        <AddMemberModal 
          id = {session.id}
          isOpen={showAddMember}
          onClose={() => setShowAddMember(false)}
        />
        <AddTaskModal 
          isOpen={showAddTask}
          onClose={() => setShowAddTask(false)}
        />
        <TeamModalSession 
          sessionId = {session.id}
          isOpen={showTeam}
          onClose={() => setShowTeam(false)}
          setShowTeam = {setShowTeam}
        />

        {notification && (
          <NotificationToast>
            {notification}
          </NotificationToast>
        )}
      </MainContainer>
    </>
  );
}

export default Session;

