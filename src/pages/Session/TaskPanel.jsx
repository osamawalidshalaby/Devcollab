import React, { useState } from 'react';
import styled from 'styled-components';
import { FolderOpen, Plus, Filter } from 'lucide-react';
import { Card, SectionTitle, PrimaryButton, ScrollContainer } from '../../styles/StyledComponents';
import TaskCard from './TaskCard';
import Spinner from '../../components/Spinner';
import AddTaskModal from './AddTaskModal';
import { useDeleteTask, useTasks } from '../../Authentication/useTasks';

const TasksContainer = styled(Card)`
  background: rgba(26, 35, 51, 0.95);
  border: 1px solid rgba(55, 85, 125, 0.6);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 1280px) {
    /* grid-column: span 2; */
  }
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddTaskButton = styled(PrimaryButton)`
  font-size: 0.875rem;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  
  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }
`;

const FilterButton = styled.button`
  background: rgba(39, 55, 77, 0.6);
  color: rgb(226, 232, 240);
  border: 1px solid rgba(55, 85, 125, 0.6);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(55, 85, 125, 0.8);
    border-color: rgba(96, 165, 250, 0.8);
    transform: translateY(-1px);
  }
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TasksScrollContainer = styled(ScrollContainer)`
  max-height: 420px;
  padding-right: 4px;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 8px;
  padding: 8px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.4);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(71, 85, 105, 0.6);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(71, 85, 105, 0.8);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: rgb(148, 163, 184);
  
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

const EmptyDescription = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(55, 85, 125, 0.4);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.color || 'white'};
  margin-bottom: 4px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: rgb(148, 163, 184);
`;

const TaskPanel = ({ sessionId }) => {
  const [filter, setFilter] = useState('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { data: tasks, isLoading: sessionLoad } = useTasks(sessionId);
  const { DeleteTask, isDeleting } = useDeleteTask(sessionId);

  // Filter tasks based on selected filter
  const filteredTasks = tasks?.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Calculate task statistics
  const taskStats = {
    total: tasks?.length || 0,
    completed: tasks?.filter(task => task.status === 'completed').length || 0,
    inProgress: tasks?.filter(task => task.status === 'in-progress').length || 0,
    pending: tasks?.filter(task => task.status === 'pending').length || 0
  };

  // Handle task edit
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddTaskModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowAddTaskModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      DeleteTask({ id: task.id });
    }
  };


  return (
    <>
      <TasksContainer>
        <PanelHeader>
          <SectionTitle>
            <FolderOpen size={20} />
            Project Tasks
            {taskStats.total > 0 && <span style={{marginLeft: '8px', color: 'rgb(148, 163, 184)', fontSize: '0.875rem'}}>
              ({taskStats.total})
            </span>}
          </SectionTitle>
          
          <HeaderActions>
            <FilterButton onClick={() => setFilter(filter === 'all' ? 'completed' : filter === 'completed' ? 'in-progress' : filter === 'in-progress' ? 'pending' : 'all')}>
              <Filter size={16} />
              {filter === 'all' ? 'All' : filter === 'completed' ? 'Completed' : filter === 'in-progress' ? 'In Progress' : 'Pending'}
            </FilterButton>
            <AddTaskButton onClick={() => setShowAddTaskModal(true)}>
              <Plus size={16} />
              Add Task
            </AddTaskButton>
          </HeaderActions>
        </PanelHeader>
        
        <TasksScrollContainer>
          {sessionLoad ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <Spinner />
            </div>
          ) : filteredTasks && filteredTasks.length > 0 ? (
            <TasksList>
              {filteredTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  index={index}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  isDeleting = {isDeleting}
                />
              ))}
            </TasksList>
          ) : (
            <EmptyState>
              <FolderOpen size={40} />
              <EmptyTitle>No tasks found</EmptyTitle>
              <EmptyDescription>
                {filter === 'all' 
                  ? "Get started by creating your first task" 
                  : `No ${filter} tasks found`}
              </EmptyDescription>
            </EmptyState>
          )}
        </TasksScrollContainer>

        {taskStats.total > 0 && (
          <StatsContainer>
            <StatItem>
              <StatValue color="#10b981">{taskStats.completed}</StatValue>
              <StatLabel>Done</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#f59e0b">{taskStats.inProgress}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue color="#64748b">{taskStats.pending}</StatValue>
              <StatLabel>Pending</StatLabel>
            </StatItem>
          </StatsContainer>
        )}
      </TasksContainer>

      <AddTaskModal 
        isOpen={showAddTaskModal}
        onClose={handleCloseModal}
        task={editingTask}
      />
    </>
  );
};

export default TaskPanel;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FolderOpen, Plus, Filter, Code, Zap } from 'lucide-react';
// import { Card, SectionTitle, PrimaryButton, ScrollContainer } from '../../styles/StyledComponents';
// import TaskCard from './TaskCard';
// import { UseTasks } from '../../Authentication/useTasks';
// import Spinner from '../../components/Spinner';
// import AddTaskModal from './AddTaskModal';
// import CodeSpaceModal from './CodeSpaceModal';

// const TasksContainer = styled(Card)`
//   background: rgba(26, 35, 51, 0.95);
//   border: 1px solid rgba(55, 85, 125, 0.6);
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
//   position: relative;
  
//   @media (min-width: 1280px) {
//     /* grid-column: span 2; */
//   }
// `;

// const PanelHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
//   gap: 12px;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   flex-wrap: wrap;
// `;

// const HeaderActions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   flex-wrap: wrap;
// `;

// const AddTaskButton = styled(PrimaryButton)`
//   font-size: 0.875rem;
//   padding: 8px 16px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  
//   &:hover {
//     background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
//   }
// `;

// const CodeSpaceButton = styled.button`
//   font-size: 0.875rem;
//   padding: 8px 16px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 500;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
//   }
// `;

// const FilterButton = styled.button`
//   background: rgba(39, 55, 77, 0.6);
//   color: rgb(226, 232, 240);
//   border: 1px solid rgba(55, 85, 125, 0.6);
//   border-radius: 8px;
//   padding: 8px 12px;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background: rgba(55, 85, 125, 0.8);
//     border-color: rgba(96, 165, 250, 0.8);
//     transform: translateY(-1px);
//   }

//   &.active {
//     background: rgba(59, 130, 246, 0.2);
//     border-color: rgba(59, 130, 246, 0.6);
//     color: #60a5fa;
//   }
// `;

// const TasksList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const TasksScrollContainer = styled(ScrollContainer)`
//   max-height: 420px;
//   padding-right: 4px;
//   background: rgba(30, 41, 59, 0.3);
//   border-radius: 8px;
//   padding: 8px;
  
//   /* Custom scrollbar */
//   &::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: rgba(30, 41, 59, 0.4);
//     border-radius: 3px;
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: rgba(71, 85, 105, 0.6);
//     border-radius: 3px;
//   }
  
//   &::-webkit-scrollbar-thumb:hover {
//     background: rgba(71, 85, 105, 0.8);
//   }
// `;

// const EmptyState = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 40px 20px;
//   text-align: center;
//   color: rgb(148, 163, 184);
  
//   svg {
//     margin-bottom: 16px;
//     opacity: 0.5;
//   }
// `;

// const EmptyTitle = styled.h4`
//   color: rgb(226, 232, 240);
//   margin-bottom: 8px;
//   font-weight: 600;
// `;

// const EmptyDescription = styled.p`
//   font-size: 0.875rem;
//   margin: 0 0 16px 0;
//   max-width: 300px;
// `;

// const EmptyActions = styled.div`
//   display: flex;
//   gap: 12px;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// const StatsContainer = styled.div`
//   display: flex;
//   gap: 16px;
//   margin-top: 16px;
//   padding-top: 16px;
//   border-top: 1px solid rgba(55, 85, 125, 0.4);
  
//   @media (max-width: 768px) {
//     gap: 12px;
//   }
// `;

// const StatItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   flex: 1;
//   min-width: 0;
// `;

// const StatValue = styled.span`
//   font-size: 1.25rem;
//   font-weight: 700;
//   color: ${props => props.color || 'white'};
//   margin-bottom: 4px;
//   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
//   @media (max-width: 768px) {
//     font-size: 1.1rem;
//   }
// `;

// const StatLabel = styled.span`
//   font-size: 0.75rem;
//   color: rgb(148, 163, 184);
//   text-align: center;
  
//   @media (max-width: 768px) {
//     font-size: 0.7rem;
//   }
// `;

// const TaskHint = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 12px 16px;
//   margin-bottom: 16px;
//   background: rgba(59, 130, 246, 0.1);
//   border: 1px solid rgba(59, 130, 246, 0.2);
//   border-radius: 8px;
//   color: #93c5fd;
//   font-size: 0.875rem;
  
//   @media (max-width: 768px) {
//     padding: 10px 12px;
//     font-size: 0.8rem;
//   }
// `;

// const TaskPanel = ({ setShowAddTask, tasks, sessionLoad }) => {
//   const [filter, setFilter] = useState('all');
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//   const [showCodeSpace, setShowCodeSpace] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Filter tasks based on selected filter
//   const filteredTasks = tasks?.filter(task => {
//     if (filter === 'all') return true;
//     return task.status === filter;
//   });

//   // Calculate task statistics
//   const taskStats = {
//     total: tasks?.length || 0,
//     completed: tasks?.filter(task => task.status === 'completed').length || 0,
//     inProgress: tasks?.filter(task => task.status === 'in-progress').length || 0,
//     pending: tasks?.filter(task => task.status === 'pending').length || 0
//   };

//   // Filter options
//   const filterOptions = [
//     { value: 'all', label: 'All Tasks', count: taskStats.total },
//     { value: 'pending', label: 'Pending', count: taskStats.pending },
//     { value: 'in-progress', label: 'In Progress', count: taskStats.inProgress },
//     { value: 'completed', label: 'Completed', count: taskStats.completed },
//   ];

//   // Handle CodeSpace
//   const handleOpenCodeSpace = (task) => {
//     setSelectedTask(task);
//     setShowCodeSpace(true);
//   };

//   const handleCloseCodeSpace = () => {
//     setShowCodeSpace(false);
//     setSelectedTask(null);
//   };

//   // Handle opening CodeSpace for new task
//   const handleOpenCodeSpaceForNew = () => {
//     const newTask = {
//       id: 'new',
//       title: 'New Coding Task',
//       description: 'Start coding immediately with this new task',
//       priority: 'medium',
//       status: 'pending',
//       profiles: { username: 'You' },
//       created_at: new Date().toISOString()
//     };
//     setSelectedTask(newTask);
//     setShowCodeSpace(true);
//   };

//   // Get current filter display info
//   const getCurrentFilter = () => {
//     return filterOptions.find(option => option.value === filter);
//   };

//   return (
//     <>
//       <TasksContainer>
//         <PanelHeader>
//           <HeaderLeft>
//             <SectionTitle>
//               <FolderOpen size={20} />
//               Project Tasks
//               {taskStats.total > 0 && (
//                 <span style={{
//                   marginLeft: '8px', 
//                   color: 'rgb(148, 163, 184)', 
//                   fontSize: '0.875rem'
//                 }}>
//                   ({getCurrentFilter()?.count || 0})
//                 </span>
//               )}
//             </SectionTitle>
//           </HeaderLeft>
          
//           <HeaderActions>
//             <FilterButton 
//               onClick={() => {
//                 const currentIndex = filterOptions.findIndex(opt => opt.value === filter);
//                 const nextIndex = (currentIndex + 1) % filterOptions.length;
//                 setFilter(filterOptions[nextIndex].value);
//               }}
//               className={filter !== 'all' ? 'active' : ''}
//               title="Click to cycle through filters"
//             >
//               <Filter size={16} />
//               {getCurrentFilter()?.label}
//               {getCurrentFilter()?.count > 0 && (
//                 <span style={{ 
//                   marginLeft: '4px', 
//                   padding: '2px 6px', 
//                   background: 'rgba(255,255,255,0.1)', 
//                   borderRadius: '10px',
//                   fontSize: '0.75rem'
//                 }}>
//                   {getCurrentFilter().count}
//                 </span>
//               )}
//             </FilterButton>

//             <CodeSpaceButton 
//               onClick={handleOpenCodeSpaceForNew}
//               title="Open CodeSpace for quick coding"
//             >
//               <Code size={16} />
//               Code Now
//             </CodeSpaceButton>

//             <AddTaskButton onClick={() => setShowAddTaskModal(true)}>
//               <Plus size={16} />
//               Add Task
//             </AddTaskButton>
//           </HeaderActions>
//         </PanelHeader>

//         {/* Task Hint */}
//         {taskStats.total > 0 && (
//           <TaskHint>
//             <Zap size={16} />
//             <span>Click any task card to open the integrated CodeSpace and start coding!</span>
//           </TaskHint>
//         )}
        
//         <TasksScrollContainer>
//           {sessionLoad ? (
//             <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
//               <Spinner />
//             </div>
//           ) : filteredTasks && filteredTasks.length > 0 ? (
//             <TasksList>
//               {filteredTasks.map((task, index) => (
//                 <TaskCard 
//                   key={task.id} 
//                   task={task} 
//                   index={index}
//                   onOpenCodeSpace={handleOpenCodeSpace}
//                   onEdit={(task) => {
//                     // Handle edit functionality
//                     console.log('Edit task:', task);
//                   }}
//                   onDelete={(task) => {
//                     // Handle delete functionality
//                     console.log('Delete task:', task);
//                   }}
//                 />
//               ))}
//             </TasksList>
//           ) : (
//             <EmptyState>
//               <FolderOpen size={40} />
//               <EmptyTitle>
//                 {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
//               </EmptyTitle>
//               <EmptyDescription>
//                 {filter === 'all' 
//                   ? "Start by creating your first task or jump straight into coding!" 
//                   : `No ${filter.replace('-', ' ')} tasks found. Try a different filter or create a new task.`}
//               </EmptyDescription>
              
//               <EmptyActions>
//                 <AddTaskButton onClick={() => setShowAddTaskModal(true)}>
//                   <Plus size={16} />
//                   Create Task
//                 </AddTaskButton>
//                 <CodeSpaceButton onClick={handleOpenCodeSpaceForNew}>
//                   <Code size={16} />
//                   Start Coding
//                 </CodeSpaceButton>
//               </EmptyActions>
//             </EmptyState>
//           )}
//         </TasksScrollContainer>

//         {/* Task Statistics */}
//         {taskStats.total > 0 && (
//           <StatsContainer>
//             <StatItem>
//               <StatValue color="#10b981">{taskStats.completed}</StatValue>
//               <StatLabel>Completed</StatLabel>
//             </StatItem>
//             <StatItem>
//               <StatValue color="#f59e0b">{taskStats.inProgress}</StatValue>
//               <StatLabel>In Progress</StatLabel>
//             </StatItem>
//             <StatItem>
//               <StatValue color="#64748b">{taskStats.pending}</StatValue>
//               <StatLabel>Pending</StatLabel>
//             </StatItem>
//             <StatItem>
//               <StatValue color="#8b5cf6">{Math.round((taskStats.completed / taskStats.total) * 100)}%</StatValue>
//               <StatLabel>Progress</StatLabel>
//             </StatItem>
//           </StatsContainer>
//         )}
//       </TasksContainer>

//       {/* CodeSpace Modal */}
//       <CodeSpaceModal 
//         isOpen={showCodeSpace}
//         onClose={handleCloseCodeSpace}
//         task={selectedTask}
//       />

//       {/* Add Task Modal */}
//       <AddTaskModal 
//         isOpen={showAddTaskModal}
//         onClose={() => setShowAddTaskModal(false)}
//       />
//     </>
//   );
// };

// export default TaskPanel;