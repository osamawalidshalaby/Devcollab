import styled from "styled-components"
import Button from "./Button"
import { UserPlus, UsersRound } from "lucide-react"
import { useContext } from "react"
import {ControlContext} from '../pages/MainPage'

const Header = styled.div`
    display : flex ;
    justify-content : flex-end ; 
    align-items : center ;
    width : 100% ;
    padding : 10px 20px ;
    gap : 1rem ;
`

function TopButtons() {
    const {setDisplayAdd , setDisplayFriend} = useContext(ControlContext)
    return (
        <>
        <Header>
            <Button variant="primary" size="small" onClick={() => setDisplayAdd(freind => !freind)}>
                <UserPlus />
                Add Friend
            </Button>
            <Button variant="primary" size="small" onClick={() => setDisplayFriend(freind => !freind)}>
                <UsersRound />
                Friends
            </Button>
        </Header>
        </>
    )
}

export default TopButtons
