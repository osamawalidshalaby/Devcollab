import { SearchIcon, X } from "lucide-react"
import styled from "styled-components"
import FriendItem from "./FriendItem"
import {ControlContext} from '../pages/MainPage'
import { useContext, useState } from "react"
import useSearch from "../Authentication/useSearch"
import { SpinnerMini } from "./SpinnerMini"
import useProfile from "../Authentication/useProfile"



const Model = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex
;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    padding: 1rem;
`


const Box = styled.div`
    position : absolute ;
    top : 50% ;
    left : 50% ;
    transform : translate(-50% , -50%);
    background-color: #1e293b;
    border-radius: 16px;
    border: 1px solid #334155;
    padding: 1.5rem;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow: auto;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`

const InputDiv = styled.div`
    margin-bottom : 1.25rem;
    display: flex;
    flex-direction : row ;
    align-items: center;
`
const Search = styled.div`
    background-color: #f59e0b;
    width: 20%;
    margin-left: 10px;
    cursor: pointer;
    display: flex
;
    align-items: center;
    justify-content: center;
    padding: 0.60rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    color: black;
    &:hover{
        background: var(--color-accent-purple);
        box-shadow: var(--shadow-glow);
    }
`


const Input = styled.input`
    width: 80%;
    padding: 0.75rem;
    background-color: #334155;
    border: 1px solid #475569;
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 1rem;
    margin-bottom: 1rem;
`
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


function AddFreind() {
    const {profile} = useProfile()
    const {setDisplayAdd} = useContext(ControlContext)
    const [random , setRandom] = useState('')
    const { data, isLoading, error: searchError, refetch } = useSearch(random, profile.random_id)

    function  handleSubmit(){
        refetch()
    }


    return (
        <Model>
            <Box>
                <Header>
                    <h3>Add Friends</h3>
                    <X cursor={'pointer'} onClick={() => setDisplayAdd(freind => !freind)}/>
                </Header>
                <InputDiv>
                <Input type="text" placeholder="Search Friends..." value={random} onChange={(e) => setRandom(e.target.value)}/>
                <Search role="button" onClick={handleSubmit}>
                    <SearchIcon />
                </Search>
                </InputDiv>
                <Friends>
                    {isLoading && <Center><SpinnerMini /></Center>}
                    {searchError && <Center><p>{searchError.message}</p></Center>}
                    {data && <FriendItem friend={data} />}
                </Friends>
            </Box>
        </Model>
    )
}

export default AddFreind
