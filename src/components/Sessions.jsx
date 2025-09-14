
import styled from 'styled-components';
import { 
  FolderOpenDot,
  Plus
} from 'lucide-react';

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

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Participant = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: #334155;
  border-radius: 8px;
  cursor: pointer;

  @media (min-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
  &:hover {
    background-color: #475569;
  }
  border: 1px solid #475569;
`;



const ParticipantInfo = styled.div`
  flex: 1;
`;

const ParticipantName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const AddExerciseButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #334155;
  border: 2px dashed #475569;
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #f59e0b;
    color: #f59e0b;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;


const participants = [
  {id : '1', 
    name : 'web site' , 
    created_by : 'user1'
  } , 
  {id : '2', 
    name : 'mobile app' , 
    created_by : 'user2'
  }
]

function Sessions() {
  return ( 
  <PanelContainer>
      <Header>
        <SectionTitle>
          <FolderOpenDot size={20} />
          Projects ({participants.length})
        </SectionTitle>
      </Header>

      <ParticipantsList>
        {participants.map((participant) => (
          <Participant key={participant.id}>
            <ParticipantInfo>
              <ParticipantName>{participant.name}</ParticipantName>
            </ParticipantInfo>
          </Participant>
        ))}
      </ParticipantsList>
      <AddExerciseButton>
          <Plus size={16} />
          Add Project
        </AddExerciseButton>
    </PanelContainer>
  );
};

export default Sessions;