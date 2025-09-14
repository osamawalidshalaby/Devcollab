import styled from "styled-components"
import Heading from "./Heading"
import { X } from "lucide-react"


const ChatBox = styled.div`
    position : fixed ;
    width : 300px;
    height : calc(100vh  - 80px);
    background-color : var(--color-bg);
    right : 0 ;
    border-left : 1px solid var( --color-border);
    border-top : 1px solid var( --color-border);
`

const Header = styled.div`
    border-bottom : 1px solid var( --color-border);
    width : 100% ;
    padding : 30px 20px ;
    display : flex ;
    flex-direction : row ;
    justify-content : space-between ; 
    align-items : center ;
`


function Chat() {
    return (
        <ChatBox>
            <Header>
                <p>Session Chat</p>
                <X color="#fff" size={20} cursor={'pointer'}/>
            </Header>
        </ChatBox>
    )
}

export default Chat
