import styled from "styled-components"
import TopButtons from "../components/TopButtons"
import AddFreind from "../components/AddFreind"
import FriendsBox from "../components/FriendsBox"
import { createContext, useState } from "react"
import ParticipantsPanel from "../components/ParticipantsPanel"
import  Container  from "../components/Container"
import Sessions from "../components/Sessions"



const Main = styled.main`
    margin-top : 10px ;
`

const ControlContext = createContext()



function MainPage() {
    const [displayAdd , setDisplayAdd] = useState(false)
    const [displayFriend , setDisplayFriend] = useState(false)
    return (
        <ControlContext.Provider value={{setDisplayAdd , setDisplayFriend}}>
            <Main>
                <Container>
                    <TopButtons />
                    {displayAdd && <AddFreind />}
                    {displayFriend && <FriendsBox />}
                    <ParticipantsPanel/>
                </Container>
            </Main>
        </ControlContext.Provider>
    )
}

export  {MainPage , ControlContext}
