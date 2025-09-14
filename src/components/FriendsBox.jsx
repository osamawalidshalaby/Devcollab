import {  X } from "lucide-react"
import { UserPlus, UsersRound } from "lucide-react"
import styled from "styled-components"
import FriendsList from "./FriendsList"
import FriendsRequest from "./FriendsRequest"
import {ControlContext} from '../pages/MainPage'
import { useContext, useState } from "react"


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

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`
const Nav = styled.div`
    display: flex
;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`

const Link = styled.div`
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgb(51, 65, 85);
    color: rgb(226, 232, 240);
`

function FriendsBox() {
    const [status , setStatus] = useState("friends")
    const {setDisplayFriend} = useContext(ControlContext)
    return (
        <Model>
            <Box>
                <Header>
                    <h3>Friends</h3>
                    <X cursor={'pointer'} onClick={() => setDisplayFriend(freind => !freind)}/>
                </Header>
                <Nav>
                    <Link onClick={() => setStatus('friends')} style={status === 'friends' ? { backgroundColor: 'rgb(245, 158, 11)', color: 'rgb(15, 23, 42)' } : {}}> <UserPlus size={16}/> Friends</Link>
                    <Link onClick={() => setStatus('requests')} style={status === 'requests' ? { backgroundColor: 'rgb(245, 158, 11)', color: 'rgb(15, 23, 42)' } : {}}> <UsersRound size={16}/> Requests</Link>
                </Nav>
                {status === 'friends' && <FriendsList />}
                {status === 'requests' && <FriendsRequest />}
            </Box>
        </Model>
    )
}

export default FriendsBox
