// Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { 
//   BarChart3, 
//   Clock, 
//   Calendar, 
//   TrendingUp, 
//   Users, 
//   FolderOpen, 
//   CheckCircle,
//   AlertCircle,
//   PlayCircle,
//   Target,
//   PieChart,
//   Activity
// } from 'lucide-react';
// import { Container, Title, Card } from '../styles/StyledComponents';
// import { useSessions } from '../Authentication/addSession';
// import { useTasks } from '../Authentication/useTasks';
// import useUser from '../Authentication/useUser';
// import Spinner from '../components/Spinner';

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const DashboardContainer = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//   color: white;
//   padding: 2rem 0;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
//   flex-wrap: wrap;
//   gap: 1rem;
// `;

// const WelcomeSection = styled.div`
//   animation: ${fadeIn} 0.6s ease-out;
// `;

// const WelcomeText = styled.div`
//   color: rgb(148, 163, 184);
//   font-size: 1.1rem;
//   margin-top: 0.5rem;
// `;

// const DashboardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const StatCard = styled(Card)`
//   padding: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   animation: ${fadeIn} 0.6s ease-out;
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//   }
// `;

// const StatHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const StatIcon = styled.div`
//   width: 48px;
//   height: 48px;
//   border-radius: 12px;
//   background: ${props => props.color};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StatContent = styled.div`
//   flex: 1;
// `;

// const StatValue = styled.div`
//   font-size: 2rem;
//   font-weight: 700;
//   color: white;
//   margin-bottom: 0.5rem;
// `;

// const StatLabel = styled.div`
//   color: rgb(148, 163, 184);
//   font-size: 0.9rem;
// `;

// const StatTrend = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: ${props => props.positive ? '#10b981' : '#ef4444'};
//   font-size: 0.875rem;
//   margin-top: 0.5rem;
// `;

// const ChartContainer = styled(Card)`
//   padding: 1.5rem;
//   grid-column: 1 / -1;
//   animation: ${fadeIn} 0.6s ease-out;
// `;

// const ChartHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
// `;

// const ChartTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: white;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const ChartContent = styled.div`
//   height: 300px;
//   position: relative;
// `;

// const ProgressBar = styled.div`
//   height: 8px;
//   background: rgba(71, 85, 105, 0.3);
//   border-radius: 4px;
//   overflow: hidden;
//   margin: 0.5rem 0;
// `;

// const ProgressFill = styled.div`
//   height: 100%;
//   background: ${props => props.color};
//   border-radius: 4px;
//   width: ${props => props.percentage}%;
//   transition: width 0.5s ease;
// `;

// const TaskList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   margin-top: 1rem;
// `;

// const TaskItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0.75rem;
//   background: rgba(51, 65, 85, 0.3);
//   border-radius: 8px;
//   border-left: 4px solid ${props => {
//     switch(props.priority) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       default: return '#10b981';
//     }
//   }};
// `;

// const TaskInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.25rem;
//   flex: 1;
// `;

// const TaskTitle = styled.div`
//   font-weight: 600;
//   color: white;
//   font-size: 0.9rem;
// `;

// const TaskProject = styled.div`
//   color: rgb(148, 163, 184);
//   font-size: 0.75rem;
// `;

// const TaskStatus = styled.div`
//   padding: 0.25rem 0.5rem;
//   border-radius: 12px;
//   font-size: 0.75rem;
//   font-weight: 500;
//   background: ${props => {
//     switch(props.status) {
//       case 'completed': return 'rgba(16, 185, 129, 0.2)';
//       case 'in-progress': return 'rgba(245, 158, 11, 0.2)';
//       default: return 'rgba(100, 116, 139, 0.2)';
//     }
//   }};
//   color: ${props => {
//     switch(props.status) {
//       case 'completed': return '#10b981';
//       case 'in-progress': return '#f59e0b';
//       default: return '#64748b';
//     }
//   }};
//   border: 1px solid ${props => {
//     switch(props.status) {
//       case 'completed': return 'rgba(16, 185, 129, 0.3)';
//       case 'in-progress': return 'rgba(245, 158, 11, 0.3)';
//       default: return 'rgba(100, 116, 139, 0.3)';
//     }
//   }};
// `;

// const TimerContainer = styled(Card)`
//   padding: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
// `;

// const TimerDisplay = styled.div`
//   font-size: 3rem;
//   font-weight: 700;
//   color: white;
//   margin: 1rem 0;
//   font-family: 'Monaco', 'Consolas', monospace;
// `;

// const TimerControls = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   margin-top: 1rem;
// `;

// const TimerButton = styled.button`
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 8px;
//   background: ${props => props.primary ? '#3b82f6' : 'rgba(51, 65, 85, 0.5)'};
//   color: white;
//   cursor: pointer;
//   font-weight: 500;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background: ${props => props.primary ? '#2563eb' : 'rgba(71, 85, 105, 0.7)'};
//     transform: translateY(-2px);
//   }
// `;

// const EmptyState = styled.div`
//   grid-column: 1 / -1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding: 3rem 2rem;
//   background: rgba(30, 41, 59, 0.5);
//   border-radius: 16px;
//   border: 2px dashed rgba(71, 85, 105, 0.4);
// `;

// const EmptyIcon = styled.div`
//   width: 64px;
//   height: 64px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 1rem;
  
//   svg {
//     color: rgb(139, 92, 246);
//   }
// `;

// const EmptyTitle = styled.h3`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: white;
//   margin-bottom: 0.5rem;
// `;

// const EmptyDescription = styled.p`
//   color: rgb(148, 163, 184);
//   font-size: 1rem;
//   margin-bottom: 2rem;
//   max-width: 500px;
// `;

// const DashboardPage = () => {
//   const { sessions, isLoading: sessionsLoading } = useSessions();
//   const { user } = useUser();
//   const [timer, setTimer] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [timerInterval, setTimerInterval] = useState(null);

//   // Get all tasks from all sessions
//   const allTasks = sessions?.flatMap(session => session.tasks || []) || [];
  
//   // Calculate statistics
//   const stats = {
//     totalProjects: sessions?.length || 0,
//     totalTasks: allTasks.length,
//     completedTasks: allTasks.filter(task => task.status === 'completed').length,
//     inProgressTasks: allTasks.filter(task => task.status === 'in-progress').length,
//     teamMembers: sessions?.reduce((sum, session) => sum + (session.members_count || 0), 0) || 0,
//   };

//   // Calculate completion percentage
//   const completionPercentage = stats.totalTasks > 0 
//     ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
//     : 0;

//   // Get recent tasks (last 5)
//   const recentTasks = [...allTasks]
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, 5);

//   // Timer functions
//   const startTimer = () => {
//     if (!isTimerRunning) {
//       setIsTimerRunning(true);
//       const interval = setInterval(() => {
//         setTimer(prev => prev + 1);
//       }, 1000);
//       setTimerInterval(interval);
//     }
//   };

//   const pauseTimer = () => {
//     if (isTimerRunning) {
//       setIsTimerRunning(false);
//       clearInterval(timerInterval);
//     }
//   };

//   const resetTimer = () => {
//     setIsTimerRunning(false);
//     clearInterval(timerInterval);
//     setTimer(0);
//   };

//   // Format timer display
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Clean up interval on unmount
//   useEffect(() => {
//     return () => {
//       if (timerInterval) {
//         clearInterval(timerInterval);
//       }
//     };
//   }, [timerInterval]);

//   if (sessionsLoading) {
//     return (
//       <DashboardContainer>
//         <Container>
//           <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
//             <Spinner />
//           </div>
//         </Container>
//       </DashboardContainer>
//     );
//   }

//   return (
//     <DashboardContainer>
//       <Container>
//         <Header>
//           <WelcomeSection>
//             <Title>Dashboard</Title>
//             <WelcomeText>
//               Welcome back, {user?.email}! Here's your productivity overview.
//             </WelcomeText>
//           </WelcomeSection>
//         </Header>

//         {stats.totalProjects === 0 ? (
//           <EmptyState>
//             <EmptyIcon>
//               <Activity size={32} />
//             </EmptyIcon>
//             <EmptyTitle>No projects yet</EmptyTitle>
//             <EmptyDescription>
//               Get started by creating your first project to see your dashboard metrics and track your productivity.
//             </EmptyDescription>
//           </EmptyState>
//         ) : (
//           <>
//             <StatsGrid>
//               <StatCard>
//                 <StatHeader>
//                   <StatIcon color="rgba(139, 92, 246, 0.2)">
//                     <FolderOpen size={24} color="#8b5cf6" />
//                   </StatIcon>
//                 </StatHeader>
//                 <StatContent>
//                   <StatValue>{stats.totalProjects}</StatValue>
//                   <StatLabel>Total Projects</StatLabel>
//                   <StatTrend positive={stats.totalProjects > 0}>
//                     <TrendingUp size={14} />
//                     {stats.totalProjects > 0 ? 'Active' : 'No projects yet'}
//                   </StatTrend>
//                 </StatContent>
//               </StatCard>

//               <StatCard>
//                 <StatHeader>
//                   <StatIcon color="rgba(59, 130, 246, 0.2)">
//                     <CheckCircle size={24} color="#3b82f6" />
//                   </StatIcon>
//                 </StatHeader>
//                 <StatContent>
//                   <StatValue>{stats.totalTasks}</StatValue>
//                   <StatLabel>Total Tasks</StatLabel>
//                   <ProgressBar>
//                     <ProgressFill 
//                       percentage={completionPercentage} 
//                       color="linear-gradient(90deg, #3b82f6, #8b5cf6)" 
//                     />
//                   </ProgressBar>
//                   <StatTrend positive={completionPercentage > 0}>
//                     {completionPercentage}% Complete
//                   </StatTrend>
//                 </StatContent>
//               </StatCard>

//               <StatCard>
//                 <StatHeader>
//                   <StatIcon color="rgba(16, 185, 129, 0.2)">
//                     <Users size={24} color="#10b981" />
//                   </StatIcon>
//                 </StatHeader>
//                 <StatContent>
//                   <StatValue>{stats.teamMembers}</StatValue>
//                   <StatLabel>Team Members</StatLabel>
//                   <StatTrend positive={stats.teamMembers > 0}>
//                     <TrendingUp size={14} />
//                     {stats.teamMembers > 0 ? 'Collaborating' : 'Working alone'}
//                   </StatTrend>
//                 </StatContent>
//               </StatCard>

//               <StatCard>
//                 <StatHeader>
//                   <StatIcon color="rgba(245, 158, 11, 0.2)">
//                     <Target size={24} color="#f59e0b" />
//                   </StatIcon>
//                 </StatHeader>
//                 <StatContent>
//                   <StatValue>{stats.inProgressTasks}</StatValue>
//                   <StatLabel>In Progress</StatLabel>
//                   <StatTrend positive={stats.inProgressTasks > 0}>
//                     <TrendingUp size={14} />
//                     {stats.inProgressTasks > 0 ? 'Active tasks' : 'No active tasks'}
//                   </StatTrend>
//                 </StatContent>
//               </StatCard>
//             </StatsGrid>

//             <DashboardGrid>
//               <ChartContainer>
//                 <ChartHeader>
//                   <ChartTitle>
//                     <BarChart3 size={20} />
//                     Task Distribution
//                   </ChartTitle>
//                 </ChartHeader>
//                 <ChartContent>
//                   <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', gap: '1rem' }}>
//                     <div style={{ 
//                       display: 'flex', 
//                       flexDirection: 'column', 
//                       alignItems: 'center', 
//                       flex: 1 
//                     }}>
//                       <div style={{
//                         height: `${(stats.completedTasks / Math.max(1, stats.totalTasks)) * 80}%`,
//                         background: 'linear-gradient(to top, #10b981, #34d399)',
//                         width: '100%',
//                         borderRadius: '6px 6px 0 0',
//                         minHeight: '10px'
//                       }} />
//                       <div style={{ marginTop: '0.5rem', color: 'white', fontWeight: '600' }}>
//                         {stats.completedTasks}
//                       </div>
//                       <div style={{ color: '#10b981', fontSize: '0.8rem' }}>Completed</div>
//                     </div>
                    
//                     <div style={{ 
//                       display: 'flex', 
//                       flexDirection: 'column', 
//                       alignItems: 'center', 
//                       flex: 1 
//                     }}>
//                       <div style={{
//                         height: `${(stats.inProgressTasks / Math.max(1, stats.totalTasks)) * 80}%`,
//                         background: 'linear-gradient(to top, #f59e0b, #fbbf24)',
//                         width: '100%',
//                         borderRadius: '6px 6px 0 0',
//                         minHeight: '10px'
//                       }} />
//                       <div style={{ marginTop: '0.5rem', color: 'white', fontWeight: '600' }}>
//                         {stats.inProgressTasks}
//                       </div>
//                       <div style={{ color: '#f59e0b', fontSize: '0.8rem' }}>In Progress</div>
//                     </div>
                    
//                     <div style={{ 
//                       display: 'flex', 
//                       flexDirection: 'column', 
//                       alignItems: 'center', 
//                       flex: 1 
//                     }}>
//                       <div style={{
//                         height: `${((stats.totalTasks - stats.completedTasks - stats.inProgressTasks) / Math.max(1, stats.totalTasks)) * 80}%`,
//                         background: 'linear-gradient(to top, #64748b, #94a3b8)',
//                         width: '100%',
//                         borderRadius: '6px 6px 0 0',
//                         minHeight: '10px'
//                       }} />
//                       <div style={{ marginTop: '0.5rem', color: 'white', fontWeight: '600' }}>
//                         {stats.totalTasks - stats.completedTasks - stats.inProgressTasks}
//                       </div>
//                       <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Not Started</div>
//                     </div>
//                   </div>
//                 </ChartContent>
//               </ChartContainer>

//               <TimerContainer>
//                 <ChartTitle>
//                   <Clock size={20} />
//                   Productivity Timer
//                 </ChartTitle>
//                 <TimerDisplay>{formatTime(timer)}</TimerDisplay>
//                 <TimerControls>
//                   {isTimerRunning ? (
//                     <TimerButton onClick={pauseTimer}>
//                       <PieChart size={16} style={{ marginRight: '0.25rem' }} />
//                       Pause
//                     </TimerButton>
//                   ) : (
//                     <TimerButton primary onClick={startTimer}>
//                       <PlayCircle size={16} style={{ marginRight: '0.25rem' }} />
//                       Start
//                     </TimerButton>
//                   )}
//                   <TimerButton onClick={resetTimer}>
//                     Reset
//                   </TimerButton>
//                 </TimerControls>
//               </TimerContainer>
//             </DashboardGrid>

//             <ChartContainer>
//               <ChartHeader>
//                 <ChartTitle>
//                   <Calendar size={20} />
//                   Recent Tasks
//                 </ChartTitle>
//               </ChartHeader>
//               <TaskList>
//                 {recentTasks.length > 0 ? (
//                   recentTasks.map(task => (
//                     <TaskItem key={task.id} priority={task.priority}>
//                       <TaskInfo>
//                         <TaskTitle>{task.title}</TaskTitle>
//                         <TaskProject>
//                           {sessions.find(s => s.id === task.session_id)?.name || 'Unknown Project'}
//                         </TaskProject>
//                       </TaskInfo>
//                       <TaskStatus status={task.status}>
//                         {task.status === 'completed' ? 'Completed' : 
//                          task.status === 'in-progress' ? 'In Progress' : 'Not Started'}
//                       </TaskStatus>
//                     </TaskItem>
//                   ))
//                 ) : (
//                   <div style={{ 
//                     textAlign: 'center', 
//                     padding: '2rem', 
//                     color: 'rgb(148, 163, 184)' 
//                   }}>
//                     No tasks found. Add tasks to your projects to see them here.
//                   </div>
//                 )}
//               </TaskList>
//             </ChartContainer>
//           </>
//         )}
//       </Container>
//     </DashboardContainer>
//   );
// };

// export default DashboardPage;

// Dashboard.jsx - Complete User Dashboard with Timer, Charts and Analytics
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  BarChart3, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Users,
  MessageSquare,
  Activity,
  Zap,
  Settings,
  Filter,
  ChevronDown,
  Timer
} from 'lucide-react';
import { 
  Container, 
  Title, 
  Card, 
  PrimaryButton, 
  SecondaryButton 
} from '../styles/StyledComponents';
import useUser from '../Authentication/useUser';
import { useSessions } from '../Authentication/addSession';
import { useTasks } from '../Authentication/useTasks';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Main Container
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 2rem 0;
  animation: ${fadeIn} 0.6s ease-out;
`;

// Header Section
const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeSubtitle = styled.p`
  color: rgb(148, 163, 184);
  font-size: 1.1rem;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

// Stats Grid
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
  border: 1px solid rgba(71, 85, 105, 0.4);
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #8b5cf6, #3b82f6)'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.background || 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px ${props => props.shadowColor || 'rgba(139, 92, 246, 0.3)'};
`;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  color: rgb(148, 163, 184);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-size: 0.875rem;
  font-weight: 500;
`;

// Main Content Grid
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// Timer Component
const TimerSection = styled(Card)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
  border: 1px solid rgba(71, 85, 105, 0.4);
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f59e0b, #ef4444);
  }
`;

const TimerDisplay = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', monospace;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: ${props => props.isRunning ? pulse : 'none'} 2s infinite;
`;

const TimerControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const TimerButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(71, 85, 105, 0.6);
    color: rgb(226, 232, 240);
    border: 1px solid rgba(71, 85, 105, 0.8);
    
    &:hover {
      background: rgba(71, 85, 105, 0.8);
      transform: translateY(-2px);
    }
  }
  
  &.danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
    }
  }
`;

const SessionLabel = styled.div`
  background: rgba(71, 85, 105, 0.4);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: rgb(203, 213, 225);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

// Charts Section
const ChartsSection = styled(Card)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
  border: 1px solid rgba(71, 85, 105, 0.4);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const ChartFilter = styled.select`
  background: rgba(71, 85, 105, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.8);
  border-radius: 8px;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.8);
  }
  
  option {
    background: rgba(30, 41, 59, 0.95);
    color: white;
  }
`;

// Simple Chart Components
const SimpleBarChart = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;
  height: 150px;
  padding: 1rem 0;
`;

const ChartBar = styled.div`
  background: linear-gradient(180deg, ${props => props.color || '#8b5cf6'} 0%, ${props => props.color || '#8b5cf6'}80 100%);
  width: 100%;
  height: ${props => props.height || '20'}%;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;
  min-height: 8px;
  
  &:hover {
    transform: scaleY(1.1);
    filter: brightness(1.2);
  }
  
  &::after {
    content: '${props => props.label || ''}';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: rgb(148, 163, 184);
    white-space: nowrap;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgb(203, 213, 225);
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color || '#8b5cf6'};
`;

// Recent Activities
const ActivitiesSection = styled(Card)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
  border: 1px solid rgba(71, 85, 105, 0.4);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #059669);
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.background || 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  color: white;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  color: rgb(148, 163, 184);
  font-size: 0.875rem;
`;

// Quick Actions
const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuickActionCard = styled.button`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #8b5cf6, #3b82f6)'};
  }
`;

const QuickActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.background || 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const QuickActionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const QuickActionDescription = styled.p`
  color: rgb(148, 163, 184);
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
`;

// Progress Circle Component
const ProgressCircle = ({ percentage, label, color }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem' }}>
        <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(71, 85, 105, 0.3)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dasharray 0.6s ease',
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'white'
        }}>
          {percentage}%
        </div>
      </div>
      <div style={{ color: 'rgb(148, 163, 184)', fontSize: '0.875rem' }}>
        {label}
      </div>
    </div>
  );
};

// Dashboard Component
const DashboardPage = () => {
  const { user } = useUser();
  const { sessions, addSession } = useSessions();
  const { tasks } = useTasks();
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [timeFilter, setTimeFilter] = useState('week');
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const startTimer = () => {
    setIsRunning(true);
    if (!currentSession) {
      const newSession = {
        id: Date.now(),
        startTime: new Date(),
        task: 'Focus Time'
      };
      setCurrentSession(newSession);
    }
  };
  
  const pauseTimer = () => {
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    if (currentSession) {
      addSession({
        ...currentSession,
        endTime: new Date(),
        duration: time
      });
      setCurrentSession(null);
    }
  };
  
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Sample data for charts
  const weeklyData = [
    { day: 'Mon', hours: 6, color: '#8b5cf6' },
    { day: 'Tue', hours: 8, color: '#3b82f6' },
    { day: 'Wed', hours: 7, color: '#10b981' },
    { day: 'Thu', hours: 9, color: '#f59e0b' },
    { day: 'Fri', hours: 5, color: '#ef4444' },
    { day: 'Sat', hours: 4, color: '#8b5cf6' },
    { day: 'Sun', hours: 3, color: '#3b82f6' }
  ];
  
  const activities = [
    { 
      title: 'Completed Task: Project Research', 
      time: '2 hours ago', 
      icon: <CheckCircle size={20} />, 
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
    },
    { 
      title: 'Started New Session: Design Work', 
      time: '4 hours ago', 
      icon: <Play size={20} />, 
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
    },
    { 
      title: 'Task Deadline Approaching: Client Meeting', 
      time: '6 hours ago', 
      icon: <AlertCircle size={20} />, 
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
    },
    { 
      title: 'Achieved Daily Goal: 8 hours focused', 
      time: 'Yesterday', 
      icon: <Target size={20} />, 
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
    }
  ];
  
  const completedTasks = tasks ? tasks.filter(task => task.completed).length : 0;
  const totalTasks = tasks ? tasks.length : 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <DashboardContainer>
      <Container>
        <DashboardHeader>
          <WelcomeSection>
            <WelcomeTitle>
              Welcome back, {user?.name || 'User'}!
            </WelcomeTitle>
            <WelcomeSubtitle>
              Here's your productivity overview for today.
            </WelcomeSubtitle>
          </WelcomeSection>
          <HeaderActions>
            <SecondaryButton>
              <Filter size={16} />
              Filter
              <ChevronDown size={16} />
            </SecondaryButton>
            <PrimaryButton>
              <Settings size={16} />
              Settings
            </PrimaryButton>
          </HeaderActions>
        </DashboardHeader>
        
        <StatsGrid>
          <StatCard gradient="linear-gradient(90deg, #8b5cf6, #3b82f6)">
            <StatHeader>
              <div>
                <StatLabel>Total Focus Time</StatLabel>
                <StatValue>42h 18m</StatValue>
                <StatTrend positive={true}>
                  <TrendingUp size={16} />
                  +12% from last week
                </StatTrend>
              </div>
              <StatIcon background="linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)" shadowColor="rgba(139, 92, 246, 0.3)">
                <Clock size={24} />
              </StatIcon>
            </StatHeader>
          </StatCard>
          
          <StatCard gradient="linear-gradient(90deg, #10b981, #059669)">
            <StatHeader>
              <div>
                <StatLabel>Tasks Completed</StatLabel>
                <StatValue>{completedTasks}/{totalTasks}</StatValue>
                <StatTrend positive={true}>
                  <TrendingUp size={16} />
                  {completionRate}% completion rate
                </StatTrend>
              </div>
              <StatIcon background="linear-gradient(135deg, #10b981 0%, #059669 100%)" shadowColor="rgba(16, 185, 129, 0.3)">
                <CheckCircle size={24} />
              </StatIcon>
            </StatHeader>
          </StatCard>
          
          <StatCard gradient="linear-gradient(90deg, #f59e0b, #ef4444)">
            <StatHeader>
              <div>
                <StatLabel>Current Streak</StatLabel>
                <StatValue>7 days</StatValue>
                <StatTrend positive={true}>
                  <TrendingUp size={16} />
                  Keep going!
                </StatTrend>
              </div>
              <StatIcon background="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" shadowColor="rgba(245, 158, 11, 0.3)">
                <Zap size={24} />
              </StatIcon>
            </StatHeader>
          </StatCard>
        </StatsGrid>
        
        <QuickActionsGrid>
          <QuickActionCard gradient="linear-gradient(90deg, #8b5cf6, #3b82f6)">
            <QuickActionIcon background="linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)">
              <Target size={24} />
            </QuickActionIcon>
            <QuickActionTitle>Set Goals</QuickActionTitle>
            <QuickActionDescription>Define your daily and weekly productivity targets</QuickActionDescription>
          </QuickActionCard>
          
          <QuickActionCard gradient="linear-gradient(90deg, #10b981, #059669)">
            <QuickActionIcon background="linear-gradient(135deg, #10b981 0%, #059669 100%)">
              <Users size={24} />
            </QuickActionIcon>
            <QuickActionTitle>Team Stats</QuickActionTitle>
            <QuickActionDescription>View your team's progress and collaboration metrics</QuickActionDescription>
          </QuickActionCard>
          
          <QuickActionCard gradient="linear-gradient(90deg, #f59e0b, #ef4444)">
            <QuickActionIcon background="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)">
              <BarChart3 size={24} />
            </QuickActionIcon>
            <QuickActionTitle>Reports</QuickActionTitle>
            <QuickActionDescription>Generate detailed productivity reports and insights</QuickActionDescription>
          </QuickActionCard>
        </QuickActionsGrid>
        
        <ContentGrid>
          <TimerSection>
            <SessionLabel>
              {currentSession ? `Working on: ${currentSession.task}` : 'Ready to focus?'}
            </SessionLabel>
            <TimerDisplay isRunning={isRunning}>
              {formatTime(time)}
            </TimerDisplay>
            <TimerControls>
              {!isRunning ? (
                <TimerButton className="primary" onClick={startTimer}>
                  <Play size={16} />
                  Start
                </TimerButton>
              ) : (
                <TimerButton className="secondary" onClick={pauseTimer}>
                  <Pause size={16} />
                  Pause
                </TimerButton>
              )}
              <TimerButton className="danger" onClick={resetTimer}>
                <RotateCcw size={16} />
                Reset
              </TimerButton>
            </TimerControls>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
              <ProgressCircle percentage={75} label="Daily Goal" color="#8b5cf6" />
              <ProgressCircle percentage={60} label="Weekly Goal" color="#3b82f6" />
              <ProgressCircle percentage={42} label="Monthly Goal" color="#10b981" />
            </div>
          </TimerSection>
          
          <ChartsSection>
            <ChartHeader>
              <ChartTitle>Weekly Focus Time</ChartTitle>
              <ChartFilter value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </ChartFilter>
            </ChartHeader>
            <SimpleBarChart>
              {weeklyData.map((item, index) => (
                <ChartBar 
                  key={index} 
                  height={(item.hours / 10) * 100} 
                  color={item.color}
                  label={item.day}
                />
              ))}
            </SimpleBarChart>
            <ChartLegend>
              {weeklyData.map((item, index) => (
                <LegendItem key={index}>
                  <LegendColor color={item.color} />
                  {item.day}: {item.hours}h
                </LegendItem>
              ))}
            </ChartLegend>
          </ChartsSection>
        </ContentGrid>
        
        <ActivitiesSection>
          <ChartHeader>
            <ChartTitle>Recent Activities</ChartTitle>
            <ChartFilter>
              <option value="all">All Activities</option>
              <option value="completed">Completed</option>
              <option value="sessions">Sessions</option>
            </ChartFilter>
          </ChartHeader>
          {activities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon background={activity.background}>
                {activity.icon}
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivitiesSection>
      </Container>
    </DashboardContainer>
  );
};

export default DashboardPage;