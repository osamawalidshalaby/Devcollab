// HomePage.jsx (updated for correct session data structure)
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Plus, Folder, ChevronRight, Users, Calendar, UserPlus, Sparkles, Search } from 'lucide-react';
import { Container, Title, PrimaryButton, SecondaryButton } from '../../styles/StyledComponents';
import AddMemberModal from './AddMemberModal';
import TeamModal from './TeamModal';
import { useNavigate } from 'react-router-dom';
import AddProjectModal from './AddProjectModal';
import { getRelativeTime } from '../../Helper/helper';
import { useSessions } from '../../Authentication/addSession';
import Spinner from '../../components/Spinner';

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

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WelcomeText = styled.div`
  color: rgb(148, 163, 184);
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin: 1.5rem 0;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  outline: none;
  padding: 0 0.5rem;

  &::placeholder {
    color: rgb(100, 116, 139);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ProjectCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #3b82f6, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
`;

const ProjectIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  box-shadow: 0 8px 20px ${props => props.gradient.replace('gradient', 'rgba').split(')')[0] + ', 0.3)'};
`;

const ProjectTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
  color: white;
  line-height: 1.3;
`;

const ProjectDescription = styled.p`
  color: rgb(148, 163, 184);
  margin: 0.75rem 0 1.25rem;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  color: rgb(100, 116, 139);
  font-size: 0.875rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(51, 65, 85, 0.4);
  border-radius: 8px;
`;

const ViewProject = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(71, 85, 105, 0.3);
  color: rgb(139, 92, 246);
  font-weight: 600;
  transition: color 0.3s ease;
  
  ${ProjectCard}:hover & {
    color: rgb(167, 139, 250);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const AddProject = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddProjectButton = styled.div`
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(51, 65, 85, 0.2) 100%);
  border: 2px dashed rgba(71, 85, 105, 0.6);
  border-radius: 16px;
  color: rgb(148, 163, 184);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(51, 65, 85, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%);
    border-color: rgb(245, 158, 11);
    color: rgb(245, 158, 11);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.15);
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 16px;
  border: 2px dashed rgba(71, 85, 105, 0.4);
  margin: 2rem 0;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: rgb(139, 92, 246);
  }
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  color: rgb(148, 163, 184);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const CreateFirstButton = styled(PrimaryButton)`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(30, 41, 59, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgb(148, 163, 184);
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #ef4444;
  margin: 1rem 0;
`;

const OwnerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  color: rgb(167, 139, 250);
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

// Color presets for projects (fallback if no color is provided)
const colorPresets = [
  'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
];

// Convert hex color to gradient
const hexToGradient = (hexColor) => {
  return `linear-gradient(135deg, ${hexColor} 0%, ${hexColor}99 100%)`;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasProjects, setHasProjects] = useState(false);

  const { sessions, isLoading, error } = useSessions();

  // Process sessions data to match the expected structure
  const processedSessions = sessions?.map((session, index) => {
    // Use the provided color or fallback to preset
    const gradient = session.color 
      ? hexToGradient(session.color) 
      : colorPresets[index % colorPresets.length];
    
    return {
      id: session.id,
      name: session.name,
      description: session.description,
      members: session.members_count || 0,
      lastUpdated: session.created_at ? getRelativeTime(session.created_at) : 'Recently',
      progress: 0, // Default progress since it's not in the API response
      gradient: session.color,
      owner: session.owner
    };
  }) || [];

  const filteredProjects = processedSessions.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProjects: processedSessions.length,
    totalMembers: processedSessions.reduce((sum, project) => sum + project.members, 0),
    activeProjects: processedSessions.filter(p => p.progress > 0 && p.progress < 100).length,
    completedProjects: processedSessions.filter(p => p.progress === 100).length
  };

  useEffect(() => {
    setHasProjects(processedSessions.length > 0);
  }, [processedSessions.length]);

  if (isLoading) return <Spinner />;

  return (
    <HomeContainer>
      <Container>
        <AddProjectModal 
          isOpen={showAddProject}
          onClose={() => setShowAddProject(false)}
        />
        <Header>
          <HeaderContent>
            <div>
              <Title>My Projects</Title>
              <WelcomeText>Welcome back! {hasProjects ? 'Here are your current projects' : 'Get started by creating your first project'}</WelcomeText>
            </div>
          </HeaderContent>
          
          <ButtonGroup>
            <PrimaryButton onClick={() => setShowAddMember(true)}>
              <UserPlus size={18} />
              Add Team Member
            </PrimaryButton>
            <SecondaryButton onClick={() => setShowTeam(true)}>
              <Users size={18} />
              Team
            </SecondaryButton>
          </ButtonGroup>
        </Header>

        {error && (
          <ErrorMessage>
            Error loading projects: {error.message}
          </ErrorMessage>
        )}

        {hasProjects && !error && (
          <>
            <StatsContainer>
              <StatCard>
                <StatValue>{stats.totalProjects}</StatValue>
                <StatLabel>Total Projects</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.totalMembers}</StatValue>
                <StatLabel>Team Members</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.activeProjects}</StatValue>
                <StatLabel>Active Projects</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.completedProjects}</StatValue>
                <StatLabel>Completed</StatLabel>
              </StatCard>
            </StatsContainer>

            <SearchContainer>
              <Search size={20} color="rgb(100, 116, 139)" />
              <SearchInput
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </>
        )}

        <ProjectsGrid>
          {hasProjects && !error ? (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                onClick={() => navigate(`/session/${project.id}`)}
              >
                <ProjectHeader>
                  <ProjectIcon gradient={project.gradient}>
                    <Folder size={28} />
                  </ProjectIcon>
                </ProjectHeader>
                
                <ProjectTitle>{project.name}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <ProjectMeta>
                  <MetaItem>
                    <Users size={16} />
                    {project.members} members
                  </MetaItem>
                  <MetaItem>
                    <Calendar size={16} />
                    {project.lastUpdated}
                  </MetaItem>
                </ProjectMeta>

                {project.owner && (
                  <OwnerBadge>
                    <span>Owner:</span>
                    <strong>{project.owner.username}</strong>
                  </OwnerBadge>
                )}
                
                <ViewProject>
                  <span>Open project</span>
                  <ChevronRight size={18} />
                </ViewProject>
              </ProjectCard>
            ))
          ) : (
            <EmptyState>
              <EmptyIcon>
                <Folder size={40} />
              </EmptyIcon>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Get started by creating your first project. Collaborate with your team, manage tasks, and track progress all in one place.
              </EmptyDescription>
              <CreateFirstButton onClick={() => setShowAddProject(true)}>
                <Plus size={20} />
                Create Your First Project
              </CreateFirstButton>
            </EmptyState>
          )}
        </ProjectsGrid>

        {hasProjects && !error && (
          <AddProject onClick={() => setShowAddProject(true)}>
            <AddProjectButton>
              <Plus size={20} />
              Create New Project
            </AddProjectButton>
          </AddProject>
        )}

        <AddMemberModal 
          isOpen={showAddMember}
          onClose={() => setShowAddMember(false)}
        />
        <TeamModal 
          isOpen={showTeam}
          onClose={() => setShowTeam(false)}
        />
      </Container>
    </HomeContainer>
  );
};

export default HomePage;