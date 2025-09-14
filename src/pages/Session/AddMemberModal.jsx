import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import Modal from './Modal';
import { Input, IconButton } from '../../styles/StyledComponents';
import useProfile from '../../Authentication/useProfile';
import useSearch from '../../Authentication/useSearch';
import { SpinnerMini } from '../../components/SpinnerMini';
import TeamMemberItem from './TeamMemberItem';
import useUser from '../../Authentication/useUser';
import { useParams } from 'react-router-dom';

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const SearchButton = styled(IconButton)`
  padding: 12px;
  border: 1px solid rgba(71, 85, 105, 0.5);
  
  &:hover {
    background: rgba(51, 65, 85, 0.5);
  }
`;

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`
const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const EmptyState = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  color: rgb(148, 163, 184);
`;

const AddMemberModal = ({ isOpen, onClose , id }) => {
  const [random , setRandom] = useState('')
  const{user} = useUser()
  const { data, isLoading, error: searchError, refetch } = useSearch(random , user.id)

   const handleSubmit = () => {
    refetch();
  };

  const handleInviteSuccess = () => {
    setRandom(''); // Clear search query
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Team Member">
      <SearchContainer>
        <Input placeholder="Search by username or ID..." value={random} onChange={(e) => setRandom(e.target.value)} />
        <SearchButton onClick={handleSubmit}>
          <Search size={20} />
        </SearchButton>
      </SearchContainer>
      <Friends>
        {isLoading && <Center><SpinnerMini /></Center>}
        {searchError && <Center><p>{searchError.message}</p></Center>}
        {data && (
          <TeamMemberItem
            member={data}
            type={id ? "invite" : "addfriends"}
            onInviteSuccess={handleInviteSuccess}
  />
)}
      </Friends>
    </Modal>
  );
};

export default AddMemberModal;